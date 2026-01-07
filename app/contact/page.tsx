import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from "lucide-react";
import ContactForm from "@/components/specific/ContactForm";

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
        description: "Our team typically responds within 24 hours",
        contact: "support@nextflat.in",
        href: "mailto:support@nextflat.in",
    },
    {
        icon: <Phone className="w-6 h-6" />,
        title: "Call Us",
        description: "Mon-Sat, 9 AM - 6 PM IST",
        contact: "+91 98765 43210",
        href: "tel:+919876543210",
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        title: "Visit Us",
        description: "Our office in Bangalore",
        contact: "Koramangala, Bangalore 560034",
        href: "https://maps.google.com",
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
                <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 sm:py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <MessageSquare className="w-4 h-4" />
                            We're Here to Help
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-16 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.href}
                                    target={method.href.startsWith('http') ? '_blank' : undefined}
                                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-3">
                                        {method.description}
                                    </p>
                                    <p className="text-blue-600 font-semibold group-hover:text-blue-700">
                                        {method.contact}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Form */}
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                    Send Us a Message
                                </h2>
                                <p className="text-lg text-slate-600 mb-8">
                                    Fill out the form below and our team will get back to you within 24 hours.
                                </p>
                                <ContactForm />
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                                Business Hours
                                            </h3>
                                            <div className="space-y-2 text-slate-600">
                                                <p className="flex justify-between">
                                                    <span className="font-medium">Monday - Friday:</span>
                                                    <span>9:00 AM - 6:00 PM</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span className="font-medium">Saturday:</span>
                                                    <span>10:00 AM - 4:00 PM</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span className="font-medium">Sunday:</span>
                                                    <span className="text-slate-400">Closed</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        <strong>Note:</strong> We respond to all inquiries within 24 business hours. For urgent matters, please call us directly.
                                    </p>
                                </div>

                                {/* FAQ Section */}
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-4">
                                        {faqs.map((faq, index) => (
                                            <details
                                                key={index}
                                                className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
                                            >
                                                <summary className="cursor-pointer p-5 font-semibold text-slate-900 hover:bg-slate-100 transition-colors list-none flex items-center justify-between">
                                                    <span>{faq.question}</span>
                                                    <svg
                                                        className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </summary>
                                                <div className="px-5 pb-5 pt-2 text-slate-600 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white">
                                    <h3 className="text-xl font-bold mb-4">
                                        Connect With Us
                                    </h3>
                                    <p className="text-slate-300 mb-6">
                                        Follow us on social media for updates, tips, and community stories.
                                    </p>
                                    <div className="flex gap-3">
                                        <a
                                            href="#"
                                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                            aria-label="Twitter"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section (Optional) */}
                <section className="py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                            <div className="aspect-[21/9] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                    <p className="text-slate-600 font-medium">
                                        Map integration coming soon
                                    </p>
                                    <p className="text-sm text-slate-500 mt-2">
                                        Koramangala, Bangalore 560034
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
