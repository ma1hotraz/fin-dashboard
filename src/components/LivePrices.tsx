"use client";

import { useEffect, useRef, useState, memo } from "react";
import { Stock, calculatePL, portfolioSummary } from "@/lib/portfolio";

interface Props {
  initialData: Stock[];
}

type Flash = "up" | "down";

const StockRow = memo(function StockRow({
  stock,
  priceFlash,
}: {
  stock: Stock;
  priceFlash?: Flash;
}) {
  const pl = calculatePL(stock);
  const isPositive = pl >= 0;

  const flashClass =
    priceFlash === "up"
      ? "bg-emerald-100/80"
      : priceFlash === "down"
        ? "bg-red-100/80"
        : "";

  return (
    <tr>
      <td className="px-4 py-3.5 font-medium text-zinc-900">{stock.symbol}</td>
      <td className="px-4 py-3.5 tabular-nums text-zinc-600">{stock.qty}</td>
      <td className="px-4 py-3.5 tabular-nums text-zinc-600">
        ${stock.avg.toFixed(2)}
      </td>
      <td
        className={`px-4 py-3.5 tabular-nums font-medium text-zinc-900 transition-colors duration-500 ${flashClass}`}
      >
        ${stock.price.toFixed(2)}
      </td>
      <td
        className={`px-4 py-3.5 tabular-nums font-medium ${
          isPositive ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {isPositive ? "+" : ""}${pl.toFixed(2)}
      </td>
    </tr>
  );
});

function PortfolioSummary({ stocks }: { stocks: Stock[] }) {
  const { totalPL, marketValue, positions } = portfolioSummary(stocks);
  const plPositive = totalPL >= 0;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      <div className="rounded-lg border border-zinc-200/80 bg-white px-4 py-3">
        <p className="text-xs font-medium text-zinc-500">Total P/L</p>
        <p
          className={`mt-1 text-lg font-semibold tabular-nums ${
            plPositive ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {plPositive ? "+" : ""}${totalPL.toFixed(2)}
        </p>
      </div>
      <div className="rounded-lg border border-zinc-200/80 bg-white px-4 py-3">
        <p className="text-xs font-medium text-zinc-500">Market value</p>
        <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900">
          ${marketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      </div>
      <div className="col-span-2 rounded-lg border border-zinc-200/80 bg-white px-4 py-3 sm:col-span-1">
        <p className="text-xs font-medium text-zinc-500">Positions</p>
        <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900">
          {positions}
        </p>
      </div>
    </div>
  );
}

export default function LivePrices({ initialData }: Props) {
  const [stocks, setStocks] = useState<Stock[]>(initialData);
  const [flashes, setFlashes] = useState<Record<string, Flash>>({});
  const prevPricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          const delta = parseFloat((Math.random() * 4 - 2).toFixed(2));
          const newPrice = Math.max(
            1,
            parseFloat((stock.price + delta).toFixed(2))
          );
          return { ...stock, price: newPrice };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newFlashes: Record<string, Flash> = {};

    stocks.forEach((stock) => {
      const prev = prevPricesRef.current[stock.symbol];
      if (prev !== undefined) {
        if (stock.price > prev) newFlashes[stock.symbol] = "up";
        else if (stock.price < prev) newFlashes[stock.symbol] = "down";
      }
      prevPricesRef.current[stock.symbol] = stock.price;
    });

    if (Object.keys(newFlashes).length === 0) return;

    setFlashes(newFlashes);
    const timer = setTimeout(() => setFlashes({}), 500);
    return () => clearTimeout(timer);
  }, [stocks]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">Holdings</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Live · every 2s
        </span>
      </div>

      <PortfolioSummary stocks={stocks} />

      <div className="overflow-x-auto rounded-lg border border-zinc-200/80 bg-white">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-zinc-200/80 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Avg</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {stocks.map((stock) => (
              <StockRow
                key={stock.symbol}
                stock={stock}
                priceFlash={flashes[stock.symbol]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

