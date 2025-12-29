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
import { PageMetadata } from '@/lib/api';

interface CityListingPageProps {
    city: {
        name: string;
        slug: string;
        code: string;
    };
    page: number;
    pageMetadata: PageMetadata | null;
}

export default function CityListingPage({ city, page, pageMetadata }: CityListingPageProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Initialize filters from URL search params
    // Initialize filters from URL search params
    const [filters, setFilters] = useState<FilterState>(() => {
        const genderParam = searchParams.get('gender');
        const brokerageParam = searchParams.get('brokerage');
        const localities = searchParams.getAll('locality');
        const flatTypes = searchParams.getAll('flat_type');
        const withPhotos = searchParams.get('photos') === 'true';
        const allowedTenants = searchParams.getAll('tenant');

        return {
            genderFilter: (genderParam === 'male' || genderParam === 'female') ? genderParam : 'all',
            brokerageFree: brokerageParam === 'free',
            localities: localities || [],
            flatTypes: flatTypes || [],
            withPhotos: withPhotos,
            allowedTenants: allowedTenants || [],
        };
    });

    // Update URL when filters change
    useEffect(() => {
        const newParams = new URLSearchParams();

        // Build newParams based on filters
        // Build newParams based on filters
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

        const newQueryString = newParams.toString();
        const currentQueryString = searchParams.toString();

        // Only update if the query string has actually changed
        if (newQueryString !== currentQueryString) {
            const newUrl = newQueryString ? `${pathname}?${newQueryString}` : pathname;
            router.replace(newUrl, { scroll: false });
        }
    }, [filters, pathname, router, searchParams]);

    useEffect(() => {
        const fetchFlats = async () => {
            setLoading(true);
            try {
                // Build query parameters
                const params = new URLSearchParams({
                    city: city.code,
                    page: page.toString(),
                    state: '0',
                });

                // Add filter parameters
                // Add filter parameters
                if (filters.brokerageFree) {
                    params.append('brokerage_applicable', 'false');
                }

                // Add gender filter using flairs parameter (legacy support)
                if (filters.genderFilter === 'male') {
                    params.append('flairs', 'Male Only');
                } else if (filters.genderFilter === 'female') {
                    params.append('flairs', 'Female Only');
                }

                // New filters
                filters.localities.forEach(l => params.append('localities', l));
                filters.flatTypes.forEach(t => params.append('flat_types', t));
                if (filters.withPhotos) {
                    params.append('images_available', 'true');
                }
                filters.allowedTenants.forEach(t => {
                    // Avoid duplicating if gender filter already added it
                    if ((t === 'Male Only' && filters.genderFilter === 'male') ||
                        (t === 'Female Only' && filters.genderFilter === 'female')) {
                        return;
                    }
                    params.append('allowed_tenant', t);
                });

                const response = await fetch(`/api/flats?${params.toString()}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching flats:', error);
                setData({ results: [] });
            } finally {
                setLoading(false);
            }
        };

        fetchFlats();
    }, [city.code, page, filters]);

    // Use actual pagination data from API response
    const pagination = data?.pagination;
    const totalPages = pagination?.total_pages || 1;
    const hasNext = pagination?.has_next || false;
    const hasPrevious = pagination?.has_previous || false;
    const totalCount = pagination?.total_count || 0;
    const hasResults = data?.results && data.results.length > 0;

    // Helper function to build pagination URL with current filters
    const buildPaginationUrl = (pageNum: number) => {
        const basePath = pageNum === 1 ? `/flats/${city.slug}` : `/flats/${city.slug}/${pageNum}`;
        const params = new URLSearchParams();

        if (filters.genderFilter !== 'all') {
            params.set('gender', filters.genderFilter);
        }
        if (filters.brokerageFree) {
            params.set('brokerage', 'free');
        }
        filters.localities.forEach(l => params.append('locality', l));
        filters.flatTypes.forEach(t => params.append('flat_type', t));
        if (filters.withPhotos) {
            params.set('photos', 'true');
        }
        filters.allowedTenants.forEach(t => params.append('tenant', t));

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
            <PageMasthead city={city} pageMetadata={pageMetadata} />
            <FilterBar
                city={city}
                listingCount={totalCount}
                currentFilters={filters}
                onFilterChange={setFilters}
            />

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        <p className="mt-4 text-slate-600">Loading flats...</p>
                    </div>
                </div>
            ) : (
                <>
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
                    </div>``
                </>
            )}

            <SEOTextTemplate
                city={city.name}
                dateUpdated={new Date().toISOString().split("T")[0]}
            />
            <Footer />
        </div>
    );
}
