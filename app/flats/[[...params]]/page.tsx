export const revalidate = 3600; // regenerate every 1 hour

import CityListingPage from "@/components/specific/CityListingPage";
import activeCities from "@/data/EnabledFeatures";
import { getPageMetadata, searchFlats, SearchFilters } from "@/lib/api";
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
    params: Promise<{ params?: string[] }>;
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
    searchParams,
}: {
    params: Promise<{ params?: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const urlParams = resolvedParams.params || [];

    // Extract slug and page from URL params
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
    const cityNameForApi = slug.replace('flats-in-', '');
    const pageMetadata = await getPageMetadata(cityNameForApi);

    // Build Search Filters from query params
    const gender = resolvedSearchParams.gender as string;
    const brokerage = resolvedSearchParams.brokerage as string;

    // Ensure localities and flatTypes are arrays
    const localities = Array.isArray(resolvedSearchParams.locality)
        ? resolvedSearchParams.locality
        : (resolvedSearchParams.locality ? [resolvedSearchParams.locality as string] : []);

    const flatTypes = Array.isArray(resolvedSearchParams.flat_type)
        ? resolvedSearchParams.flat_type
        : (resolvedSearchParams.flat_type ? [resolvedSearchParams.flat_type as string] : []);

    const photos = resolvedSearchParams.photos === 'true';

    const tenants = Array.isArray(resolvedSearchParams.tenant)
        ? resolvedSearchParams.tenant
        : (resolvedSearchParams.tenant ? [resolvedSearchParams.tenant as string] : []);

    const searchFilters: SearchFilters = {
        city: city.code,
        page: page,
        state: '0',
        brokerage_applicable: brokerage === 'free' ? 'false' : undefined,
        images_available: photos ? 'true' : undefined,
        localities: localities,
        flat_types: flatTypes,
        allowed_tenant: tenants,
        min_rent: resolvedSearchParams.min_rent ? parseInt(resolvedSearchParams.min_rent as string) : undefined,
        max_rent: resolvedSearchParams.max_rent ? parseInt(resolvedSearchParams.max_rent as string) : undefined,
    };

    if (gender === 'male' && !tenants.includes('Male Only')) {
        searchFilters.allowed_tenant?.push('Male Only,Everyone,Bachelors,Not Specified');
    } else if (gender === 'female' && !tenants.includes('Female Only')) {
        searchFilters.allowed_tenant?.push('Female Only,Everyone,Bachelors,Not Specified');
    }

    // Fetch initial data for SSR
    const initialData = await searchFlats(searchFilters);

    return (
        <CityListingPage
            city={city}
            page={page}
            pageMetadata={pageMetadata}
            initialData={initialData}
        />
    );
}
