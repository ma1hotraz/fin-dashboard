import { NewsItem } from "@/lib/news";

interface Props {
  news: NewsItem[];
}

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p className="text-sm text-zinc-500">No news available.</p>;
  }

  return (
    <ul className="divide-y divide-zinc-200/80 overflow-hidden rounded-lg border border-zinc-200/80 bg-white">
      {news.map((item, index) => (
        <li key={index} className="px-4 py-4 transition hover:bg-zinc-50/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
              {item.category}
            </span>
            <span className="text-xs text-zinc-400">{item.timeAgo}</span>
          </div>
          <p className="mt-2 text-sm font-medium leading-snug text-zinc-900">
            {item.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
