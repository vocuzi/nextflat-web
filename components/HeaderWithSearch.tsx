"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./specific/SearchBar";

const NAV_LINKS = [
  { href: "/", label: "Blog" },
  { href: "/rent", label: "Search Flats" },
  { href: "/post/create", label: "Create Listing" },
  { href: "/alerts/create", label: "Setup Alerts" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white w-full max-w-7xl mx-auto">
      <header className="w-full bg-white px-4 py-4 md:py-6 flex items-center gap-3 relative">

        {/* Mobile Logo */}
        <Link href="/" className="text-xl font-bold md:flex shrink-0">
          <Image
            src="/logo.svg"
            alt="NextFlat Logo"
            className="hidden md:block mr-4"
            width={120}
            height={28}
          />
          <Image
            src="/logo-wb-512.png"
            className="md:hidden"
            alt="NextFlat Logo"
            width={42}
            height={42}
          />
        </Link>

        {/* Searchbar takes full remaining width */}
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 text-slate-700 font-medium ml-auto">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 shrink-0">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Popdown menu (absolute, overlays content — does NOT push layout) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b px-4 py-4 space-y-4 z-50"
          >
            {NAV_LINKS.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-lg font-medium text-slate-700"
    >
      {label}
    </Link>
  );
}
