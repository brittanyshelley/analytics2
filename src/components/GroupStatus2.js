// 'use client';

// import { useEffect, useState } from 'react';
// import Dropdown from '../../components/Dropdown';
// // import DataTable from '../../components/DataTable';

// const Dashboard = () => {
//   const [dataType, setDataType] = useState('monitors'); // Default to monitors
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     console.log(`Fetching data for ${dataType}`);

//     try {
//       if (dataType === 'monitor-groups') {
//         // Fetch monitor groups and their statuses
//         const groupsRes = await fetch(`/api/uptrends/monitor-groups`);
//         if (!groupsRes.ok) throw new Error('Error fetching monitor groups');
//         const groups = await groupsRes.json();

//         const statuses = await Promise.all(
//           groups.map(async (group) => {
//             const checksRes = await fetch(
//               `/api/uptrends/monitor-groups/${group.MonitorGroupGuid}`
//             );
//             if (!checksRes.ok) throw new Error(`Error fetching monitor group checks for ${group.MonitorGroupGuid}`);
//             const checks = await checksRes.json();

//             // Identify monitors with errors
//             const monitorsWithErrors = checks.Data.filter(
//               (check) => check.Attributes.ErrorLevel !== 'NoError'
//             ).map((check) => ({
//               MonitorName: check.Attributes.MonitorName,
//               ErrorLevel: check.Attributes.ErrorLevel,
//               ErrorDetails: check.Attributes.ErrorDetails || 'No additional details', // Add error details if available
//             }));

//             return {
//               Description: group.Description,
//               Status: monitorsWithErrors.length > 0 ? 'Error' : 'OK',
//               ErrorMonitors: monitorsWithErrors, // Include monitors with errors
//             };
//           })
//         );

//         console.log('Fetched monitor group statuses with error details:', statuses);
//         setData(statuses);
//       } else {
//         // Fetch other data types (e.g., monitors, metrics, alerts)
//         const res = await fetch(`/api/uptrends/${dataType}`);
//         if (!res.ok) throw new Error(`Error fetching ${dataType} data: ${res.status}`);
//         const result = await res.json();
//         setData(result);
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [dataType]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Dropdown
//         options={['monitors', 'monitor-groups', 'metrics', 'alerts']}
//         selected={dataType}
//         onChange={setDataType}
//       />
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {data.map((group, index) => (
//             <div key={index}>
//               <h3>{group.Description} - {group.Status}</h3>
//               {group.Status === 'Error' && (
//                 <ul>
//                   {group.ErrorMonitors.map((monitor, i) => (
//                     <li key={i}>
//                       <strong>{monitor.MonitorName}</strong>: {monitor.ErrorLevel} - {monitor.ErrorDetails}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// 'use client';

// import { useEffect, useState } from 'react';
// import Dropdown from '../../components/Dropdown';
// import { fetchMonitorGroupsWithStatuses, fetchDataByType } from '../../services/uptrendsService';

// const Dashboard = () => {
//   const [dataType, setDataType] = useState('monitors'); // Default to monitors
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (dataType === 'monitor-groups') {
//         const monitorGroups = await fetchMonitorGroupsWithStatuses();
//         setData(monitorGroups);
//       } else {
//         const otherData = await fetchDataByType(dataType);
//         setData(otherData);
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [dataType]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Dropdown
//         options={['monitors', 'monitor-groups', 'metrics', 'alerts']}
//         selected={dataType}
//         onChange={setDataType}
//       />
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {data.map((group, index) => (
//             <div key={index}>
//               <h3>{group.Description} - {group.Status}</h3>
//               {group.Status === 'Error' && (
//                 <ul>
//                   {group.ErrorMonitors.map((monitor, i) => (
//                     <li key={i}>
//                       <strong>{monitor.MonitorName}</strong>: {monitor.ErrorLevel} - {monitor.ErrorDetails}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
'use client';

import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import MonitorDetails from './MonitorDetails'; // Import the new component

const GroupStatus2 = () => {
  const [dataType, setDataType] = useState('monitors'); // Default to monitors
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGroupGuid, setSelectedGroupGuid] = useState(null); // State for selected group GUID

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    console.log(`Fetching data for ${dataType}`);

    try {
      if (dataType === 'monitor-groups') {
        // Fetch monitor groups and their statuses
        const groupsRes = await fetch(`/api/uptrends/monitor-groups`);
        if (!groupsRes.ok) throw new Error('Error fetching monitor groups');
        const groups = await groupsRes.json();

        const statuses = await Promise.all(
          groups.map(async (group) => {
            const checksRes = await fetch(
              `/api/uptrends/monitor-groups/${group.MonitorGroupGuid}`
            );
            if (!checksRes.ok) throw new Error(`Error fetching monitor group checks for ${group.MonitorGroupGuid}`);
            const checks = await checksRes.json();

            // Identify monitors with errors
            const monitorsWithErrors = checks.Data.filter(
              (check) => check.Attributes.ErrorLevel !== 'NoError'
            ).map((check) => ({
              MonitorName: check.Attributes.MonitorName,
              ErrorLevel: check.Attributes.ErrorLevel,
              ErrorDetails: check.Attributes.ErrorDetails || 'No additional details', // Add error details if available
            }));

            return {
              MonitorGroupGuid: group.MonitorGroupGuid, // Include GUID for selection
              Description: group.Description,
              Status: monitorsWithErrors.length > 0 ? 'Error' : 'OK',
              ErrorMonitors: monitorsWithErrors, // Include monitors with errors
            };
          })
        );

        console.log('Fetched monitor group statuses with error details:', statuses);
        setData(statuses);
      } else {
        // Fetch other data types (e.g., monitors, metrics, alerts)
        const res = await fetch(`/api/uptrends/${dataType}`);
        if (!res.ok) throw new Error(`Error fetching ${dataType} data: ${res.status}`);
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
        options={['monitors', 'monitor-groups', 'metrics', 'alerts']}
        selected={dataType}
        onChange={setDataType}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {dataType === 'monitor-groups' ? (
            <div>
              {data.map((group, index) => (
                <div key={index}>
                  <h3>{group.Description} - {group.Status}</h3>
                  <button onClick={() => setSelectedGroupGuid(group.MonitorGroupGuid)}>
                    View Details
                  </button>
                </div>
              ))}

              {selectedGroupGuid && (
                <MonitorDetails monitorGroupGuid={selectedGroupGuid} />
              )}
            </div>
          ) : (
            <div>
              {/* Render other data types */}
              {data.map((item, index) => (
                <div key={index}>{JSON.stringify(item)}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupStatus2;
// 'use client';

// import { useState, useEffect } from 'react';
// import MonitorList from './MonitorList'; // Import the component
// import { transformToGuidObject } from '../utils/transformToGuidObject'; // Import the utility

// const GroupStatus2 = () => {
//   const [monitorsByGuid, setMonitorsByGuid] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMonitorGroupMembers = async (monitorGroupGuid) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/uptrends/monitor-groups/${monitorGroupGuid}/Member`);
//       if (!response.ok) throw new Error(`Error fetching monitor group members: ${response.status}`);
//       const members = await response.json();
//       const transformedData = transformToGuidObject(members); // Transform data
//       setMonitorsByGuid(transformedData); // Save transformed data
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Example: Fetch data for a specific monitor group
//     fetchMonitorGroupMembers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* Pass structured data to MonitorList */}
//       <MonitorList monitorsByGuid={monitorsByGuid} />
//     </div>
//   );
// };

// export default GroupStatus2;
