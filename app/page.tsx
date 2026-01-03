import { Suspense } from 'react';
import { getBusinesses } from '@/actions/get-businesses';
import { getLGAs } from '@/actions/get-lgas';
import { getCategories } from '@/actions/get-categories';
import SearchFilters from '@/components/search-filters';
import BusinessGrid from '@/components/business-grid';
import BusinessGridSkeleton from '@/components/business-grid-skeleton';
import Pagination from '@/components/pagination';
import Logo from '@/components/logo';
import HeroSearch from '@/components/hero-search';
import Footer from '@/components/footer';
import Link from 'next/link';

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

  const { businesses, totalPages, total } = await getBusinesses({
    query: query || undefined,
    lga: lga || undefined,
    category: category.length > 0 ? category : undefined,
    verified: verified || undefined,
    page,
    limit: 12,
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
       {/* Stats */}
       <div className="text-sm text-slate-500 font-medium px-1 flex items-center justify-between">
          <div>
            Found <span className="font-bold text-kaduna-emerald">{total}</span> businesses
            {query && <span> for <span className="text-slate-900 font-bold">"{query}"</span></span>}
          </div>
       </div>

      <BusinessGrid businesses={businesses} />
      
      <div className="py-8 flex justify-center">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const hasSearch = !!(params.q || params.lga || params.category || params.verified);

  // Fetch filter options
  const [lgas, categories] = await Promise.all([
    getLGAs(),
    getCategories(),
  ]);

  // Home State (Centered)
  if (!hasSearch) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative z-10 overflow-hidden">
        {/* Top Right Header Links (Home State) */}
        <div className="absolute top-6 right-6 flex items-center gap-4 md:gap-6 text-sm font-medium z-20">
            <a href="https://kdsg.gov.ng" target="_blank" rel="noopener noreferrer" className="hidden md:block text-slate-600 hover:text-kaduna-emerald transition-colors">Government</a>
            <Link href="#" className="hidden md:block text-slate-600 hover:text-kaduna-emerald transition-colors">Business Portal</Link>
            <Link href="#" className="px-3 py-1.5 md:px-4 md:py-2 bg-kaduna-emerald text-white text-xs md:text-sm rounded-full hover:bg-kaduna-navy transition-colors shadow-sm whitespace-nowrap">
                Register Business
            </Link>
        </div>
        
        {/* Main Content */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 md:gap-10 -mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
          <Logo variant="large" />
          
          <div className="w-full space-y-6 flex flex-col items-center">
            <HeroSearch variant="centered" />
            
            {/* Quick Filter Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 max-w-xl">
              <span className="text-sm text-slate-400 font-medium mr-2 self-center hidden sm:inline">Popular:</span>
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${encodeURIComponent(cat)}`}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 bg-white/50 backdrop-blur-sm border border-slate-200/60 rounded-full hover:border-kaduna-emerald hover:text-kaduna-emerald hover:bg-white hover:shadow-sm transition-all duration-300"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer Info - Stays at bottom */}
        <div className="absolute bottom-8 text-center text-slate-400 text-xs font-medium tracking-wide w-full px-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-500">
                <Link href="#" className="hover:text-kaduna-emerald">About</Link>
                <Link href="#" className="hover:text-kaduna-emerald">Privacy</Link>
                <Link href="#" className="hover:text-kaduna-emerald">Terms</Link>
                <Link href="#" className="hover:text-kaduna-emerald">Contact</Link>
            </div>
            <p className="flex items-center justify-center gap-2 opacity-75 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-kaduna-emerald animate-pulse"></span>
                Official Kaduna State Business Directory
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Results State (Sticky Header + Scrollable Grid)
  return (
    <main className="h-screen w-full flex flex-col bg-slate-50/50 relative z-10">
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-sm z-30 transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 max-w-[1600px] mx-auto w-full">
            {/* Logo Area */}
            <div className="flex w-full lg:w-auto items-center justify-between lg:justify-start">
                <Link href="/" className="shrink-0 flex items-center group opacity-90 hover:opacity-100 transition-opacity">
                    <Logo variant="default" orientation="horizontal" />
                </Link>
                
                {/* Mobile: Filter Toggle is inside SearchFilters, but we might want actions here? 
                    For now, keep it simple. */}
            </div>

            {/* Search Area */}
            <div className="w-full lg:flex-1 flex flex-row items-center gap-2 lg:gap-3">
                <HeroSearch variant="header" className="flex-1 w-full" />
                <SearchFilters 
                    lgas={lgas} 
                    categories={categories} 
                    className="shrink-0"
                />
            </div>

            {/* Header Actions (Desktop) */}
            <div className="hidden xl:flex items-center gap-4 ml-auto">
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-kaduna-emerald">Business Portal</Link>
                <Link href="#" className="px-4 py-2 text-sm font-medium bg-kaduna-navy text-white rounded-full hover:bg-kaduna-emerald transition-colors shadow-sm">
                    Register
                </Link>
            </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col">
        <div className="flex-1">
            <Suspense fallback={
                <div className="p-6 max-w-[1600px] mx-auto">
                    <BusinessGridSkeleton />
                </div>
            }>
            <BusinessResults searchParams={searchParams} />
            </Suspense>
        </div>
        
        {/* Full Footer in Results View */}
        <Footer />
      </div>
    </main>
  );
}
