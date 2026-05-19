import PageShell from "@/components/PageShell";
import NewsList from "@/components/NewsList";
import { MOCK_NEWS } from "@/lib/news";
import { log } from "@/lib/logger";

export const revalidate = 30;

async function getNews() {
  try {
    return MOCK_NEWS;
  } catch (error) {
    log(`News fetch error: ${error}`, "error");
    throw new Error("Failed to fetch news");
  }
}

export default async function NewsPage() {
  const news = await getNews();
  const generatedAt = new Date();

  return (
    <PageShell title="Market News" active="news">
      <p className="mb-4 text-xs text-zinc-500">
        Refreshes every 30 seconds
        <span className="mt-1 block text-zinc-400">
          Last updated: {generatedAt.toLocaleString()}
        </span>
      </p>
      <NewsList news={news} />
    </PageShell>
  );
}
