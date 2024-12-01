
'use client';

import React, { useState, useEffect } from 'react';
import { fetchMonitorChecksAndCategorize } from '../services/uptrendsService';

const MonitorGroupComponent = ({ monitorGroupGuid }) => {
  const [monitorData, setMonitorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMonitorData = async () => {
      if (!monitorGroupGuid) {
        setError('Group ID is required');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchMonitorChecksAndCategorize(monitorGroupGuid);
        setMonitorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMonitorData();
  }, [monitorGroupGuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Monitor Group Data</h1>
      <pre>{JSON.stringify(monitorData, null, 2)}</pre>
    </div>
  );
};

export default MonitorGroupComponent;