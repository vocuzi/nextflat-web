'use client';

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Users } from "lucide-react";

export default function AppPreview() {
    return (
        <div className="relative mt-8 md:mt-0 flex justify-center md:mr-12 perspective-1000">
            <motion.div
                initial={{ opacity: 0, y: 40, rotateY: 10, rotateX: 5 }}
                whileInView={{ opacity: 1, y: 0, rotateY: -12, rotateX: 5 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative z-10 transform-gpu preserve-3d"
            >
                {/* Phone Bezel */}
                <div className="relative rounded-[1.5rem] bg-slate-950 border-[6px] border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] w-[300px] h-[520px] xs:h-[600px] overflow-hidden transition-all duration-300">
                    {/* Inner Screen */}
                    <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden bg-slate-900 border border-slate-800/50">
                        <Image
                            src="/illustrations/app-prev.jpg"
                            alt="NextFlat App Screenshot"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, 300px"
                        />

                        {/* Smooth gradient overlay at the bottom for better text readability if needed, or just polish */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" /> */}

                    </div>
                </div>

                {/* Floating UI Elements */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-16 -right-2 xs:top-20 xs:-right-12 p-2 xs:p-3 pr-3 xs:pr-4 rounded-xl bg-slate-800/90 backdrop-blur-md border border-slate-700 shadow-xl flex items-center gap-2 xs:gap-3 z-30 transform translate-z-10 scale-90 xs:scale-100 origin-left"
                >
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-[16px] xs:text-[16px] font-bold text-slate-200">Verified</div>
                        <div className="text-[12px] xs:text-[12px] text-slate-400">Listings only</div>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-24 -left-2 xs:bottom-32 xs:-left-12 p-2 xs:p-3 pr-3 xs:pr-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 xs:gap-3 z-30 transform translate-z-10 scale-90 xs:scale-100 origin-right"
                >
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Users className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
                    </div>
                    <div>
                        <div className="text-[16px] xs:text-[16px] font-bold text-slate-900">Direct Connect</div>
                        <div className="text-[12px] xs:text-[12px] text-slate-500">No middlemen</div>
                    </div>
                </motion.div>

                {/* Glow behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-emerald-500/20 blur-[80px] -z-10 rounded-full" />
            </motion.div>
        </div>
    );
}
