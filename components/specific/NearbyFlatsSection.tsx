'use client'

import { useEffect, useState } from 'react'
import CityFlatsList from './CityFlatsList'
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
    stateCode: string
    cityCode: string
    excludeId: number
    locationSlug: string
}

export default function SeeMoreFlats({
    localityName,
    stateCode,
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
                    `${API_BASE}/api/flats/search?state=x&city=${cityCode}&page_size=4&exclude=${excludeId}&localities=${localityName}`
                )
                const data = await res.json()

                const transformed: Flat[] = data.results.map((item) => ({
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
    }, [stateCode, cityCode, excludeId])

    if (loading) {
        return <div className="py-8 text-center text-gray-500">Loading more flats...</div>
    }

    if (flats.length === 0) {
        return null
    }

    return (
        <section className="py-10">
            <h2 className="mb-6 text-center text-2xl font-semibold">See more flats in {localityName}</h2>
            <CityFlatsList flats={flats} />
            <div className="text-center">
                <a
                    href={`/flats/${locationSlug}--${localityName}`}
                    className="mt-4 inline-block rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 hover:text-green-300"
                >
                    View all flats in {localityName}
                </a>
            </div>
        </section>
    )
}