'use client';

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Users } from "lucide-react";

export default function AppPreview() {
    return (
        <div className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-md blur-3xl opacity-50 -z-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
            >

                <div className="relative rounded-[1.6rem] overflow-hidden border-[8px] md:border-[8px] rounded-b-none border-b-1 md:border-b-1 border-b-slate-200 border-slate-300 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                    {/* Cropped viewport */}
                    <div className="relative w-74 h-[500px] overflow-hidden">
                        <Image
                            src="/illustrations/app-prev.jpg"
                            alt="NextFlat App Screenshot"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>

                    {/* Glassmorphism Badge */}
                    <div className="absolute bottom-20 left-6 right-6 p-4 rounded-2xl bg-slate-900/5 backdrop-blur-sm text-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Smart Search Active</p>
                                <p className="text-[10px] text-slate-900/80 uppercase tracking-widest">
                                    Powered by NextFlat AI
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Floating UI Elements for extra depth */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 md:-top-10 md:-right-10 p-4 rounded-2xl bg-white shadow-xl border border-slate-100 hidden md:flex items-center gap-3 z-10"
                >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">100% Verified</span>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 p-4 rounded-2xl bg-white shadow-xl border border-slate-100 hidden md:flex items-center gap-3 z-10"
                >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">Direct Connect</span>
                </motion.div>
            </motion.div>
        </div>
    );
}
