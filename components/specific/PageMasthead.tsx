'use client';

import { NfBtn } from "../generic/buttons/Btn";
import { BellPlus, HousePlus, Search } from "lucide-react";
import { HiMiniHome } from "react-icons/hi2";
import Link from "next/link";
import { PageMetadata } from "@/lib/api";
import AppOnlyFeatureModal from "@/components/modals/AppOnlyFeatureModal";
import { useState } from "react";

interface PageMastheadProps {
  city: {
    name: string;
    slug: string;
    code: string;
  };
  pageMetadata: PageMetadata | null;
}

export default function PageMasthead({ city, pageMetadata }: PageMastheadProps) {
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [showPostListingModal, setShowPostListingModal] = useState(false);

  const title = pageMetadata?.page_title || `Flats and Flatmates in ${city.name}`;
  const description = pageMetadata?.page_desc || `Find Shared Flats, Individual Rooms and Flatmates in ${city.name}. Find your Next Flat with NextFlat!`;
  const tgGroup = pageMetadata?.tg_group;

  return (
    <>
      <section className="grid grid-cols-1 mx-3">
        <div className="bg-green-300 border border-green-300 text-slate-900 p-6 flex flex-col rounded-lg">
          <div className="flex">
            <div className="px-4 bg-slate-800/10 rounded-md p-2 flex flex-row gap-1 text-slate-500 items-center justify-start text-xs mb-6">
              <HiMiniHome className="text-slate-800 text-lg" />
              {"/"}
              <Link href="/flats" className="text-slate-800 text-sm">Flats</Link>
              {"/"}
              <Link href={`/flats/${city.slug}`} className="text-slate-800 text-sm">{city.name}</Link>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{title}</h1>
          <p className="max-w-2xl text-slate-700">
            {description}
          </p>
          <div className="flex flex-col md:flex-row gap-2 justify-start mt-6">
            <NfBtn
              size={'sm'}
              icon={<BellPlus size={18} className="text-green-300" />}
              onClick={() => setShowWhatsappModal(true)}
            >
              Setup Whatsapp Alerts
            </NfBtn>
            <NfBtn
              size={'sm'}
              variant={'outline'}
              icon={<HousePlus size={20} />}
              className="bg-slate-900/5"
              onClick={() => setShowPostListingModal(true)}
            >
              Post Your Listing
            </NfBtn>
          </div>
        </div>
      </section>

      {/* WhatsApp Alerts Modal */}
      <AppOnlyFeatureModal
        isOpen={showWhatsappModal}
        onClose={() => setShowWhatsappModal(false)}
        featureName="WhatsApp alerts"
        featureDescription="Setup instant WhatsApp alerts for new listings. Download our app to get"
      />

      {/* Post Listing Modal */}
      <AppOnlyFeatureModal
        isOpen={showPostListingModal}
        onClose={() => setShowPostListingModal(false)}
        featureName="listing posting"
        featureDescription="Post your flat listing and reach thousands of potential tenants. Download our app to enable"
      />
    </>
  );
}
