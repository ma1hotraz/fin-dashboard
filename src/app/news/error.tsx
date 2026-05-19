"use client";

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-center">
      <h2 className="text-lg font-semibold text-zinc-900">Failed to load news</h2>
      <p className="mt-2 text-sm text-zinc-500">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Try again
      </button>
    </div>
  );
}
