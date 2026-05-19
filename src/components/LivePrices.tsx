"use client";

import { useEffect, useState, memo } from "react";
import { Stock, calculatePL } from "@/lib/portfolio";

interface Props {
  initialData: Stock[];
}

const StockRow = memo(function StockRow({ stock }: { stock: Stock }) {
  const pl = calculatePL(stock);
  const isPositive = pl >= 0;

  return (
    <tr>
      <td className="px-4 py-3.5 font-medium text-zinc-900">{stock.symbol}</td>
      <td className="px-4 py-3.5 tabular-nums text-zinc-600">{stock.qty}</td>
      <td className="px-4 py-3.5 tabular-nums text-zinc-600">
        ${stock.avg.toFixed(2)}
      </td>
      <td className="px-4 py-3.5 tabular-nums font-medium text-zinc-900">
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

export default function LivePrices({ initialData }: Props) {
  const [stocks, setStocks] = useState<Stock[]>(initialData);

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

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200/80 bg-white">
      <table className="w-full text-sm">
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
            <StockRow key={stock.symbol} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
