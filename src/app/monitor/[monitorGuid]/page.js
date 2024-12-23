// app/monitor/[monitorGuid]/page.js

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// export default function MonitorDetails() {
//   const { monitorGuid } = useParams(); // Extract monitorGuid from the URL
//   const [monitorDetails, setMonitorDetails] = useState(null);
//   const [monitorChecks, setMonitorChecks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchMonitorData() {
//       try {
//         setLoading(true);

//         // Fetch monitor details
//         const detailsRes = await fetch(`/api/uptrends/Monitor/${monitorGuid}`);
//         if (!detailsRes.ok) throw new Error('Failed to load monitor details');
//         const detailsData = await detailsRes.json();

//         // Fetch monitor checks
//         const checksRes = await fetch(`/api/uptrends/MonitorChecks/Monitor/${monitorGuid}`);
//         if (!checksRes.ok) throw new Error('Failed to load monitor checks');
//         const checksData = await checksRes.json();

//         setMonitorDetails(detailsData);
//         setMonitorChecks(checksData.Data || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (monitorGuid) {
//       fetchMonitorData();
//     }
//   }, [monitorGuid]);

//   if (loading) return <p className="text-center text-lg text-primary">Loading monitor details...</p>;
//   if (error) return <p className="text-center text-error">Error: {error}</p>;

//   return (
//     <div className="container mx-auto py-8">
//       {/* Monitor Details Section */}
//       <h1 className="text-4xl font-bold text-primary mb-6">Monitor Details</h1>

//       {monitorDetails && (
//         <div className="card bg-base-200 shadow-lg p-6 mb-8">
//           <div className="card-body">
//             <h2 className="card-title text-accent text-2xl">{monitorDetails.Name}</h2>
//             <p>
//               <strong>Type:</strong> {monitorDetails.MonitorType}
//             </p>
//             <p>
//               <strong>URL:</strong>{' '}
//               {monitorDetails.Url ? (
//                 <a
//                   href={monitorDetails.Url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-info underline"
//                 >
//                   {monitorDetails.Url}
//                 </a>
//               ) : (
//                 'N/A'
//               )}
//             </p>
//             <p>
//               <strong>Check Interval:</strong> {monitorDetails.CheckInterval} minutes
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Monitor Checks */}
//       <h2 className="text-3xl font-semibold text-secondary mb-4">Monitor Checks (Last 24 Hours)</h2>
//       {monitorChecks.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="table table-zebra table-auto w-full">
//             <thead>
//               <tr className="text-primary">
//                 <th>Timestamp</th>
//                 <th>Status</th>
//                 <th>Description</th>
//                 <th>Total Time (ms)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {monitorChecks.map((check) => (
//                 <tr key={check.Id}>
//                   <td>{new Date(check.Attributes.Timestamp).toLocaleString()}</td>
//                   <td
//                     className={
//                       check.Attributes.ErrorLevel === 'NoError'
//                         ? 'text-success'
//                         : 'text-error'
//                     }
//                   >
//                     {check.Attributes.ErrorLevel}
//                   </td>
//                   <td>{check.Attributes.ErrorDescription || 'N/A'}</td>
//                   <td>{check.Attributes.TotalTime}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-accent">No recent monitor checks available.</p>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MonitorDetails() {
  const { monitorGuid } = useParams(); // Extract monitorGuid from the URL
  const [monitorDetails, setMonitorDetails] = useState(null);
  const [monitorChecks, setMonitorChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMonitorData() {
      try {
        setLoading(true);
        console.log('Fetching monitor details and checks for monitorGuid:', monitorGuid);

        // Fetch monitor details
        const detailsRes = await fetch(`/api/uptrends/Monitor/${monitorGuid}`);
        console.log('Monitor details response status:', detailsRes.status);

        if (!detailsRes.ok) throw new Error('Failed to load monitor details');
        const detailsData = await detailsRes.json();
        console.log('Monitor details data:', detailsData);

        // Fetch monitor checks
        const checksRes = await fetch(`/api/uptrends/MonitorChecks/Monitor/${monitorGuid}`);
        console.log('Monitor checks response status:', checksRes.status);

        if (!checksRes.ok) throw new Error('Failed to load monitor checks');
        const checksData = await checksRes.json();
        console.log('Monitor checks data:', checksData);

        setMonitorDetails(detailsData);
        setMonitorChecks(checksData.Data || []);
      } catch (err) {
        console.error('Error during data fetch:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('Finished fetching monitor data.');
      }
    }

    if (monitorGuid) {
      console.log('MonitorGuid is present, initiating fetch:', monitorGuid);
      fetchMonitorData();
    } else {
      console.warn('MonitorGuid is missing. Skipping fetch.');
    }
  }, [monitorGuid]);

  if (loading) {
    console.log('Loading state active...');
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-xs"></span>
        <span className="loading loading-infinity loading-sm"></span>
        <span className="loading loading-infinity loading-md"></span>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) {
    console.error('Error state active:', error);
    return <p className="text-center text-error">Error: {error}</p>;
  }

  console.log('Rendering MonitorDetails component.');

  return (
    <div className="container mx-auto py-8">
      {/* Monitor Details Section */}
      <h1 className="text-4xl font-bold text-primary mb-6">Monitor Details</h1>

      {monitorDetails && (
        <div className="card bg-base-200 shadow-lg p-6 mb-8">
          <div className="card-body">
            <h2 className="card-title text-accent text-2xl">{monitorDetails.Name}</h2>
            <p>
              <strong>Type:</strong> {monitorDetails.MonitorType}
            </p>
            <p>
              <strong>URL:</strong>{' '}
              {monitorDetails.NetworkAddress ? (
                <a
                  href={monitorDetails.NetworkAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info underline"
                >
                  {monitorDetails.NetworkAddress}
                </a>
              ) : (
                'N/A'
              )}
            </p>
            <p>
              <strong>Check Interval:</strong> {monitorDetails.CheckInterval} minutes
            </p>
          </div>
        </div>
      )}

      {/* Monitor Checks */}
      <h2 className="text-3xl font-semibold text-secondary mb-4">Monitor Checks (Last 24 Hours)</h2>
      {monitorChecks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-auto w-full">
            <thead>
              <tr className="text-primary">
                <th>Timestamp</th>
                <th>Status</th>
                <th>Description</th>
                <th>Total Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {monitorChecks.map((check) => (
                <tr key={check.Id}>
                  <td>{new Date(check.Attributes.Timestamp).toLocaleString()}</td>
                  <td
                    className={
                      check.Attributes.ErrorLevel === 'NoError'
                        ? 'text-success'
                        : 'text-error'
                    }
                  >
                    {check.Attributes.ErrorLevel === 'NoError' ? '✅' : '❌'}
                  </td>
                  <td>{check.Attributes.ErrorDescription || 'N/A'}</td>
                  <td>{check.Attributes.TotalTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-accent">No recent monitor checks available.</p>
      )
      }
    </div >
  );
}
