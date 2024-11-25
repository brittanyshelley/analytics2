import { use } from 'react';

async function fetchVmwareData() {
  const res = await fetch('/api/vmware');
  if (!res.ok) throw new Error('Failed to fetch VMware data');
  return res.json();
}

export default function VMwareData() {
  const data = use(fetchVmwareData()); // Suspense-based hook

  return (
    <div className="data-section">
      <h2 className="text-xl font-semibold">VMware Data</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
