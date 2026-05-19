export interface NewsItem {
  title: string;
  category: string;
  timeAgo: string;
}

export const MOCK_NEWS: NewsItem[] = [
  {
    title: "Market hits all-time high",
    category: "Markets",
    timeAgo: "2h ago",
  },
  {
    title: "Tech stocks rally continues",
    category: "Technology",
    timeAgo: "5h ago",
  },
];
