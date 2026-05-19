export default function NewsLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      <header className="mb-10 border-b border-zinc-200/80 pb-8">
        <div className="h-3 w-24 animate-pulse rounded bg-zinc-200" />
        <div className="mt-3 h-7 w-40 animate-pulse rounded bg-zinc-200" />
      </header>
      <ul className="divide-y divide-zinc-200/80 overflow-hidden rounded-lg border border-zinc-200/80">
        {[1, 2].map((i) => (
          <li key={i} className="h-14 animate-pulse bg-zinc-100" />
        ))}
      </ul>
    </div>
  );
}
