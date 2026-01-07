'use client';

import {
    MapPin,
    User,
    Check,
    Share2,
    Phone,
    CircleCheck,
    HandCoins,
    BedDouble,
    Bath,
    Armchair,
    ShieldCheck,
    Clock,
    Info
} from 'lucide-react';

import ImageSlideshow from './ImageSlideshow';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppOnlyFeatureModal from "@/components/modals/AppOnlyFeatureModal";
import NearbyLocalitiesSection from './NearbyLocalitiesSection';
import { useState } from 'react';
import { HiMiniHome } from 'react-icons/hi2';
import Link from 'next/link';
// import SeeMoreFlats from './SeeMoreFlatsInLocality';
import { TbMapShare } from "react-icons/tb";
import SeeMoreFlats from './SeeMoreFlatsInLocality';

interface FlatDetails {
    id: number;
    locality: string; city: string; type: string; rent_amount: number; security_amount: number; brokerage_applicable: boolean | string;
    images: string[];
    description: string;
    amenities: string[];
    restrictions: string[];
    available_for: string;
    furnished: string;
    beds: number;
    baths: number;
    posted_at: string;
    additional_info: {
        user_name?: string;
    };
    google_maps_link: string;
    latitude: number;
    longitude: number;
}

interface FlatDetailsPageProps { flat: FlatDetails; }

export default function FlatDetailsPage({ flat }: FlatDetailsPageProps) {
    const [showContact, setShowContact] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);

    const handleShare = async () => {
        const shareText = `Hey, checkout this flat listing on NextFlat.\n${window.location.href}`;
        const shareData = {
            title: `${flat.type} for rent in ${flat.locality}`,
            text: `Hey, checkout this flat listing on NextFlat.`,
            url: window.location.href,
        };

        // Check if Web Share API is supported (mainly mobile devices)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                // User cancelled the share or error occurred
                console.log('Share cancelled or failed:', error);
            }
        } else {
            // Fallback for desktop: copy to clipboard
            try {
                await navigator.clipboard.writeText(shareText);
                setShowShareToast(true);
                setTimeout(() => setShowShareToast(false), 3000);
            } catch (error) {
                console.error('Failed to copy to clipboard:', error);
                // Fallback to the fallback: create a temporary textarea
                const textarea = document.createElement('textarea');
                textarea.value = shareText;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    setShowShareToast(true);
                    setTimeout(() => setShowShareToast(false), 3000);
                } catch (err) {
                    console.error('Fallback copy failed:', err);
                }
                document.body.removeChild(textarea);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto min-h-screen bg-white pb-24 lg:pb-0 relative">
            <Header />

            {/* Breadcrumbs */}
            <div className="mt-2">
                <div className="max-w-7xl mx-auto px-4 py-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
                            <HiMiniHome size={14} /> Home
                        </Link>
                        <span>/</span>
                        <Link href={`/flats/flats-in-${flat.city.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-slate-900">
                            {flat.city}
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium truncate max-w-[200px]">
                            {flat.locality}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto md:px-6 md:py-6">
                {/* Images */}
                <div className="md:rounded-2xl overflow-hidden bg-slate-100 mb-6">
                    <ImageSlideshow images={flat.images} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">
                    {/* LEFT MAIN COLUMN */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Title & Header Info */}
                        <div className="border-b border-slate-100 pb-8">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {flat.brokerage_applicable === false && (
                                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                                        <CircleCheck size={14} className="stroke-[2.5]" /> No Brokerage
                                    </span>
                                )}
                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5 ${flat.available_for === 'Family' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                    flat.available_for === 'Male Only' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                        flat.available_for === 'Female Only' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                                            'bg-orange-50 text-orange-700 border-orange-200'
                                    }`}>
                                    <User size={14} className="stroke-[2.5]" /> {flat.available_for}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                                {flat.type} for Rent in {flat.locality}
                            </h1>

                            <div className="flex items-center text-slate-500 text-sm font-medium">
                                <MapPin size={16} className="text-slate-400 mr-1.5" />
                                {flat.locality}, {flat.city}
                            </div>
                        </div>

                        {/* KEY STATS GRID */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center">
                                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <BedDouble size={14} /> Config
                                </div>
                                <div className="text-slate-900 font-bold text-lg">{flat.beds ? `${flat.beds} BHK` : '-'}</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center">
                                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Bath size={14} /> Baths
                                </div>
                                <div className="text-slate-900 font-bold text-lg">{flat.baths ? `${flat.baths} Baths` : '-'}</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center">
                                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Armchair size={14} /> Furnishing
                                </div>
                                <div className="text-slate-900 font-bold text-lg truncate" title={flat.furnished}>{flat.furnished}</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center">
                                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Clock size={14} /> Posted
                                </div>
                                <div className="text-slate-900 font-bold text-lg truncate">{flat.posted_at}</div>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-3">About this property</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-7">
                                <p className="whitespace-pre-line">{flat.description}</p>
                            </div>
                        </div>

                        {/* AMENITIES */}
                        {flat.amenities && flat.amenities.length > 0 && (
                            <div className="border-t border-slate-100 pt-8">
                                <h2 className="text-lg font-bold text-slate-900 mb-4">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                                    {flat.amenities.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-700 bg-white">
                                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                <Check size={14} className="text-green-600 stroke-[3]" />
                                            </div>
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RESTRICTIONS */}
                        {flat.restrictions && flat.restrictions.length > 0 && (
                            <div className="border-t border-slate-100 pt-8">
                                <h2 className="text-lg font-bold text-slate-900 mb-4">House Rules & Restrictions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {flat.restrictions.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3 text-slate-700 bg-red-50/50 border border-red-100 p-3 rounded-xl">
                                            <Info size={18} className="text-red-500 shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* MAP PREVIEW */}
                        <div className="border-t border-slate-100 pt-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Location</h2>
                            <div className="relative h-[300px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                                <iframe
                                    src={`https://www.google.com/maps?q=${flat.latitude},${flat.longitude}&z=15&output=embed`}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    title="Property Location"
                                ></iframe>
                                <div className="absolute bottom-4 right-4">
                                    <a
                                        href={`https://www.google.com/maps?q=${flat.latitude},${flat.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-xl shadow-lg font-bold text-sm hover:bg-slate-50 transition"
                                    >
                                        <TbMapShare size={20} className="text-blue-600" /> Open in Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT STICKY COLUMN (Desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28 space-y-6">
                            {/* RENT CARD */}
                            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 p-6">
                                <div className="mb-6">
                                    <p className="text-slate-500 text-sm font-medium mb-1">Monthly Rent</p>
                                    <div className="flex items-baseline gap-1">
                                        <h3 className="text-4xl font-extrabold text-slate-900">{formatCurrency(flat.rent_amount)}</h3>
                                        <span className="text-slate-400 font-medium">/mo</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 text-sm flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-slate-400" /> Deposit
                                        </span>
                                        <span className="font-bold text-slate-900">{formatCurrency(flat.security_amount)}</span>
                                    </div>
                                    <div className="w-full h-px bg-slate-200/50"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500 text-sm flex items-center gap-2">
                                            <HandCoins size={16} className="text-slate-400" /> Brokerage
                                        </span>
                                        <span className={flat.brokerage_applicable === false ? 'text-green-600 font-bold' : 'text-slate-900 font-bold'}>
                                            {flat.brokerage_applicable === false ? 'Zero Brokerage' : 'Applicable'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowContact(true)}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 cursor-pointer"
                                >
                                    <Phone size={20} /> Contact Owner
                                </button>

                                <div className="mt-4 grid grid-cols-1">
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition flex items-center justify-center gap-2 border border-transparent hover:border-slate-200 cursor-pointer"
                                    >
                                        <Share2 size={18} /> Share Property
                                    </button>
                                </div>
                            </div>

                            {/* OWNER MINI PROFILE */}
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Posted by</p>
                                    <p className="text-slate-900 font-bold">{flat.additional_info?.user_name || "Owner"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MOBILE STICKY BOTTOM BAR */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 animate-slideUp">
                <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-slate-400 text-xs font-medium">Rent per month</p>
                        <p className="text-white text-xl font-bold">{formatCurrency(flat.rent_amount)}</p>
                    </div>
                    <button
                        onClick={() => setShowContact(true)}
                        className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                        <Phone size={18} className="fill-slate-900" /> Contact
                    </button>
                </div>
            </div>

            {/* MODALS & SECTIONS */}
            <AppOnlyFeatureModal
                isOpen={showContact}
                onClose={() => setShowContact(false)}
                featureName="contact information"
                featureDescription="This is an app only feature. Download our app, and get"
            />

            {showShareToast && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] animate-slideDown">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                        <Check size={20} className="text-green-400 bg-green-400/20 rounded-full p-0.5" />
                        <span className="font-semibold">Link copied to clipboard</span>
                    </div>
                </div>
            )}

            <div className="bg-slate-50 border-t border-slate-200 mt-12 py-12">
                <main className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                    <SeeMoreFlats
                        localityName={flat.locality}
                        cityCode={"PNQ"}
                        excludeId={flat.id}
                        locationSlug={flat.city}
                    />
                    <NearbyLocalitiesSection
                        flatId={flat.id}
                        locality={flat.locality}
                        city={flat.city}
                    />
                </main>
            </div>

            <Footer />
        </div>
    );
}
