'use client'

import { useEffect, useState } from 'react'
import { FlatCard } from './CityFlatsList'
import { API_BASE } from '@/lib/constants'

type Flat = {
    id: number
    locality: string
    type: string
    rent_amount: string
    security_amount: string
    posted_at: string
    user?: string
    image: string
    latitude?: number
    longitude?: number
    available_for: string
}

type SeeMoreFlatsProps = {
    localityName: string
    cityCode: string
    excludeId: number
    locationSlug: string
}

export default function SeeMoreFlats({
    localityName,
    cityCode,
    excludeId,
    locationSlug,
}: SeeMoreFlatsProps) {
    const [flats, setFlats] = useState<Flat[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFlats = async () => {
            try {
                const res = await fetch(
                    `${API_BASE}/search/?city=${cityCode}&page_size=6&exclude=${excludeId}&localities=${localityName}`
                )
                const data = await res.json()

                const transformed: Flat[] = data.results.map((item: any) => ({
                    id: item.id,
                    locality: item.locality,
                    type: item.type,
                    rent_amount: String(item.rent_amount),
                    security_amount: String(item.security_amount),
                    posted_at: item.posted_at,
                    user: item.user || undefined,
                    image: item.image,
                    latitude: item.latitude,
                    longitude: item.longitude,
                }))

                setFlats(transformed)
            } catch (error) {
                console.error('Failed to fetch flats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchFlats()
    }, [cityCode, excludeId])

    if (loading) {
        return <div className="py-8 text-center text-gray-500">Loading more flats...</div>
    }

    if (flats.length === 0) {
        return null
    }

    return (
        <section className="py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="mb-6 text-2xl font-semibold">See more flats in {localityName}</h2>

                {/* Horizontal Scroll */}
                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-hide">
                        {/* Flat Cards */}
                        {flats.map((flat) => (
                            <div key={flat.id} className="snap-start shrink-0 w-[200px]">
                                <FlatCard item={flat} />
                            </div>
                        ))}

                        {/* See All Flats Card */}
                        <a
                            href={`/flats/${locationSlug}--${localityName}`}
                            className="snap-start shrink-0 w-[200px] min-h-[320px] rounded-lg px-4 border-3 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </div>

                            <p className="text-lg font-semibold text-slate-900 text-center">
                                See all flats in {localityName}
                            </p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}