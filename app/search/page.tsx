'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, MessageCircle, Filter, Map, Sparkles, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import activeCities from "@/data/EnabledFeatures";
import SearchModal from "@/components/specific/SearchModal";
import AppPreview from '@/components/specific/AppPreview';
import SearchMasthead from '@/components/specific/SearchMasthead';

export default function SearchPage() {
    const features = [
        {
            title: "WhatsApp Alerts",
            description: "Curated listings delivered directly to your WhatsApp instantly.",
            icon: <MessageCircle className="w-5 h-5 text-emerald-500" />
        },
        {
            title: "Smart Filters",
            description: "Easy filters for price, locality, gender, brokerage, and more.",
            icon: <Filter className="w-5 h-5 text-blue-500" />
        },
        {
            title: "Map Discovery",
            description: "Find your perfect home faster with interactive map search.",
            icon: <Map className="w-5 h-5 text-indigo-500" />
        },
        {
            title: "Personalized",
            description: "Get smart recommendations tailored to your unique preferences.",
            icon: <Sparkles className="w-5 h-5 text-orange-500" />
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <SearchMasthead />

            {/* Cities Section */}
            <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Browse Flats by City</h2>
                            <p className="text-slate-500 mt-2 text-sm md:text-base">Find homes in top metropolitan areas</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
                        {activeCities.map((city, idx) => (
                            <motion.div
                                key={city.code}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/flats/${city.slug}`}
                                    className="group relative block aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl bg-slate-200"
                                >
                                    <Image
                                        src={city.img}
                                        alt={city.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5 md:mb-1">{city.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-white/80 text-xs md:text-sm font-medium">{city.count} listings available</p>
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                <Search className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10" />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 md:mb-6 leading-tight">
                            Redefining the Flat Hunt Experience
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                            We've built NextFlat with powerful features to make your search more transparent, efficient, and tailored to you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {features.map((feature, i) => (
                                <div key={i} className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center mb-4 md:mb-6">
                                        {feature.icon}
                                    </div>
                                    <div className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-2">{feature.title}</div>
                                    <div className="text-sm text-slate-500 leading-relaxed font-medium">{feature.description}</div>

                                    <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] md:text-xs font-bold text-emerald-600">
                                        <span>ACTIVE FEATURE</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(j => <div key={j} className="w-1 h-3 bg-emerald-100 rounded-full animate-pulse" style={{ animationDelay: `${j * 0.2}s` }} />)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <AppPreview />
                    </div>
                </div>
            </section>

            {/* How to Find Broker-Free Flats Section */}
            <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
                        >
                            How to Find <span className="text-emerald-600">Broker-Free</span> Flats on NextFlat
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto"
                        >
                            Follow these three simple steps to discover your next home without paying a penny in brokerage.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                        {/* Connecting Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 -z-10" />

                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-xl group-hover:bg-emerald-100 transition-all duration-300 relative">
                                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">1</span>
                                <div className="w-8 h-8 md:w-10 md:h-10 text-emerald-600">
                                    <Map className="w-full h-full" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Pick Your City</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed px-4">
                                Select your preferred city from our active list to start browsing verified local listings.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-xl group-hover:bg-blue-100 transition-all duration-300 relative">
                                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">2</span>
                                <div className="w-8 h-8 md:w-10 md:h-10 text-blue-600">
                                    <Filter className="w-full h-full" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Apply 'No-Brokerage'</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed px-4">
                                Toggle the brokerage filter and set your preferences for price, gender, and flat type.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-orange-50 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-xl group-hover:bg-orange-100 transition-all duration-300 relative">
                                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">3</span>
                                <div className="w-8 h-8 md:w-10 md:h-10 text-orange-600">
                                    <Sparkles className="w-full h-full" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Browse & Connect</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed px-4">
                                Scroll through thousands of matching direct-owner listings and find your dream home.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-200/50"
                        >
                            <Search className="w-5 h-5" />
                            Start Searching Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
