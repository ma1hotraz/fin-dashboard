interface NewsItem {
  title: string;
}

interface Props {
  news: NewsItem[];
}

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p className="text-gray-500">No news available.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {news.map((item, index) => (
        <li
          key={index}
          className="border border-gray-200 rounded-lg px-5 py-4 bg-white hover:shadow-sm transition text-gray-800 text-sm"
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}
