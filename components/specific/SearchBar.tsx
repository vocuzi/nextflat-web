"use client";

import { useState } from "react";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* SMALL BAR SHOWN IN HEADER */}
      <div className="w-full">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md px-4 py-2 w-full md:w-64 text-left text-slate-500 bg-gray-100 border border-gray-50 flex items-center gap-2"
        >
          <Search size={16} /> Search for flats…
        </button>
      </div>

      {/* FULL-SCREEN MODAL */}
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

