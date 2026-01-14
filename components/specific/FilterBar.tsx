'use client';

import { IndianRupee, Map, Mars, SlidersHorizontal, Venus } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Toggle } from "../ui/toggle";
import FlatMapModal from "./FlatMapModal";
import FilterModal from "./FilterModal";
import { FlatMapResponse } from "@/lib/types";
import { PageMetadata } from "@/lib/api";
import { useState } from "react";

export interface FilterState {
  genderFilter: string;
  brokerageFree: boolean;
  localities: string[];
  flatTypes: string[];
  withPhotos: boolean;
  allowedTenants: string[];
  minRent: number;
  maxRent: number;
}

interface FilterBarProps {
  city: {
    name: string;
    slug: string;
    code: string;
  };
  listingCount: number;
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export default function FilterBar({ city, listingCount, onFilterChange, currentFilters }: FilterBarProps) {
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mapFlats, setMapFlats] = useState<FlatMapResponse[]>([]);
  const [loadingMap, setLoadingMap] = useState(false);

  const handleMaleToggle = () => {
    const newGenderFilter = currentFilters.genderFilter === 'male' ? 'all' : 'male';
    onFilterChange({
      ...currentFilters,
      genderFilter: newGenderFilter,
    });
  };

  const handleFemaleToggle = () => {
    const newGenderFilter = currentFilters.genderFilter === 'female' ? 'all' : 'female';
    onFilterChange({
      ...currentFilters,
      genderFilter: newGenderFilter,
    });
  };

  const handleBrokerageToggle = () => {
    onFilterChange({
      ...currentFilters,
      brokerageFree: !currentFilters.brokerageFree,
    });
  };

  const handleMapClick = async () => {
    setLoadingMap(true);
    try {
      // Build query parameters with current filters
      const params = new URLSearchParams({
        city: city.code,
        state: '0',
        map_only: 'true',
      });

      // Add filter parameters
      if (currentFilters.brokerageFree) {
        params.append('brokerage_applicable', 'false');
      }

      if (currentFilters.genderFilter === 'male') {
        params.append('available_for', 'Male Only');
      } else if (currentFilters.genderFilter === 'female') {
        params.append('available_for', 'Female Only');
      }

      if (currentFilters.localities.length > 0) {
        params.set('locality', currentFilters.localities.join(','));
      }
      if (currentFilters.flatTypes.length > 0) {
        params.set('flat_type', currentFilters.flatTypes.join(','));
      }
      if (currentFilters.allowedTenants.length > 0) {
        params.set('tenant', currentFilters.allowedTenants.join(','));
      }

      if (currentFilters.minRent > 1000) {
        params.append('min_rent', currentFilters.minRent.toString());
      }
      if (currentFilters.maxRent < 75000) {
        params.append('max_rent', currentFilters.maxRent.toString());
      }
      const response = await fetch(`/api/flats?${params.toString()}`);
      const data = await response.json();

      setMapFlats(data.results || []);
      setShowMap(true);
    } catch (error) {
      console.error('Error fetching map data:', error);
      setMapFlats([]);
    } finally {
      setLoadingMap(false);
    }
  };

  return (
    <section className="p-4 space-y-3 md:flex md:items-center md:justify-between md:space-y-0">
      <div className="w-full md:w-auto md:px-6 py-2 rounded text-sm font-semibold text-slate-800">
        {listingCount} Flats Available in {city.name}
      </div>

      <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-2 w-max md:w-auto mx-auto md:justify-end">
          <button
            onClick={handleMapClick}
            disabled={loadingMap}
            className="flex items-center hover:bg-slate-100 cursor-pointer gap-2 bg-white border-2 border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Map size={16} className="text-green-500" />
            <span className="text-slate-800">{loadingMap ? 'Loading...' : 'Map'}</span>
          </button>

          <Toggle
            pressed={currentFilters.genderFilter === 'male'}
            onPressedChange={handleMaleToggle}
            aria-label="Filter for Male"
            size="sm"
            variant="outline"
            className="cursor-pointer transition-colors data-[state=on]:bg-transparent border-2 border-slate-200 data-[state=on]:border-blue-500 data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:bg-blue-500 data-[state=on]:*:[svg]:stroke-white"
          >
            <Mars />
          </Toggle>

          <Toggle
            pressed={currentFilters.genderFilter === 'female'}
            onPressedChange={handleFemaleToggle}
            aria-label="Filter for Female"
            size="sm"
            variant="outline"
            className="cursor-pointer transition-colors data-[state=on]:bg-transparent border-2 border-slate-200 data-[state=on]:border-pink-500 data-[state=on]:*:[svg]:fill-pink-500 data-[state=on]:bg-pink-500 data-[state=on]:*:[svg]:stroke-white"
          >
            <Venus />
          </Toggle>

          <Toggle
            pressed={currentFilters.brokerageFree}
            onPressedChange={handleBrokerageToggle}
            aria-label="Filter Broker Free"
            size="sm"
            variant="outline"
            className="cursor-pointer transition-colors data-[state=on]:bg-transparent border-2 border-slate-200 data-[state=on]:border-amber-500 data-[state=on]:*:[svg]:fill-amber-500 data-[state=on]:bg-amber-500 px-3 data-[state=on]:*:[svg]:stroke-slate-900 text-xs"
          >
            <IndianRupee />Broker Free
          </Toggle>

          <button
            onClick={() => setShowFilters(true)}
            className="hover:bg-slate-100 cursor-pointer flex items-center gap-2 bg-white border-2 border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium"
          >
            <SlidersHorizontal size={16} className="text-slate-600" />
            <span className="text-slate-800">Filters</span>
          </button>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <FlatMapModal flats={mapFlats} onClose={() => setShowMap(false)} />
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        currentFilters={currentFilters}
        onApply={onFilterChange}
        cityCode={city.code}
      />
    </section>
  );
}
