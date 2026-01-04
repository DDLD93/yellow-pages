import Link from 'next/link';
import { PublicBusinessProfile } from '@/types/public-business';

interface BusinessCardProps {
  business: PublicBusinessProfile;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-kaduna-emerald/10 transition-all duration-300 border border-slate-100 hover:border-kaduna-gold/50 h-full flex flex-col">
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Header with Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold text-kaduna-navy bg-kaduna-surface px-2 py-1 rounded-full border border-kaduna-navy/10">
            {business.category}
          </span>
          {business.metadata.isVerified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-kaduna-emerald border border-emerald-100">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              VERIFIED
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mb-2 text-base font-bold text-slate-900 line-clamp-2 group-hover:text-kaduna-emerald transition-colors">
          {business.name}
        </h3>

        {/* Location */}
        <div className="mb-4 flex items-center text-xs text-slate-500 font-medium">
          <svg
            className="mr-1.5 h-3.5 w-3.5 text-kaduna-gold shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="line-clamp-1">{business.location.lga}</span>
        </div>

        {/* Spacer to push actions to bottom */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            href={`/business/${business.slug}`}
            className="flex-1 rounded-md bg-kaduna-surface hover:bg-kaduna-navy hover:text-white text-kaduna-navy border border-kaduna-navy/10 px-3 py-2 text-center text-xs font-bold transition-all duration-200"
          >
            View Details
          </Link>
          {business.contact.phone && (
            <a
              href={`tel:${business.contact.phone}`}
              className="flex items-center justify-center w-9 h-9 rounded-md bg-emerald-50 text-kaduna-emerald hover:bg-kaduna-emerald hover:text-white transition-colors duration-200"
              aria-label="Call Business"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
