"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { API_BASE } from "@/lib/constants";

import { createPortal } from "react-dom";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch results with debouncing and abort controller
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Abort previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Reset results if query is empty
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Create new abort controller
    const controller = new AbortController();
    controllerRef.current = controller;

    // Debounce API call
    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const accessToken = typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

        const headers: HeadersInit = {};
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const res = await fetch(
          `${API_BASE}/search/query?q=${encodeURIComponent(query)}&cli=w`,
          {
            headers,
            signal: controller.signal,
          }
        );

        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        } else {
          setResults([]);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Search error:', error);
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [query]);

  // Reset query and loading when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  }, [open]);

  // Reset query when modal closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Lock body scroll when search modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleResultClick = (item: SearchResult) => {
    router.push(item.href);
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col"
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-3 md:py-4 border-b border-slate-100 bg-white">
            <div className="flex-1 relative group">
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where would you like to live?"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 md:py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all active:scale-95"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>

          {/* RESULTS AREA */}
          <div className="flex-1 overflow-y-auto px-4 py-6 bg-white pb-safe">
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-sm font-medium">Searching for areas...</p>
              </div>
            )}

            {!loading && results.length === 0 && query.trim().length > 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="text-slate-300 w-8 h-8" />
                </div>
                <p className="text-slate-500 font-medium">No matches found for "{query}"</p>
                <p className="text-slate-400 text-sm mt-1">Try searching for a different locality or city</p>
              </div>
            )}

            {!loading && results.length === 0 && query.trim().length === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Popular Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Indiranagar", "HSR Layout", "Koramangala", "Whitefield", "Powai", "Andheri West"].map((area) => (
                      <button
                        key={area}
                        onClick={() => setQuery(area)}
                        className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-transparent hover:border-emerald-100"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">Search Results</h3>
                {results.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleResultClick(item)}
                    className="group flex items-center gap-4 p-3 md:p-4 rounded-xl hover:bg-emerald-50 cursor-pointer border border-transparent hover:border-emerald-100 transition-all active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{item.subtitle}</p>
                      <p className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
