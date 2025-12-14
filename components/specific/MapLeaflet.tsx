'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIconUrl from '../../public/icons/marker.svg'
import MarkerClusterGroup from 'react-leaflet-cluster'


type Flat = {
    id: number
    latitude: number | null
    longitude: number | null
    type: string
    locality: string
    rent_amount: string
}

type Props = {
    flats: Flat[]
}

const customIcon = new L.Icon({
    iconUrl: markerIconUrl.src,
    iconSize: [24, 40],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
})

const defaultCenter: LatLngExpression = [28.6139, 77.209]

const MapLeaflet = ({ flats }: Props) => {
    const validFlats = flats.filter((f) => f.latitude !== null && f.longitude !== null)

    const firstValidFlat = validFlats[0]
    const center: LatLngExpression = firstValidFlat
        ? [firstValidFlat.latitude!, firstValidFlat.longitude!]
        : defaultCenter

    return (
        <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={true}
            className="z-0 h-full w-full" // <- this ensures full size
        >
            <TileLayer
                attribution='<a href="https://nextflat.in">NextFlat</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
                {validFlats.map((flat, idx) => (
                    <Marker
                        key={idx}
                        position={[flat.latitude!, flat.longitude!] as LatLngExpression}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="space-y-2 text-sm">
                                <p className="font-semibold text-slate-900">
                                    🏠 {flat.type}
                                </p>

                                <p className="text-slate-700">
                                    <span className="font-semibold">Rent:</span> ₹{flat.rent_amount}
                                </p>

                                <p className="text-slate-600 text-xs">
                                    📍 {flat.locality}
                                </p>

                                <a
                                    href={`/post/${flat.id}`}
                                    className="mt-2 block rounded-md bg-slate-900 text-center text-white px-3 py-1.5 text-xs font-medium shadow hover:bg-slate-700"
                                >
                                    View Details →
                                </a>
                            </div>
                        </Popup>

                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default MapLeaflet