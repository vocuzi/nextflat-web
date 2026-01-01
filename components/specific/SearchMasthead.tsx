'use client';

import Image from "next/image";
import { NfBtn } from "../generic/buttons/Btn";
import { Search, Smartphone, Bell, Plus, FileText, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";

export default function SearchMasthead() {
    const words = ["Flatmates", "Tenants", "Roommates", "PGs", "Flats"];
    const [index, setIndex] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const actions = [
        { label: "Search Flats", href: "/flats", icon: <Search size={20} className="text-green-300" /> },
        { label: "Setup Alerts", href: "/alerts/create", icon: <Bell size={20} className="text-green-300" /> },
        { label: "Post Listing", href: "/post/create", icon: <Plus size={20} className="text-green-300" /> },
        { label: "Post Requirement", href: "/post/create", icon: <FileText size={20} className="text-green-300" /> },
    ];
    const [actionIndex, setActionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);

        const actionInterval = setInterval(() => {
            setActionIndex((prev) => (prev + 1) % actions.length);
        }, 3500);
        return () => {
            clearInterval(interval);
            clearInterval(actionInterval);
        };
    }, []);

    return (
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
                <div className="inline-flex items-center justify-center p-2 bg-slate-50 border border-slate-100 rounded-2xl mb-8 shadow-sm">
                    <Image
                        src="/icons/icon-192.png"
                        alt="App Icon"
                        width={48}
                        height={48}
                        className="rounded-xl"
                    />
                </div>
                <h1 className="sr-only">
                    Search for your perfect Flats, Flatmates, PGs, Localities and Societies
                </h1>

                <h2 className="text-5xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6 flex flex-col justify-center gap-y-2">
                    <span className="font-semibold text-4xl tracking-normal text-slate-600">Search for your perfect</span>
                    <span className="min-w-[11ch] text-center inline-block">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[index]}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="inline-block"
                            >
                                {words[index]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </h2>

                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Discover verified properties without the brokerage. Tailored searches for the generation that doesn't wait.
                </p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full max-w-2xl px-2 md:px-0 mx-auto"
                >
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-full flex items-center gap-3 md:gap-4 bg-white border border-slate-200 p-1.5 pl-4 md:p-2 md:pl-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-emerald-300 transition-all group"
                    >
                        <Search className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                        <span className="flex-1 text-left text-slate-500 font-medium text-sm md:text-base truncate">Search by city, locality...</span>
                        <div className="bg-slate-900 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold text-xs md:text-sm group-hover:bg-emerald-600 transition-colors whitespace-nowrap">
                            Explore
                            <span className="hidden md:inline"> Now</span>
                        </div>
                    </button>
                </motion.div>

                <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Brokerage</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified Photos</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Owners</span>
                </div>
            </div>
            <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </section>
    );
}
