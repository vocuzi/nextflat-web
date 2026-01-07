import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Target,
    Shield,
    Zap,
    Heart,
    Home,
    TrendingUp,
    SearchIcon,
    PlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, MessageCircle, Filter, Map, Sparkles, Users } from "lucide-react";
import activeCities from "@/data/EnabledFeatures";
import SearchModal from "@/components/specific/SearchModal";
import AppPreview from '@/components/specific/AppPreview';
import SearchMasthead from '@/components/specific/SearchMasthead';

export const metadata: Metadata = {
    title: "About NextFlat – Reimagining Flat & Flatmate Discovery",
    description:
        "Learn how NextFlat is building a trusted, broker-free platform for flats and flatmates across India.",
    openGraph: {
        title: "About NextFlat",
        description:
            "NextFlat is reimagining how India finds flats and flatmates – safe, verified, and broker-free.",
        url: "https://nextflat.in/about",
    },
};

const features = [
    {
        icon: <Search className="w-6 h-6" />,
        title: "Smart Flat Discovery",
        description:
            "Search flats, rooms, and PGs across cities with clean listings and no broker interference.",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Flatmate Matching",
        description:
            "Find compatible flatmates based on preferences, lifestyle, and requirements.",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Verified & Safer Listings",
        description:
            "We actively filter spam, duplicates, and suspicious posts to reduce scams.",
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Fast & Simple Experience",
        description:
            "No calls from brokers, no endless WhatsApp forwards — just direct access.",
    },
];

const values = [
    {
        icon: <Heart className="w-6 h-6" />,
        title: "User-First",
        description:
            "We build for renters, not brokers. Every decision starts with user trust.",
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Transparency",
        description:
            "Clear listings, clear intent, and no hidden agendas.",
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        title: "Quality over Quantity",
        description:
            "Fewer but better listings beat endless noisy groups.",
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Long-Term Thinking",
        description:
            "We are building infrastructure, not a short-term marketplace.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Hero */}

                <section className="relative overflow-hidden px-4 pt-8 md:pt-16 pb-8">
                    {/* Background Glow */}
                    <div
                        aria-hidden="true"
                        className="
                          absolute
                          left-1/2 top-[45%]
                          -translate-x-1/2 -translate-y-1/2
                          w-[60vw] h-[60vw]
                          max-w-[900px] max-h-[900px]
                          rounded-full
                          bg-gradient-to-br from-green-50 via-green-100 to-green-200
                          opacity-60
                          blur-3xl
                          pointer-events-none
                        "
                    />

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl mt-8 md:text-6xl font-bold tracking-tighter text-slate-900 mb-6 flex flex-col justify-center gap-y-2">
                            <span className="font-semibold text-5xl tracking-normal text-slate-600">Re-imagining how </span>
                            <span className="min-w-[11ch] text-center inline-block">
                                India finds Shared Flats
                            </span>
                        </h1>
                        <div className="flex flex-col items-center justify-center p-2 mb-8">
                            <p className="">with</p>
                            <Image
                                src="/logo.svg"
                                alt="App Icon"
                                width={128}
                                height={128}
                                className="opacity-85"
                            />
                        </div>

                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            NextFlat is making hunt easy for renters and owners to find and let shared Flats faster.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI-enabled</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Listings</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Community Powered</span>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="aspect-[4/3] rounded-2xl flex items-center justify-center shadow-xl">
                            <Image src="/illustrations/about-illus.png" alt="App Icon" className="object-cover opacity-80" width={512} height={512} />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <Target className="w-4 h-4" />
                                Our Story
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                                Built after facing First-Hand Frustration
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    Finding a shared flat in Indian metros often mean dealing with brokers, fake or old listings, endless Whatsapp/Telegram/Facebook group scrolling, and WASTED time.
                                </p>
                                <p>
                                    NextFlat was created to fix this broken experience and make it seamless and delightful.
                                    We built one clean platform where renters and flat owners connect directly - with easy search, alerts and instant relevant listings.
                                </p>
                                <p>
                                    What started as a simple idea to fix the experience for me has grown into a platform
                                    now spanning and being used across major Indian metro cities, helping people find shared flats and flatmates
                                    they can actually trust.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                What exactly NextFlat Does
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                NextFlat is a platform where renters and flat owners connect directly - with easy search, alerts and instant relevant listings.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition"
                                >
                                    <div className="w-14 h-14 mb-6 rounded-full bg-green-300 text-slate-900 flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <p className="text-4xl font-bold mb-6 bg-gray-100 p-6 rounded-full inline-block">🚀</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                            What We're Building Towards
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            We aim to be the go-to, one of it's kind shared-living discovery
                            platform in India - where people can find homes, flatmates,
                            and communities without fear of being scammed or cheated and friction.
                        </p>
                        <p className="mt-6 text-slate-600 leading-relaxed">
                            In near future, NextFlat will power smarter matching,
                            deeper verification, and better tools for renters and flat owners -
                            all while staying broker-free and transparent when you need to.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                Our Core Values
                            </h2>
                            <p className="text-lg text-slate-600">
                                These principles guide every decision we make here at NextFlat.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-8 rounded-2xl border border-slate-200"
                                >
                                    <div className="w-12 h-12 mb-4 rounded-2xl bg-slate-900 text-green-300 flex items-center justify-center">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 min-h-96 w-full bg-black text-white overflow-hidden">
                    {/* Background gradient */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 100%), #000000",
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 w-full mx-auto px-6 text-center">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                            Try NextFlat for free
                        </h2>

                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Whether you're searching for a shared flat or listing one,
                            NextFlat is built to work for you while you relax.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/search"
                                className="px-8 py-3 flex flex-row items-center justify-center gap-2 bg-white text-slate-900 font-semibold rounded-xl shadow hover:bg-blue-50 transition"
                            >
                                <SearchIcon />
                                Search Flat
                            </a>

                            <a
                                href="/post/create"
                                className="px-8 py-3 flex flex-row items-center justify-center gap-2 bg-green-300 text-slate-900 font-semibold rounded-xl border border-white/20 hover:bg-green-400 transition"
                            >
                                <PlusIcon />
                                List Your Flat
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
