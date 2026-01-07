import type { Metadata, Viewport } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readex_pro = Readex_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-readex-pro',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nextflat.in"),
  title: {
    default: 'NextFlat - Shared Flats, Roommates & PGs without brokerage',
    template: "%s | NextFlat - Flats & Flatmates",
  },

  description:
    "Find Shared Flats, PGs & Flatmates without brokerage with our AI-powered platform. Connect directly with tenants and find flatmates, tenants, or shared spaces faster.",

  applicationName: "NextFlat",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "NextFlat",
    "flats for rent",
    "room for rent",
    "PG near me",
    "no brokerage flats",
    "rental homes",
    "flatmate finder",
    "house for rent",
    "property rental platform",
    "real estate listings India",
  ],

  authors: [{ name: "Vipin Joshi", url: "https://nextflat.in" }],
  creator: "NextFlat",
  publisher: "NextFlat",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
        alt: "NextFlat - Shared Flats, Roommates & PGs without brokerage",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@nextflat",
    creator: "@nextflat",
    title: "NextFlat - Shared Flats, Roommates & PGs without brokerage",
    description:
      "Find Shared Flats, PGs & Flatmates without brokerage with our AI-powered platform. Connect directly with tenants and find flatmates, tenants, or shared spaces faster.",
    images: ["https://nextflat.in/og/home.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${readex_pro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
