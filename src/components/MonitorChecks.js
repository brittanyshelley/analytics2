import React, { useState, useEffect } from 'react';
 // Replace with your API client path
import createUptrendsApiClient from '../services/uptrendsApiClient';

const apiClient = createUptrendsApiClient();

export default function MonitorChecks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonitors = async () => {
    const response = await apiClient.get('/Monitor');
    return response.data;
  };

  const fetchMonitorChecks = async (monitorGuid) => {
    const response = await apiClient.get(`/MonitorCheck/Monitor/${monitorGuid}`, {
      params: { Sorting: 'Descending', Take: 100, PresetPeriod: 'Last24Hours' },
    });
    return response.data;
  };

  const fetchAllMonitorChecks = async () => {
    const monitors = await fetchMonitors();
    const monitorChecksPromises = monitors.map((monitor) =>
      fetchMonitorChecks(monitor.MonitorGuid).then((checks) => ({
        MonitorGuid: monitor.MonitorGuid,
        Name: monitor.Name,
        MonitorChecks: checks,
      }))
    );
    return Promise.all(monitorChecksPromises);
  };

  const getMostRecentChecks = (monitorsWithChecks) => {
    return monitorsWithChecks.map((monitor) => {
      const { MonitorGuid, Name, MonitorChecks } = monitor;

      if (!MonitorChecks || MonitorChecks.length === 0) {
        return { MonitorGuid, Name, MostRecentCheck: null };
      }

      const mostRecentCheck = MonitorChecks.reduce((latest, current) =>
        new Date(current.Attributes.Timestamp) > new Date(latest.Attributes.Timestamp)
          ? current
          : latest
      );

      return { MonitorGuid, Name, MostRecentCheck: mostRecentCheck };
    });
  };

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        const monitorsWithChecks = await fetchAllMonitorChecks();
        const recentChecks = getMostRecentChecks(monitorsWithChecks);
        setData(recentChecks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Monitor Checks</h1>
      {data.map(({ MonitorGuid, Name, MostRecentCheck }) => (
        <div key={MonitorGuid}>
          <h3>{Name}</h3>
          {MostRecentCheck ? (
            <p>
              Timestamp: {MostRecentCheck.Attributes.Timestamp}, Status: {MostRecentCheck.Attributes.ErrorDescription}
            </p>
          ) : (
            <p>No checks available</p>
          )}
        </div>
      ))}
    </div>
  );
}
