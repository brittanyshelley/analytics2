import React from 'react';

export default async function HealthOverview() {
  // Fetch data directly in the component
  const res = await fetch('https://your-vcenter-api-endpoint/vms');
  const vmData = await res.json();

  return (
    <div>
      <h1>VM Health Overview</h1>
      <ul>
        {vmData.map(vm => (
          <li key={vm.id}>
            <p>{vm.name}</p>
            <p>Status: {vm.power_state}</p>
            <p>CPU Usage: {vm.cpu_usage}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
