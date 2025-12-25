import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Smartphone } from "lucide-react";
import { FaAppStore } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-white pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
              <Image src={"/logo.svg"} alt="NextFlat Logo" width={120} height={28} />
            </Link>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              Experience the modern way of shared living. Verified listings, AI-powered matches, and zero brokerage.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-slate-900">Discover</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/search" className="hover:text-slate-900 transition-colors">Search Flats</Link></li>
              <li><Link href="/post/create" className="hover:text-slate-900 transition-colors">List Your Space</Link></li>
              <li><Link href="/find-flatmate" className="hover:text-slate-900 transition-colors">Find Flatmates</Link></li>
              <li><Link href="/cities" className="hover:text-slate-900 transition-colors">All Cities</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-slate-900">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-slate-900 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-slate-900 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-slate-900">Get the App</h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left w-fit">
                <FaAppStore size={20} />
                <div className="leading-none">
                  <div className="text-[9px] uppercase font-bold text-slate-400">Download on</div>
                  <div className="text-xs font-bold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-slate-100 text-slate-900 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors text-left w-fit">
                <FaGooglePlay size={20} />
                <div className="leading-none">
                  <div className="text-[9px] uppercase font-bold text-slate-500">Get it on</div>
                  <div className="text-xs font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} NextFlat.in. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-600">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600">Terms</Link>
            <Link href="/sitemap" className="hover:text-slate-600">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="hover:text-slate-800 transition-colors">
      {label}
    </a>
  );
}
