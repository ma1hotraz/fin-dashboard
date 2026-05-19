import Link from "next/link";

interface Props {
  title: string;
  active?: "dashboard" | "news";
  children: React.ReactNode;
}

const linkClass = (isActive: boolean) =>
  isActive
    ? "font-medium text-zinc-900"
    : "text-zinc-500 transition hover:text-zinc-900";

export default function PageShell({ title, active, children }: Props) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <header className="mb-10 flex flex-col gap-6 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              Fin Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
              {title}
            </h1>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/dashboard" className={linkClass(active === "dashboard")}>
              Portfolio
            </Link>
            <Link href="/news" className={linkClass(active === "news")}>
              News
            </Link>
            <span className="h-4 w-px bg-zinc-200" aria-hidden />
            <a
              href="/api/logout"
              className="text-zinc-500 transition hover:text-zinc-900"
            >
              Sign out
            </a>
          </nav>
        </header>
        {children}
      </div>
    </main>
  );
}
