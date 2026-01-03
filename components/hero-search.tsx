'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface HeroSearchProps {
  variant?: 'centered' | 'header';
  className?: string;
}

export default function HeroSearch({ variant = 'centered', className = '' }: HeroSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
      params.delete('page');
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  const isHeader = variant === 'header';

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative transition-all duration-300 ${
        isHeader ? 'w-full max-w-xl' : 'w-full max-w-xl'
      } ${className}`}
    >
      <div 
        className={`relative flex items-center group transition-all duration-300 rounded-full bg-white
          ${isHeader 
            ? 'shadow-sm border border-slate-200 hover:shadow-md' 
            : `shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-transparent ${isFocused ? 'ring-2 ring-kaduna-gold/20' : ''}`
          }
        `}
      >
        {/* Search Icon */}
        <div className={`pl-4 text-slate-400 ${isHeader ? 'pl-3' : 'pl-5'}`}>
          <svg className={`transition-colors ${isFocused ? 'text-kaduna-gold' : ''} ${isHeader ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isHeader ? "Search businesses..." : "What are you looking for today?"}
          className={`w-full bg-transparent focus:outline-none placeholder:text-slate-400 font-medium text-slate-700
            ${isHeader 
              ? 'h-10 px-3 text-sm' 
              : 'h-14 px-4 text-lg'
            }`}
        />

        {/* Action Button */}
        <div className="pr-1.5">
            <button
            type="submit"
            className={`flex items-center justify-center transition-all duration-200 text-white rounded-full
                ${isHeader
                ? 'h-7 w-7 bg-kaduna-navy hover:bg-kaduna-emerald'
                : 'h-11 w-11 bg-kaduna-emerald hover:bg-kaduna-navy shadow-md hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
            aria-label="Search"
            >
            <svg
                className={isHeader ? "h-3.5 w-3.5" : "h-5 w-5"}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
            </svg>
            </button>
        </div>
      </div>
    </form>
  );
}
