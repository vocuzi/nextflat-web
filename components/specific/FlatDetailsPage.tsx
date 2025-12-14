'use client';

import {
    MapPin,
    User,
    Check,
    Share2,
    Heart,
    Phone,
    CircleCheck,
    HandCoins
} from 'lucide-react';

import ImageSlideshow from './ImageSlideshow';
import Header from "@/components/HeaderWithSearch";
import Footer from "@/components/Footer";
import { useState } from 'react';
import { HiMiniHome } from 'react-icons/hi2';
import Link from 'next/link';
// import SeeMoreFlats from './SeeMoreFlatsInLocality';

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
        <div className="max-w-7xl mx-auto">
            <Header />

            <section className="grid grid-cols-1 mx-3">
                <div className="bg-slate-50 text-slate-900 flex flex-col rounded-lg">
                    <div className="flex">
                        <div className="px-4 rounded-md p-2 flex flex-row gap-1 text-slate-500 items-center justify-start text-xs">
                            <Link href={'/'}><HiMiniHome className="text-slate-800 text-lg" /></Link>
                            {"/"}
                            <Link href={`/flats/flats-in-${flat.city.toLowerCase().replace(/\s+/g, '-')}`} className="text-slate-800 text-sm">{flat.city}</Link>
                            {"/"}
                            <Link href={`/flats/flats-in-${flat.city.toLowerCase().replace(/\s+/g, '-')}/${flat.locality}`} className="text-slate-800 text-sm">Flats in {flat.locality}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- HERO SECTION ---- */}
            <section className="flex flex-col md:flex-row md:p-6">

                {/* LEFT: Images */}
                <div className="w-full md:w-5/12">
                    <ImageSlideshow images={flat.images} />
                </div>

                <div className="w-full md:w-7/12 gap-y-4 flex flex-col p-4 md:px-6">

                    <div className="flex flex-wrap gap-2 md:px-0">
                        {flat.brokerage_applicable === false ? (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-sm">
                                <CircleCheck size={16} className="text-green-300 stroke-[3]" />
                                <span>No Brokerage</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                                <HandCoins size={16} className="text-amber-700 stroke-[3]" />
                                <span>Brokerage Applicable</span>
                            </div>
                        )}

                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold border shadow-sm ${flat.available_for === 'Male Only' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            flat.available_for === 'Female Only' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                                flat.available_for === 'Family' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                    'bg-orange-50 text-orange-700 border-orange-200'
                            }`}>
                            <User size={16} />
                            <span>{flat.available_for}</span>
                        </div>
                    </div>

                    <div className=''>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                            <MapPin size={16} />
                            <span>{flat.locality}, {flat.city}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl mt-4 font-bold text-slate-800 leading-tight">
                            {flat.type} for rent in {flat.locality}
                        </h1>
                    </div>

                    {/* Info Tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Furnishing", value: flat.furnished || "Unfurnished" },
                            { title: "Tenant Type", value: flat.available_for },
                            { title: "Listing Type", value: flat.type },
                            { title: "Posted", value: flat.posted_at }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-green-50 rounded-md border border-green-100 p-3 text-center"
                            >
                                <div className="text-xs text-slate-500">{item.title}</div>
                                <div className="font-semibold text-slate-700 text-md">{item.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Rent + Deposit + Contact Card (2-column) */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Pricing */}
                        <div className="space-y-4 flex flex-row md:flex-col justify-between md:justify-start px-4 pt-4 md:pt-0">
                            <div>
                                <div className="text-sm text-slate-500">Rent per month</div>
                                <div className="text-2xl font-bold text-slate-800">
                                    {formatCurrency(flat.rent_amount)}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-slate-500">Security Deposit</div>
                                <div className="text-2xl font-bold text-slate-600">
                                    {formatCurrency(flat.security_amount)}
                                </div>
                            </div>
                        </div>

                        {/* Contact / Owner Card */}
                        <div className="bg-white rounded-md border-2 border-slate-100 p-4 space-y-4">

                            {/* Owner */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                    <User size={22} className="text-slate-500" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500">Posted by</div>
                                    <div className="font-bold text-slate-900">
                                        {flat.additional_info?.user_name || "Owner"}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Button */}
                            <button
                                className="w-full py-3 bg-green-300 text-slate-900 rounded-md font-semibold hover:bg-slate-900 cursor-pointer hover:text-green-300 transition flex items-center justify-center gap-2"
                                onClick={() => setShowContact(true)}
                            >
                                <Phone size={18} />
                                Contact Owner
                            </button>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={handleShare}
                                    className="py-2.5 border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 text-slate-700 cursor-pointer transition-all"
                                >
                                    <Share2 size={18} /> Share
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ---- MAIN CONTENT ---- */}
            <main className="px-4 sm:px-6 lg:px-8 pb-24">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* DESCRIPTION */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-4 text-slate-900">Description</h2>
                            <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-700">
                                {flat.description}
                            </div>
                        </div>

                        {/* AMENITIES */}
                        {flat.amenities?.length > 0 && (
                            <div className="bg-white p-4">
                                <h2 className="text-xl font-bold mb-4 text-slate-900">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {flat.amenities.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-700">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RESTRICTIONS */}
                        {flat.restrictions?.length > 0 && (
                            <div className="bg-white p-4">
                                <h2 className="text-xl font-bold mb-4 text-slate-900">Restrictions</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {flat.restrictions.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-700">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* LOCATION MAP */}
                        <div className="bg-white rounded-md p-4 shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-3">Explore Locality on Maps</h3>
                            <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <iframe
                                    src={`https://www.google.com/maps?q=${flat.latitude},${flat.longitude}&z=15&output=embed`}
                                    height="350"
                                    className="w-full"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Maps embedd for the Flat listing"
                                ></iframe>
                                {/* <a
                                    href={flat.google_maps_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-10 px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-slate-900 hover:bg-slate-50 flex items-center gap-2"
                                >
                                    <MapPin size={16} className="text-red-500" />
                                    View on Google Maps
                                </a> */}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* App Download Modal */}
            {showContact && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setShowContact(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all animate-slideUp relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowContact(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <Phone size={32} className="text-white" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">
                            App Only Feature
                        </h2>

                        {/* Message */}
                        <p className="text-slate-600 text-center mb-6 leading-relaxed">
                            This is an app only feature. Download our app, and get <span className="font-semibold text-green-600">free contact information</span> for this flat listing.
                        </p>

                        {/* App Store Buttons */}
                        <div className="space-y-3">
                            {/* Google Play Store */}
                            <a
                                href="https://play.google.com/store/apps/details?id=in.nextflat.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <span className="font-semibold">Download on Google Play</span>
                            </a>

                            {/* Apple App Store */}
                            <a
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <span className="font-semibold">Download on App Store</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Toast Notification */}
            {showShareToast && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideUp">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
                        <Check size={20} className="text-green-400" />
                        <span className="font-medium">Link copied to clipboard!</span>
                    </div>
                </div>
            )}

            {/* <SeeMoreFlats
                localityName={flat.locality}
                cityCode={flat.city}
                excludeId={flat.id}
                locationSlug={flat.location_slug}
            /> */}

            <Footer />
        </div>
    );
}
