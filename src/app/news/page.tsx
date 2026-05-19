import PageShell from "@/components/PageShell";
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
    <PageShell title="Market News" active="news">
      <NewsList news={news} />
    </PageShell>
  );
}
