// Centralized API functions for fetching flats data

import { API_BASE } from "./constants";

export interface SearchFilters {
  city: string;
  page?: number;
  state?: string;
  brokerage_applicable?: string;
  localities?: string[];
  flat_types?: string[];
  images_available?: string;
  allowed_tenant?: string[];
  min_rent?: number;
  max_rent?: number;
}

export interface SEOData {
  location: string;
  lastUpdated: string;
  totalListings: number;
  minRent: number;
  maxRent: number;
  keyAspects: string[];
  thingsToKnow: string[];
  trends: any[];
  faqs: { question: string; answer: string }[];
  sublocalities: Record<string, string>;
}

export async function searchFlats(filters: SearchFilters) {
  const params = new URLSearchParams();
  params.append('city', filters.city);
  params.append('page', (filters.page || 1).toString());

  if (filters.brokerage_applicable) {
    params.append('brokerage_applicable', filters.brokerage_applicable);
  }

  if (filters.localities) {
    filters.localities.forEach(l => params.append('localities', l));
  }

  if (filters.flat_types) {
    filters.flat_types.forEach(t => params.append('flat_types', t));
  }

  if (filters.images_available) {
    params.append('images_available', filters.images_available);
  }

  if (filters.allowed_tenant) {
    filters.allowed_tenant.forEach(t => params.append('available_for', t));
  }

  if (filters.min_rent) {
    params.append('rent_min', filters.min_rent.toString());
  }

  if (filters.max_rent) {
    params.append('rent_max', filters.max_rent.toString());
  }

  const res = await fetch(
    `${API_BASE}/search?${params.toString()}`,
    {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    }
  );

  if (!res.ok) {
    return {
      results: [],
      pagination: {
        page: filters.page || 1,
        page_size: 20,
        total_pages: 0,
        total_count: 0,
        has_next: false,
        has_previous: false
      }
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
      `${API_BASE}/api/page/${citySlug}`,
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

export async function getSEOData(city: string): Promise<SEOData | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/page/seo?city=${city}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Failed to fetch SEO data for ${city}:`, error);
    return null;
  }
}
