import NewsList from "@/components/NewsList";
import { log } from "@/lib/logger";

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
    log(`News fetch error: ${error}`, "error");
    throw new Error("Failed to fetch news");
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
      <NewsList news={news} />
    </div>
  );
}
