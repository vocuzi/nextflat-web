import FlatDetailsPage from '@/components/specific/FlatDetailsPage';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

async function getFlatDetails(id: string) {
    const res = await fetch(`https://v1apinffk.svc.nextflat.in/api/flats/${id}/details`, {
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

    return {
        title: `${flat.type} in ${flat.locality} | NextFlat`,
        description: flat.description.slice(0, 160),
        openGraph: {
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

    return <FlatDetailsPage flat={flat} />;
}
