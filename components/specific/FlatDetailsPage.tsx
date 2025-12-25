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
import AppOnlyFeatureModal from "@/components/modals/AppOnlyFeatureModal";
import { useState } from 'react';
import { HiMiniHome } from 'react-icons/hi2';
import Link from 'next/link';
// import SeeMoreFlats from './SeeMoreFlatsInLocality';
import { TbMapShare } from "react-icons/tb";

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
                <div className="bg-gray-100 text-slate-900 flex flex-col rounded-lg">
                    <div className="px-4 py-2">
                        <div className="flex items-center gap text-slate-300 text-xs truncate overflow-hidden whitespace-nowrap max-w-full">
                            <Link href="/">
                                <HiMiniHome className="text-slate-800 text-lg shrink-0" />
                            </Link>

                            <span className="mx-1">/</span>

                            <Link
                                href={`/flats/flats-in-${flat.city.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-slate-800"
                            >
                                {flat.city}
                            </Link>

                            <span className="mx-1">/</span>

                            <Link
                                href={`/flats/flats-in-${flat.city.toLowerCase().replace(/\s+/g, '-')}/${flat.locality}`}
                                className="text-slate-800"
                            >
                                {flat.locality}
                            </Link>

                            <span className="mx-1">/</span>

                            <Link
                                href={`/post/${flat.id}`}
                                className="text-slate-800 truncate"
                            >
                                {flat.type} for rent in {flat.locality}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col md:px-6 md:pt-4 mx-2 mt-4 border-2 border-transparent">
                <div className='m-2 md:mb-0'>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                        <MapPin size={16} />
                        <span>{flat.locality}, {flat.city}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                        {flat.type} for rent in {flat.locality}
                    </h1>
                </div>
                <div className="flex flex-wrap gap-2 my-2 md:px-0">
                    {flat.brokerage_applicable === false ? (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-300 text-slate-800 text-xs font-bold shadow-sm">
                            <CircleCheck size={16} className="text-slate-900 stroke-[3]" />
                            <span>No Brokerage</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-100 text-slate-800 text-xs font-bold border border-amber-200">
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
            </section>


            {/* ---- HERO SECTION ---- */}
            <section className="flex flex-col md:flex-row md:p-6 md:pt-3 gap-4 md:px-12">

                {/* LEFT: Images */}
                <div className="w-full md:w-5/12">
                    <ImageSlideshow images={flat.images} />
                </div>

                <div className="w-full md:w-7/12 gap-y-4 flex flex-col p-4 md:px-6">
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                        Posted by <b>{flat.additional_info?.user_name || "Owner"}</b>, <b>{flat.posted_at}</b>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Available for", value: flat.available_for, className: "" },
                            { title: "Listing Type", value: flat.type, className: "" },
                            { title: "Posted", value: flat.posted_at, className: "hidden md:block" }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={"bg-green-50 rounded-md border border-green-100 p-3 text-center " + item.className}
                            >
                                <div className="text-xs text-slate-500">{item.title}</div>
                                <div className="font-semibold text-slate-700 text-md">{item.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4 flex flex-row justify-between md:justify-start md:gap-12 px-4 md:pt-0">
                        <div>
                            <div className="text-sm text-slate-500">Rent per month</div>
                            <div className="text-3xl font-bold text-slate-800">
                                {formatCurrency(flat.rent_amount)}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-slate-500">Security Deposit</div>
                            <div className="text-3xl md:text-2xl font-bold text-slate-600">
                                {formatCurrency(flat.security_amount)}
                            </div>
                        </div>
                    </div>

                    {/* Rent + Deposit + Contact Card (2-column) */}
                    <div className="grid gap-6 w-full max-w-lg mx-auto">

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
            </section>

            {/* ---- MAIN CONTENT ---- */}
            <main className="px-4 sm:px-6 lg:px-8 pb-24">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* DESCRIPTION */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-4 text-slate-900">More Information from Owner</h2>
                            <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-700">
                                {flat.description}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 flex flex-col items-center justify-center">

                        <a
                            href={`https://www.google.com/maps?q=${flat.latitude},${flat.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-56 justify-center items-center gap-2 px-3 py-2 rounded-lg
             bg-slate-900 text-white text-sm font-semibold
             hover:bg-slate-800 transition-colors"
                        >
                            <TbMapShare size={26} className='text-green-300' />
                            <span>Open in Maps</span>
                        </a>


                        {/* LOCATION MAP */}
                        <div className="bg-white w-full rounded-md p-4 shadow-sm border border-slate-100">
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
            <AppOnlyFeatureModal
                isOpen={showContact}
                onClose={() => setShowContact(false)}
                featureName="contact information"
                featureDescription="This is an app only feature. Download our app, and get"
            />

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
