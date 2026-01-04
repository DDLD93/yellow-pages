export default function BusinessGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm animate-skeleton-fade"
          style={{ animationDelay: `${(i % 4) * 0.1}s` }}
        >
          {/* Content Skeleton */}
          <div className="p-4 space-y-4">
            {/* Header with Badges */}
            <div className="flex items-start justify-between gap-2">
              <div className="h-5 w-20 rounded-full animate-shimmer" />
              <div className="h-5 w-16 rounded-full animate-shimmer" style={{ animationDelay: '0.1s' }} />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <div className="h-5 w-full rounded animate-shimmer" style={{ animationDelay: '0.15s' }} />
              <div className="h-5 w-3/4 rounded animate-shimmer" style={{ animationDelay: '0.2s' }} />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full animate-shimmer" style={{ animationDelay: '0.25s' }} />
              <div className="h-4 w-24 rounded animate-shimmer" style={{ animationDelay: '0.3s' }} />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-9 rounded-md animate-shimmer" style={{ animationDelay: '0.35s' }} />
              <div className="w-9 h-9 rounded-md animate-shimmer" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton for single business card (for use in other components)
export function BusinessCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm animate-skeleton-fade">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="h-5 w-20 rounded-full animate-shimmer" />
          <div className="h-5 w-16 rounded-full animate-shimmer" style={{ animationDelay: '0.1s' }} />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-full rounded animate-shimmer" style={{ animationDelay: '0.15s' }} />
          <div className="h-5 w-3/4 rounded animate-shimmer" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full animate-shimmer" style={{ animationDelay: '0.25s' }} />
          <div className="h-4 w-24 rounded animate-shimmer" style={{ animationDelay: '0.3s' }} />
        </div>
        <div className="border-t border-slate-100" />
        <div className="flex items-center gap-2">
          <div className="flex-1 h-9 rounded-md animate-shimmer" style={{ animationDelay: '0.35s' }} />
          <div className="w-9 h-9 rounded-md animate-shimmer" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
