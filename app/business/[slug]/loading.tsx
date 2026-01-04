export default function BusinessDetailLoading() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header Bar Skeleton */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-sm z-30">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="h-5 w-28 rounded animate-shimmer" />
          <div className="h-5 w-40 rounded animate-shimmer" style={{ animationDelay: '0.1s' }} />
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 sm:px-6 lg:px-8 w-full">
          {/* Business Header Section Skeleton */}
          <div className="mb-6 md:mb-8 rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-100 animate-skeleton-fade">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-6 w-20 rounded-full animate-shimmer" />
                  <div className="h-6 w-24 rounded-full animate-shimmer" style={{ animationDelay: '0.1s' }} />
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <div className="h-10 w-full max-w-md rounded animate-shimmer" style={{ animationDelay: '0.15s' }} />
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full animate-shimmer" style={{ animationDelay: '0.2s' }} />
                  <div className="h-5 w-40 rounded animate-shimmer" style={{ animationDelay: '0.25s' }} />
                </div>
              </div>

              {/* Share Button Skeleton */}
              <div className="h-10 w-28 rounded-full animate-shimmer" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Skeleton */}
              <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-100 animate-skeleton-fade" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded animate-shimmer" />
                  <div className="h-6 w-40 rounded animate-shimmer" style={{ animationDelay: '0.1s' }} />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full rounded animate-shimmer" style={{ animationDelay: '0.15s' }} />
                  <div className="h-4 w-full rounded animate-shimmer" style={{ animationDelay: '0.2s' }} />
                  <div className="h-4 w-3/4 rounded animate-shimmer" style={{ animationDelay: '0.25s' }} />
                </div>
              </div>

              {/* Location Skeleton */}
              <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-100 animate-skeleton-fade" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-5 h-5 rounded animate-shimmer" />
                  <div className="h-6 w-44 rounded animate-shimmer" style={{ animationDelay: '0.1s' }} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="h-5 w-20 rounded animate-shimmer mb-2" />
                    <div className="h-4 w-full rounded animate-shimmer" style={{ animationDelay: '0.15s' }} />
                    <div className="h-4 w-2/3 rounded animate-shimmer mt-2" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="h-12 w-full rounded-xl animate-shimmer" style={{ animationDelay: '0.25s' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Card Skeleton */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 animate-skeleton-fade" style={{ animationDelay: '0.3s' }}>
                <div className="h-6 w-28 rounded animate-shimmer mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3">
                      <div className="w-10 h-10 rounded-full animate-shimmer" style={{ animationDelay: `${0.1 * i}s` }} />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-12 rounded animate-shimmer" style={{ animationDelay: `${0.15 * i}s` }} />
                        <div className="h-5 w-32 rounded animate-shimmer" style={{ animationDelay: `${0.2 * i}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Status Card Skeleton */}
              <div className="rounded-2xl bg-kaduna-navy/80 p-6 shadow-md animate-skeleton-fade" style={{ animationDelay: '0.4s' }}>
                <div className="h-6 w-32 rounded bg-white/20 animate-pulse mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div className="h-4 w-20 rounded bg-white/20 animate-pulse" style={{ animationDelay: `${0.1 * i}s` }} />
                      <div className="h-4 w-24 rounded bg-white/30 animate-pulse" style={{ animationDelay: `${0.15 * i}s` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

