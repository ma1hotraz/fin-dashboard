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
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-4 font-medium text-gray-900">{stock.symbol}</td>
      <td className="py-3 px-4 text-gray-600">{stock.qty}</td>
      <td className="py-3 px-4 text-gray-600">${stock.avg.toFixed(2)}</td>
      <td className="py-3 px-4 font-medium">${stock.price.toFixed(2)}</td>
      <td className={`py-3 px-4 font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
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
            const newPrice = Math.max(1, parseFloat((stock.price + delta).toFixed(2)));
            return { ...stock, price: newPrice };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Symbol</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Qty</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Avg Price</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Live Price</th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">P/L</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <StockRow key={stock.symbol} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}