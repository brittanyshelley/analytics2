
// "use client";

// import React, { useState, useEffect } from 'react';

// const MonitorGroupStatus = ({ monitorGroupGuids }) => {
//   const [statuses, setStatuses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStatuses = async () => {
//       setLoading(true);
//       try {
//         const results = await Promise.all(
//           monitorGroupGuids.map(async (monitorGroupGuid) => {
//             const response = await fetch(`/api/uptrends/monitor-groups/${monitorGroupGuid}`);
//             if (!response.ok) {
//               throw new Error(`Failed to fetch data for group ${monitorGroupGuid}`);
//             }
//             const data = await response.json();
//             return { monitorGroupGuid, data };
//           })
//         );

//         const statusMap = results.reduce((acc, curr) => {
//           acc[curr.monitorGroupGuid] = curr.data;
//           return acc;
//         }, {});
//         setStatuses(statusMap);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatuses();
//   }, [monitorGroupGuids]);

//   if (loading) return <p>Loading statuses...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Monitor Group Statuses</h2>
//       {Object.entries(statuses).map(([monitorGroupGuid, data]) => (
//         <div key={monitorGroupGuid}>
//           <h3>Group ID: {monitorGroupGuid}</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MonitorGroupStatus;

// "use client";

// import React, { useState, useEffect } from 'react';

// const MonitorGroupStatus = ({ monitorGroupGuids }) => {
//   const [statuses, setStatuses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStatuses = async () => {
//       setLoading(true);
//       try {
//         const results = await Promise.all(
//           monitorGroupGuids.map(async (monitorGroupGuid) => {
//             const response = await fetch(`/api/uptrends/monitor-groups/${monitorGroupGuid}`);
//             if (!response.ok) {
//               throw new Error(`Failed to fetch data for group ${monitorGroupGuid}`);
//             }
//             const data = await response.json();
//             return { monitorGroupGuid, data };
//           })
//         );

//         const statusMap = results.reduce((acc, curr) => {
//           acc[curr.monitorGroupGuid] = curr.data;
//           return acc;
//         }, {});
//         setStatuses(statusMap);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatuses();
//   }, [monitorGroupGuids]);

//   if (loading) return <p>Loading statuses...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Monitor Group Statuses</h2>
//       {Object.entries(statuses).map(([monitorGroupGuid, data]) => (
//         <div key={monitorGroupGuid}>
//           <h3>Group ID: {monitorGroupGuid}</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MonitorGroupStatus;

// "use client";

// import React, { useState, useEffect } from 'react';

// const MonitorGroupStatus = ({ monitorGroups }) => {
//   const [statuses, setStatuses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStatuses = async () => {
//       setLoading(true);
//       try {
//         // Fetch statuses for all monitor groups
//         const results = await Promise.all(
//           monitorGroups.map(async ({ id, name }) => {
//             const response = await fetch(`/api/uptrends/monitor-groups/${id}`);
//             if (!response.ok) {
//               throw new Error(`Failed to fetch data for group ${name}`);
//             }
//             const data = await response.json();
//             return { id, name, data };
//           })
//         );

//         // Convert the results to a map
//         const statusMap = results.reduce((acc, curr) => {
//           acc[curr.id] = { name: curr.name, data: curr.data };
//           return acc;
//         }, {});
//         setStatuses(statusMap);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatuses();
//   }, [monitorGroups]);

//   if (loading) return <p>Loading statuses...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Monitor Group Statuses</h2>
//       {Object.entries(statuses).map(([monitorGroupGuid, { name, data }]) => (
//         <div key={monitorGroupGuid} className="monitor-group">
//           <h3>{name} (ID: {monitorGroupGuid})</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MonitorGroupStatus;

// "use client";

// import React, { useState, useEffect } from 'react';

// const MonitorGroupStatus = ({ monitorGroups }) => {
//   const [statuses, setStatuses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStatuses = async () => {
//       setLoading(true);
//       try {
//         const results = await Promise.all(
//           monitorGroups.map(async ({ id, name }) => {
//             const response = await fetch(`/api/uptrends/monitor-groups/${id}`);
//             if (!response.ok) {
//               throw new Error(`Failed to fetch data for group ${name}`);
//             }
//             const data = await response.json();
//             return { id, name, data };
//           })
//         );

//         const statusMap = results.reduce((acc, curr) => {
//           acc[curr.id] = { name: curr.name, data: curr.data };
//           return acc;
//         }, {});
//         setStatuses(statusMap);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatuses();
//   }, [monitorGroups]);

//   if (loading) return <p>Loading statuses...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Monitor Group Statuses</h2>
//       {Object.values(statuses).map(({ name, data }) => (
//         <div key={name} className="monitor-group">
//           <h3>{name}</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MonitorGroupStatus;
// "use client";

// import React, { useState, useEffect } from 'react';

// const MonitorGroupStatus = ({ monitorGroups }) => {
//   const [statuses, setStatuses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("Monitor Groups:", monitorGroups); // Debug log
//     const fetchStatuses = async () => {
//       setLoading(true);
//       try {
//         const results = await Promise.all(
//           monitorGroups.map(async ({ id, name }) => {
//             const response = await fetch(`/api/uptrends/monitor-groups/${id}`);
//             if (!response.ok) {
//               throw new Error(`Failed to fetch data for group ${name}`);
//             }
//             const data = await response.json();
//             return { id, name, data };
//           })
//         );

//         const statusMap = results.reduce((acc, curr) => {
//           acc[curr.id] = { name: curr.name, data: curr.data };
//           return acc;
//         }, {});
//         console.log("Fetched Statuses:", statusMap); // Debug log
//         setStatuses(statusMap);
//       } catch (err) {
//         console.error("Error fetching statuses:", err.message); // Debug log
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatuses();
//   }, [monitorGroups]);

//   if (loading) return <p>Loading statuses...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Monitor Group Statuses</h2>
//       {Object.keys(statuses).length > 0 ? (
//         Object.values(statuses).map(({ name, data }) => (
//           <div key={name} className="monitor-group">
//             <h3>{name}</h3>
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//           </div>
//         ))
//       ) : (
//         <p>No statuses available.</p>
//       )}
//     </div>
//   );
// };

// export default MonitorGroupStatus;
"use client";

import React, { useState, useEffect } from 'react';
import { fetchMonitorGroupsAndStatuses } from '../services/uptrendsService';

const MonitorGroupStatus = () => {
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      setLoading(true);
      try {
        const monitorGroupStatuses = await fetchMonitorGroupsAndStatuses();
        const statusMap = monitorGroupStatuses.reduce((acc, curr) => {
          acc[curr.monitorGroupGuid] = curr.monitorStatuses;
          return acc;
        }, {});
        setStatuses(statusMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  if (loading) return <p>Loading statuses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Monitor Group Statuses</h2>
      {Object.entries(statuses).map(([monitorGroupGuid, monitorStatuses]) => (
        <div key={monitorGroupGuid}>
          <h3>Group ID: {monitorGroupGuid}</h3>
          {monitorStatuses.map(({ monitorId, status }) => (
            <div key={monitorId}>
              <h4>Monitor ID: {monitorId}</h4>
              <pre>{JSON.stringify(status, null, 2)}</pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonitorGroupStatus;