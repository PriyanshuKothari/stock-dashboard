import React from "react";

const mockNews = [
  { title: "Market trends show upward momentum", date: "2025-08-14" },
  { title: "Tech sector leads NSE gains", date: "2025-08-13" },
  { title: "Investors eye quarterly earnings", date: "2025-08-12" },
];

export default function NewsFeed() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-bold mb-3 dark:text-white">Latest News</h2>
      <ul className="space-y-2">
        {mockNews.map((n, idx) => (
          <li key={idx} className="border-b pb-2 last:border-none">
            <p className="font-semibold dark:text-gray-200">{n.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{n.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
