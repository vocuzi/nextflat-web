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
    const brokerageApplicable = searchParams.get('brokerage_applicable');
    if (brokerageApplicable !== null) {
      apiParams.append('brokerage_applicable', brokerageApplicable);
    }

    const flairs = searchParams.get('flairs');
    if (flairs) {
      apiParams.append('flairs', flairs);
    }

    const localities = searchParams.get('localities');
    if (localities) {
      apiParams.append('localities', localities);
    }

    const flatTypes = searchParams.get('flat_types');
    if (flatTypes) {
      apiParams.append('flat_types', flatTypes);
    }

    const rentMin = searchParams.get('rent_min');
    if (rentMin) {
      apiParams.append('rent_min', rentMin);
    }

    const rentMax = searchParams.get('rent_max');
    if (rentMax) {
      apiParams.append('rent_max', rentMax);
    }

    const mapOnly = searchParams.get('map_only');
    if (mapOnly) {
      apiParams.append('map_only', mapOnly);
    }

    const res = await fetch(
      `https://v1apinffk.svc.nextflat.in/api/flats/search?${apiParams.toString()}`,
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
