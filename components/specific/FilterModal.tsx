'use client';

import { useState, useEffect } from 'react';
import { X, Check, Search, Loader2 } from 'lucide-react';
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE } from '@/lib/constants';

export interface FilterOptions {
    localities: string[];
    flat_types: string[];
    flairs: string[];
    brokerage_applicable: (boolean | string)[];
    images_available: boolean[];
    allowed_tenant: string[];
}

export interface FilterState {
    genderFilter: 'all' | 'male' | 'female';
    brokerageFree: boolean;
    localities: string[];
    flatTypes: string[];
    withPhotos: boolean;
    allowedTenants: string[];
}

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentFilters: FilterState;
    onApply: (filters: FilterState) => void;
    cityCode: string;
}

export default function FilterModal({ isOpen, onClose, currentFilters, onApply, cityCode }: FilterModalProps) {
    const [filters, setFilters] = useState<FilterState>(currentFilters);
    const [options, setOptions] = useState<FilterOptions | null>(null);
    const [loading, setLoading] = useState(true);
    const [localitySearch, setLocalitySearch] = useState('');

    useEffect(() => {
        if (isOpen) {
            setFilters(currentFilters);
            if (!options) {
                fetchOptions();
            }
        }
    }, [isOpen, currentFilters]);

    const fetchOptions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/flats/search/filters?city=${cityCode}&state=x`);
            const data = await response.json();
            setOptions(data);
        } catch (error) {
            console.error('Failed to fetch filter options', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const toggleLocality = (locality: string) => {
        setFilters(prev => {
            const newLocalities = prev.localities.includes(locality)
                ? prev.localities.filter(l => l !== locality)
                : [...prev.localities, locality];
            return { ...prev, localities: newLocalities };
        });
    };

    const toggleFlatType = (type: string) => {
        setFilters(prev => {
            const newTypes = prev.flatTypes.includes(type)
                ? prev.flatTypes.filter(t => t !== type)
                : [...prev.flatTypes, type];
            return { ...prev, flatTypes: newTypes };
        });
    };

    const toggleTenant = (tenant: string) => {
        setFilters(prev => {
            const newTenants = prev.allowedTenants.includes(tenant)
                ? prev.allowedTenants.filter(t => t !== tenant)
                : [...prev.allowedTenants, tenant];

            // Sync with genderFilter
            let newGender: 'all' | 'male' | 'female' = prev.genderFilter;
            if (newTenants.includes('Male Only') && !newTenants.includes('Female Only')) newGender = 'male';
            else if (newTenants.includes('Female Only') && !newTenants.includes('Male Only')) newGender = 'female';
            else if (newTenants.length === 0) newGender = 'all'; // Reset if no tenant filter

            return { ...prev, allowedTenants: newTenants, genderFilter: newGender };
        });
    };

    const filteredLocalities = options?.localities.filter(l =>
        l.toLowerCase().includes(localitySearch.toLowerCase())
    ) || [];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-white w-full sm:w-[600px] sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white z-10">
                            <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={24} className="text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-8 bg-white">
                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="animate-spin text-slate-400" size={32} />
                                </div>
                            ) : (
                                <>
                                    {/* Brokerage & Photos */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <Label htmlFor="brokerage-free" className="text-base font-medium text-slate-700 cursor-pointer">Brokerage Free</Label>
                                            <Switch
                                                id="brokerage-free"
                                                checked={filters.brokerageFree}
                                                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, brokerageFree: checked }))}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <Label htmlFor="with-photos" className="text-base font-medium text-slate-700 cursor-pointer">With Photos Only</Label>
                                            <Switch
                                                id="with-photos"
                                                checked={filters.withPhotos}
                                                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, withPhotos: checked }))}
                                            />
                                        </div>
                                    </div>

                                    {/* Flat Types */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Flat Type</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {options?.flat_types.map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => toggleFlatType(type)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${filters.flatTypes.includes(type)
                                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tenant Types */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Preferred Tenant</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {options?.allowed_tenant.map(tenant => (
                                                <button
                                                    key={tenant}
                                                    onClick={() => toggleTenant(tenant)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${filters.allowedTenants.includes(tenant)
                                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {tenant}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Localities */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Localities</h3>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search localities..."
                                                value={localitySearch}
                                                onChange={(e) => setLocalitySearch(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                                            {filteredLocalities.map(locality => (
                                                <label
                                                    key={locality}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                                                >
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.localities.includes(locality)
                                                        ? 'bg-slate-900 border-slate-900'
                                                        : 'border-slate-300 group-hover:border-slate-400'
                                                        }`}>
                                                        {filters.localities.includes(locality) && <Check size={12} className="text-white" />}
                                                    </div>
                                                    <span className={`text-sm ${filters.localities.includes(locality) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                                        {locality}
                                                    </span>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={filters.localities.includes(locality)}
                                                        onChange={() => toggleLocality(locality)}
                                                    />
                                                </label>
                                            ))}
                                            {filteredLocalities.length === 0 && (
                                                <p className="text-center text-slate-400 py-4 text-sm">No localities found</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 bg-white rounded-b-2xl z-10">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setFilters({
                                        genderFilter: 'all',
                                        brokerageFree: false,
                                        localities: [],
                                        flatTypes: [],
                                        withPhotos: false,
                                        allowedTenants: []
                                    })}
                                    className="flex-1 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="flex-[2] px-4 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                                >
                                    Show Results
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
