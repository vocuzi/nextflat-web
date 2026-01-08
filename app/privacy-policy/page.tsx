
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, Database, Search, Users, AlertTriangle, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Hero section */}
                <section className="relative overflow-hidden px-4 pt-16 pb-12 bg-slate-50">
                    <div
                        aria-hidden="true"
                        className="
                          absolute
                          left-1/2 top-0
                          -translate-x-1/2
                          w-[60vw] h-[40vw]
                          max-w-[800px]
                          rounded-full
                          bg-gradient-to-b from-green-100/50 to-transparent
                          opacity-60
                          blur-3xl
                          pointer-events-none
                        "
                    />
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm border border-slate-100"
                        >
                            <Shield className="w-4 h-4 text-green-600" />
                            Privacy
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6"
                        >
                            Privacy Policy
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
                        >
                            NextFlat ("we", "our", "us") values your privacy. This Privacy Policy explains how we collect, use, store, and share information when you use our website and mobile application (the "Platform").
                        </motion.p>
                    </div>
                </section>

                <section className="py-16 md:py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-slate max-w-none">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12 bg-slate-50 p-6 rounded-2xl border border-slate-100"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-green-600" />
                                    1. Introduction
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Your privacy is critically important to us. NextFlat aggregates rental listings from publicly accessible sources and direct user submissions. We also source listings through offline brokers and agents. Information aggregated from public channels is already publicly visible and accessible to anyone online.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Database className="w-6 h-6 text-green-600" />
                                    2. Information We Collect
                                </h2>

                                <div className="space-y-6">
                                    <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">A. Information You Provide</h3>
                                        <ul className="list-disc pl-6 text-slate-600 space-y-1">
                                            <li>Name, phone number, profile photo</li>
                                            <li>Your flat or PG listings, including photos, rent, description, and location</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">B. Information We Automatically Collect</h3>
                                        <ul className="list-disc pl-6 text-slate-600 space-y-1">
                                            <li>Device information, analytics, logs</li>
                                            <li>Searches, interactions, and usage patterns</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">C. Publicly Available Data (Aggregated or Imported)</h3>
                                        <p className="text-slate-600 mb-2 italic">We display data from public internet sources including:</p>
                                        <ul className="list-disc pl-6 text-slate-600 space-y-1">
                                            <li>Websites or forums that allow public access</li>
                                            <li>Offline brokers and agents</li>
                                        </ul>
                                        <p className="mt-2 text-sm text-slate-500">
                                            Such data may include phone numbers, images, property descriptions, usernames, and other information publicly posted by third parties.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Eye className="w-6 h-6 text-green-600" />
                                    3. How We Use Information
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    We use information to operate the Platform, display listings, improve recommendations, enhance safety, detect fraud, and comply with legal requirements.
                                </p>
                                <p className="text-slate-600 font-medium">We do not validate or guarantee the accuracy of aggregated information.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-green-600" />
                                    4. Sharing of Information
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    We may share data with:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>Users interacting with each other on the Platform</li>
                                    <li>Authorities, when legally required</li>
                                </ul>
                                <p className="mt-4 text-slate-500 text-sm">
                                    We are not responsible for how third parties reuse aggregated public data, as such data originates from publicly available sources beyond our control.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12 p-6 bg-amber-50 rounded-2xl border border-amber-100"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                                    5. Public Data Disclaimer
                                </h2>
                                <p className="text-slate-700 mb-4 italic">Because NextFlat displays publicly posted listings:</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>We do not verify ownership or accuracy of aggregated content</li>
                                    <li>We are not liable for any damages arising from use of public data</li>
                                    <li>We do not endorse any listing or user</li>
                                    <li>We may remove content upon valid request</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Lock className="w-6 h-6 text-green-600" />
                                    6. Data Security
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We implement industry-standard security measures, but no system is completely secure.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-green-600" />
                                    7. Your Rights
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    You may request access, correction, or deletion of your account information.
                                </p>
                                <p className="text-slate-600 italic">For aggregated public data, removal is considered only if:</p>
                                <ul className="list-disc pl-6 space-y-1 text-slate-600 mt-2">
                                    <li>You are the original poster</li>
                                    <li>The original content has been removed from its source</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    8. Changes to This Policy
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We may update this Policy. Continued use of the Platform constitutes acceptance.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="p-8 bg-slate-900 text-white rounded-2xl text-center"
                            >
                                <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                                    <Mail className="w-5 h-5 text-green-400" />
                                    9. Contact Us
                                </h3>
                                <p className="text-slate-300 mb-6 font-medium">If you have questions, contact us at info@nextflat.in.</p>
                                <a href="mailto:info@nextflat.in" className="inline-block px-6 py-2 bg-green-400 text-slate-900 font-bold rounded-lg hover:bg-green-500 transition">
                                    Email Privacy Team
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
