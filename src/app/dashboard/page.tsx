import PageShell from "@/components/PageShell";
import PortfolioTable from "@/components/PortfolioTable";
import { Stock } from "@/lib/portfolio";
import { getBaseUrl } from "@/lib/server-url";
import { log } from "@/lib/logger";

async function getPortfolio(): Promise<Stock[]> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/portfolio`, {
    cache: "no-store",
  });

  if (!res.ok) {
    log(`Dashboard fetch failed with status ${res.status}`, "error");
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
}

export default async function DashboardPage() {
  const data = await getPortfolio();

  return (
    <PageShell title="Portfolio" active="dashboard">
      {data.length === 0 ? (
        <p className="text-sm text-zinc-500">No portfolio data available.</p>
      ) : (
        <PortfolioTable data={data} />
      )}
    </PageShell>
  );
}
