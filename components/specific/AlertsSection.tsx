
import React from 'react';
import { Bell, Zap, Sliders, Mail } from 'lucide-react';

export default function AlertsSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="mb-12 lg:mb-0">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-green-300 text-sm font-medium mb-6">
                            <Bell className="w-4 h-4 mr-2" />
                            Smart Alerts
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                            Setup alerts, and skip manually browsing
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Don't spend hours refreshing pages. Tell us what you're looking for, and we'll notify you the instant a matching flat or flatmate posts a listing.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: <Sliders className="w-5 h-5" />, text: "Set specific filters for rent, location, and amenities" },
                                { icon: <Zap className="w-5 h-5" />, text: "Get instant push notifications for new matches" },
                                { icon: <Mail className="w-5 h-5" />, text: "Daily summaries delivered to your inbox" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                                        {item.icon}
                                    </div>
                                    <span className="text-slate-700 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-10 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors">
                            <Bell className="w-5 h-5 mr-2 text-green-300" />
                            Create Alert
                        </button>
                    </div>

                    <div className="relative">
                        {/* Abstract decoration */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>

                        {/* Mockup UI */}
                        <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">New Match Found!</div>
                                        <div className="text-xs text-slate-500">Just now</div>
                                    </div>
                                </div>
                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                                    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center text-sm">
                                <span className="text-slate-500">Auto-refresh active</span>
                                <span className="text-slate-800 rounded-full font-medium cursor-pointer">View Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
