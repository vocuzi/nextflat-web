import FlatDetailsPage from '@/components/specific/FlatDetailsPage';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { API_BASE } from '@/lib/constants';

async function getFlatDetails(id: string) {
    const res = await fetch(`${API_BASE}/api/flats/${id}/details`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const flat = await getFlatDetails(id);

    if (!flat) {
        return {
            title: 'Flat Not Found',
        };
    }

    const brokerageText = flat.brokerage_applicable === false ? 'No Brokerage' : 'Brokerage flat';
    const description = `${brokerageText} ${flat.type} is available for rent in ${flat.raw_location} ${flat.locality}. Connect with direct owner on NextFlat - Flats and Flatmates app.`;

    return {
        title: `${flat.type} for Rent in ${flat.locality}`,
        description: description,
        openGraph: {
            images: flat.images.map((img: string) => `https://v1apinffk.svc.nextflat.in/api${img}`),
        },
        alternates: {
            canonical: `https://nextflat.in/post/${flat.id}`,
        },

        twitter: {
            card: "summary_large_image",
            site: "@nextflat",
            creator: "@nextflat",
            title: `${flat.type} for Rent in ${flat.locality}`,
            description:
                description,
            images: flat.images.map((img: string) => `https://v1apinffk.svc.nextflat.in/api${img}`),
        },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const flat = await getFlatDetails(id);

    if (!flat) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Apartment',
        name: `${flat.type} for Rent in ${flat.locality}`,
        description: `${flat.brokerage_applicable === false ? 'No Brokerage' : 'Brokerage flat'} ${flat.type} is available for rent in ${flat.locality}.`,
        numberOfRooms: flat.beds,
        numberOfBathrooms: flat.baths,
        image: flat.images.map((img: string) => `https://v1apinffk.svc.nextflat.in/api${img}`),
        address: {
            '@type': 'PostalAddress',
            addressLocality: flat.locality,
            addressRegion: flat.city,
            addressCountry: 'IN'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: flat.latitude,
            longitude: flat.longitude
        },
        url: `https://nextflat.in/post/${flat.id}`,
        offers: {
            '@type': 'Offer',
            price: flat.rent_amount,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FlatDetailsPage flat={flat} />
        </>
    );
}
