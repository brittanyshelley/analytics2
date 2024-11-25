// app/dashboard/SolarWindsData.js
import { use } from 'react';

async function fetchSolarWindsData() {
  const res = await fetch('/api/solarwinds');
  if (!res.ok) throw new Error('Failed to fetch SolarWinds data');
  return res.json();
}

export default function SolarWindsData() {
  const data = use(fetchSolarWindsData()); // Using `use` to handle data fetching with Suspense

  return (
    <div className="data-section">
      <h2 className="text-xl font-semibold">SolarWinds Data</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
