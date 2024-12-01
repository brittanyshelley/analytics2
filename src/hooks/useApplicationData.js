'use client';
import { useState, useEffect, useContext, createContext } from 'react';

// Create a context
const ApplicationDataContext = createContext();

export function useApplicationDataProvider() {
  const [monitorGroups, setMonitorGroups] = useState([]);
  const [monitors, setMonitors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch data (example: fetch monitor groups and monitors)
  useEffect(() => {
    async function fetchApplicationData() {
      try {
        const groupsRes = await fetch('/api/uptrends/monitor-groups');
        const groupsData = await groupsRes.json();
        setMonitorGroups(groupsData);

        // Fetch monitors for each group
        const monitorsData = await Promise.all(
          groupsData.map(async (group) => {
            const res = await fetch(`/api/uptrends/monitors/${group.monitorGroupGuid}`);
            return res.json();
          })
        );

        const monitorsByGroup = monitorsData.reduce((acc, monitors, idx) => {
          acc[groupsData[idx].monitorGroupGuid] = monitors;
          return acc;
        }, {});

        setMonitors(monitorsByGroup);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application data:', error);
        setLoading(false);
      }
    }

    fetchApplicationData();
  }, []);

  return {
    monitorGroups,
    monitors,
    loading,
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