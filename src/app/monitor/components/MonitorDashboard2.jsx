// app/monitor/components/MonitorDashboard.jsx
// 'use client';

// import { useEffect, useState } from 'react';

// export function MonitorDashboard() {
//   const [monitorChecks, setMonitorChecks] = useState([]);
//   const [monitorDetails, setMonitorDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const monitorGroupGuid = 'your-monitor-group-guid';
//         const queryParams = new URLSearchParams({
//           Sorting: 'Descending',
//           Take: '100',
//           PresetPeriod: 'Last24Hours'
//         });

//         // Fetch both monitor checks and monitor details in parallel
//         const [checksResponse, detailsResponse] = await Promise.all([
//           fetch(`/api/uptrends/monitor-groups/${monitorGroupGuid}?${queryParams}`),
//           fetch('/api/uptrends/Monitor') // You'll need to create this endpoint
//         ]);

//         if (!checksResponse.ok || !detailsResponse.ok) {
//           throw new Error('Failed to fetch monitor data');
//         }

//         const checksData = await checksResponse.json();
//         const detailsData = await detailsResponse.json();

//         setMonitorChecks(checksData.Data || []);
//         setMonitorDetails(detailsData || []);
//       } catch (error) {
//         console.error('Error fetching monitor data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);


// app/monitor/components/MonitorDashboard.jsx
'use client';

import { useEffect, useState } from 'react';

export function MonitorDashboard() {
  const [monitorGroups, setMonitorGroups] = useState([]);
  const [selectedGroupGuid, setSelectedGroupGuid] = useState(null);
  const [monitorChecks, setMonitorChecks] = useState([]);
  const [monitorDetails, setMonitorDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // First, fetch available monitor groups
  useEffect(() => {
    const fetchMonitorGroups = async () => {
      try {
        const response = await fetch('/api/uptrends/monitor-groups');
        if (!response.ok) throw new Error('Failed to fetch monitor groups');
        const data = await response.json();
        setMonitorGroups(data);
        // Set the first group as default if available
        if (data.length > 0) {
          setSelectedGroupGuid(data[0].MonitorGuid);
        }
      } catch (error) {
        console.error('Error fetching monitor groups:', error);
      }
    };

    fetchMonitorGroups();
  }, []);

  // Then fetch monitor data when a group is selected
  useEffect(() => {
    const fetchAllData = async () => {
      if (!selectedGroupGuid) return;

      try {
        const queryParams = new URLSearchParams({
          Sorting: 'Descending',
          Take: '100',
          PresetPeriod: 'Last24Hours'
        });

        const [checksResponse, detailsResponse] = await Promise.all([
          fetch(`/api/uptrends/monitor-groups/${selectedGroupGuid}?${queryParams}`),
          fetch('/api/uptrends/Monitor')
        ]);

        if (!checksResponse.ok || !detailsResponse.ok) {
          throw new Error('Failed to fetch monitor data');
        }

        const checksData = await checksResponse.json();
        const detailsData = await detailsResponse.json();

        setMonitorChecks(checksData.Data || []);
        setMonitorDetails(detailsData || []);
      } catch (error) {
        console.error('Error fetching monitor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedGroupGuid]);



  const mergedData = monitorChecks.map(check => {
    const matchingMonitor = monitorDetails.find(
      monitor => monitor.MonitorGuid === check.Attributes?.MonitorGuid
    );

    return {
      id: check.Id,
      name: matchingMonitor?.Name || 'Unknown Monitor',
      timestamp: check.Attributes?.Timestamp,
      responseTime: check.Attributes?.TotalTime,
      status: check.Attributes?.ErrorLevel,
      resolvedIp: check.Attributes?.ResolvedIpAddress,
      monitorDetails: {
        guid: check.Attributes?.MonitorGuid,
        errorDescription: check.Attributes?.ErrorDescription,
        errorMessage: check.Attributes?.ErrorMessage,
        serverId: check.Attributes?.ServerId,
        // Add monitor-specific details
        dnsServer: matchingMonitor?.DnsServer || '',
        dnsQuery: matchingMonitor?.DnsQuery || '',
        expectedResult: matchingMonitor?.DnsExpectedResult || '',
        checkInterval: matchingMonitor?.CheckInterval,
        monitorType: matchingMonitor?.MonitorType
      }
    };
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold mb-4">DNS Monitor Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {mergedData.map(item => (
//           <MonitorCard key={item.id} data={item} />
//         ))}
//       </div>
//     </div>
//   );
// }



return (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">DNS Monitor Dashboard</h1>
      <select
        value={selectedGroupGuid || ''}
        onChange={(e) => setSelectedGroupGuid(e.target.value)}
        className="border rounded-md p-2"
      >
        {monitorGroups.map(group => (
          <option key={group.MonitorGuid} value={group.MonitorGuid}>
            {group.Name}
          </option>
        ))}
      </select>
    </div>

    {loading ? (
      <LoadingSkeleton />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mergedData.map(item => (
          <MonitorCard key={item.id} data={item} />
        ))}
      </div>
    )}
  </div>
);
}


function MonitorCard({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'NoError':
        return 'bg-green-100 text-green-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg mb-2">{data.name}</h3>
      <div className="space-y-2">
        <div className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(data.status)}`}>
          {data.status}
        </div>
        <p className="text-sm text-gray-600">
          Response Time: <span className="font-medium">{data.responseTime}ms</span>
        </p>
        {data.monitorDetails.dnsServer && (
          <p className="text-sm text-gray-600">
            DNS Server: <span className="font-mono text-xs">{data.monitorDetails.dnsServer}</span>
          </p>
        )}
        <p className="text-sm text-gray-600">
          Resolved IP: <span className="font-mono text-xs">{data.resolvedIp}</span>
        </p>
        <p className="text-sm text-gray-600">
          Last Check: {new Date(data.timestamp).toLocaleString()}
        </p>
        {data.monitorDetails.errorMessage && (
          <p className="text-sm text-red-600">
            Error: {data.monitorDetails.errorMessage}
          </p>
        )}
        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
          <p>Monitor Type: {data.monitorDetails.monitorType}</p>
          <p>Check Interval: {data.monitorDetails.checkInterval} minute(s)</p>
          {data.monitorDetails.dnsQuery && (
            <>
              <p>Query Type: {data.monitorDetails.dnsQuery}</p>
              <p>Expected: {data.monitorDetails.expectedResult}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// LoadingSkeleton component remains the same