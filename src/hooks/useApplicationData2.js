'use client';
import { useState, useEffect, useContext, createContext } from 'react';

// Create a context
const ApplicationDataContext = createContext();

export function useApplicationDataProvider() {
  const [monitorGroups, setMonitorGroups] = useState([]); // State for monitor groups
  const [monitors, setMonitors] = useState({}); // State for monitors by group
  const [monitorChecks, setMonitorChecks] = useState({}); // State for monitor checks by monitor GUID
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    async function fetchApplicationData() {
      try {
        // Fetch monitor groups
        const groupsRes = await fetch('/api/uptrends/monitor-groups');
        if (!groupsRes.ok) {
          throw new Error(`Failed to fetch monitor groups: ${groupsRes.status}`);
        }
        const groupsData = await groupsRes.json();
        console.log('Monitor Groups Data:', groupsData);

        if (isMounted) setMonitorGroups(groupsData); // Update state only if mounted

        // Fetch monitors for each group
        const monitorsByGroup = {};
        const monitorChecksByMonitorGuid = {};
        await Promise.all(
          groupsData.map(async (group) => {
            const groupGuid = group.MonitorGroupGuid;
            if (!groupGuid) {
              console.error('MonitorGroupGuid is missing');
              return;
            }

            const monitorsRes = await fetch(`/api/uptrends/Monitor/MonitorGroup/${groupGuid}`);
            if (!monitorsRes.ok) {
              throw new Error(`Failed to fetch monitors for group ${groupGuid}`);
            }
            const monitorsData = await monitorsRes.json();
            console.log(`Monitors for Group ${groupGuid}:`, monitorsData);
            monitorsByGroup[groupGuid] = monitorsData;

            // Fetch monitor checks for each monitor
            await Promise.all(
              monitorsData.map(async (monitor) => {
                const monitorGuid = monitor.MonitorGuid;
                if (!monitorGuid) {
                  console.error('MonitorGuid is missing');
                  return;
                }

                const checksRes = await fetch(`/api/uptrends/MonitorChecks/Monitor/${monitorGuid}?Sorting=Descending&Take=1&PresetPeriod=Last24Hours`);
                if (!checksRes.ok) {
                  throw new Error(`Failed to fetch checks for monitor ${monitorGuid}`);
                }
                const checksData = await checksRes.json();
                console.log(`Checks for Monitor ${monitorGuid}:`, checksData);
                monitorChecksByMonitorGuid[monitorGuid] = checksData;
              })
            );
          })
        );

        if (isMounted) {
          setMonitors(monitorsByGroup); // Update monitors state
          setMonitorChecks(monitorChecksByMonitorGuid); // Update monitor checks state
          setLoading(false); // Set loading to false
        }
      } catch (error) {
        console.error('Error fetching application data:', error);
        if (isMounted) setLoading(false); // Set loading to false on error
      }
    }

    fetchApplicationData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted components
    };
  }, []);

  console.log('monitorGroups:', monitorGroups);
  console.log('monitors:', monitors);
  console.log('monitorChecks:', monitorChecks);
  console.log('loading:', loading);

  // Functions to allow manual setting/updating of state
  const updateMonitorGroups = (newGroups) => setMonitorGroups(newGroups);
  const updateMonitorsByGroup = (groupGuid, newMonitors) =>
    setMonitors((prev) => ({ ...prev, [groupGuid]: newMonitors }));
  const updateMonitorChecks = (monitorGuid, newChecks) =>
    setMonitorChecks((prev) => ({ ...prev, [monitorGuid]: newChecks }));

  return {
    monitorGroups,
    monitors,
    monitorChecks,
    loading,
    updateMonitorGroups,
    updateMonitorsByGroup,
    updateMonitorChecks,
  };
}

// Custom hook to consume the context
export function useApplicationData() {
  return useContext(ApplicationDataContext);
}

// Context provider
export function ApplicationDataProvider({ children }) {
  const value = useApplicationDataProvider();
  return (
    <ApplicationDataContext.Provider value={value}>
      {children}
    </ApplicationDataContext.Provider>
  );
}
