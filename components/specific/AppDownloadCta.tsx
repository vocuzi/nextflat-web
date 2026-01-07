
import { Smartphone, Download } from "lucide-react";
import { NfBtn } from "../generic/buttons/Btn";
import { FaAppStore } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa6";
import AppPreview from "./AppPreview";
import { APP_LINKS } from "../../lib/constants";


export default function AppDownloadCta() {
    return (
        <section className="md:px-6 md:py-24">
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 text-white md:rounded-[1.5rem] overflow-hidden border border-slate-800 shadow-2xl relative">
                {/* Background texture or gradient glow */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] bg-emerald-500/10 blur-3xl rounded-full mix-blend-screen" />
                    <div className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-blue-500/10 blur-3xl rounded-full mix-blend-screen" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-8 pt-12 md:p-16">
                    <div className="flex-1 space-y-8 text-center md:text-left max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-sm font-medium text-emerald-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Available on iOS & Android</span>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                Your perfect flat <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                                    is just a click away
                                </span>
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
                                Experience the future of flat-hunting. Verified listings, direct chat, and smart matches—all in your pocket.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                            <a
                                href={APP_LINKS.appStore}
                                target="_blank"
                                rel="noopener noreferrer" className="group flex cursor-pointer items-center gap-3 bg-white text-slate-950 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5">
                                <FaAppStore size={24} />
                                <div className="text-left leading-none">
                                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5 group-hover:text-slate-600">Download on the</div>
                                    <div className="text-base tracking-wide">App Store</div>
                                </div>
                            </a>
                            <a
                                href={APP_LINKS.playStore}
                                target="_blank"
                                rel="noopener noreferrer" className="group flex cursor-pointer items-center gap-3 bg-slate-800/50 text-white border border-slate-700/50 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
                                <FaGooglePlay size={22} />
                                <div className="text-left leading-none">
                                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 group-hover:text-slate-300">Get it on</div>
                                    <div className="text-base tracking-wide">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Mockup area */}
                    <div className="flex-1 w-full flex justify-center md:justify-end relative">
                        <AppPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}
