export const revalidate = 3600; // regenerate every 1 hour

import CityListingPage from "@/components/specific/CityListingPage";
import activeCities from "@/data/EnabledFeatures";
import { getPageMetadata } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// PRE-GENERATE ALL CITY PAGES AT BUILD TIME
export function generateStaticParams() {
    const params = [];

    // Generate base city pages (e.g., /flats/flats-in-pune)
    for (const city of activeCities) {
        params.push({
            params: [city.slug],
        });

        // Also generate first few paginated pages
        for (let pageNum = 2; pageNum <= 5; pageNum++) {
            params.push({
                params: [city.slug, pageNum.toString()],
            });
        }
    }

    return params;
}

// GENERATE METADATA FOR SEO
export async function generateMetadata({
    params,
}: {
    params: { params?: string[] };
}): Promise<Metadata> {
    const resolvedParams = await params;
    const urlParams = resolvedParams.params || [];
    const slug = urlParams[0];
    const pageParam = urlParams[1];

    if (!slug) {
        return {
            title: "Flats - NextFlat",
            description: "Find flats and flatmates",
        };
    }

    const city = activeCities.find((c) => c.slug === slug);
    if (!city) {
        return {
            title: "Flats - NextFlat",
            description: "Find flats and flatmates",
        };
    }

    const cityNameForApi = slug.replace('flats-in-', '');
    const pageMetadata = await getPageMetadata(cityNameForApi);

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const pageTitle = pageMetadata?.page_title || `Flats and Flatmates in ${city.name}`;
    const pageDesc = pageMetadata?.page_desc || `Find flats and flatmates in ${city.name}`;
    const pageImage = pageMetadata?.page_opengraph;

    return {
        title: page > 1 ? `${pageTitle} - Page ${page}` : pageTitle,
        description: pageDesc,
        openGraph: pageImage ? {
            images: [`https://v1apinffk.svc.nextflat.in${pageImage}`],
        } : undefined,
    };
}

// UNIFIED PAGE COMPONENT - Handles all routes
export default async function UnifiedCityPage({
    params,
}: {
    params: { params?: string[] };
}) {
    const resolvedParams = await params;
    const urlParams = resolvedParams.params || [];

    // Extract slug and page from URL params
    // /flats/flats-in-pune -> params = ['flats-in-pune']
    // /flats/flats-in-pune/2 -> params = ['flats-in-pune', '2']
    const slug = urlParams[0];
    const pageParam = urlParams[1];

    if (!slug) {
        notFound();
    }

    const city = activeCities.find((c) => c.slug === slug);

    if (!city) {
        notFound();
    }

    // Parse page number (default to 1 if not provided or invalid)
    let page = 1;
    if (pageParam) {
        const parsedPage = parseInt(pageParam, 10);
        if (isNaN(parsedPage) || parsedPage < 1) {
            notFound();
        }
        page = parsedPage;
    }

    // Fetch page metadata from API
    // Extract the city name from slug (e.g., 'flats-in-pune' -> 'pune')
    const cityNameForApi = slug.replace('flats-in-', '');
    const pageMetadata = await getPageMetadata(cityNameForApi);

    return <CityListingPage city={city} page={page} pageMetadata={pageMetadata} />;
}
