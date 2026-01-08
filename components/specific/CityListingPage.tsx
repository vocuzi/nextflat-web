'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CityFlatsList from "@/components/specific/CityFlatsList";
import FilterBar, { FilterState } from "@/components/specific/FilterBar";
import PageMasthead from "@/components/specific/PageMasthead";
import SEOTextTemplate from "@/components/specific/SEOTemplateFlatListings";
import Link from "next/link";
import { PageMetadata, SEOData } from '@/lib/api';

interface CityListingPageProps {
    city: {
        name: string;
        slug: string;
        code: string;
    };
    page: number;
    pageMetadata: PageMetadata | null;
    initialData: any;
    localitySlug?: string | null;
    seoData?: SEOData | null;
}

export default function CityListingPage({ city, page, pageMetadata, initialData, localitySlug, seoData }: CityListingPageProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [data, setData] = useState<any>(initialData);

    // Sync with initialData when it changes (server-side update)
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    // Initialize filters from URL search params
    const [filters, setFilters] = useState<FilterState>(() => {
        const genderParam = searchParams.get('gender');
        const brokerageParam = searchParams.get('brokerage');
        const localities = searchParams.getAll('locality');
        const flatTypes = searchParams.getAll('flat_type');
        const withPhotos = searchParams.get('photos') === 'true';
        const allowedTenants = searchParams.getAll('tenant');
        const minRent = parseInt(searchParams.get('min_rent') || '1000');
        const maxRent = parseInt(searchParams.get('max_rent') || '75000');

        return {
            genderFilter: (genderParam === 'male' || genderParam === 'female') ? genderParam : 'all',
            brokerageFree: brokerageParam === 'free',
            localities: localities || [],
            flatTypes: flatTypes || [],
            withPhotos: withPhotos,
            allowedTenants: allowedTenants || [],
            minRent: isNaN(minRent) ? 1000 : minRent,
            maxRent: isNaN(maxRent) ? 75000 : maxRent,
        };
    });

    // Update URL when filters change
    useEffect(() => {
        const newParams = new URLSearchParams();

        if (filters.genderFilter !== 'all') {
            newParams.set('gender', filters.genderFilter);
        }
        if (filters.brokerageFree) {
            newParams.set('brokerage', 'free');
        }
        filters.localities.forEach(l => newParams.append('locality', l));
        filters.flatTypes.forEach(t => newParams.append('flat_type', t));
        if (filters.withPhotos) {
            newParams.set('photos', 'true');
        }
        filters.allowedTenants.forEach(t => newParams.append('tenant', t));
        if (filters.minRent > 1000) {
            newParams.set('min_rent', filters.minRent.toString());
        }
        if (filters.maxRent < 75000) {
            newParams.set('max_rent', filters.maxRent.toString());
        }

        const newQueryString = newParams.toString();
        const currentQueryString = searchParams.toString();

        // Only update if the query string has actually changed
        if (newQueryString !== currentQueryString) {
            // Use the base city path for the URL
            const newUrl = newQueryString ? `${pathname}?${newQueryString}` : pathname;
            router.replace(newUrl, { scroll: false });
        }
    }, [filters, pathname, router, searchParams]);

    // Use actual pagination data from API response
    const pagination = data?.pagination;
    const totalPages = pagination?.total_pages || 1;
    const hasNext = pagination?.has_next || false;
    const hasPrevious = pagination?.has_previous || false;
    const totalCount = pagination?.total_count || 0;
    const hasResults = data?.results && data.results.length > 0;


    // Helper function to build pagination URL with current filters
    const buildPaginationUrl = (pageNum: number) => {
        let basePath = `/flats/${city.slug}`;

        if (localitySlug) {
            basePath += `/${localitySlug}`;
            if (pageNum > 1) {
                basePath += `/${pageNum}`;
            }
        } else {
            if (pageNum > 1) {
                basePath += `/${pageNum}`;
            }
        }

        const params = new URLSearchParams();

        if (filters.genderFilter !== 'all') {
            params.set('gender', filters.genderFilter);
        }
        if (filters.brokerageFree) {
            params.set('brokerage', 'free');
        }
        filters.localities.forEach((l) => {
            // If localitySlug is active, we don't need it in query params if it's the same
            if (l !== localitySlug) {
                params.append('locality', l);
            }
        });
        filters.flatTypes.forEach((t) => params.append('flat_type', t));
        if (filters.withPhotos) {
            params.set('photos', 'true');
        }
        filters.allowedTenants.forEach((t) => params.append('tenant', t));
        if (filters.minRent > 1000) {
            params.set('min_rent', filters.minRent.toString());
        }
        if (filters.maxRent < 75000) {
            params.set('max_rent', filters.maxRent.toString());
        }

        return params.toString() ? `${basePath}?${params.toString()}` : basePath;
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxPagesToShow = 7;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(totalPages - 1, page + 1);

            if (page <= 3) {
                endPage = Math.min(5, totalPages - 1);
            }

            if (page >= totalPages - 2) {
                startPage = Math.max(2, totalPages - 4);
            }

            if (startPage > 2) {
                pages.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 1) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="max-w-7xl mx-auto">
            <Header />
            <PageMasthead city={city} pageMetadata={pageMetadata} localitySlug={localitySlug} />
            <FilterBar
                city={city}
                listingCount={totalCount}
                currentFilters={filters}
                onFilterChange={setFilters}
            />

            {/* Results List */}
            <CityFlatsList flats={data?.results || []} />

            {/* Mobile-friendly Pagination */}
            <div className="my-10 px-3 flex flex-col items-center gap-3">
                {/* Top info for mobile */}
                <p className="text-xs sm:hidden text-slate-600">
                    Page{" "}
                    <span className="font-semibold text-slate-900">{page}</span> of{" "}
                    <span className="font-semibold text-slate-900">
                        {totalPages}
                    </span>
                </p>

                <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                    {/* Previous Button */}
                    {hasPrevious ? (
                        <Link
                            href={buildPaginationUrl(page - 1)}
                            className="w-full sm:w-auto text-center px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors font-medium text-slate-700 text-sm sm:text-base"
                        >
                            ← Previous
                        </Link>
                    ) : (
                        <span className="w-full sm:w-auto text-center px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed font-medium text-sm sm:text-base">
                            ← Previous
                        </span>
                    )}

                    {/* Page Numbers – hidden on very small screens */}
                    <div className="hidden sm:flex items-center gap-1 mx-2 max-w-full overflow-x-auto scrollbar-none">
                        {pageNumbers.map((pageNum, index) => {
                            if (pageNum === "...") {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="px-3 py-2 text-slate-500"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const isCurrentPage = pageNum === page;
                            const pageNumber = pageNum as number;

                            return (
                                <Link
                                    key={pageNumber}
                                    href={buildPaginationUrl(pageNumber)}
                                    className={`
            min-w-[40px] px-3 py-2 text-center rounded-lg font-medium transition-all text-sm
            ${isCurrentPage
                                            ? "bg-slate-900 text-white shadow-md"
                                            : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                                        }
          `}
                                >
                                    {pageNumber}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    {hasNext ? (
                        <Link
                            href={buildPaginationUrl(page + 1)}
                            className="w-full sm:w-auto text-center px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium shadow-sm text-sm sm:text-base"
                        >
                            Next →
                        </Link>
                    ) : (
                        <span className="w-full sm:w-auto text-center px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed font-medium text-sm sm:text-base">
                            Next →
                        </span>
                    )}
                </div>

                {/* Desktop page info */}
                <p className="hidden sm:block text-sm text-slate-600">
                    Page{" "}
                    <span className="font-semibold text-slate-900">{page}</span> of{" "}
                    <span className="font-semibold text-slate-900">
                        {totalPages}
                    </span>
                    {totalCount > 0 && (
                        <span className="text-slate-500 ml-2">({totalCount.toLocaleString()} flats)</span>
                    )}
                </p>
            </div>


            <SEOTextTemplate
                city={city.name}
                dateUpdated={new Date().toISOString().split("T")[0]}
                seoData={seoData}
            />
            <Footer />
        </div>
    );
}
