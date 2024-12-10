import React, { useState, useEffect } from "react";

const MonitorGroupDetails = ({ monitorGroupGuid, monitors }) => {
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorData = async () => {
      try {
        const response = await fetch(`/api/uptrends/MonitorChecks?monitorGroupGuid=${monitorGroupGuid}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();

        // Process the fetched data
        const processed = result.map((monitor) => {
          const { MonitorGuid, Name, MonitorChecks } = monitor;

          if (MonitorChecks && MonitorChecks.length > 0) {
            // Sort MonitorChecks by Timestamp in descending order
            const sortedChecks = MonitorChecks.sort((a, b) =>
              new Date(b.Attributes.Timestamp) - new Date(a.Attributes.Timestamp)
            );

            // Get the most recent check
            const mostRecentCheck = sortedChecks[0];

            return {
              Name, // Use the monitor's name
              MostRecentErrorLevel: mostRecentCheck.Attributes.ErrorLevel,
              IsNoError: mostRecentCheck.Attributes.ErrorLevel === "NoError",
            };
          }

          // If no MonitorChecks exist
          return {
            Name,
            MostRecentErrorLevel: null,
            IsNoError: false,
          };
        });

        setProcessedData(processed);
        setData(result); // Optional: Store the raw data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (monitorGroupGuid) {
      fetchMonitorData();
    }
  }, [monitorGroupGuid]);

  if (loading) {
    return <p style={{ color: "blue" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Monitor Group Details</h1>
      <div>
        {processedData.map((monitor, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <h3>{monitor.Name}</h3>
            <p>
              Most Recent Error Level:{" "}
              <strong>{monitor.MostRecentErrorLevel || "No Data"}</strong>
            </p>
            <p>Status: {monitor.IsNoError ? "All Clear" : "Error Detected"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonitorGroupDetails;
