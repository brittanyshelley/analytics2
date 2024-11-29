import React from 'react';

const MonitorList = ({ monitorsByGuid }) => {
  return (
    <div>
      <h2>Monitors</h2>
      <ul>
        {Object.entries(monitorsByGuid).map(([guid, monitor]) => (
          <li key={guid}>
            <strong>{monitor.Name || 'Unknown Name'}</strong> (GUID: {guid})
            <br />
            Type: {monitor.MonitorType}
            <br />
            URL: {monitor.Url || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonitorList;
