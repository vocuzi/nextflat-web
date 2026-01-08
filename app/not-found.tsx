
"use client";

import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, Search, MoveLeft } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden px-4 py-20">
                {/* Background Glow */}
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        left-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2
                        w-[60vw] h-[60vw]
                        max-w-[700px] max-h-[700px]
                        rounded-full
                        bg-gradient-to-br from-green-50 via-green-100 to-green-200
                        opacity-60
                        blur-3xl
                        pointer-events-none
                    "
                />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <Image
                            src="/logo.svg"
                            alt="NextFlat Logo"
                            width={100}
                            height={100}
                            className="opacity-80"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-8xl md:text-9xl font-bold tracking-tighter text-slate-900 mb-4"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-3xl md:text-4xl font-bold text-slate-800 mb-6"
                    >
                        Oops! You've strayed too far.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-lg text-slate-600 mb-10 leading-relaxed"
                    >
                        The page you are looking for doesn't exist or has been moved.
                        Let's get you back on track to finding your perfect flat.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition shadow-lg"
                        >
                            <Home className="w-5 h-5" />
                            Back to Home
                        </Link>
                        <Link
                            href="/search"
                            className="w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 bg-green-300 text-slate-900 font-semibold rounded-xl hover:bg-green-400 transition shadow-md"
                        >
                            <Search className="w-5 h-5" />
                            Search Flats
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-12"
                    >
                        <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition cursor-pointer">
                            <MoveLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
