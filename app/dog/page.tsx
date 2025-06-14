import React from "react";

export default async function DogPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/dog`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Error loading data.</h2>
      </div>
    );
  }

  const data = await res.json();
  const feeds = data?.data || [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dog Page</h1>
      {feeds.length === 0 ? (
        <p>No feeds found in Firestore.</p>
      ) : (
        <ul className="space-y-2">
          {feeds.map((feed: any) => (
            <li key={feed.id} className="p-2 border border-gray-200 rounded">
              <h2 className="font-semibold">{feed.title}</h2>
              <p className="text-sm text-gray-600">Company: {feed.company}</p>
              <p className="text-sm text-gray-600">Feed Type: {feed.feedType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
