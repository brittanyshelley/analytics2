'use client';

import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import DataTable from '../../components/DataTable';

const Dashboard = () => {
  const [dataType, setDataType] = useState('monitors'); // Default to monitors
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    console.log(`Fetching data for ${dataType}`);

    try {
      if (dataType === 'monitor-groups') {
        // Fetch monitor groups and their statuses
        const groupsRes = await fetch(`/api/uptrends/monitor-groups`);
        console.log('Response from monitor groups API:', groupsRes);
        if (!groupsRes.ok) throw new Error('Error fetching monitor groups');
        const groups = await groupsRes.json();
        console.log('Monitor groups:', groups);

        const statuses = await Promise.all(
          groups.map(async (group) => {
            const checksRes = await fetch(
              `/api/uptrends/monitor-groups/${group.MonitorGroupGuid}`
            );
            console.log(`Response from monitor group checks API for ${group.MonitorGroupGuid}:`, checksRes);
            if (!checksRes.ok) throw new Error(`Error fetching monitor group checks for ${group.MonitorGroupGuid}`);
            const checks = await checksRes.json();
            console.log(`Checks for ${group.MonitorGroupGuid}:`, checks);

            const isError = checks.Data.some(
              (check) => check.Attributes.ErrorLevel !== 'NoError'
            );

            return {
              Description: group.Description,
              Status: isError ? 'Error' : 'OK',
            };
          })
        );

        console.log('Fetched monitor group statuses:', statuses);
        setData(statuses);
      } else {
        // Fetch other data types (e.g., monitors, metrics, alerts)
        const res = await fetch(`/api/uptrends/${dataType}`);
        console.log(`Response from ${dataType} API:`, res);
        if (!res.ok) throw new Error(`Error fetching ${dataType} data: ${res.status}`);
        const result = await res.json();
        console.log(`Fetched ${dataType} data:`, result);
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
        options={['monitors', 'metrics', 'alerts', 'monitor-groups']}
        selected={dataType}
        onChange={(value) => setDataType(value)}
      />
      {loading ? <div>Loading...</div> : <DataTable data={data} />}
    </div>
  );
};

export default Dashboard;
