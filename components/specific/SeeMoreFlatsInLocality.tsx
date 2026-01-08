'use client'

import { useEffect, useRef, useState } from 'react'
import { FlatCard } from './CityFlatsList'
import { API_BASE } from '@/lib/constants'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

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
    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        let cancelled = false

        async function fetchFlats() {
            try {
                const res = await fetch(
                    `${API_BASE}/api/flats/${excludeId}/recommend/listings`,
                    { cache: 'no-store' }
                )

                if (!res.ok) return

                const data = await res.json()

                if (cancelled) return

                setFlats(
                    data.results.map((item: any) => ({
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
                        available_for: item.available_for,
                    }))
                )
            } catch (err) {
                console.error('Failed to fetch flats:', err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchFlats()
        return () => {
            cancelled = true
        }
    }, [excludeId, cityCode])

    const scrollByAmount = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return
        const scrollAmount = 240
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        })
    }

    if (loading) {
        return (
            <div className="py-8 text-center text-gray-500">
                Loading more flats…
            </div>
        )
    }

    if (!flats.length) return null

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium mb-4 shadow-sm">
                        <MapPin size={14} className='text-emerald-400' />
                        NextFlat Recommendations
                    </div>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                                Recommended listings in <span className="text-primary">{localityName}</span>
                            </h2>

                            <p className="text-slate-500 max-w-2xl text-lg md:text-left mx-auto md:mx-0 leading-relaxed">
                                Our AI-powered engine recommends more listings that you might be interested in.
                            </p>
                        </div>

                        {/* Navigation buttons */}
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() => scrollByAmount('left')}
                                className="p-2 rounded-full border hover:bg-slate-100"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scrollByAmount('right')}
                                className="p-2 rounded-full border hover:bg-slate-100"
                                aria-label="Scroll right"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal list */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                >
                    {flats.map((flat) => (
                        <div
                            key={flat.id}
                            className="snap-start shrink-0 w-[200px]"
                        >
                            <FlatCard item={flat} />
                        </div>
                    ))}

                    {/* See All Card */}
                    <a
                        href={`/flats/flats-in-${locationSlug.toLowerCase()}/${localityName}`}
                        className="snap-start shrink-0 w-[200px] min-h-[320px] rounded-lg px-4 border-2 border-dashed border-slate-300
                                   flex flex-col items-center justify-center text-slate-400
                                   hover:border-slate-500 hover:text-slate-700 transition"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                            <ChevronRight className="text-white" />
                        </div>
                        <p className="text-lg font-semibold text-center">
                            See all flats in {localityName}
                        </p>
                    </a>
                </div>
            </div>
        </section>
    )
}
