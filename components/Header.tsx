"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Blog" },
  { href: "/search", label: "Search Flats" },
  { href: "/post/create", label: "Create Listing" },
  { href: "/alerts/create", label: "Setup Alerts" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white w-full max-w-7xl mx-auto">
      <header className="w-full bg-white px-4 py-6 flex items-center justify-between relative">

        {/* LOGO CENTERED */}
        <Link
          href="/"
          className="text-xl font-bold mx-auto md:mx-0 md:order-1 md:flex"
        >
          <Image src="/logo.svg" alt="NextFlat Logo" width={120} height={28} />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-4 text-slate-700 font-medium md:order-2 ml-auto">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 absolute right-4 top-1/2 -translate-y-1/2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* OVERLAY MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden 
              absolute 
              top-full 
              left-0 
              w-full 
              bg-white 
              shadow-xl 
              border-b 
              px-4 
              py-4 
              space-y-4 
              z-50
            "
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
