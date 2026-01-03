import { Suspense } from 'react';
import { getBusinesses } from '@/actions/get-businesses';
import { getLGAs } from '@/actions/get-lgas';
import { getCategories } from '@/actions/get-categories';
import SearchFiltersWrapper from '@/components/search-filters-wrapper';
import BusinessGrid from '@/components/business-grid';
import BusinessGridSkeleton from '@/components/business-grid-skeleton';
import Pagination from '@/components/pagination';
import { LayoutGrid } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    lga?: string;
    category?: string;
    verified?: string;
    page?: string;
  }>;
}

async function BusinessResults({ searchParams }: HomeProps) {
  const params = await searchParams;
  
  const query = params.q || '';
  const lga = params.lga || '';
  const category = params.category ? params.category.split(',').filter(Boolean) : [];
  const verified = params.verified === 'true';
  const page = parseInt(params.page || '1', 10);

  const { businesses, totalPages, total: totalCount } = await getBusinesses({
    query: query || undefined,
    lga: lga || undefined,
    category: category.length > 0 ? category : undefined,
    verified: verified || undefined,
    page,
    limit: 12,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search Stats Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <LayoutGrid className="h-4 w-4" />
          <span>Found <strong className="text-slate-900">{totalCount}</strong> results</span>
          {query && (
            <>
              <span className="text-slate-300">|</span>
              <span>for "<strong className="text-slate-900">{query}</strong>"</span>
            </>
          )}
        </div>
        <div className="text-xs text-slate-400">
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Scrollable Results Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <BusinessGrid businesses={businesses} />
        <div className="p-6 pt-0">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  // Fetch filter options in parallel
  const [lgas, categories] = await Promise.all([
    getLGAs(),
    getCategories(),
  ]);

  return (
    <>
      {/* Sidebar - Fixed Width */}
      <aside className="w-72 bg-white/80 backdrop-blur-sm border-r border-slate-200 hidden lg:block overflow-y-auto scrollbar-thin shrink-0">
        <SearchFiltersWrapper lgas={lgas} categories={categories} />
      </aside>

      {/* Main Content - Flexible */}
      <section className="flex-1 min-w-0 flex flex-col bg-transparent">
        <Suspense fallback={<BusinessGridSkeleton />}>
          <BusinessResults searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
