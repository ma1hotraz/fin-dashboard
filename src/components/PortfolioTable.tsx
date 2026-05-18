import LivePrices from "./LivePrices";
import { Stock } from "@/lib/portfolio";

interface Props {
  data: Stock[];
}

export default function PortfolioTable({ data }: Props) {
  return <LivePrices initialData={data} />;
}