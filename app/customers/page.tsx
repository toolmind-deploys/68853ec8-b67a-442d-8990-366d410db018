import React from "react";

export default async function CustomersPage() {
  // We'll compute the endpoint from environment variables, defaulting to localhost.
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/customers`;

  // Fetch the customers created today.
  const res = await fetch(url, {
    cache: "no-cache"
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Error loading today's customers.</h2>
      </div>
    );
  }

  const data = await res.json();
  const customers = data?.data || [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Customers Created Today</h1>
      {customers.length === 0 ? (
        <p>No customers found for today.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Stripe Customer Id</th>
              <th className="px-4 py-2 border">Free Submissions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: any) => (
              <tr key={customer.id}>
                <td className="px-4 py-2 border">{customer.id}</td>
                <td className="px-4 py-2 border">{customer.email || "N/A"}</td>
                <td className="px-4 py-2 border">{customer.stripeId}</td>
                <td className="px-4 py-2 border">{customer.num_free_submissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
