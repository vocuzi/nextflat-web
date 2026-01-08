import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, SearchIcon, PlusIcon, CheckCircle2 } from "lucide-react";
import ContactForm from "@/components/specific/ContactForm";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Contact Us - NextFlat",
    description: "Get in touch with NextFlat. We're here to help with any questions about finding flats, flatmates, or listing your property.",
    openGraph: {
        title: "Contact Us - NextFlat",
        description: "Get in touch with NextFlat. We're here to help with any questions.",
        url: "https://nextflat.in/contact",
    },
};

const contactMethods = [
    {
        icon: <Mail className="w-6 h-6" />,
        title: "Email Us",
        description: "Our team typically responds within an hour",
        contact: "info@nextflat.in",
        href: "mailto:info@nextflat.in",
    },
    {
        icon: <Phone className="w-6 h-6" />,
        title: "Call/WhatsApp Us",
        description: "Mon-Sat, 9 AM - 9 PM IST",
        contact: "+91 63950 84665",
        href: "tel:+916395084665",
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        title: "Business Hours",
        description: "Mon-Sat, 9 AM - 9 PM IST",
        contact: "",
        href: "",
    },
];

const faqs = [
    {
        question: "How do I list my property?",
        answer: "Click on 'Create Listing' in the navigation menu and fill out the form with your property details. It's completely free!",
    },
    {
        question: "Is NextFlat really broker-free?",
        answer: "Yes! We connect you directly with property owners and seekers. No brokers, no commission, no hidden fees.",
    },
    {
        question: "How are listings verified?",
        answer: "Our team manually reviews every listing and user profile to ensure authenticity and safety.",
    },
    {
        question: "Can I search for flatmates only?",
        answer: "Absolutely! Use our advanced filters to search specifically for flatmates in your preferred location.",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Hero Section */}
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
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <MessageSquare className="w-4 h-4" />
                            We're Here to Help
                        </div>
                        <h1 className="text-5xl mt-8 md:text-6xl font-bold tracking-tighter text-slate-900 mb-6 flex flex-col justify-center gap-y-2">
                            <span className="font-semibold text-5xl tracking-normal text-slate-600">Got questions? </span>
                            <span className="min-w-[11ch] text-center inline-block">
                                Get in touch with us
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Whether you're looking for a flat, a flatmate, or listing your property, we're here to support you every step of the way.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fast Response</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 Support</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Community Focused</span>
                        </div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.href}
                                    target={method.href.startsWith('http') ? '_blank' : undefined}
                                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition group"
                                >
                                    <div className="w-14 h-14 mb-6 rounded-full bg-green-300 text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        {method.description}
                                    </p>
                                    <p className="text-green-600 font-semibold group-hover:text-green-700">
                                        {method.contact}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="relative py-24 min-h-96 w-full bg-black text-white overflow-hidden">
                    {/* Background gradient */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 100%), #000000",
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 w-full mx-auto px-6 text-center">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                            Ready to find your next home?
                        </h2>

                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of others finding their perfect shared flats and flatmates on NextFlat.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/search"
                                className="px-8 py-3 flex flex-row items-center justify-center gap-2 bg-white text-slate-900 font-semibold rounded-xl shadow hover:bg-blue-50 transition"
                            >
                                <SearchIcon />
                                Search Flat
                            </a>

                            <a
                                href="/post/create"
                                className="px-8 py-3 flex flex-row items-center justify-center gap-2 bg-green-300 text-slate-900 font-semibold rounded-xl border border-white/20 hover:bg-green-400 transition"
                            >
                                <PlusIcon />
                                List Your Flat
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
