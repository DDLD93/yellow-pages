'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    return `/?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
            Previous
          </span>
        )}

        {/* Page Numbers */}
        {startPage > 1 && (
          <>
            <Link
              href={createPageURL(1)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              1
            </Link>
            {startPage > 2 && (
              <span className="px-4 py-2 text-sm text-slate-500">...</span>
            )}
          </>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium ${
              page === currentPage
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-4 py-2 text-sm text-slate-500">...</span>
            )}
            <Link
              href={createPageURL(totalPages)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
            Next
          </span>
        )}
      </nav>
    </div>
  );
}

