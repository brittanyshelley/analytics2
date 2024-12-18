'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function MonitorDetails() {
  const router = useRouter();
  const { monitorGuid } = router.query;

  const [monitorDetails, setMonitorDetails] = useState(null);
  const [monitorChecks, setMonitorChecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!monitorGuid) return;

    // Fetch monitor details and checks
    async function fetchMonitorData() {
      setLoading(true);
      try {
        // Fetch monitor information
        const monitorRes = await fetch(`app/api/uptrends/Monitor/${monitorGuid}`);
        const monitorData = await monitorRes.json();

        // Fetch the last 24 hours of monitor checks
        const checksRes = await fetch(`app/api/uptrends/MonitorChecks/Monitor/${monitorGuid}`);
        const checksData = await checksRes.json();

        setMonitorDetails(monitorData);
        setMonitorChecks(checksData.Data || []);
      } catch (error) {
        console.error('Error fetching monitor data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMonitorData();
  }, [monitorGuid]);

  if (loading) return <p>Loading monitor details...</p>;

  return (
    <div className="container mx-auto py-8">
      {monitorDetails && (
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">Monitor Details</h1>
          <p className="text-gray-600">
            <strong>Name:</strong> {monitorDetails.Name}
          </p>
          <p>
            <strong>Type:</strong> {monitorDetails.MonitorType}
          </p>
          <p>
            <strong>URL:</strong> <a href={monitorDetails.Url} target="_blank" rel="noopener noreferrer">{monitorDetails.Url}</a>
          </p>
        </header>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Last 24 Hours of Checks</h2>
        {monitorChecks.map((check) => (
          <div
            key={check.Id}
            className="border border-gray-200 rounded-lg p-4 shadow-md"
          >
            <p>
              <strong>Time:</strong> {new Date(check.Attributes.Timestamp).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {check.Attributes.ErrorLevel}
            </p>
            <p>
              <strong>Description:</strong> {check.Attributes.ErrorDescription || 'N/A'}
            </p>
            <p>
              <strong>Total Time:</strong> {check.Attributes.TotalTime} ms
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
