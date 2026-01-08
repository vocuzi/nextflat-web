import os
import xml.etree.ElementTree as ET
from datetime import datetime
from urllib.parse import quote
import requests

# Configuration
BASE_URL = "https://nextflat.in"
BLOG_DIR = "data/blog"
API_BASE = "https://v1apinffk.svc.nextflat.in"

# City to State Mapping
CITY_MAP = {
    "BLR": {"name": "bengaluru", "state": "karnataka"},
    "PNQ": {"name": "pune", "state": "maharashtra"},
    "HYD": {"name": "hyderabad", "state": "telangana"},
    "BOM": {"name": "mumbai", "state": "maharashtra"},
    "GGN": {"name": "gurugram", "state": "haryana"},
    "DXN": {"name": "noida", "state": "uttar-pradesh"},
}

# Static routes
STATIC_ROUTES = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/blog",
]


def get_blog_slugs():
    """Get slugs from MDX files in the blog directory."""
    slugs = []
    if os.path.exists(BLOG_DIR):
        for filename in os.listdir(BLOG_DIR):
            if filename.endswith(".mdx"):
                slugs.append(filename.replace(".mdx", ""))
    return slugs


def get_locality_urls(city_name):
    """
    Fetch localities from the API to generate dynamic listing URLs.
    """
    urls = []
    try:
        # Include the main city page
        urls.append(f"/flats/flats-in-{city_name}")

        # Fetch sublocalities if the API provides them
        response = requests.get(f"{API_BASE}/api/page/seo?city={city_name}", timeout=10)
        if response.status_code == 200:
            data = response.json()
            sublocalities = data.get("sublocalities", {})
            for slug in sublocalities.keys():
                # URLs follow the pattern /flats/flats-in-city/slug
                safe_slug = quote(slug)
                urls.append(f"/flats/flats-in-{city_name}/{safe_slug}")
    except Exception as e:
        print(f"Warning: Could not fetch localities for {city_name} from API: {e}")

    return urls


def create_url_element(urlset, url_data):
    """Helper to create a <url> element in the urlset."""
    url_element = ET.SubElement(urlset, "url")
    ET.SubElement(url_element, "loc").text = url_data["loc"]
    ET.SubElement(url_element, "lastmod").text = url_data["lastmod"]
    ET.SubElement(url_element, "changefreq").text = url_data["changefreq"]
    ET.SubElement(url_element, "priority").text = url_data["priority"]


def save_xml_file(root, filename):
    """Ensure directory exists and save the XML element tree to a file."""
    if not os.path.exists("public"):
        os.makedirs("public")

    # Use ET.tostring with encoding='utf-8' and then write to file
    # for cleaner output and consistency with XML standards
    tree = ET.ElementTree(root)
    file_path = f"public/{filename}"
    tree.write(file_path, encoding="utf-8", xml_declaration=True)
    print(f"Sitemap file saved: {file_path}")


def generate_sitemap():
    """Main function to generate split sitemaps and a sitemap index."""
    print("Generating sitemaps...")
    lastmod = datetime.now().strftime("%Y-%m-%d")
    sitemap_files = []

    # 1. Build General Sitemap (Static Routes + Blog + Locality Pages)
    print("Building general sitemap...")
    gen_urlset = ET.Element("urlset")
    gen_urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

    # Static Routes
    for route in STATIC_ROUTES:
        create_url_element(
            gen_urlset,
            {
                "loc": f"{BASE_URL}{route}",
                "lastmod": lastmod,
                "changefreq": "weekly",
                "priority": "1.0" if route == "" else "0.8",
            },
        )

    # Blog Posts
    blog_slugs = get_blog_slugs()
    for slug in blog_slugs:
        create_url_element(
            gen_urlset,
            {
                "loc": f"{BASE_URL}/blog/{slug}",
                "lastmod": lastmod,
                "changefreq": "monthly",
                "priority": "0.7",
            },
        )

    # Locality Pages
    for _, info in CITY_MAP.items():
        locality_urls = get_locality_urls(info["name"])
        for url in locality_urls:
            create_url_element(
                gen_urlset,
                {
                    "loc": f"{BASE_URL}{url}",
                    "lastmod": lastmod,
                    "changefreq": "daily",
                    "priority": "0.9",
                },
            )

    save_xml_file(gen_urlset, "sitemap-general.xml")
    sitemap_files.append("sitemap-general.xml")

    # 2. Build Post Sitemaps Separate by State
    post_urls_by_state = {}

    for city_code, info in CITY_MAP.items():
        state = info["state"]
        if state not in post_urls_by_state:
            post_urls_by_state[state] = []

        print(f"Fetching posts for {city_code} ({state})...")
        try:
            # Note: state=0 in API is status, not Indian state
            response = requests.get(
                f"{API_BASE}/api/flats/search?city={city_code}&state=0&map_only=true",
                timeout=10,
            )
            if response.status_code == 200:
                data = response.json()
                listings = data.get("results", [])
                for listing in listings:
                    post_urls_by_state[state].append(
                        {
                            "loc": f"{BASE_URL}/post/{listing['id']}",
                            "lastmod": lastmod,
                            "changefreq": "weekly",
                            "priority": "0.8",
                        }
                    )
            else:
                print(f"Warning: API returned {response.status_code} for {city_code}")
        except Exception as e:
            print(f"Error fetching posts for {city_code}: {e}")

    # Save each state's post sitemap
    for state, urls in post_urls_by_state.items():
        if not urls:
            continue

        filename = f"sitemap-posts-{state}.xml"
        state_urlset = ET.Element("urlset")
        state_urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

        for url_data in urls:
            create_url_element(state_urlset, url_data)

        save_xml_file(state_urlset, filename)
        sitemap_files.append(filename)

    # 3. Create Sitemap Index (sitemap.xml)
    index_root = ET.Element("sitemapindex")
    index_root.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

    for sitemap_file in sitemap_files:
        sitemap_elem = ET.SubElement(index_root, "sitemap")
        ET.SubElement(sitemap_elem, "loc").text = f"{BASE_URL}/{sitemap_file}"
        ET.SubElement(sitemap_elem, "lastmod").text = lastmod

    save_xml_file(index_root, "sitemap.xml")
    print(f"\nSitemap index generated at public/sitemap.xml.")
    print(f"Individual sitemaps created: {', '.join(sitemap_files)}")


if __name__ == "__main__":
    generate_sitemap()
