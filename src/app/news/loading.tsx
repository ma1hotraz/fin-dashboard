import PageShell from "@/components/PageShell";

export default function NewsLoading() {
  return (
    <PageShell title="Market News" active="news">
      <p className="mb-4 h-3 w-36 animate-pulse rounded bg-zinc-200" />
      <ul className="divide-y divide-zinc-200/80 overflow-hidden rounded-lg border border-zinc-200/80">
        {[1, 2].map((i) => (
          <li key={i} className="space-y-3 px-4 py-4">
            <div className="flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-200" />
              <div className="h-5 w-12 animate-pulse rounded bg-zinc-100" />
            </div>
            <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-zinc-200" />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
