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

'use client';
import { useApplicationData } from '../../hooks/useApplicationData';

export default function Dashboard() {
  const {
    monitorGroups,
    monitors,
    // monitorChecks,
    groupStatuses,
    loading,
    updateMonitorGroups,
    updateMonitorsByGroup,
    // updateMonitorChecks,
    updateGroupStatuses,
  } = useApplicationData();

  if (loading) return <p>Loading...</p>;




  
  return (
    <div className="space-y-4">
      {monitorGroups.map((group) => (
        <div key={group.MonitorGroupGuid}>
          <h2>{group.Description}</h2>
          {/* Add console log for group status */}
          {console.log('Group Status:', groupStatuses[group.MonitorGroupGuid]?.Data[0]?.Attributes?.ErrorDescription)}
          <p>Status: {groupStatuses[group.MonitorGroupGuid]?.Data[0]?.Attributes?.ErrorDescription}</p>
          <ul>
            {monitors[group.MonitorGroupGuid]?.map((monitor) => (
              <li key={monitor.MonitorGuid}>
                {/* Add console log for monitor name */}
                {console.log('Monitor Name:', monitor.Name)}
                {monitor.Name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
