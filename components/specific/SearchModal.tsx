"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ type: string; area: string }[]>([]);

  // Mock API
  const fetchResults = async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockData = [
        { type: "page", area: `${q} Nagar` },
        { type: "page", area: `${q} Colony` },
        { type: "page", area: `${q} Sector` },
      ];
      setResults(mockData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchResults(query);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[999] flex flex-col"
        >
          {/* HEADER */}
          <div className="flex items-center px-4 py-4 border-b">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for areas, localities..."
              className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:bg-slate-100"
            />
            <button onClick={onClose} className="ml-3 p-2">
              <X size={24} />
            </button>
          </div>

          {/* RESULTS */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {loading && <p className="text-slate-500">Searching…</p>}

            {!loading && results.length === 0 && query.length > 0 && (
              <p className="text-slate-500">No results found</p>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-3">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 bg-slate-50 cursor-pointer hover:bg-slate-100"
                  >
                    <p className="text-sm text-slate-500 uppercase">{item.type}</p>
                    <p className="text-lg font-semibold">{item.area}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
