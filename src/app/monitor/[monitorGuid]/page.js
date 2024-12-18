'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MonitorDetails() {
  const { monitorGuid } = useParams(); // Extract monitorGuid from the URL
  const [monitorDetails, setMonitorDetails] = useState(null);
  const [monitorChecks, setMonitorChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMonitorData() {
      try {
        setLoading(true);

        // Fetch monitor details
        const detailsRes = await fetch(`/api/uptrends/Monitor/${monitorGuid}`);
        if (!detailsRes.ok) throw new Error('Failed to load monitor details');
        const detailsData = await detailsRes.json();

        // Fetch monitor checks
        const checksRes = await fetch(`/api/uptrends/MonitorChecks/Monitor/${monitorGuid}`);
        if (!checksRes.ok) throw new Error('Failed to load monitor checks');
        const checksData = await checksRes.json();

        setMonitorDetails(detailsData);
        setMonitorChecks(checksData.Data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (monitorGuid) {
      fetchMonitorData();
    }
  }, [monitorGuid]);

  if (loading) return <p>Loading monitor details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Monitor Details</h1>

      {monitorDetails && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{monitorDetails.Name}</h2>
          <p><strong>Type:</strong> {monitorDetails.MonitorType}</p>
          <p><strong>URL:</strong> <a href={monitorDetails.Url} target="_blank" rel="noopener noreferrer">{monitorDetails.Url}</a></p>
          <p><strong>Check Interval:</strong> {monitorDetails.CheckInterval} minutes</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Monitor Checks (Last 24 Hours)</h2>
      {monitorChecks.length > 0 ? (
        <ul className="space-y-2">
          {monitorChecks.map((check) => (
            <li key={check.Id} className="border p-2 rounded shadow-sm">
              <p><strong>Timestamp:</strong> {new Date(check.Attributes.Timestamp).toLocaleString()}</p>
              <p><strong>Status:</strong> {check.Attributes.ErrorLevel}</p>
              <p><strong>Description:</strong> {check.Attributes.ErrorDescription || 'N/A'}</p>
              <p><strong>Total Time:</strong> {check.Attributes.TotalTime} ms</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent monitor checks available.</p>
      )}
    </div>
  );
}
