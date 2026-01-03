'use client';

import { Suspense } from 'react';
import SearchFilters from './search-filters';

interface SearchFiltersWrapperProps {
  lgas: string[];
  categories: string[];
}

export default function SearchFiltersWrapper({ lgas, categories }: SearchFiltersWrapperProps) {
  return (
    <Suspense fallback={
      <div className="bg-white p-4 shadow-sm border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] h-10 bg-slate-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    }>
      <SearchFilters lgas={lgas} categories={categories} />
    </Suspense>
  );
}

