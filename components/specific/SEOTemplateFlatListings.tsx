"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Key, 
  Lightbulb, 
  Users, 
  HelpCircle, 
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Send
} from "lucide-react";

const tabs = [
  { id: "Overview", label: "Overview", icon: LayoutDashboard },
  { id: "Key Aspects", label: "Key Aspects", icon: Key },
  { id: "Things to Know", label: "Things to Know", icon: Lightbulb },
  { id: "Community Groups", label: "Community Groups", icon: Users },
  { id: "FAQs", label: "FAQs", icon: HelpCircle },
];

export default function TabbedSEOText({ city = "Bengaluru", dateUpdated }: { city?: string, dateUpdated?: string }) {
  const [active, setActive] = useState("Overview");

  return (
    <div className="w-full my-8 px-4 max-w-5xl mx-auto">
      
      {/* ─────────── Tabs Navigation ─────────── */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-full border border-slate-200 overflow-x-auto max-w-full no-scrollbar">
          {tabs.map((t) => {
            const isActive = active === t.id;
            const Icon = t.icon;

            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`
                  relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-500
                  ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}
                `}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-200/60"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                  <Icon size={16} className={isActive ? "text-green-600" : "text-slate-400"} />
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────── Animated Content Wrapper ─────────── */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm"
          >
            {/* OVERVIEW */}
            {active === "Overview" && (
              <div className="space-y-6 max-w-3xl mx-auto text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Updated {dateUpdated}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Find your perfect space in <span className="text-green-600">{city}</span>
                </h3>
                
                <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                  <p>
                    Looking for a flat or flatmate in <strong>{city}</strong>? 
                    You&apos;re in the right place. At NextFlat.in, we make flat and flatmate hunting simple — 
                    no outdated listings.
                  </p>
                  <p>
                    Our listings are verified and fresh, ensuring you don't waste time on unavailable properties.
                    Whether you are a student, a working professional, or moving in with friends, we have options for everyone.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <CheckCircle2 size={18} className="text-green-500" />
                    Verified Listings
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <CheckCircle2 size={18} className="text-green-500" />
                    Zero Brokerage Options
                  </div>
                </div>
              </div>
            )}

            {/* KEY ASPECTS */}
            {active === "Key Aspects" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-green-500" />
                    Top Locations
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Koramangala, HSR Layout, Indiranagar",
                      "Whitefield, Electronic City (IT Hubs)",
                      "Hebbal and BTM Layout",
                      "Yelahanka (Student Friendly)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Lightbulb size={20} className="text-amber-500" />
                    Lifestyle & Commute
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Excellent metro & BMTC connectivity",
                      "Easy access to Ola/Uber/Rapido",
                      "Major IT companies (Infosys, Wipro, etc.)",
                      "Vibrant nightlife and weekend spots"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 bg-green-50/50 p-6 rounded-2xl border border-green-100">
                  <h4 className="font-semibold text-slate-900 mb-4">Housing Types</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { title: "Shared Flats", desc: "Split rent & utilities" },
                      { title: "Gated Societies", desc: "Gym, pool & security" },
                      { title: "Independent", desc: "More privacy & space" }
                    ].map((type, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
                        <p className="font-medium text-slate-900">{type.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* THINGS TO KNOW */}
            {active === "Things to Know" && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {[
                    { title: "Rental Agreements", desc: "Standard 11 months. Security deposit usually 2-6 months rent." },
                    { title: "Brokerage", desc: "Standard brokerage is 1 month rent. Negotiable in some cases." },
                    { title: "Hidden Costs", desc: "Watch out for maintenance fees, society charges, and parking fees." },
                    { title: "Peak Season", desc: "Rents spike during June–August due to college admissions and job joinings." },
                    { title: "Verification", desc: "Many societies require police verification for tenants." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="font-medium text-slate-900">{item.title}</h5>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COMMUNITY GROUPS */}
            {active === "Community Groups" && (
              <div className="text-center max-w-2xl mx-auto py-4">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Join the Community</h3>
                  <p className="text-slate-600 mt-2">
                    Connect with thousands of flatmates in {city}. We post verified listings daily.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="group flex items-center justify-between p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="text-[#25D366]" />
                      <div className="text-left">
                        <p className="font-semibold text-slate-900">WhatsApp Group</p>
                        <p className="text-xs text-slate-600">Daily updates</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-[#25D366] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>

                  <a
                    href="#"
                    className="group flex items-center justify-between p-4 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/20 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Send className="text-[#0088cc]" />
                      <div className="text-left">
                        <p className="font-semibold text-slate-900">Telegram Channel</p>
                        <p className="text-xs text-slate-600">Instant alerts</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-[#0088cc] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </div>
              </div>
            )}

            {/* FAQS */}
            {active === "FAQs" && (
              <div className="grid gap-3">
                {[
                  "What is the usual rent for flat sharing?",
                  "Which areas are best for students?",
                  "Which areas are best for IT professionals?",
                  "Do I need a broker to find a flat?",
                  "How much security deposit is normal?",
                ].map((q, i) => (
                  <details key={i} className="group border border-slate-200 rounded-xl bg-slate-50/50 open:bg-white open:shadow-sm transition-all duration-200">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 list-none">
                      {q}
                      <span className="transition-transform group-open:rotate-180">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                      Answer content for &quot;{q}&quot; goes here. This can be dynamically populated based on the city data.
                    </div>
                  </details>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
