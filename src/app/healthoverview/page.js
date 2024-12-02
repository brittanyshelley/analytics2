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

'use client';

import { useApplicationData } from '@/hooks/useApplicationData';

export default function Dashboard() {
  const { monitorGroups, monitors, loading } = useApplicationData();

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Monitor Dashboard</h1>
      {monitorGroups.map((group) => (
        <div key={group.MonitorGroupGuid}>
          <h2>{group.Name}</h2>
          <ul>
            {monitors[group.MonitorGroupGuid]?.map((monitor) => (
              <li key={monitor.MonitorGuid}>{monitor.Name}</li>
            )) || <p>No monitors in this group.</p>}
          </ul>
        </div>
      ))}
    </div>
  );
}
