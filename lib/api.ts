// Centralized API functions for fetching flats data

import { API_BASE } from "./constants";

export interface SearchFilters {
  city: string;
  page?: number;
  state?: string;
  brokerage_applicable?: string;
  flairs?: string[];
  localities?: string[];
  flat_types?: string[];
  images_available?: string;
  allowed_tenant?: string[];
}

export async function searchFlats(filters: SearchFilters) {
  const params = new URLSearchParams();
  params.append('city', filters.city);
  params.append('state', filters.state || '0');
  params.append('page', (filters.page || 1).toString());

  if (filters.brokerage_applicable) {
    params.append('brokerage_applicable', filters.brokerage_applicable);
  }

  if (filters.flairs) {
    filters.flairs.forEach(f => params.append('flairs', f));
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
    filters.allowed_tenant.forEach(t => params.append('allowed_tenant', t));
  }

  const res = await fetch(
    `${API_BASE}/api/flats/search?${params.toString()}`,
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
