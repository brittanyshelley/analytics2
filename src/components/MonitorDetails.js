// import { useEffect, useState } from 'react';

// const MonitorDetails = ({ monitorId }) => {
//   const [monitor, setMonitor] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorDetails = async () => {
//       try {
//         const res = await fetch(`/api/uptrends/monitors/${monitorId}`);
//         if (!res.ok) throw new Error('Failed to fetch monitor details');
//         const data = await res.json();
//         setMonitor(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchMonitorDetails();
//   }, [monitorId]);

//   if (error) return <div>Error: {error}</div>;
//   if (!monitor) return <div>Loading...</div>;

//   return (
//     <div>
//       <h3>Monitor Details</h3>
//       <p>Name: {monitor.Name}</p>
//       <p>Status: {monitor.Status}</p>
//       <p>Last Check: {monitor.LastCheck}</p>
//       <button onClick={() => window.history.back()}>Back to List</button>
//     </div>
//   );
// };

// export default MonitorDetails;
// import { useEffect, useState } from 'react';

// const MonitorDetails = ({ monitorId }) => {
//   const [monitor, setMonitor] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonitorDetails = async () => {
//       console.log(`Fetching details for monitor ID: ${monitorId}`);
//       try {
//         const res = await fetch(`/api/uptrends/monitors/${monitorId}`);
//         console.log(`API response status: ${res.status}`);
//         if (!res.ok) throw new Error('Failed to fetch monitor details');

//         const data = await res.json();
//         console.log('Fetched monitor data:', data);
//         setMonitor(data);
//       } catch (err) {
//         console.error('Error fetching monitor details:', err.message);
//         setError(err.message);
//       }
//     };

//     fetchMonitorDetails();
//   }, [monitorId]);

//   if (error) {
//     console.error('Rendering error:', error);
//     return <div>Error: {error}</div>;
//   }

//   if (!monitor) {
//     console.log('Monitor details are not yet loaded, rendering loading state...');
//     return <div>Loading...</div>;
//   }

//   console.log('Rendering monitor details:', monitor);
//   return (
//     <div>
//       <h3>Monitor Details</h3>
//       <p>Name: {monitor.Name}</p>
//       <p>Status: {monitor.IsActive}</p>
//       <p>Last Check: {monitor.LastCheck}</p>
//       <button onClick={() => {
//         console.log('Navigating back to the list');
//         window.history.back();
//       }}>
//         Back to List
//       </button>
//     </div>
//   );
// };

// export default MonitorDetails;
'use client';

import { useEffect, useState } from 'react';

const MonitorDetails = ({ monitorGroupGuid }) => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorDetails = async () => {
      if (!monitorGroupGuid) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/uptrends/monitor-groups/${monitorGroupGuid}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch monitor details for group: ${monitorGroupGuid}`);
        }
        const data = await response.json();
        setMonitors(data.Data); // Adjust based on your API's structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonitorDetails();
  }, [monitorGroupGuid]);

  if (!monitorGroupGuid) {
    return <div>Please provide a Monitor Group GUID.</div>;
  }

  if (loading) {
    return <div>Loading monitor details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (monitors.length === 0) {
    return <div>No monitor details available.</div>;
  }

  return (
    <div>
      <h3>Monitor Details for Group: {monitorGroupGuid.Name}</h3>
      <table>
        <thead>
          <tr>
            <th>Monitor Name</th>
            <th>Error Level</th>
            <th>Error Details</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor, index) => (
            <tr key={index}>
              <td>{monitor.Attributes.Name}</td>
              <td>{monitor.Attributes.ErrorLevel}</td>
              <td>{monitor.Attributes.ErrorDetails || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitorDetails;
