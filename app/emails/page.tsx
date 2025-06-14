import React from "react";

export default async function EmailsPage() {
  // Replace NEXT_PUBLIC_SITE_URL with full domain if necessary
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/emails`, {
    cache: "no-cache"
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Error loading emails.</h2>
      </div>
    );
  }

  const data = await res.json();
  const emails = data?.data || [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Latest 10 Emails</h1>
      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul className="space-y-2">
          {emails.map((email: any) => (
            <li key={email.id} className="border border-gray-300 rounded p-3">
              <div className="mb-1 font-semibold">Subject: {email.subject}</div>
              <div className="text-sm text-gray-600">From: {email.from_addr}</div>
              <div className="text-xs text-gray-500">Date: {email.internal_date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
