export default function BusinessGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Image Skeleton */}
            <div className="h-[200px] w-full bg-slate-200 animate-pulse" />
            
            {/* Content Skeleton */}
            <div className="p-4">
              <div className="mb-2 h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mb-2 h-6 w-full bg-slate-200 rounded animate-pulse" />
              <div className="mb-4 h-4 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

