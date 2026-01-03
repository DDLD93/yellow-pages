'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface CategoryPillsProps {
  categories: string[];
}

export default function CategoryPills({ categories }: CategoryPillsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category')?.split(',').filter(Boolean) || []
  );

  const updateURL = (categories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categories.length > 0) {
      params.set('category', categories.join(','));
    } else {
      params.delete('category');
    }
    
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    updateURL(newCategories);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    updateURL([]);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={handleClearAll}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          selectedCategories.length === 0
            ? 'bg-[#0A2463] text-white shadow-md'
            : 'bg-white text-[#0A2463] border-2 border-[#0A2463] hover:bg-[#F8FAFB]'
        }`}
      >
        All
      </button>
      {categories.slice(0, 10).map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <button
            key={category}
            onClick={() => handleCategoryToggle(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              isSelected
                ? 'bg-[#0A2463] text-white shadow-md'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#0D7B5D] hover:text-[#0D7B5D]'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

