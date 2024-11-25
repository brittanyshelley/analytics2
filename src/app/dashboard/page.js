// app/dashboard/page.js
// import { Suspense } from 'react';
// import VMwareData from './VMwareData'; // Correct: Default import
// import SolarWindsData from './SolarWindsData'; // Correct: Default import
// import UptrendsData from './UptrendsData'; // Correct: Default import

// export default function DashboardPage() {
//   return (
//     <div className="dashboard">
//       <h1 className="text-2xl font-bold mb-4">Custom Dashboard</h1>
//       <Suspense fallback={<p>Loading VMware data...</p>}>
//         <VMwareData />
//       </Suspense>
//       <Suspense fallback={<p>Loading SolarWinds data...</p>}>
//         <SolarWindsData />
//       </Suspense>
//       <Suspense fallback={<p>Loading Uptrends data...</p>}>
//         <UptrendsData />
//       </Suspense>
//     </div>
//   );
// }
// import { Suspense } from 'react';
// import VMwareData from './VMwareData'; // Correct: Default import
// import SolarWindsData from './SolarWindsData'; // Correct: Default import
// import UptrendsData from './UptrendsData'; // Correct: Default import

// export default function DashboardPage() {
//   return (
//     <div className="dashboard">
//       <h1 className="text-2xl font-bold mb-4">Custom Dashboard</h1>
//       <Suspense fallback={<p>Loading VMware data...</p>}>
//         <VMwareData />
//       </Suspense>
//       <Suspense fallback={<p>Loading SolarWinds data...</p>}>
//         <SolarWindsData />
//       </Suspense>
//       <Suspense fallback={<p>Loading Uptrends data...</p>}>
//         <UptrendsData />
//       </Suspense>
//     </div>
//   );
// }
// import { Suspense } from 'react';
// import VMwareData from './VMwareData';
// import SolarWindsData from './SolarWindsData';
// import UptrendsData from './UptrendsData';

// function ErrorBoundary({ error }) {
//   return <div className="text-red-500">Error: {error.message}</div>;
// }

// export default function DashboardPage() {
//   return (
//     <div className="dashboard">
//       <h1 className="text-2xl font-bold mb-4">Custom Dashboard</h1>
//       <Suspense fallback={<p>Loading VMware data...</p>}>
//         <ErrorBoundary>
//           <VMwareData />
//         </ErrorBoundary>
//       </Suspense>
//       <Suspense fallback={<p>Loading SolarWinds data...</p>}>
//         <ErrorBoundary>
//           <SolarWindsData />
//         </ErrorBoundary>
//       </Suspense>
//       <Suspense fallback={<p>Loading Uptrends data...</p>}>
//         <ErrorBoundary>
//           <UptrendsData />
//         </ErrorBoundary>
//       </Suspense>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import DataTable from '../../components/DataTable';

const Dashboard = () => {
  const [dataType, setDataType] = useState('monitors'); // Default to monitors
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/uptrends/${dataType}`);
      if (!res.ok) throw new Error(`Error fetching ${dataType} data: ${res.status}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataType]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Dropdown
        options={['monitors', 'metrics', 'alerts']}
        selected={dataType}
        onChange={(value) => setDataType(value)}
      />
      <DataTable data={data} />
    </div>
  );
};

export default Dashboard;
// 'use client';

// import { useState } from 'react';
// import OperatorList from './operators/OperatorList';
// import MonitorList from './monitors/MonitorList';

// const Dashboard = () => {
//   const [view, setView] = useState('operators');

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div>
//         <button onClick={() => setView('operators')}>Operators</button>
//         <button onClick={() => setView('monitors')}>Monitors</button>
//       </div>
//       {view === 'operators' ? <OperatorList /> : <MonitorList />}
//     </div>
//   );
// };

// export default Dashboard;
