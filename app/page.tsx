import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FlatCardGrid from "@/components/specific/FlatCardGrid";
import HomeMasthead from "@/components/specific/HomeMasthead";
import AppFeatures from "@/components/specific/AppFeatures";
import StatsMinimal from "@/components/specific/StatsMinimal";
import AppDownloadCta from "@/components/specific/AppDownloadCta";
import FindFasterSection from "@/components/specific/FindFasterSection";
import AlertsSection from "@/components/specific/AlertsSection";
import TestimonialsSection from "@/components/specific/TestimonialsSection";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: {
    default: 'NextFlat - Shared Flats, Roommates & PGs without brokerage',
    template: "%s | NextFlat",
  },

  description:
    "Find Shared Flats, PGs & Flatmates without brokerage with our AI-powered platform. Connect directly with tenants and find flatmates, tenants, or shared spaces faster.",

  keywords: [
    "NextFlat",
    "flats for rent",
    "room for rent",
    "PG near me",
    "no brokerage flats",
    "rental homes",
    "flat for rent in India",
    "flatmate finder",
    "roommates",
    "house for rent",
    "apartment rental platform",
    "real estate marketplace",
    "rent without broker",
    "find flats online",
  ],

  authors: [{ name: "NextFlat.in", url: "https://nextflat.in" }],
  creator: "NextFlat",
  publisher: "NextFlat",

  applicationName: "NextFlat.in",
  category: "Real Estate",

  metadataBase: new URL("https://nextflat.in"),

  alternates: {
    canonical: "https://nextflat.in",
  },

  openGraph: {
    title: "NextFlat - Shared Flats, Roommates & PGs without brokerage",
    description:
      "Find Shared Flats, PGs & Flatmates without brokerage with our AI-powered platform. Connect directly with tenants and find flatmates, tenants, or shared spaces faster.",
    url: "https://nextflat.in",
    siteName: "NextFlat",
    images: [
      {
        url: "https://nextflat.in/og/home.png",
        width: 1200,
        height: 630,
        alt: "NextFlat - Find Flats Without Brokerage",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NextFlat - Shared Flats, Roommates & PGs without brokerage",
    description:
      "Find Shared Flats, PGs & Flatmates without brokerage with our AI-powered platform. Connect directly with tenants and find flatmates, tenants, or shared spaces faster.",
    images: ["https://nextflat.in/og/home.png"],
    creator: "@nextflat_in",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};



export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col gap-0 pb-12">
        <HomeMasthead />

        <StatsMinimal />

        <FindFasterSection />

        <div className="max-w-7xl mx-auto w-full px-4 py-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Cities</h2>
            <a href="/cities" className="text-slate-500 font-medium hover:text-slate-900 text-sm">View all</a>
          </div>
          <FlatCardGrid />
        </div>

        <AppFeatures />

        <AlertsSection />

        <TestimonialsSection />

        <AppDownloadCta />
      </main>
      <Footer />
    </div>
  );
}
