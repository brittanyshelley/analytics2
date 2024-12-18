
//useApplicationData.js


'use client';
import { useState, useEffect, useContext, createContext } from 'react';

const ApplicationDataContext = createContext();

export function useApplicationDataProvider() {
  const [monitorGroups, setMonitorGroups] = useState([]);
  const [monitors, setMonitors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    let isMounted = true;

    async function fetchApplicationData() {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const groupsRes = await fetch('/api/uptrends/monitor-groups');
        if (!groupsRes.ok) {
          throw new Error(`Failed to fetch monitor groups: ${groupsRes.status}`);
        }
        const groupsData = await groupsRes.json();
        if (isMounted) setMonitorGroups(groupsData);

        const monitorsByGroup = {};
        await Promise.all(
          groupsData.map(async (group) => {
            const groupGuid = group.MonitorGroupGuid;
            if (!groupGuid) return;

            const monitorsRes = await fetch(`/api/uptrends/Monitor/MonitorGroup/${groupGuid}`);
            if (!monitorsRes.ok) {
              throw new Error(`Failed to fetch monitors for group ${groupGuid}`);
            }
            const monitorsData = await monitorsRes.json();
            monitorsByGroup[groupGuid] = monitorsData;
          })
        );

        if (isMounted) setMonitors(monitorsByGroup);
      } catch (err) {
        console.error('Error fetching application data:', err);
        if (isMounted) setError(err.message); // Set error message
      } finally {
        if (isMounted) setLoading(false); // Stop loading
      }
    }

    fetchApplicationData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    monitorGroups,
    monitors,
    loading,
    error, // Provide error state
  };
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



// 'use client';
// import { useState, useEffect, useContext, createContext } from 'react';

// // Create a context
// const ApplicationDataContext = createContext();

// export function useApplicationDataProvider() {
//   const [monitorGroups, setMonitorGroups] = useState([]); // State to store monitor groups
//   const [monitors, setMonitors] = useState({}); // State to store monitors by group
//   const [loading, setLoading] = useState(true); // State to track loading status

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
//           })
//         );

//         if (isMounted) {
//           setMonitors(monitorsByGroup); // Update monitors state
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
//   console.log('loading:', loading);

//   return {
//     monitorGroups,
//     monitors,
//     loading,
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
//   const [monitorGroups, setMonitorGroups] = useState([]); // State to store monitor groups
//   const [monitors, setMonitors] = useState({}); // State to store monitors by group
//   const [loading, setLoading] = useState(true); // State to track loading status

//   // Fetch data (example: fetch monitor groups and monitors)
//   useEffect(() => {
//     let isMounted = true; // To prevent state updates on unmounted components

//     async function fetchApplicationData() {
//       try {
//         // Step 1: Fetch monitor groups
//         const groupsRes = await fetch('/api/uptrends/monitor-groups');
//         if (!groupsRes.ok) {
//           throw new Error(`Failed to fetch monitor groups: ${groupsRes.status}`);
//         }
//         const groupsData = await groupsRes.json();
//         console.log('Monitor Groups Data:', groupsData);

//         if (isMounted) setMonitorGroups(groupsData); // Update state only if mounted

//         // Step 2: Fetch MonitorGuids for each group
//         const monitorsData = await Promise.all(
//           groupsData.map(async (group) => {
//             if (!group.MonitorGroupGuid) {
//               throw new Error('MonitorGroupGuid is missing');
//             }

//             const memberRes = await fetch(
//               `/api/uptrends/monitor-groups/${group.MonitorGroupGuid}/Member`
//             );
//             if (!memberRes.ok) {
//               throw new Error(`Failed to fetch members for group ${group.MonitorGroupGuid}`);
//             }
//             const memberData = await memberRes.json();
//             console.log(`Member Data for Group ${group.MonitorGroupGuid}:`, memberData);

//             // Fetch monitors for each MonitorGuid
//             const monitors = await Promise.all(
//               memberData.map(async (member) => {
//                 const res = await fetch(`/api/uptrends/Monitor/${member.MonitorGuid}`);
//                 if (!res.ok) {
//                   throw new Error(`Failed to fetch monitor ${member.MonitorGuid}`);
//                 }
//                 const monitorData = await res.json();
//                 console.log(`Monitor Data for MonitorGuid ${member.MonitorGuid}:`, monitorData);
//                 return monitorData;
//               })
//             );

//             return monitors;
//           })
//         );

//         // Step 3: Organize monitors by group
//         const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => {
//           acc[groupsData[idx].MonitorGroupGuid] = monitors;
//           return acc;
//         }, {});
//         console.log('Monitors by Group:', monitorsByGroup);

//         if (isMounted) {
//           setMonitors(monitorsByGroup); // Update state only if mounted
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
//   console.log('loading:', loading);

//   return {
//     monitorGroups, // Return monitorGroups state
//     monitors, // Return monitors state
//     loading, // Return loading state
//   };
// }

// // Custom hook to consume the context
// export function useApplicationData() {
//   return useContext(ApplicationDataContext); // Use the ApplicationDataContext and return its value
// }

// // Context provider
// export function ApplicationDataProvider({ children }) {
//   const value = useApplicationDataProvider(); // Get the value from useApplicationDataProvider
//   return (
//     <ApplicationDataContext.Provider value={value}>
//       {children}
//     </ApplicationDataContext.Provider>
//   );
// }


