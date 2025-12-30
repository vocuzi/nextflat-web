
import { Smartphone, Download } from "lucide-react";
import { NfBtn } from "../generic/buttons/Btn";
import { FaAppStore } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa6";
import AppPreview from "./AppPreview";

export default function AppDownloadCta() {
    return (
        <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                        <Smartphone size={14} />
                        <span>Available on iOS & Android</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Get the full <span className="text-green-300">NextFlat</span> experience.
                    </h2>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto md:mx-0">
                        Real-time chat, instant alerts, and smoother browsing. Verified flats are just a tap away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                        <button className="flex items-center gap-3 bg-white text-slate-900 px-5 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                            <FaAppStore size={20} />
                            <div className="text-left leading-none">
                                <div className="text-[10px] uppercase font-bold text-slate-500">Download on the</div>
                                <div className="text-sm">App Store</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-slate-800 text-white border border-slate-700 px-5 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                            <FaGooglePlay size={20} />
                            <div className="text-left leading-none">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Get it on</div>
                                <div className="text-sm">Google Play</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mockup area - simplified for now */}
                <AppPreview />
            </div>
        </section>
    );
}
