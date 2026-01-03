'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFiltersProps {
  lgas: string[];
  categories: string[];
  className?: string;
}

export default function SearchFilters({ lgas, categories, className = '' }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedLGA, setSelectedLGA] = useState(searchParams.get('lga') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category')?.split(',').filter(Boolean) || []
  );
  const [verified, setVerified] = useState(searchParams.get('verified') === 'true');

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  const handleLGChange = (lga: string) => {
    setSelectedLGA(lga);
    updateURL({ lga: lga || null });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    updateURL({ category: newCategories.length > 0 ? newCategories.join(',') : null });
  };

  const handleVerifiedToggle = () => {
    const newVal = !verified;
    setVerified(newVal);
    updateURL({ verified: newVal ? 'true' : null });
  };

  const activeFiltersCount = (selectedLGA ? 1 : 0) + selectedCategories.length + (verified ? 1 : 0);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-2 md:py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
            isOpen || activeFiltersCount > 0
              ? 'border-kaduna-emerald text-white bg-kaduna-emerald hover:bg-emerald-700' 
              : 'border-slate-200 text-slate-600 bg-white hover:border-kaduna-gold hover:text-kaduna-gold'
          }`}
        >
          <svg className="w-4 h-4 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="hidden md:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 bg-white text-kaduna-emerald text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Quick Filters */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
                onClick={handleVerifiedToggle}
                className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                    verified
                    ? 'bg-kaduna-gold text-white border-kaduna-gold ring-2 ring-kaduna-gold/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-kaduna-gold hover:text-kaduna-gold'
                }`}
            >
                Verified
            </button>
            {/* Show first few categories as pills */}
            {categories.slice(0, 3).map(cat => (
                <button
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                        selectedCategories.includes(cat)
                        ? 'bg-kaduna-navy text-white border-kaduna-navy'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-kaduna-gold hover:text-kaduna-gold'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Expanded Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 md:left-0 mt-2 w-[calc(100vw-2rem)] md:w-[600px] bg-white rounded-xl shadow-2xl border border-slate-100 p-5 z-50 origin-top-right md:origin-top-left"
            >
                <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="font-bold text-slate-900 text-sm">Refine Results</h3>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-kaduna-emerald transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* LGA */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                        <select
                            value={selectedLGA}
                            onChange={(e) => handleLGChange(e.target.value)}
                            className="w-full rounded-lg border-slate-200 text-sm focus:border-kaduna-emerald focus:ring-kaduna-emerald bg-slate-50"
                        >
                            <option value="">All Locations</option>
                            {lgas.map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                            ))}
                        </select>
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Categories</label>
                        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryToggle(cat)}
                                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                                        selectedCategories.includes(cat)
                                        ? 'bg-kaduna-navy text-white border-kaduna-navy shadow-sm'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-kaduna-gold hover:text-kaduna-gold'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Verified Toggle (Mobile) */}
                    <div className="flex items-center justify-between md:hidden pt-2 border-t border-slate-100">
                        <span className="text-sm font-bold text-slate-700">Verified Only</span>
                        <button
                            onClick={handleVerifiedToggle}
                            className={`w-10 h-6 flex items-center rounded-full transition-colors ${
                                verified ? 'bg-kaduna-emerald' : 'bg-slate-200'
                            }`}
                        >
                            <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                                verified ? 'translate-x-5' : 'translate-x-1'
                            }`} />
                        </button>
                    </div>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
