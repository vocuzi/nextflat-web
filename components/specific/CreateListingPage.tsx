'use client';

import {
    Zap,
    Eye,
    Clock,
    TrendingUp,
    CheckCircle2,
    Users,
    Shield,
    Star,
    ArrowRight,
    BadgeCheck
} from 'lucide-react';
import Header from "@/components/HeaderWithSearch";
import Footer from "@/components/Footer";
import Image from 'next/image';

export default function CreateListingPage() {
    const stats = [
        { value: "90,000+", label: "Flats Listed", icon: TrendingUp },
        { value: "50,000+", label: "Monthly Visitors", icon: Users },
        { value: "7 Days", label: "Avg. Time to Find Tenant", icon: Clock },
        { value: "95%", label: "Success Rate", icon: Star },
    ];

    const features = [
        {
            icon: Zap,
            title: "Quick & Easy Posting",
            description: "Create your flat listing in under 2 minutes with our intuitive mobile app interface.",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: Eye,
            title: "Track Your Views",
            description: "See real-time analytics on how many people viewed your listing and showed interest.",
            color: "from-blue-400 to-cyan-500"
        },
        {
            icon: Clock,
            title: "Find Tenants Fast",
            description: "Most of our posters find quality tenants within a week. Get instant notifications for inquiries.",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: Shield,
            title: "Zero Brokerage Option",
            description: "Mark your listing as 'No Brokerage' to attract more genuine tenants directly.",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: Users,
            title: "Verified Tenants",
            description: "Connect with verified users who are actively looking for flats in your area.",
            color: "from-red-400 to-rose-500"
        },
        {
            icon: CheckCircle2,
            title: "Free Forever",
            description: "Post unlimited listings absolutely free. No hidden charges, no premium plans required.",
            color: "from-indigo-400 to-blue-500"
        },
    ];

    const testimonials = [
        {
            name: "Janhavi D.",
            location: "Mumbai",
            text: "NextFlat helped me find a tenant in just 4 days, without any charges! It was so easy to post and manage my listing. Thanks!",
            rating: 5
        },
        {
            name: "Praveen Y.",
            location: "Gurugram",
            text: "This was so delightful to use. I posted my listing and started receiving calls the very next day. Highly recommend NextFlat to all home owners out there.",
            rating: 5
        },
        {
            name: "Ayush A.",
            location: "Bengaluru",
            text: "Awesome app! I was not expecting much since it was a free listing, but it helped me get so many interested contacts.",
            rating: 5
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
            <div className='max-w-7xl mx-auto'>
                <Header />
            </div>

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
                            List Your Flat or PG,
                            <br />
                            <span className="bg-gradient-to-r font-bold from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                Find Tenants Fast
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 mb-3 max-w-3xl mx-auto">
                            Download NextFlat app, and start listing your flat or PG for free.
                        </p>
                        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
                            Join 1000+ of home-owners and tenants who found their perfect tenants/flatmates in days, not months.
                        </p>

                        {/* App Store Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-6">
                            <a
                                href="https://play.google.com/store/apps/details?id=in.nextflat.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-4 justify-center py-2 bg-white hover:bg-green-50 text-slate-900 rounded-xl transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
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
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-4 justify-center py-2 bg-white hover:bg-green-50 text-slate-900 rounded-xl transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto"
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
                            ✨ Trusted by 10,000+ tenants and home-owners across India
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
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-3">
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

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <div className='rounded-full bg-slate-900 font-bold text-xs mb-6 text-white px-4 py-1.5 flex items-center justify-center gap-2'>
                            <BadgeCheck className='text-green-300' />
                            NextFlat for Home-Owners</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Why Choose NextFlat?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Everything you need to list your property and find the perfect tenant, all in one powerful app.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-green-200 hover:-translate-y-1"
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

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-slate-300">
                            Real stories from real property owners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/95 transition-all"
                            >
                                <div className='flex flex-row items-center justify-between'>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <BadgeCheck className="text-green-500 mb-4" />
                                </div>
                                <p className="text-slate-800 mb-4 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t border-white/20 pt-4">
                                    <div className="font-bold text-slate-700 flex flex-col gap-1"> {testimonial.name}</div>
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
                        Ready to List Your Flat?
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 mb-10">
                        Download the NextFlat app now and get your listing live in minutes!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://play.google.com/store/apps/details?id=in.nextflat.app"
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
                            href="https://apps.apple.com"
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
                        🎉 No credit card required • Free forever • Start posting in 2 minutes
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}
