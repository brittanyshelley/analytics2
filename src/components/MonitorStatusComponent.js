'use client'
import React, { useEffect, useState } from 'react';
import { fetchMonitorGroup, fetchMonitorGroupMembers } from '../services/uptrendsService';

const MonitorStatusComponent = () => {
  const [monitorGroups, setMonitorGroups] = useState([]);
  const [monitorData, setMonitorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorGroupsData = async () => {
      try {
        // Fetch monitor groups
        const groups = await fetchMonitorGroup();
        setMonitorGroups(groups);

        // Fetch monitor data for each group
        const data = {};
        await Promise.all(
          groups.map(async (group) => {
            const members = await fetchMonitorGroupMembers(group.MonitorGroupGuid);
            data[group.MonitorGroupGuid] = members;
          })
        );
        setMonitorData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monitor data:', error.message, error.config, error.request, error.response);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMonitorGroupsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Monitor Groups</h1>
      {monitorGroups.map((group) => (
        <div key={group.MonitorGroupGuid}>
          <h2>{group.Description}</h2>
          <ul>
            {monitorData[group.MonitorGroupGuid]?.map((member, index) => (
              <li key={index}>
                {member.Name}: {member.Status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MonitorStatusComponent;