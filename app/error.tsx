'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900">Something went wrong!</h1>
      <p className="mt-4 text-slate-500">
        We're sorry, but something unexpected happened. Please try again.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-slate-900 px-6 py-3 text-white transition-colors hover:bg-slate-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-slate-700 transition-colors hover:bg-slate-50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

