interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <svg
        className="mx-auto h-12 w-12 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-slate-900">Error loading data</h3>
      <p className="mt-2 text-sm text-slate-500">
        {message || "Something went wrong while fetching data. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Retry
        </button>
      )}
    </div>
  );
}

