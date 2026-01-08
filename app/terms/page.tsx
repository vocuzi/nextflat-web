
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Scale, FileText, Globe, UserCheck, ShieldAlert, AlertCircle, Trash2, Edit3, XCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                            <Scale className="w-4 h-4 text-green-600" />
                            Legal
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6"
                        >
                            Terms and Conditions
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-600 max-w-2xl mx-auto"
                        >
                            Please read these terms carefully before using NextFlat.
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
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Info className="w-6 h-6 text-green-600" />
                                    1. Introduction
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    These Terms govern your use of NextFlat (“the Platform”). By accessing or using the Platform, you agree to be bound by these Terms. If you disagree with any part, please discontinue use.
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
                                    <FileText className="w-6 h-6 text-green-600" />
                                    2. Services Provided
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    NextFlat provides a discovery platform for rental listings including flats, PGs, and roommates. We are not a broker, agent, property owner, or legal representative. We do not inspect properties and do not guarantee listing accuracy.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12 p-6 bg-green-50 rounded-2xl border border-green-100"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Globe className="w-6 h-6 text-green-600" />
                                    3. Public Data & Aggregated Content
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    The Platform displays listings sourced from:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                                    <li>Publicly accessible websites</li>
                                    <li>Offline brokers and real estate agents</li>
                                    <li>Direct user uploads</li>
                                </ul>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    Because these sources are public:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>We do not own this content</li>
                                    <li>We cannot guarantee accuracy or completeness</li>
                                    <li>We are not responsible for aggregated phone numbers, images, or descriptions</li>
                                    <li>We are not legally liable for damages from reliance on such data</li>
                                </ul>
                                <p className="mt-4 text-sm text-slate-500 italic">
                                    To request removal of aggregated content, you must prove you are the original poster and that the original content has been deleted from its source.
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
                                    <UserCheck className="w-6 h-6 text-green-600" />
                                    4. User Accounts
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    You agree to provide accurate and updated information. You are responsible for maintaining account security and all activity under your account.
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
                                    <ShieldAlert className="w-6 h-6 text-green-600" />
                                    5. User Conduct
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">You agree not to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>Post false or misleading listings</li>
                                    <li>Harass or abuse other users</li>
                                    <li>Use the Platform for illegal purposes</li>
                                    <li>Scrape or harvest data from the Platform</li>
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
                                    <Edit3 className="w-6 h-6 text-green-600" />
                                    6. Content Rights
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Users uploading content grant NextFlat a non-exclusive license to display and distribute such content. For aggregated public content, ownership remains with the original poster.
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
                                    <AlertCircle className="w-6 h-6 text-green-600" />
                                    7. Limitation of Liability
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">NextFlat is not liable for:</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>Financial loss or fraud arising from aggregated listings</li>
                                    <li>Misrepresentation by third parties</li>
                                    <li>Inaccurate or outdated listing data</li>
                                    <li>Disputes between users</li>
                                    <li>Indirect or consequential damages</li>
                                </ul>
                                <p className="mt-4 text-slate-600 font-semibold">The Platform is provided 'as-is' without warranties of any kind.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    8. Indemnification
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    You agree to indemnify and hold NextFlat harmless from claims arising out of:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li>Your posts or uploads</li>
                                    <li>Your interactions with other users</li>
                                    <li>Your use of aggregated/public data</li>
                                    <li>Your violation of these Terms</li>
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
                                    <XCircle className="w-6 h-6 text-green-600" />
                                    9. Termination
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We may suspend or terminate your access for violating these Terms or for any harmful activities.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    10. Changes to Terms
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We may modify these Terms at any time. Continued use of the Platform constitutes acceptance of new Terms.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="p-8 bg-slate-900 text-white rounded-2xl text-center"
                            >
                                <h3 className="text-xl font-bold mb-2">11. Contact Us</h3>
                                <p className="text-slate-300 mb-6">For questions, contact us at info@nextflat.in.</p>
                                <a href="mailto:info@nextflat.in" className="inline-block px-6 py-2 bg-green-400 text-slate-900 font-bold rounded-lg hover:bg-green-500 transition">
                                    Contact Support
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
