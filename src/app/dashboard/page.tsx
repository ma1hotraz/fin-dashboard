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
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Portfolio Dashboard</h1>
        <a
          href="/api/logout"
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
        >
          Logout
        </a>
      </div>
      {data.length === 0 ? (
        <p className="text-gray-500">No portfolio data available.</p>
      ) : (
        <PortfolioTable data={data} />
      )}
    </div>
  );
}
