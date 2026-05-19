"use client";

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-10 max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load news</h2>
      <p className="text-sm text-gray-500 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Try again
      </button>
    </div>
  );
}
