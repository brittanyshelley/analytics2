// //useApplicationData.js

// 'use client';
// import { useState, useEffect, useContext, createContext } from 'react';

// // Create a context
// const ApplicationDataContext = createContext();

// export function useApplicationDataProvider() {
//   const [monitorGroups, setMonitorGroups] = useState([]);
//   const [monitors, setMonitors] = useState({});
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     async function fetchApplicationData() {
//       try {
//         const groupsRes = await fetch('/api/uptrends/monitor-groups/');
//         if (!groupsRes.ok) {
//           throw new Error(`HTTP error! status: ${groupsRes.status}`);
//         }
//         const groupsData = await groupsRes.json();
//         setMonitorGroups(groupsData);

//         // Fetch monitors for each group
//         const monitorsData = await Promise.all(
//           groupsData.map(async (group) => {
//             const res = await fetch(`/api/uptrends/monitors/${group.monitorGroupGuid}`);
//             if (!res.ok) {
//               throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             return res.json();
//           })
//         );

//         const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => {
//           acc[groupsData[idx].monitorGroupGuid] = monitors;
//           return acc;
//         }, {});

//         setMonitors(monitorsByGroup);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//         setLoading(false);
//       }
//     }

//     fetchApplicationData();
//   }, []);
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
//   const [monitorGroups, setMonitorGroups] = useState([]);
//   const [monitors, setMonitors] = useState({});
//   const [loading, setLoading] = useState(true);

  // Fetch data (example: fetch monitor groups and monitors)
//   useEffect(() => {
//     async function fetchApplicationData() {
//       try {
//         const groupsRes = await fetch('/api/uptrends/monitor-groups');
//         const groupsData = await groupsRes.json();
//         setMonitorGroups(groupsData);

//         // Fetch monitors for each group
//         const monitorsData = await Promise.all(
//           groupsData.map(async (group) => {
//             if (!group.monitorGroupGuid) {
//               throw new Error('MonitorGroupGuid is missing');
//             }
//             const res = await fetch(`/api/uptrends/monitors/${group.monitorGroupGuid}`);
//             return res.json();
//           })
//         );

//         const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => {
//           acc[groupsData[idx].monitorGroupGuid] = monitors;
//           return acc;
//         }, {});

//         setMonitors(monitorsByGroup);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//         setLoading(false);
//       }
//     }

//     fetchApplicationData();
//   }, []);

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
//   const [monitorGroups, setMonitorGroups] = useState([]);
//   const [monitors, setMonitors] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Fetch data (example: fetch monitor groups and monitors)
//   useEffect(() => {
//     async function fetchApplicationData() {
//       try {
//         const groupsRes = await fetch('/api/uptrends/monitor-groups');
//         const groupsData = await groupsRes.json();
//         console.log('Monitor Groups Data:', groupsData);
//         setMonitorGroups(groupsData);

//         // Fetch monitors for each group
//         const monitorsData = await Promise.all(
//           groupsData.map(async (group) => {
//             if (!group.monitorGroupGuid) {
//               throw new Error('MonitorGroupGuid is missing');
//             }
//             const res = await fetch(`/api/uptrends/monitors/${group.monitorGroupGuid}`);
//             const monitorData = await res.json();
//             console.log(`Monitors Data for Group ${group.monitorGroupGuid}:`, monitorData);
//             return monitorData;
//           })
//         );

//         const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => {
//           acc[groupsData[idx].monitorGroupGuid] = monitors;
//           return acc;
//         }, {});

//         console.log('Monitors by Group:', monitorsByGroup);
//         setMonitors(monitorsByGroup);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//         setLoading(false);
//       }
//     }

//     fetchApplicationData();
//   }, []);

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


'use client';
import { useState, useEffect, useContext, createContext } from 'react';

// Create a context
const ApplicationDataContext = createContext();

export function useApplicationDataProvider() {
  const [monitorGroups, setMonitorGroups] = useState([]); // State to store monitor groups
  const [monitors, setMonitors] = useState({}); // State to store monitors by group
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch data (example: fetch monitor groups and monitors)
  useEffect(() => {
    async function fetchApplicationData() { // Define an async function to fetch application data
      try {
        const groupsRes = await fetch('/api/uptrends/monitor-groups'); // Fetch monitor groups from the API
        const groupsData = await groupsRes.json(); // Parse the response as JSON
        console.log('Monitor Groups Data:', groupsData); // Log the fetched monitor groups data
        setMonitorGroups(groupsData); // Update state with fetched monitor groups

        // Fetch MonitorGuids for each group
        const monitorsData = await Promise.all(
          groupsData.map(async (group) => { // Map over each monitor group
            if (!group.MonitorGroupGuid) { // Check if MonitorGroupGuid is missing
              throw new Error('MonitorGroupGuid is missing'); // Throw an error if MonitorGroupGuid is missing
            }
            const memberRes = await fetch(`/api/uptrends/monitor-groups/${group.MonitorGroupGuid}/Member`); // Fetch MonitorGuids for the given monitor group
            const memberData = await memberRes.json(); // Parse the response as JSON
            console.log(`Member Data for Group ${group.MonitorGroupGuid}:`, memberData); // Log the fetched MonitorGuids for the group

            // Fetch monitors for each MonitorGuid
            const monitors = await Promise.all(
              memberData.map(async (member) => {
                const res = await fetch(`/api/uptrends/monitors/${member.MonitorGuid}`);
                const monitorData = await res.json();
                console.log(`Monitor Data for MonitorGuid ${member.MonitorGuid}:`, monitorData);
                return monitorData;
              })
            );

            return monitors;
          })
        );

        // Organize monitors by group
        const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => { // Reduce monitors data into an object grouped by MonitorGroupGuid
          acc[groupsData[idx].MonitorGroupGuid] = monitors; // Add monitors data to the corresponding group in the accumulator
          return acc; // Return the accumulator
        }, {});

        console.log('Monitors by Group:', monitorsByGroup); // Log the organized monitors data by group
        setMonitors(monitorsByGroup); // Update state with organized monitors data
        setLoading(false); // Set loading to false as data fetching is complete
      } catch (error) {
        console.error('Error fetching application data:', error); // Log any errors that occur during data fetching
        setLoading(false); // Set loading to false if an error occurs
      }
    }

    fetchApplicationData(); // Call the fetchApplicationData function
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return {
    monitorGroups, // Return monitorGroups state
    monitors, // Return monitors state
    loading, // Return loading state
  };
}

// Custom hook to consume the context
export function useApplicationData() {
  return useContext(ApplicationDataContext); // Use the ApplicationDataContext and return its value
}

// Context provider
export function ApplicationDataProvider({ children }) {
  const value = useApplicationDataProvider(); // Get the value from useApplicationDataProvider
  return (
    <ApplicationDataContext.Provider value={value}> // Provide the context value to children components
      {children} // Render children components
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

//   // Fetch data (example: fetch monitor groups and monitors)
//   useEffect(() => {
//     async function fetchApplicationData() {
//       try {
//         const groupsRes = await fetch('/api/uptrends/monitor-groups');
//         if (!groupsRes.ok) {
//           throw new Error(`Error fetching monitor groups: ${groupsRes.statusText}`);
//         }
//         const groupsData = await groupsRes.json();
//         setMonitorGroups(groupsData);

//         const monitorsData = await Promise.all(
//           groupsData.map(async (group) => {
//             const res = await fetch(`/api/uptrends/monitors/${group.monitorGroupGuid}`);
//             if (!res.ok) {
//               throw new Error(`Error fetching monitors for group ${group.monitorGroupGuid}: ${res.statusText}`);
//             }
//             return res.json();
//           })
//         );

//         const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => {
//           acc[groupsData[idx].monitorGroupGuid] = monitors;
//           return acc;
//         }, {});

//         setMonitors(monitorsByGroup);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//         setLoading(false);
//       }
//     }

//     fetchApplicationData();
//   }, []); // Empty dependency array ensures this runs only once after the initial render

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
//     <ApplicationDataContext.Provider value={value}> // Provide the context value to children components
//       {children} // Render children components
//     </ApplicationDataContext.Provider>
//   );
// }