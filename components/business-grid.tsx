import BusinessCard from './business-card';
import { PublicBusinessProfile } from '@/types/public-business';

interface BusinessGridProps {
  businesses: PublicBusinessProfile[];
  className?: string;
}

export default function BusinessGrid({ businesses, className = '' }: BusinessGridProps) {
  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 ring-4 ring-emerald-50/50">
            <svg
            className="h-8 w-8 text-kaduna-emerald"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">We couldn't find a match</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          Try searching for something else or adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
