import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-900">Business Not Found</h2>
      <p className="mt-4 text-slate-500">
        The business you're looking for doesn't exist or is no longer available.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-slate-900 px-6 py-3 text-white transition-colors hover:bg-slate-800"
      >
        Back to Search
      </Link>
    </div>
  );
}

