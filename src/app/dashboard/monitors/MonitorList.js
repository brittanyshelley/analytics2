import { useEffect, useState } from 'react';
import MonitorDetails from './MonitorDetails';

const MonitorList = () => {
  const [monitors, setMonitors] = useState([]);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const res = await fetch('/api/uptrends/monitors');
        if (!res.ok) throw new Error('Failed to fetch monitors');
        const data = await res.json();
        setMonitors(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMonitors();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Monitor List</h2>
      {selectedMonitor ? (
        <MonitorDetails monitorId={selectedMonitor} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {monitors.map((monitor) => (
              <tr key={monitor.id}>
                <td>{monitor.Name}</td>
                <td>{monitor.IsActive}</td>
                <td>
                  <button onClick={() => setSelectedMonitor(monitor.Id)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MonitorList;
