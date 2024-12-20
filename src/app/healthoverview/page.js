// import { useEffect, useState } from "react";

// const MonitorGroupsStatus = () => {
//   const [monitorGroups, setMonitorGroups] = useState([]);
//   const [groupStatuses, setGroupStatuses] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMonitorGroups = async () => {
//       try {
//         // Fetch monitor groups
//         const resGroups = await fetch("/api/uptrends/monitor-groups");
//         const groups = await resGroups.json();
//         setMonitorGroups(groups);

//         // Fetch monitor checks for each group
//         const statuses = {};
//         await Promise.all(
//           groups.map(async (group) => {
//             const resChecks = await fetch(
//               `/api/uptrends/monitor-groups/${group.MonitorGroupGuid}`
//             );
//             const checks = await resChecks.json();

//             // Determine group status based on checks
//             const isError = checks.Data.some(
//               (check) => check.Attributes.ErrorLevel !== "NoError"
//             );
//             statuses[group.MonitorGroupGuid] = isError ? "Error" : "OK";
//           })
//         );

//         setGroupStatuses(statuses);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching monitor data:", error);
//         setLoading(false);
//       }
//     };

//     fetchMonitorGroups();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Monitor Group Status</h1>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Group Description</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {monitorGroups.map((group) => (
//             <tr key={group.MonitorGroupGuid}>
//               <td>{group.Description}</td>
//               <td>{groupStatuses[group.MonitorGroupGuid]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MonitorGroupsStatus;

// 'use client';
// import { useApplicationData } from '../../hooks/useApplicationData';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     monitors,
//     monitorChecks,
//     loading,
//     updateMonitorGroups,
//     updateMonitorsByGroup,
//     updateMonitorChecks,
//   } = useApplicationData();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* Display Monitor Groups */}
//       <h2>Monitor Groups</h2>
//       <ul>
//         {monitorGroups.map((group) => (
//           <li key={group.MonitorGroupGuid}>{group.Name}</li>
//         ))}
//       </ul>

//       {/* Display Monitors and Checks */}
//       <h2>Monitors</h2>
//       {Object.entries(monitors).map(([groupGuid, monitors]) => (
//         <div key={groupGuid}>
//           <h3>Group: {groupGuid}</h3>
//           <ul>
//             {monitors.map((monitor) => (
//               <li key={monitor.MonitorGuid}>
//                 {monitor.Name}
//                 <ul>
//                   {monitorChecks[monitor.MonitorGuid]?.map((check) => (
//                     <li key={check.CheckId}>{check.Description}</li>
//                   )) || <li>No checks available</li>}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// 'use client';
// import { useApplicationData } from '../../hooks/useApplicationData';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     monitors,
//     // monitorChecks,
//     groupStatuses,
//     loading,
//     updateMonitorGroups,
//     updateMonitorsByGroup,
//     // updateMonitorChecks,
//     updateGroupStatuses,
//   } = useApplicationData();

//   if (loading) return <p>Loading...</p>;





//   return (
//     <div className="space-y-4">
//       {monitorGroups.map((group) => (
//         <div key={group.MonitorGroupGuid}>
//           <h2>{group.Description}</h2>
//           {/* Add console log for group status */}
//           {console.log('Group Status:', groupStatuses[group.MonitorGroupGuid]?.Data[0]?.Attributes?.ErrorDescription)}
//           <p>Status: {groupStatuses[group.MonitorGroupGuid]?.Data[0]?.Attributes?.ErrorDescription}</p>
//           <ul>
//             {monitors[group.MonitorGroupGuid]?.map((monitor) => (
//               <li key={monitor.MonitorGuid}>
//                 {/* Add console log for monitor name */}
//                 {console.log('Monitor Name:', monitor.Name)}
//                 {monitor.Name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }


// 'use client';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     monitors,
//     groupStatuses,
//     loading,
//   } = useApplicationData();

//   // Show loading message while data is being fetched
//   if (loading) return <p>Loading...</p>;

//   // Evaluate statuses for all groups
//   const groupStatusIcons = evaluateGroupStatuses(groupStatuses);

//   return (
//     <div className="space-y-4">
//       {monitorGroups.map((group) => {
//         const groupId = group.MonitorGroupGuid;
//         const groupStatus = groupStatusIcons[groupId]; // Get ✅ or ❌

//         return (
//           <div key={groupId}>
//             <h2>{group.Description}</h2>
//             <p>Status: {groupStatus}</p> {/* Display ✅ or ❌ */}
//             <ul>
//               {monitors[groupId]?.map((monitor) => (
//                 <li key={monitor.MonitorGuid}>
//                   {monitor.Name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// 'use client';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     monitors,
//     groupStatuses,
//     loading,
//   } = useApplicationData();

//   // Show loading message while data is being fetched
//   if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;

//   // Evaluate statuses for all groups
//   const groupStatusIcons = evaluateGroupStatuses(groupStatuses);

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       {/* Header Section */}
//       <header className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Dashboard Status</h1>
//         <p className="text-gray-600">
//           Current status of all monitor groups
//         </p>
//       </header>

//       {/* Grid Layout for Groups */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {monitorGroups.map((group) => {
//           const groupId = group.MonitorGroupGuid;
//           const groupStatus = groupStatusIcons[groupId];
//           const statusColor = groupStatus === '✅' ? 'text-green-500' : 'text-red-500';

//           return (
//             <div
//               key={groupId}
//               className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition"
//             >
//               {/* Group Title */}
//               <h2 className="text-xl font-semibold mb-2">{group.Description}</h2>

//               {/* Status Indicator */}
//               <p className={`text-2xl font-bold mb-4 ${statusColor}`}>
//                 {groupStatus}
//               </p>

//               {/* Monitors List */}
//               <ul className="space-y-2">
//                 {monitors[groupId]?.map((monitor) => (
//                   <li key={monitor.MonitorGuid} className="flex items-center space-x-2">
//                     <span className="text-gray-700">{monitor.Name}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     monitors,
//     groupStatuses,
//     loading,
//   } = useApplicationData();

//   if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;

//   // Evaluate statuses for all groups
//   const groupStatusIcons = evaluateGroupStatuses(groupStatuses);

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       {/* Header Section */}
//       <header className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Dashboard Status</h1>
//         <p className="text-gray-600">
//           Current status of all monitor groups
//         </p>
//       </header>

//       {/* Grid Layout for Groups */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {monitorGroups.map((group) => {
//           const groupId = group.MonitorGroupGuid;
//           const groupData = groupStatuses[groupId]?.Data || [];

//           // Filter monitors with errors
//           const errorMonitors = groupData.filter(
//             (monitor) => monitor.Attributes.ErrorLevel !== 'NoError'
//           );

//           const groupStatus = groupStatusIcons[groupId];
//           const statusColor = groupStatus === '✅' ? 'text-green-500' : 'text-red-500';

//           return (
//             <div
//               key={groupId}
//               className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition"
//             >
//               {/* Group Title */}
//               <h2 className="text-xl font-semibold mb-2">{group.Description}</h2>

//               {/* Status Indicator */}
//               <p className={`text-2xl font-bold mb-4 ${statusColor}`}>
//                 {groupStatus}
//               </p>

//               {/* Display Error Monitors */}
//               {errorMonitors.length > 0 ? (
//                 <ul className="space-y-2">
//                   {errorMonitors.map((monitor) => (
//                     <li key={monitor.Id} className="text-red-500">
//                       {monitor.Attributes.CheckpointName}: {monitor.Attributes.ErrorDescription}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">All monitors operational</p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// 'use client';
// import Link from 'next/link';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     groupStatuses,
//     loading,
//   } = useApplicationData();

//   if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;

//   const groupStatusIcons = evaluateGroupStatuses(groupStatuses);

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <header className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Dashboard Status</h1>
//         <p className="text-gray-600">Current status of all monitor groups</p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {monitorGroups.map((group) => {
//           const groupId = group.MonitorGroupGuid;
//           const groupData = groupStatuses[groupId]?.Data || [];
//           const errorMonitors = groupData.filter(
//             (monitor) => monitor.Attributes.ErrorLevel !== 'NoError'
//           );

//           const groupStatus = groupStatusIcons[groupId];
//           const statusColor = groupStatus === '✅' ? 'text-green-500' : 'text-red-500';

//           return (
//             <div key={groupId} className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition">
//               <h2 className="text-xl font-semibold mb-2">{group.Description}</h2>
//               <p className={`text-2xl font-bold mb-4 ${statusColor}`}>{groupStatus}</p>

//               {errorMonitors.length > 0 ? (
//                 <ul className="space-y-2">
//                   {errorMonitors.map((monitor) => (
//                     <li key={monitor.Id} className="text-red-500">
//                       <Link href={`/monitor/${monitor.Attributes.MonitorGuid}`}>
//                         {monitor.Attributes.CheckpointName}: {monitor.Attributes.ErrorDescription}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">All monitors operational</p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// 'use client';
// import Link from 'next/link';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     groupStatuses,
//     loading,
//   } = useApplicationData();

//   if (loading) return <p className="text-center text-lg font-bold text-primary">Loading...</p>;

//   const groupStatusIcons = evaluateGroupStatuses(groupStatuses);

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       {/* Header */}
//       <header className="text-center">
//         <h1 className="text-4xl font-bold text-primary mb-4">Dashboard Status</h1>
//         <p className="text-base-content">Current status of all monitor groups</p>
//       </header>

//       {/* Monitor Groups */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {monitorGroups.map((group) => {
//           const groupId = group.MonitorGroupGuid;
//           const groupData = groupStatuses[groupId]?.Data || [];
//           const errorMonitors = groupData.filter(
//             (monitor) => monitor.Attributes.ErrorLevel !== 'NoError'
//           );

//           const groupStatus = groupStatusIcons[groupId];
//           const statusBadge =
//             groupStatus === '✅' ? 'text-green-500' : 'text-red-500';

//           return (
//             <div
//               key={groupId}
//               className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300"
//             >
//               <div className="card-body">
//                 {/* Group Title */}
//                 <h2 className="card-title text-secondary">{group.Description}</h2>

//                 {/* Group Status */}
//                 <div className="mb-4">
//                   <span className={statusBadge}>{groupStatus}</span>
//                 </div>

//                 {/* Error Monitors */}
//                 {errorMonitors.length > 0 ? (
//                   <ul className="list-disc list-inside space-y-2">
//                     {errorMonitors.map((monitor) => (
//                       <li key={monitor.Id} className="text-error">
//                         <Link
//                           href={`/monitor/${monitor.Attributes.MonitorGuid}`}
//                           className="link link-hover"
//                         >
//                           {monitor.Attributes.CheckpointName}: {monitor.Attributes.ErrorDescription}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-success">All monitors operational</p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import Link from 'next/link';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const {
//     monitorGroups,
//     groupStatuses,
//     loading,
//   } = useApplicationData();

//   console.log('Loading state:', loading);
//   console.log('Monitor Groups:', monitorGroups);
//   console.log('Group Statuses:', groupStatuses);

//   if (loading) {
//     console.log('Dashboard is in loading state.');
//     return <p className="text-center text-lg font-bold text-primary">Loading...</p>;
//   }

//   const groupStatusIcons = evaluateGroupStatuses(groupStatuses);
//   console.log('Evaluated Group Status Icons:', groupStatusIcons);

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       {/* Header */}
//       <header className="text-center">
//         <h1 className="text-4xl font-bold text-primary mb-4">Dashboard Status</h1>
//         <p className="text-base-content">Current status of all monitor groups</p>
//       </header>

//       {/* Monitor Groups */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {monitorGroups.map((group) => {
//           const groupId = group?.MonitorGroupGuid;
//           console.log(`Processing Group ID: ${groupId}`, group);

//           const groupData = groupStatuses?.[groupId]?.Data || [];
//           console.log(`Group Data for ${groupId}:`, groupData);

//           const errorMonitors = groupData.filter(
//             (monitor) => monitor?.Attributes?.ErrorLevel !== 'NoError'
//           );
//           console.log(`Error Monitors for ${groupId}:`, errorMonitors);

//           const groupStatus = groupStatusIcons[groupId] || '❓';
//           const statusBadge =
//             groupStatus === '✅' ? 'text-green-500' : 'text-red-500';

//           return (
//             <div
//               key={groupId || Math.random()}
//               className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300"
//             >
//               <div className="card-body">
//                 {/* Group Title */}
//                 <h2 className="card-title text-secondary">{group?.Description || 'No Description'}</h2>

//                 {/* Group Status */}
//                 <div className="mb-4">
//                   <span className={statusBadge}>{groupStatus}</span>
//                 </div>

//                 {/* Error Monitors */}
//                 {errorMonitors.length > 0 ? (
//                   <ul className="list-disc list-inside space-y-2">
//                     {errorMonitors.map((monitor) => (
//                       <li key={monitor?.Id || Math.random()} className="text-error">
//                         <Link
//                           href={`/monitor/${monitor?.Attributes?.MonitorGuid}`}
//                           className="link link-hover"
//                         >
//                           {monitor?.Attributes?.CheckpointName || 'Unknown'}:{" "}
//                           {monitor?.Attributes?.ErrorDescription || 'No details'}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-success">All monitors operational</p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// // 'use client';

// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useApplicationData } from '../../hooks/useApplicationData';
// import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

// export default function Dashboard() {
//   const params = useParams(); // Access route params dynamically
//   const { monitorGroups, groupStatuses, loading } = useApplicationData();

//   const [dynamicGroupStatuses, setDynamicGroupStatuses] = useState(null);

//   useEffect(() => {
//     if (params) {
//       console.log('Params:', params); // Debug route params
//       setDynamicGroupStatuses(groupStatuses); // Set dynamically after params are unwrapped
//     }
//   }, [params, groupStatuses]);

//   if (loading) {
//     console.log('Dashboard is loading...');
//     return <p className="text-center text-lg font-bold text-primary">Loading...</p>;
//   }

//   if (!monitorGroups || monitorGroups.length === 0) {
//     console.log('No monitor groups available.');
//     return <p className="text-center text-error">No monitor groups available.</p>;
//   }

//   const groupStatusIcons = evaluateGroupStatuses(dynamicGroupStatuses || {});

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       {/* Header */}
//       <header className="text-center">
//         <h1 className="text-4xl font-bold text-primary mb-4">Dashboard Status</h1>
//         <p className="text-base-content">Current status of all monitor groups</p>
//       </header>

//       {/* Monitor Groups */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {monitorGroups.map((group) => {
//           const groupId = group?.MonitorGroupGuid;
//           const groupData = groupStatuses?.[groupId]?.Data || [];
//           const errorMonitors = groupData.filter(
//             (monitor) => monitor?.Attributes?.ErrorLevel !== 'NoError'
//           );

//           const groupStatus = groupStatusIcons[groupId] || '❓';
//           const statusBadge =
//             groupStatus === '✅' ? 'text-green-500' : 'text-red-500';

//           return (
//             <div
//               key={groupId || Math.random()}
//               className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300"
//             >
//               <div className="card-body">
//                 {/* Group Title */}
//                 <h2 className="card-title text-secondary">{group?.Description || 'No Description'}</h2>

//                 {/* Group Status */}
//                 <div className="mb-4">
//                   <span className={statusBadge}>{groupStatus}</span>
//                 </div>

//                 {/* Error Monitors */}
//                 {errorMonitors.length > 0 ? (
//                   <ul className="list-disc list-inside space-y-2">
//                     {errorMonitors.map((monitor) => (
//                       <li key={monitor?.Id || Math.random()} className="text-error">
//                         <Link
//                           href={`/monitor/${monitor?.Attributes?.MonitorGuid}`}
//                           className="link link-hover"
//                         >
//                           {monitor?.Attributes?.CheckpointName || 'Unknown'}:{" "}
//                           {monitor?.Attributes?.ErrorDescription || 'No details'}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-success">All monitors operational</p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


'use client';
import { useApplicationData } from '../../hooks/useApplicationData';
import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';

export default function Dashboard() {
  const {
    monitorGroups,
    monitors,
    groupStatuses,
    loading,
  } = useApplicationData();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  // Evaluate statuses for all groups
  const groupStatusIcons = evaluateGroupStatuses(groupStatuses);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Dashboard Status</h1>
        <p className="text-base-content">Current status of all monitor groups</p>
      </header>

      {/* Grid Layout for Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitorGroups.map((group) => {
          const groupId = group.MonitorGroupGuid;
          const groupData = groupStatuses[groupId]?.Data || [];

          // Filter monitors with errors
          const errorMonitors = groupData.filter(
            (monitor) => monitor.Attributes.ErrorLevel !== 'NoError'
          );

          const groupStatus = groupStatusIcons[groupId];
          const statusBadge =
            groupStatus === '✅' ? 'text-success' : 'text-error';

          return (
            <div
              key={groupId}
              className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="card-body">
                {/* Group Title */}
                <h2 className="card-title text-secondary">{group.Description}</h2>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`text-2xl font-bold ${statusBadge}`}>
                    {groupStatus}
                  </span>
                </div>

                {/* Display Error Monitors */}
                {errorMonitors.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {errorMonitors.map((monitor) => (
                      <li key={monitor.Id}>
                        <span className="text-error">
                          {monitor.Attributes.CheckpointName}: {monitor.Attributes.ErrorDescription}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-success">All monitors operational</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
