import NewsList from "@/components/NewsList";

export const revalidate = 30;

interface NewsItem {
  title: string;
}

async function getNews(): Promise<NewsItem[]> {
  try {
    return [
      { title: "Market hits all-time high" },
      { title: "Tech stocks rally continues" },
    ];
  } catch (error) {
    console.log("News fetch error", error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Market News</h1>
        <a
          href="/api/logout"
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
        >
          Logout
        </a>
      </div>
      <p className="text-xs text-gray-400 mb-4">Refreshes every 30 seconds (ISR)</p>
      <NewsList news={news} />
      <p className="mt-6 text-xs text-gray-400">
        <a href="/dashboard" className="underline hover:text-gray-600">← Back to dashboard</a>
      </p>
    </div>
  );
}