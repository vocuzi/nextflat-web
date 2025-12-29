'use client';

import { MapPin, Home, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NearbyLocality {
    locality_name: string;
    distance_km: number;
    flat_count: number;
    city: string;
}

interface NearbyLocalitiesSectionProps {
    flatId: number;
    locality: string;
    city: string;
}

export default function NearbyLocalitiesSection({
    flatId,
    locality,
    city,
}: NearbyLocalitiesSectionProps) {
    const [localities, setLocalities] = useState<NearbyLocality[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNearbyLocalities = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/flats/${flatId}/nearby-localities`);
                if (!response.ok) throw new Error('Failed to fetch nearby localities');
                const data = await response.json();
                setLocalities(data.localities || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error');
            } finally {
                setLoading(false);
            }
        };

        fetchNearbyLocalities();
    }, [flatId]);

    if (loading || error || localities.length === 0) return null;

    const colorSchemes = [
        'bg-slate-800 text-slate-100',
        'bg-indigo-800 text-indigo-100',
        'bg-emerald-800 text-emerald-100',
        'bg-rose-800 text-rose-100',
        'bg-amber-800 text-amber-100',
    ];

    return (
        <section className="py-14 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-white text-sm font-medium mb-3">
                        <MapPin size={14} className='text-green-300' />
                        Explore Nearby Areas
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                        More Localities near {locality}
                    </h2>

                    <p className="text-slate-400 max-w-xl">
                        Explore more nearby neighborhoods with available flats if were not able to find any listings in {locality}.
                    </p>
                </div>

                {/* Horizontal Scroll */}
                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-hide">
                        {localities.map((loc, index) => {
                            const color = colorSchemes[index % colorSchemes.length];

                            return (
                                <Link
                                    key={`${loc.locality_name}-${index}`}
                                    href={`/flats/flats-in-${loc.city
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')}/${loc.locality_name}`}
                                    className={`
                                        snap-start shrink-0
                                        w-[200px] h-[260px]
                                        rounded-2xl p-5
                                        ${color}
                                        relative overflow-hidden
                                        transition-all duration-300
                                        hover:-mt-2 hover:shadow-xl
                                    `}
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                                        <Home className="text-green-300" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-2">
                                        {loc.locality_name}
                                    </h3>

                                    <p className="text-sm opacity-80 mb-6">
                                        {loc.distance_km.toFixed(1)} km away
                                    </p>

                                    {/* Stats */}
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <div className="flex items-center justify-between text-sm font-medium">
                                            <span className="opacity-80">Available Flats</span>
                                            <span className="text-lg font-bold">
                                                {loc.flat_count}
                                            </span>
                                        </div>
                                    </div>

                                    {/* SVG filler hook (future) */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
                                        {/* SVG filler will sit here */}
                                    </div>
                                </Link>
                            );
                        })}

                        {/* View All Card */}
                        <Link
                            href={`/flats/flats-in-${city
                                .toLowerCase()
                                .replace(/\s+/g, '-')}`}
                            className="
                                snap-start shrink-0
                                w-[200px] h-[260px]
                                rounded-2xl
                                px-4
                                border-3 border-dashed border-slate-300
                                flex flex-col items-center justify-center
                                text-slate-300
                                hover:text-white hover:border-slate-500
                                transition-all
                            "
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                <ArrowRight />
                            </div>

                            <p className="text-lg font-semibold text-slate-900 text-center">
                                View all localities in {city}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
