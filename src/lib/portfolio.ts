export interface Stock {
  symbol: string;
  qty: number;
  avg: number;
  price: number;
}

export const MOCK_PORTFOLIO: Stock[] = [
  { symbol: "AAPL", qty: 10, avg: 150, price: 170 },
  { symbol: "TSLA", qty: 5, avg: 700, price: 650 },
];

export function calculatePL(stock: Stock): number {
  return (stock.price - stock.avg) * stock.qty;
}
