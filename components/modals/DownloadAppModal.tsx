'use client';

import { Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { APP_LINKS } from "../../lib/constants";


interface DownloadAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DownloadAppModal({
    isOpen,
    onClose,
}: DownloadAppModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8 text-center feature-modal-content">
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                                    <Image
                                        src="/icons/icon-192.png"
                                        alt="App Icon"
                                        width={64}
                                        height={64}
                                        className="rounded-2xl"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">
                                Get the NextFlat App
                            </h2>

                            {/* Message */}
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Experience the best way to find flats and flatmates. <br />
                                Download our app for <span className="font-semibold text-green-600">iOS</span> and <span className="font-semibold text-green-600">Android</span>.
                            </p>

                            {/* App Store Buttons */}
                            <div className="space-y-3">
                                {/* Google Play Store */}
                                <a
                                    href={APP_LINKS.playStore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg group"
                                >
                                    <svg className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <span className="font-semibold">Download for Android</span>
                                </a>

                                {/* Apple App Store */}
                                <a
                                    href={APP_LINKS.appStore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] group"
                                >
                                    <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                    </svg>
                                    <span className="font-semibold">Download for iOS</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
