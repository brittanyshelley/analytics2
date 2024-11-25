// app/dashboard/UptrendsData.js
import { use } from 'react';

async function fetchUptrendsData() {
  const res = await fetch('/api/uptrends', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch Uptrends data');
  return res.json();
}

export default function UptrendsData() {
  const data = use(fetchUptrendsData());

  return (
    <div className="data-section">
      <h2 className="text-xl font-semibold">Uptrends Data</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
