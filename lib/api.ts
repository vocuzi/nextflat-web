// Centralized API functions for fetching flats data

export async function getFlats(cityCode: string, page = 1) {
  const res = await fetch(
    `https://v1apinffk.svc.nextflat.in/api/flats/search?city=${cityCode}&state=0&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    }
  );
  
  if (!res.ok) {
    // throw new Error(`Failed to fetch flats for city ${cityCode}, page ${page}`);
    return {
      "results": []
    }
  }
  
  return res.json();
}

export interface PageMetadata {
  location_name: string;
  location_slug: string;
  feat_img: string;
  search_filter: string;
  listing_count: number;
  page_title: string;
  page_desc: string;
  page_opengraph: string;
  tg_group: string;
}

export async function getPageMetadata(citySlug: string): Promise<PageMetadata | null> {
  try {
    const res = await fetch(
      `https://v1apinffk.svc.nextflat.in/api/page/${citySlug}`,
      {
        next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
      }
    );
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch page metadata for ${citySlug}:`, error);
    return null;
  }
}
