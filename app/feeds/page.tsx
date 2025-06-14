import React from "react";

export default async function FeedsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/feeds`, {
    cache: "no-cache"
  });

  if (!res.ok) {
    // You might handle the error differently in a real app
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Error loading feeds.</h2>
      </div>
    );
  }

  const data = await res.json();
  const feeds = data?.data || [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Feeds</h1>
      {feeds.length === 0 ? (
        <div>No feeds found.</div>
      ) : (
        <ul className="space-y-2">
          {feeds.map((feed: any) => (
            <li key={feed.id} className="p-2 border border-gray-200 rounded">
              <h2 className="font-semibold">{feed.title}</h2>
              <p className="text-sm text-gray-600">Company: {feed.company}</p>
              <p className="text-sm text-gray-600">Type: {feed.feedType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
