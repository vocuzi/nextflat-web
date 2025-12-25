import type { FC } from "react";
import activeCities from "@/data/EnabledFeatures";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CityCardProps = {
  city: string;
  count: string;
  bgImage: string;
  slug: string;
};

const CityCard: FC<CityCardProps> = ({ city, count, bgImage, slug }) => {
  return (
    <Link
      href={"/flats/" + slug}
      className="group relative block w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="aspect-[3/4] w-full relative">
        <Image
          src={bgImage}
          alt={`Flats in ${city}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <h3 className="text-xl font-bold tracking-tight mb-1">{city}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              {count} listings
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <ArrowRight size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FlatCardGrid: FC = () => {
  const cities = activeCities;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {cities.map((item, index) => (
        <CityCard
          key={index}
          city={item.name}
          count={item.count}
          bgImage={item.img}
          slug={item.slug}
        />
      ))}
    </div>
  );
};

export default FlatCardGrid;
