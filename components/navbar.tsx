import Link from 'next/link';
import { Suspense } from 'react';
import NavbarSearch from './navbar-search';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-slate-900">
              Kaduna Business Connect
            </span>
          </Link>

          {/* Search */}
          <Suspense fallback={
            <div className="flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search businesses..."
                  disabled
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 pl-10 text-sm text-slate-900 placeholder-slate-500"
                />
              </div>
            </div>
          }>
            <NavbarSearch />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

