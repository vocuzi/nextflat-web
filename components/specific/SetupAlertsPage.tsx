'use client';

import {
    Bell,
    Zap,
    Clock,
    Filter,
    CheckCircle2,
    Star,
    ArrowRight,
    BadgeCheck,
    MessageCircle,
    Smartphone,
    Target,
    TrendingUp
} from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
import { APP_LINKS } from "../../lib/constants";


export default function SetupAlertsPage() {
    const stats = [
        { value: "5,000+", label: "Active Alerts", icon: Bell },
        { value: "Instant", label: "Notifications", icon: Zap },
        { value: "24/7", label: "Monitoring", icon: Clock },
        { value: "100%", label: "Free Forever", icon: Star },
    ];

    const features = [
        {
            icon: MessageCircle,
            title: "WhatsApp Notifications",
            description: "Get instant alerts directly on WhatsApp when a flat matching your criteria is posted.",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: Filter,
            title: "Custom Filters",
            description: "Set your preferences: city, budget, flat type, gender preference, and more.",
            color: "from-blue-400 to-cyan-500"
        },
        {
            icon: Zap,
            title: "Real-Time Updates",
            description: "Be the first to know! Get notified within seconds of a new listing going live.",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: Target,
            title: "Smart Matching",
            description: "Our algorithm ensures you only get alerts for flats that match your exact requirements.",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: Bell,
            title: "Multiple Alerts",
            description: "Create unlimited alerts for different cities or preferences. No restrictions!",
            color: "from-red-400 to-rose-500"
        },
        {
            icon: CheckCircle2,
            title: "Easy Management",
            description: "Pause, edit, or delete alerts anytime from the app. Complete control at your fingertips.",
            color: "from-indigo-400 to-blue-500"
        },
    ];

    const benefits = [
        "Never miss your dream flat again",
        "Save time - no need to check daily",
        "Beat the competition with instant alerts",
        "Filter by budget, location, and preferences",
        "100% free, no hidden charges",
        "Easy one-tap setup in the app"
    ];

    const testimonials = [
        {
            name: "Sneha M.",
            location: "Mumbai",
            text: "I got an alert within 5 minutes of a flat being posted in my preferred area. Contacted the owner immediately and secured it!",
            rating: 5
        },
        {
            name: "Rahul K.",
            location: "Bangalore",
            text: "The WhatsApp alerts are super convenient. I found my perfect flat without constantly checking the app.",
            rating: 5
        },
        {
            name: "Priya S.",
            location: "Pune",
            text: "Set up alerts for 3 different areas. Got my ideal 2BHK in just 2 days. Highly recommend!",
            rating: 5
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className='max-w-7xl mx-auto'>
                <Header />
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <Image
                            src="/logo.svg"
                            className="mx-auto mb-6 invert opacity-95"
                            alt="NextFlat Logo"
                            width={140}
                            height={38}
                        />

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
                            Never Miss Your
                            <br />
                            <span className="bg-gradient-to-r font-bold from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Dream Flat Again
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 mb-3 max-w-3xl mx-auto">
                            Setup instant WhatsApp alerts and get notified the moment a flat matching your preferences is posted.
                        </p>
                        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
                            Download NextFlat app and be the first to contact property owners!
                        </p>

                        {/* App Store Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-6">
                            <a
                                href={APP_LINKS.playStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-4 justify-center py-2 bg-white hover:bg-blue-50 text-slate-900 rounded-xl transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
                            >
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs text-slate-600">GET IT ON</div>
                                    <div className="text-lg font-bold">Google Play</div>
                                </div>
                                <ArrowRight className="ml-2 hidden md:flex group-hover:translate-x-1 transition-transform" size={20} />
                            </a>

                            <a
                                href={APP_LINKS.appStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-4 justify-center py-2 bg-white hover:bg-blue-50 text-slate-900 rounded-xl transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
                            >
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs text-slate-600">Download on the</div>
                                    <div className="text-lg font-bold">App Store</div>
                                </div>
                                <ArrowRight className="ml-2 hidden md:flex group-hover:translate-x-1 transition-transform" size={20} />
                            </a>
                        </div>

                        {/* Trust Badge */}
                        <p className="text-sm text-slate-400">
                            ✨ Join 5,000+ users getting instant flat alerts on WhatsApp
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mb-3">
                                    <stat.icon size={24} className="text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className='rounded-full bg-slate-900 font-bold text-xs mb-6 text-white px-4 py-1.5 inline-flex items-center justify-center gap-2'>
                            <Smartphone className='text-blue-300' size={16} />
                            Simple 3-Step Setup
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Setting up alerts is incredibly simple. Just 3 steps and you're done!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mb-4 text-white text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Download the App
                            </h3>
                            <p className="text-slate-600">
                                Install NextFlat from Play Store or App Store and login with your WhatsApp number.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mb-4 text-white text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Set Your Preferences
                            </h3>
                            <p className="text-slate-600">
                                Choose your city, budget, flat type, gender preference, and other filters.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mb-4 text-white text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Get Instant Alerts
                            </h3>
                            <p className="text-slate-600">
                                Receive WhatsApp notifications instantly when matching flats are posted!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className='rounded-full bg-slate-900 font-bold text-xs mb-6 text-white px-4 py-1.5 flex items-center justify-center gap-2'>
                            <BadgeCheck className='text-blue-300' />
                            Powerful Alert Features
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Why Setup Alerts?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Stay ahead of the competition and never miss out on your perfect flat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1"
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Benefits You'll Love
                        </h2>
                        <p className="text-xl text-slate-300">
                            Everything you need to find your perfect flat faster
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                            >
                                <CheckCircle2 size={24} className="text-blue-400 flex-shrink-0" />
                                <span className="text-lg text-slate-100">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Success Stories
                        </h2>
                        <p className="text-xl text-slate-600">
                            Real users who found their flats with our alerts
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all"
                            >
                                <div className='flex flex-row items-center justify-between'>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <BadgeCheck className="text-blue-500 mb-4" />
                                </div>
                                <p className="text-slate-800 mb-4 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t border-slate-200 pt-4">
                                    <div className="font-bold text-slate-700 flex flex-col gap-1">{testimonial.name}</div>
                                    <div className="text-sm text-slate-400">{testimonial.location}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800">
                        Ready to Setup Alerts?
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 mb-10">
                        Download NextFlat now and never miss your dream flat again!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href={APP_LINKS.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <span className="font-bold text-lg">Download for Android</span>
                        </a>

                        <a
                            href={APP_LINKS.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                            </svg>
                            <span className="font-bold text-lg">Download for iOS</span>
                        </a>
                    </div>

                    <p className="mt-8 text-slate-600">
                        🎉 No credit card required • Free forever • Setup in under 1 minute
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
