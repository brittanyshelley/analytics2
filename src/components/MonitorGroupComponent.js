
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { fetchMonitorChecksAndCategorize } from '../services/uptrendsService';

// const MonitorGroupComponent = ({ monitorGroupGuid }) => {
//   const [monitorData, setMonitorData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getMonitorData = async () => {
//       if (!monitorGroupGuid) {
//         setError('Group ID is required');
//         setLoading(false);
//         return;
//       }
//       try {
//         const data = await fetchMonitorChecksAndCategorize(monitorGroupGuid);
//         setMonitorData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMonitorData();
//   }, [monitorGroupGuid]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Monitor Group Data</h1>
//       <pre>{JSON.stringify(monitorData, null, 2)}</pre>
//     </div>
//   );
// };

// export default MonitorGroupComponent;
import { useApplicationData } from '@/hooks/useApplicationData';

export default function MonitorGroups() {
  const { monitorGroups, monitors, loading } = useApplicationData();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {monitorGroups.map((group) => (
        <div key={group.monitorGroupGuid}>
          <h2>{group.name}</h2>
          <ul>
            {monitors[group.monitorGroupGuid]?.map((monitor) => (
              <li key={monitor.monitorGuid}>{monitor.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}