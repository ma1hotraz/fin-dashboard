interface NewsItem {
  title: string;
}

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
        <li key={index} className="px-4 py-4 text-sm text-zinc-800">
          {item.title}
        </li>
      ))}
    </ul>
  );
}
