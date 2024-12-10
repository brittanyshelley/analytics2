// 'use client'; // Ensures the component runs on the client side

// import { useState, useEffect } from 'react';
// import { fetchMonitors, fetchMonitorChecks } from '../services/uptrendsService'; // Adjust the path as needed

// export default function MonitorStatus() {
//   const [monitors, setMonitors] = useState([]); // State for monitors
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch monitor data
//   useEffect(() => {
//     async function fetchMonitorData() {
//       try {
//         setLoading(true);

//         // Step 1: Fetch monitors
//         const monitorData = await fetchMonitors();

//         // Step 2: Fetch and process monitor checks
//         const processedMonitors = await Promise.all(
//           monitorData.map(async (monitor) => {
//             const { MonitorGuid, Name } = monitor;

//             try {
//               // Fetch monitor checks
//               const checks = await fetchMonitorChecks(MonitorGuid);
//               const mostRecentCheck = checks.Data.reduce((latest, current) => {
//                 return new Date(current.Attributes.Timestamp) > new Date(latest.Attributes.Timestamp)
//                   ? current
//                   : latest;
//               });

//               return {
//                 MonitorGuid,
//                 Name,
//                 MostRecentCheck: mostRecentCheck,
//               };
//             } catch {
//               // Handle missing or failed check fetch
//               return {
//                 MonitorGuid,
//                 Name,
//                 MostRecentCheck: null,
//               };
//             }
//           })
//         );

//         setMonitors(processedMonitors); // Update state with processed data
//       } catch (err) {
//         console.error('Error fetching monitor data:', err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMonitorData();
//   }, []); // Run once on component mount

//   // Handle loading and error states
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Monitor Status</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Monitor Name</th>
//             <th>Monitor GUID</th>
//             <th>Most Recent Check Time</th>
//             <th>Status</th>
//             <th>Total Time (ms)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {monitors.map(({ MonitorGuid, Name, MostRecentCheck }) => (
//             <tr key={MonitorGuid}>
//               <td>{Name}</td>
//               <td>{MonitorGuid}</td>
//               <td>
//                 {MostRecentCheck
//                   ? new Date(MostRecentCheck.Attributes.Timestamp).toLocaleString()
//                   : 'No recent checks'}
//               </td>
//               <td>{MostRecentCheck?.Attributes.ErrorDescription || 'N/A'}</td>
//               <td>{MostRecentCheck?.Attributes.TotalTime || 'N/A'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { fetchMonitors } from '../services/uptrendsService';
import { getMostRecentChecks } from '../services/uptrendsService'; // Ensure this function is correctly imported

export default function MonitorStatus() {
  const [monitors, setMonitors] = useState([]); // State for monitors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMonitorData() {
      try {
        setLoading(true);

        // Fetch monitors
        const monitorsData = await fetchMonitors();
        console.log('Fetched Monitors:', monitorsData);

        // Process to get recent checks
        const processedMonitors = getMostRecentChecks(monitorsData);
        console.log('Processed Monitors:', processedMonitors);

        setMonitors(processedMonitors);
      } catch (err) {
        console.error('Error fetching monitors:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMonitorData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Monitor Status</h1>
      <table>
        <thead>
          <tr>
            <th>Monitor Name</th>
            <th>Monitor GUID</th>
            <th>Most Recent Check Time</th>
            <th>Status</th>
            <th>Total Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map(({ MonitorGuid, Name, MostRecentCheck }) => (
            <tr key={MonitorGuid}>
              <td>{Name}</td>
              <td>{MonitorGuid}</td>
              <td>
                {MostRecentCheck
                  ? new Date(MostRecentCheck.Attributes.Timestamp).toLocaleString()
                  : 'No recent checks'}
              </td>
              <td>{MostRecentCheck?.Attributes.ErrorDescription || 'N/A'}</td>
              <td>{MostRecentCheck?.Attributes.TotalTime || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
