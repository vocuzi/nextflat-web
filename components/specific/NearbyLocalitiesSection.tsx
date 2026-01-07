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

    const colors = [
        'bg-slate-800',
        'bg-indigo-800',
        'bg-emerald-800',
        'bg-rose-800',
        'bg-amber-800',
    ];

    const patterns = [
        '/patterns/autumn.svg',
        '/patterns/formal-invitation.svg',
        '/patterns/line-in-motion.svg',
        '/patterns/wiggle.svg',
    ];

    return (
        <section className="py-20 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium mb-4 shadow-sm">
                        <MapPin size={14} className='text-emerald-400' />
                        Explore Nearby Areas
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                        More Localities near <span className="text-primary">{locality}</span>
                    </h2>

                    <p className="text-slate-500 max-w-2xl text-lg md:text-left mx-auto md:mx-0 leading-relaxed">
                        Can't find what you're looking for? Explore these popular neighborhoods nearby that offer great living options.
                    </p>
                </div>

                {/* Horizontal Scroll */}
                <div className="relative -mx-4 md:-mx-0">
                    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 px-4 md:px-2 snap-x snap-mandatory scrollbar-hide">
                        {localities.map((loc, index) => {
                            const color = colors[index % colors.length];
                            const pattern = patterns[index % patterns.length];

                            return (
                                <Link
                                    key={`${loc.locality_name}-${index}`}
                                    href={`/flats/flats-in-${loc.city
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')}/${loc.locality_name}`}
                                    className={`
                                        group relative
                                        snap-start shrink-0
                                        w-[260px] h-[320px]
                                        rounded-3xl p-6
                                        ${color}
                                        flex flex-col justify-between
                                        overflow-hidden
                                        transition-all duration-500 ease-out
                                        hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/20
                                        border border-white/10
                                    `}
                                >
                                    {/* Abstract Background Shapes */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-2xl -ml-5 -mb-5" />

                                    {/* Pattern Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                                        style={{
                                            backgroundImage: `url(${pattern})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                        }}
                                    />

                                    {/* Top Content */}
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                            <Home className="text-emerald-300 w-6 h-6" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                            {loc.locality_name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-white/60 text-sm">
                                            <MapPin size={14} />
                                            <span>{loc.distance_km.toFixed(1)} km away</span>
                                        </div>
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="relative z-10">
                                        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/5 group-hover:bg-white/15 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-0.5">Available</p>
                                                    <p className="text-white font-bold text-xl">{loc.flat_count} Flats</p>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                    <ArrowRight size={14} className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
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
                                group
                                snap-start shrink-0
                                w-[260px] h-[320px]
                                rounded-3xl p-6
                                bg-white
                                border border-slate-200
                                flex flex-col items-center justify-center text-center
                                hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50
                                transition-all duration-300
                            "
                        >
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300">
                                <ArrowRight className="w-7 h-7 text-slate-800" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                View all in {city}
                            </h3>
                            <p className="text-slate-500 text-sm px-4">
                                Browse all available localities and listings
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
