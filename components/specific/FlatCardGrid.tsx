import type { FC } from "react";
import activeCities from "@/data/EnabledFeatures";

type CityCardProps = {
  city: string;
  count: string;
  bgImage: string;
  slug: string;
};

const CityCard: FC<CityCardProps> = ({ city, count, bgImage, slug }) => {
  return (
    <a
      className={
        `bg-[url('` +
        bgImage +
        `')] m-2 inline-block w-40 overflow-hidden rounded rounded-md bg-cover shadow-lg md:m-4 md:w-48`
      }
      style={{ backgroundImage: `url(${bgImage})` }}
      href={"/flats/" + slug}
    >
      <div className="h-32 bg-slate-900/70 py-8 text-center">
        <div className="px-6">
          <div className="mb-2 text-xl font-bold text-slate-50 md:text-2xl">
            {city}
          </div>
        </div>
        <div className="px-6 flex flex-col items-center gap-1">
          <span className="md:text-md rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
            {count}{" "}
          </span>
          <span className="text-white/70 text-xs">in last 14 days</span>
        </div>
      </div>
    </a>
  );
};

const FlatCardGrid: FC = () => {
  const cities = activeCities;
  return (
    <div className="flex flex-wrap items-center justify-center md:m-auto md:w-3/4">
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
