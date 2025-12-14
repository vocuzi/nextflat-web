'use client';

import Image from "next/image";
import { NfBtn } from "../generic/buttons/Btn";
import { Search, Smartphone, Bell, Plus, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeMasthead() {
  const words = ["Flatmates", "Tenants", "Roommates", "PGs", "Flats"];
  const [index, setIndex] = useState(0);

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
          Find Flats, Flatmates, PGs and Roommates Near You
        </h1>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6 flex flex-col justify-center gap-y-2">
          <span className="font-semibold text-slate-600">Find your</span>
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
          The smartest way to find flats, roomies, and PGs.
          <br className="hidden md:block" />
          Zero brokerage. 100% verified listings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <NfBtn
            size="lg"
            href={actions[actionIndex].href}
            className="bg-slate-900 text-white hover:text-green-300 hover:bg-slate-800 rounded-xl px-8 h-12 w-[280px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={actions[actionIndex].label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2 w-full"
              >
                {actions[actionIndex].icon}
                <span>{actions[actionIndex].label}</span>
              </motion.div>
            </AnimatePresence>
          </NfBtn>

          <NfBtn
            size="lg"
            variant="outline"
            icon={<Smartphone size={20} />}
            className="w-[280px] sm:w-auto border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-900 hover:text-slate-900 rounded-xl px-8 h-12"
          >
            Get the App
          </NfBtn>
        </div>
      </div>
    </section>
  );
}
