"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, Search, PlusCircle, Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchBar from "./specific/SearchBar";

const NAV_LINKS = [
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/search", label: "Search Flats", icon: Search },
  { href: "/post/create", label: "Create Listing", icon: PlusCircle },
  { href: "/alerts/create", label: "Setup Alerts", icon: Bell },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md w-full border-b border-slate-100">
      <header className="w-full max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center gap-3 relative">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold md:flex shrink-0">
          <Image
            src="/logo.svg"
            alt="NextFlat Logo"
            className="hidden md:block mr-4"
            width={120}
            height={28}
          />
          <Image
            src="/logo-tp.svg"
            className="md:hidden"
            alt="NextFlat Logo"
            width={36}
            height={36}
          />
        </Link>

        {/* Searchbar takes full remaining width, hidden on homepage */}
        <div className={`flex-1 min-w-0 transition-all duration-300 ${isHomePage ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}>
          <SearchBar />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1 text-slate-700 font-medium ml-auto">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-full transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors shrink-0"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Popdown menu (absolute, overlays content) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 100%)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-blue-50/50 active:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-50 text-slate-500 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {item.icon && <item.icon size={20} className="stroke-[2.5px]" />}
                      </div>
                      <span className="text-lg font-medium text-slate-700 group-hover:text-slate-900">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 px-4"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white text-center">
                  <p className="font-medium mb-1">Need help?</p>
                  <p className="text-sm text-blue-100 mb-3">Check our guide for tenants</p>
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Visit Blog
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

