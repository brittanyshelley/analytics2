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
import { useEffect, useState } from 'react';

const MonitorDetails = ({ monitorId }) => {
  const [monitor, setMonitor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitorDetails = async () => {
      console.log(`Fetching details for monitor ID: ${monitorId}`);
      try {
        const res = await fetch(`/api/uptrends/monitors/${monitorId}`);
        console.log(`API response status: ${res.status}`);
        if (!res.ok) throw new Error('Failed to fetch monitor details');

        const data = await res.json();
        console.log('Fetched monitor data:', data);
        setMonitor(data);
      } catch (err) {
        console.error('Error fetching monitor details:', err.message);
        setError(err.message);
      }
    };

    fetchMonitorDetails();
  }, [monitorId]);

  if (error) {
    console.error('Rendering error:', error);
    return <div>Error: {error}</div>;
  }

  if (!monitor) {
    console.log('Monitor details are not yet loaded, rendering loading state...');
    return <div>Loading...</div>;
  }

  console.log('Rendering monitor details:', monitor);
  return (
    <div>
      <h3>Monitor Details</h3>
      <p>Name: {monitor.Name}</p>
      <p>Status: {monitor.IsActive}</p>
      <p>Last Check: {monitor.LastCheck}</p>
      <button onClick={() => {
        console.log('Navigating back to the list');
        window.history.back();
      }}>
        Back to List
      </button>
    </div>
  );
};

export default MonitorDetails;
