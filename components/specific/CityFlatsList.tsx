/* eslint-disable @next/next/no-img-element */

import { FaUser, FaUsers, FaHome, FaFemale, FaMale } from "react-icons/fa";
import { Check, Percent } from "lucide-react";

type Flat = {
  id: number;
  locality: string;
  type: string;
  rent_amount: string;
  security_amount: string;
  posted_at: string;
  user?: string;
  image: string;
  latitude?: number;
  longitude?: number;
  brokerage_applicable?: boolean;
  available_for: string;
};

interface FlatCardFlexProps {
  flats: Flat[];
  parentSlug: string;
  parentLabel: string;
  pagination?: boolean;
}

const getAvailabilityBadge = (availableFor: string) => {
  const badgeConfig: Record<string, { bgColor: string; icon: React.ReactNode; show: boolean }> = {
    Bachelors: {
      bgColor: "bg-black/80",
      icon: <FaUser className="h-3 w-3 text-white" />,
      show: true,
    },
    "Female Only": {
      bgColor: "bg-pink-700/80",
      icon: <FaFemale className="h-3 w-3 text-white" />,
      show: true,
    },
    "Male Only": {
      bgColor: "bg-blue-800/80",
      icon: <FaMale className="h-3 w-3 text-white" />,
      show: true,
    },
    Family: {
      bgColor: "bg-violet-600/80",
      icon: <FaHome className="h-3 w-3 text-white" />,
      show: false,
    },
    Everyone: {
      bgColor: "bg-orange-500/80",
      icon: <FaUsers className="h-3 w-3 text-white" />,
      show: true,
    },
    "Not Specified": {
      bgColor: "bg-transparent",
      icon: null,
      show: false,
    },
  };

  return badgeConfig[availableFor] || badgeConfig["Not Specified"];
};

const FlatCard = ({ item }: { item: Flat }) => {
  const badge = getAvailabilityBadge(item.available_for);

  return (
    <a
      href={"/post/" + item.id}
      className="relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={"https://v1apinffk.svc.nextflat.in/api" + item.image.replace("_lg.webp", "_sm.webp")}
          alt=""
          className="h-full w-full object-cover"
        />

        {/* Availability Badge */}
        {badge.show && (
          <div className={`absolute top-2 right-2 flex gap-1 items-center justify-center rounded-full ${badge.bgColor} text-white text-[10px] py-1 px-2 shadow`}>
            {badge.icon} {item.available_for}
          </div>
        )}

        {/* Brokerage Badge (bottom-left) */}
        {typeof item.brokerage_applicable === "boolean" && (
          <div className="absolute bottom-2 left-2">
            {item.brokerage_applicable ? (
              <div className="flex items-center gap-1 rounded-full bg-gray-900/80 px-2 py-1 text-[10px] text-orange-300">
                <Percent className="h-3 w-3" /> Brokerage
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full bg-gray-900/80 px-2 py-1 text-[10px] text-white">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-2 w-2" />
                </div>
                No Brokerage
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        {/* Locality */}
        <p className="text-xs text-slate-500">📍 {item.locality}</p>
        {/* Type + Rent */}
        <div className="flex flex-col">
          <h6 className="text-xl font-semibold text-slate-800">{item.type}</h6>
          <p className="text-md font-bold text-slate-700">
            ₹ {item.rent_amount}
          </p>
        </div>

        {/* Short description */}
        <h2 className="text-xs text-slate-600">
          {item.type} for rent in {item.locality}
        </h2>
        {/* Posted info */}
        <p className="text-[10px] text-slate-400 mt-2">
          Posted by {item.user || "—"} • {item.posted_at}
        </p>
      </div>
    </a>
  );
};

export default function CityFlatsList({ flats }: { flats: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 p-3 md:p-6">
      {flats.map((flat) => (
        <FlatCard key={flat.id} item={flat} />
      ))}
    </div>
  );
}
