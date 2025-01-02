
//useApplicationData.js


// 'use client';
// import { useState, useEffect, useContext, createContext } from 'react';

// // Create a context
// const ApplicationDataContext = createContext();

// export function useApplicationDataProvider() {
//   const [monitorGroups, setMonitorGroups] = useState([]); // State for monitor groups
//   const [monitors, setMonitors] = useState({}); // State for monitors by group
//   const [monitorChecks, setMonitorChecks] = useState({}); // State for monitor checks by monitor GUID
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     let isMounted = true; // To prevent state updates on unmounted components

//     async function fetchApplicationData() {
//       try {
//         // Fetch monitor groups
//         const groupsRes = await fetch('/api/uptrends/monitor-groups');
//         if (!groupsRes.ok) {
//           throw new Error(`Failed to fetch monitor groups: ${groupsRes.status}`);
//         }
//         const groupsData = await groupsRes.json();
//         console.log('Monitor Groups Data:', groupsData);

//         if (isMounted) setMonitorGroups(groupsData); // Update state only if mounted

//         // Fetch monitors for each group
//         const monitorsByGroup = {};
//         const monitorChecksByMonitorGuid = {};
//         await Promise.all(
//           groupsData.map(async (group) => {
//             const groupGuid = group.MonitorGroupGuid;
//             if (!groupGuid) {
//               console.error('MonitorGroupGuid is missing');
//               return;
//             }

//             const monitorsRes = await fetch(`/api/uptrends/Monitor/MonitorGroup/${groupGuid}`);
//             if (!monitorsRes.ok) {
//               throw new Error(`Failed to fetch monitors for group ${groupGuid}`);
//             }
//             const monitorsData = await monitorsRes.json();
//             console.log(`Monitors for Group ${groupGuid}:`, monitorsData);
//             monitorsByGroup[groupGuid] = monitorsData;

//             // Fetch monitor checks for each monitor
//             await Promise.all(
//               monitorsData.map(async (monitor) => {
//                 const monitorGuid = monitor.MonitorGuid;
//                 if (!monitorGuid) {
//                   console.error('MonitorGuid is missing');
//                   return;
//                 }

//                 const checksRes = await fetch(`/api/uptrends/MonitorChecks/Monitor/${monitorGuid}?Sorting=Descending&Take=1&PresetPeriod=Last24Hours`);
//                 if (!checksRes.ok) {
//                   throw new Error(`Failed to fetch checks for monitor ${monitorGuid}`);
//                 }
//                 const checksData = await checksRes.json();
//                 console.log(`Checks for Monitor ${monitorGuid}:`, checksData);
//                 monitorChecksByMonitorGuid[monitorGuid] = checksData;
//               })
//             );
//           })
//         );

//         if (isMounted) {
//           setMonitors(monitorsByGroup); // Update monitors state
//           setMonitorChecks(monitorChecksByMonitorGuid); // Update monitor checks state
//           setLoading(false); // Set loading to false
//         }
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//         if (isMounted) setLoading(false); // Set loading to false on error
//       }
//     }

//     fetchApplicationData();

//     return () => {
//       isMounted = false; // Cleanup function to prevent state updates on unmounted components
//     };
//   }, []);

//   console.log('monitorGroups:', monitorGroups);
//   console.log('monitors:', monitors);
//   console.log('monitorChecks:', monitorChecks);
//   console.log('loading:', loading);

//   // Functions to allow manual setting/updating of state
//   const updateMonitorGroups = (newGroups) => setMonitorGroups(newGroups);
//   const updateMonitorsByGroup = (groupGuid, newMonitors) =>
//     setMonitors((prev) => ({ ...prev, [groupGuid]: newMonitors }));
//   const updateMonitorChecks = (monitorGuid, newChecks) =>
//     setMonitorChecks((prev) => ({ ...prev, [monitorGuid]: newChecks }));

//   return {
//     monitorGroups,
//     monitors,
//     monitorChecks,
//     loading,
//     updateMonitorGroups,
//     updateMonitorsByGroup,
//     updateMonitorChecks,
//   };
// }

// // Custom hook to consume the context
// export function useApplicationData() {
//   return useContext(ApplicationDataContext);
// }

// // Context provider
// export function ApplicationDataProvider({ children }) {
//   const value = useApplicationDataProvider();
//   return (
//     <ApplicationDataContext.Provider value={value}>
//       {children}
//     </ApplicationDataContext.Provider>
//   );
// }

// 'use client';
// import { useState, useEffect, useContext, createContext } from 'react';

// // Create a context
// const ApplicationDataContext = createContext();

// export function useApplicationDataProvider() {
//   const [monitorGroups, setMonitorGroups] = useState([]); // State for monitor groups
//   const [monitors, setMonitors] = useState({}); // State for monitors by group
//   // const [monitorChecks, setMonitorChecks] = useState({}); // State for monitor checks by monitor GUID
//   const [groupStatuses, setGroupStatuses] = useState({}); // State for group statuses
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     let isMounted = true; // To prevent state updates on unmounted components

//     async function fetchApplicationData() {
//       try {
//         // Fetch monitor groups
//         const groupsRes = await fetch('/api/uptrends/monitor-groups');
//         if (!groupsRes.ok) {
//           throw new Error(`Failed to fetch monitor groups: ${groupsRes.status}`);
//         }
//         const groupsData = await groupsRes.json();
//         console.log('Monitor Groups Data:', groupsData);

//         if (isMounted) setMonitorGroups(groupsData); // Update state only if mounted

//         // Fetch monitors and statuses for each group
//         const monitorsByGroup = {};
//         // const monitorChecksByMonitorGuid = {};
//         const statusesByGroup = {};
//         await Promise.all(
//           groupsData.map(async (group) => {
//             const groupGuid = group.MonitorGroupGuid;
//             if (!groupGuid) {
//               console.error('MonitorGroupGuid is missing');
//               return;
//             }

//             const monitorsRes = await fetch(`/api/uptrends/Monitor/MonitorGroup/${groupGuid}`);
//             if (!monitorsRes.ok) {
//               throw new Error(`Failed to fetch monitors for group ${groupGuid}`);
//             }
//             const monitorsData = await monitorsRes.json();
//             console.log(`Monitors for Group ${groupGuid}:`, monitorsData);
//             monitorsByGroup[groupGuid] = monitorsData;


//             // Fetch group statuses
//             const statusRes = await fetch(`/api/uptrends/GroupStatus?monitorGroupGuid=${groupGuid}&skip=0&take=10000`);
//             if (!statusRes.ok) {
//               throw new Error(`Failed to fetch statuses for group ${groupGuid}`);
//             }
//             const statusData = await statusRes.json();
//             statusesByGroup[groupGuid] = statusData;
//           })
//         );

//         if (isMounted) {
//           setMonitors(monitorsByGroup); // Update monitors state
//           // setMonitorChecks(monitorChecksByMonitorGuid); // Update monitor checks state
//           setGroupStatuses(statusesByGroup); // Update group statuses state
//           setLoading(false); // Set loading to false
//         }
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//         if (isMounted) setLoading(false); // Set loading to false on error
//       }
//     }

//     fetchApplicationData();

//     return () => {
//       isMounted = false; // Cleanup function to prevent state updates on unmounted components
//     };
//   }, []);

//   console.log('monitorGroups:', monitorGroups);
//   console.log('monitors:', monitors);
//   // console.log('monitorChecks:', monitorChecks);
//   console.log('groupStatuses:', groupStatuses);
//   console.log('loading:', loading);

//   // Functions to allow manual setting/updating of state
//   const updateMonitorGroups = (newGroups) => setMonitorGroups(newGroups);
//   const updateMonitorsByGroup = (groupGuid, newMonitors) =>
//     setMonitors((prev) => ({ ...prev, [groupGuid]: newMonitors }));
//   // const updateMonitorChecks = (monitorGuid, newChecks) =>
//   //   setMonitorChecks((prev) => ({ ...prev, [monitorGuid]: newChecks }));
//   const updateGroupStatuses = (groupGuid, newStatus) =>
//     setGroupStatuses((prev) => ({ ...prev, [groupGuid]: newStatus }));

//   return {
//     monitorGroups,
//     monitors,
//     // monitorChecks,
//     groupStatuses,
//     loading,
//     updateMonitorGroups,
//     updateMonitorsByGroup,
//     // updateMonitorChecks,
//     updateGroupStatuses,
//   };
// }

// // Custom hook to consume the context
// export function useApplicationData() {
//   return useContext(ApplicationDataContext);
// }

// // Context provider
// export function ApplicationDataProvider({ children }) {
//   const value = useApplicationDataProvider();
//   return (
//     <ApplicationDataContext.Provider value={value}>
//       {children}
//     </ApplicationDataContext.Provider>
//   );
// }

'use client';
import { useState, useEffect, useContext, createContext, useMemo } from 'react';

const ApplicationDataContext = createContext({
  monitorGroups: [],
  monitors: {},
  groupStatuses: {},
  loading: true,
  updateMonitorGroups: () => {},
  updateMonitorsByGroup: () => {},
  updateGroupStatuses: () => {},
});

export function useApplicationDataProvider() {
  const [monitorGroups, setMonitorGroups] = useState([]);
  const [monitors, setMonitors] = useState({});
  const [groupStatuses, setGroupStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchApplicationData() {
      try {
        const groupsRes = await fetch('/api/uptrends/monitor-groups');
        if (!groupsRes.ok) throw new Error(`Failed to fetch monitor groups: ${groupsRes.status}`);
        const groupsData = await groupsRes.json();

        if (isMounted) setMonitorGroups(groupsData);

        const monitorsByGroup = {};
        const statusesByGroup = {};
        await Promise.all(
          groupsData.map(async (group) => {
            const groupGuid = group.MonitorGroupGuid;
            if (!groupGuid) return;

            const monitorsRes = await fetch(`/api/uptrends/Monitor/MonitorGroup/${groupGuid}`);
            if (!monitorsRes.ok) throw new Error(`Failed to fetch monitors for group ${groupGuid}`);
            const monitorsData = await monitorsRes.json();
            monitorsByGroup[groupGuid] = monitorsData;

            const statusRes = await fetch(`/api/uptrends/GroupStatus?monitorGroupGuid=${groupGuid}&skip=0&take=10000`);
            if (!statusRes.ok) throw new Error(`Failed to fetch statuses for group ${groupGuid}`);
            const statusData = await statusRes.json();
            statusesByGroup[groupGuid] = statusData;
          })
        );

        if (isMounted) {
          setMonitors(monitorsByGroup);
          setGroupStatuses(statusesByGroup);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching application data:', error);
        if (isMounted) setLoading(false);
      }
    }

    fetchApplicationData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => ({
    monitorGroups,
    monitors,
    groupStatuses,
    loading,
    updateMonitorGroups: (newGroups) => setMonitorGroups(newGroups),
    updateMonitorsByGroup: (groupGuid, newMonitors) =>
      setMonitors((prev) => ({ ...prev, [groupGuid]: newMonitors })),
    updateGroupStatuses: (groupGuid, newStatus) =>
      setGroupStatuses((prev) => ({ ...prev, [groupGuid]: newStatus })),
  }), [monitorGroups, monitors, groupStatuses, loading]);

  return value;
}

export function useApplicationData() {
  return useContext(ApplicationDataContext);
}

export function ApplicationDataProvider({ children }) {
  const value = useApplicationDataProvider();
  return (
    <ApplicationDataContext.Provider value={value}>
      {children}
    </ApplicationDataContext.Provider>
  );
}

