import { API_BASE } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const page = searchParams.get('page') || '1';

  if (!city) {
    return NextResponse.json({ error: 'City code is required' }, { status: 400 });
  }

  try {
    // Build the API URL with all query parameters
    const apiParams = new URLSearchParams({
      city,
      state: searchParams.get('state') || '0',
      page,
    });

    // Forward filter parameters if they exist
    const brokerageApplicable = searchParams.get('brokerage_applicable') || searchParams.get('brokerage');
    if (brokerageApplicable === 'false' || brokerageApplicable === 'free') {
      apiParams.append('brokerage_applicable', 'false');
    }

    // Helper to get all values from singular or plural key, potentially comma-separated
    const getMultiParams = (singular: string, plural: string) => {
      const all = [...searchParams.getAll(singular), ...searchParams.getAll(plural)];
      return all.flatMap(val => val.includes(',') ? val.split(',') : val);
    };

    const availableFor = getMultiParams('available_for', 'tenant');
    availableFor.forEach(val => {
      if (val === 'male' || val === 'Male Only') apiParams.append('available_for', 'Male Only');
      else if (val === 'female' || val === 'Female Only') apiParams.append('available_for', 'Female Only');
      else apiParams.append('available_for', val);
    });

    const localities = getMultiParams('locality', 'localities');
    localities.forEach(l => apiParams.append('localities', l));

    const flatTypes = getMultiParams('flat_type', 'flat_types');
    flatTypes.forEach(t => apiParams.append('flat_types', t));

    const rentMin = searchParams.get('rent_min') || searchParams.get('min_rent');
    if (rentMin) {
      apiParams.append('rent_min', rentMin);
    }

    const rentMax = searchParams.get('rent_max') || searchParams.get('max_rent');
    if (rentMax) {
      apiParams.append('rent_max', rentMax);
    }

    const mapOnly = searchParams.get('map_only');
    if (mapOnly) {
      apiParams.append('map_only', mapOnly);
    }

    const res = await fetch(
      `${API_BASE}/api/flats/search?${apiParams.toString()}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching flats:', error);
    return NextResponse.json({ results: [] });
  }
}
