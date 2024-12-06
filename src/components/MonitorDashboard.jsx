// 'use client';

// import { useEffect, useState } from 'react';

// export function MonitorDashboard() {
//   console.log('MonitorDashboard Component Rendered'); // Log component render

//   const [monitorGroups, setMonitorGroups] = useState([]);
//   const [selectedGroupGuid, setSelectedGroupGuid] = useState(null);
//   const [monitorChecks, setMonitorChecks] = useState([]);
//   const [monitorDetails, setMonitorDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // First, fetch available monitor groups
//   useEffect(() => {
//     console.log('Monitor Groups Fetch Effect Triggered');

//     const fetchMonitorGroups = async () => {
//       try {
//         console.log('Fetching monitor groups...');
//         const response = await fetch('/api/uptrends/monitor-groups');
//         console.log('Monitor groups response:', response);

//         if (!response.ok) throw new Error('Failed to fetch monitor groups');
//         const data = await response.json();
//         console.log('Fetched monitor groups:', data);

//         setMonitorGroups(data);
//         // Set the first group as default if available
//         if (data.length > 0) {
//           console.log('Setting default group:', data[0].MonitorGuid);
//           setSelectedGroupGuid(data[0].MonitorGuid);
//         }
//       } catch (error) {
//         console.error('Error fetching monitor groups:', error);
//       }
//     };

//     fetchMonitorGroups();
//   }, []);

//   // Then fetch monitor data when a group is selected
//   useEffect(() => {
//     console.log('Monitor Data Fetch Effect Triggered, Selected GUID:', selectedGroupGuid);

//     const fetchAllData = async () => {
//       if (!selectedGroupGuid) {
//         console.log('No group selected, skipping data fetch');
//         return;
//       }

//       try {
//         const queryParams = new URLSearchParams({
//           Sorting: 'Descending',
//           Take: '100',
//           PresetPeriod: 'Last24Hours'
//         });

//         console.log('Fetching monitor checks and details...');
//         const [checksResponse, detailsResponse] = await Promise.all([
//           fetch(`/api/uptrends/monitor-groups/${selectedGroupGuid}?${queryParams}`),
//           fetch('/api/uptrends/Monitor')
//         ]);

//         console.log('Checks Response:', checksResponse);
//         console.log('Details Response:', detailsResponse);

//         if (!checksResponse.ok || !detailsResponse.ok) {
//           throw new Error('Failed to fetch monitor data');
//         }

//         const checksData = await checksResponse.json();
//         const detailsData = await detailsResponse.json();

//         console.log('Fetched Checks Data:', checksData);
//         console.log('Fetched Details Data:', detailsData);

//         setMonitorChecks(checksData.Data || []);
//         setMonitorDetails(detailsData || []);
//       } catch (error) {
//         console.error('Error fetching monitor data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, [selectedGroupGuid]);

//   const mergedData = monitorChecks.map(check => {
//     const matchingMonitor = monitorDetails.find(
//       monitor => monitor.MonitorGuid === check.Attributes?.MonitorGuid
//     );

//     console.log('Merging data for check:', check.Id);
//     console.log('Matching monitor found:', matchingMonitor ? 'Yes' : 'No');

//     return {
//       id: check.Id,
//       name: matchingMonitor?.Name || 'Unknown Monitor',
//       timestamp: check.Attributes?.Timestamp,
//       responseTime: check.Attributes?.TotalTime,
//       status: check.Attributes?.ErrorLevel,
//       resolvedIp: check.Attributes?.ResolvedIpAddress,
//       monitorDetails: {
//         guid: check.Attributes?.MonitorGuid,
//         errorDescription: check.Attributes?.ErrorDescription,
//         errorMessage: check.Attributes?.ErrorMessage,
//         serverId: check.Attributes?.ServerId,
//         dnsServer: matchingMonitor?.DnsServer || '',
//         dnsQuery: matchingMonitor?.DnsQuery || '',
//         expectedResult: matchingMonitor?.DnsExpectedResult || '',
//         checkInterval: matchingMonitor?.CheckInterval,
//         monitorType: matchingMonitor?.MonitorType
//       }
//     };
//   });

//   console.log('Merged Data:', mergedData);

//   if (loading) {
//     console.log('Rendering loading skeleton');
//     return <LoadingSkeleton />;
//   }

//   console.log('Rendering dashboard with data');
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">DNS Monitor Dashboard</h1>
//         <select
//           value={selectedGroupGuid || ''}
//           onChange={(e) => {
//             console.log('Group selection changed to:', e.target.value);
//             setSelectedGroupGuid(e.target.value);
//           }}
//           className="border rounded-md p-2"
//         >
//           {monitorGroups.map(group => (
//             <option key={group.MonitorGuid} value={group.MonitorGuid}>
//               {group.Name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <LoadingSkeleton />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {mergedData.map(item => (
//             <MonitorCard key={item.id} data={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MonitorCard({ data }) {
//   console.log('Rendering MonitorCard for:', data.name);

//   const getStatusColor = (status) => {
//     console.log('Getting status color for:', status);
//     switch (status) {
//       case 'NoError':
//         return 'bg-green-100 text-green-800';
//       case 'Error':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       <h3 className="font-bold text-lg mb-2">{data.name}</h3>
//       <div className="space-y-2">
//         <div className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(data.status)}`}>
//           {data.status}
//         </div>
//         <p className="text-sm text-gray-600">
//           Response Time: <span className="font-medium">{data.responseTime}ms</span>
//         </p>
//         {data.monitorDetails.dnsServer && (
//           <p className="text-sm text-gray-600">
//             DNS Server: <span className="font-mono text-xs">{data.monitorDetails.dnsServer}</span>
//           </p>
//         )}
//         <p className="text-sm text-gray-600">
//           Resolved IP: <span className="font-mono text-xs">{data.resolvedIp}</span>
//         </p>
//         <p className="text-sm text-gray-600">
//           Last Check: {new Date(data.timestamp).toLocaleString()}
//         </p>
//         {data.monitorDetails.errorMessage && (
//           <p className="text-sm text-red-600">
//             Error: {data.monitorDetails.errorMessage}
//           </p>
//         )}
//         <div className="mt-4 pt-4 border-t text-xs text-gray-500">
//           <p>Monitor Type: {data.monitorDetails.monitorType}</p>
//           <p>Check Interval: {data.monitorDetails.checkInterval} minute(s)</p>
//           {data.monitorDetails.dnsQuery && (
//             <>
//               <p>Query Type: {data.monitorDetails.dnsQuery}</p>
//               <p>Expected: {data.monitorDetails.expectedResult}</p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MonitorDashboard;

// 'use client';

// import React, { useEffect, useState } from 'react';

// function LoadingSkeleton() {
//   return (
//     <div className="space-y-4">
//       <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="border rounded-lg p-4 space-y-4 animate-pulse">
//             <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MonitorDashboard() {
//   console.log('MonitorDashboard Component Rendered');

//   const [monitorGroups, setMonitorGroups] = useState([]);
//   const [selectedGroupGuid, setSelectedGroupGuid] = useState('');
//   const [monitorChecks, setMonitorChecks] = useState([]);
//   const [monitorDetails, setMonitorDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log('Monitor Groups Fetch Effect Triggered');

//     async function fetchMonitorGroups() {
//       try {
//         console.log('Fetching monitor groups...');
//         const response = await fetch('/api/uptrends/monitor-groups');
//         console.log('Monitor groups response:', response);

//         if (!response.ok) throw new Error('Failed to fetch monitor groups');
//         const data = await response.json();
//         console.log('Fetched monitor groups:', data);

//         setMonitorGroups(data);
//         if (data.length > 0) {
//           console.log('Setting default group:', data[0].MonitorGuid);
//           setSelectedGroupGuid(data[0].MonitorGuid);
//         }
//       } catch (error) {
//         console.error('Error fetching monitor groups:', error);
//       }
//     }

//     fetchMonitorGroups();
//   }, []);

//   useEffect(() => {
//     console.log('Monitor Data Fetch Effect Triggered, Selected GUID:', selectedGroupGuid);

//     async function fetchAllData() {
//       if (!selectedGroupGuid) {
//         console.log('No group selected, skipping data fetch');
//         return;
//       }

//       try {
//         const queryParams = new URLSearchParams({
//           Sorting: 'Descending',
//           Take: '100',
//           PresetPeriod: 'Last24Hours'
//         });

//         console.log('Fetching monitor checks and details...');
//         const [checksResponse, detailsResponse] = await Promise.all([
//           fetch(`/api/uptrends/monitor-groups/${selectedGroupGuid}?${queryParams}`),
//           fetch('/api/uptrends/Monitor')
//         ]);

//         console.log('Checks Response:', checksResponse);
//         console.log('Details Response:', detailsResponse);

//         if (!checksResponse.ok || !detailsResponse.ok) {
//           throw new Error('Failed to fetch monitor data');
//         }

//         const checksData = await checksResponse.json();
//         const detailsData = await detailsResponse.json();

//         console.log('Fetched Checks Data:', checksData);
//         console.log('Fetched Details Data:', detailsData);

//         setMonitorChecks(checksData.Data || []);
//         setMonitorDetails(detailsData || []);
//       } catch (error) {
//         console.error('Error fetching monitor data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllData();
//   }, [selectedGroupGuid]);

//   const mergedData = monitorChecks.map(check => {
//     const matchingMonitor = monitorDetails.find(
//       monitor => monitor.MonitorGuid === (check.Attributes && check.Attributes.MonitorGuid)
//     );

//     console.log('Merging data for check:', check.Id);
//     console.log('Matching monitor found:', matchingMonitor ? 'Yes' : 'No');

//     const attributes = check.Attributes || {};

//     return {
//       id: check.Id,
//       name: (matchingMonitor && matchingMonitor.Name) || 'Unknown Monitor',
//       timestamp: attributes.Timestamp,
//       responseTime: attributes.TotalTime,
//       status: attributes.ErrorLevel,
//       resolvedIp: attributes.ResolvedIpAddress,
//       monitorDetails: {
//         guid: attributes.MonitorGuid,
//         errorDescription: attributes.ErrorDescription,
//         errorMessage: attributes.ErrorMessage,
//         serverId: attributes.ServerId,
//         dnsServer: (matchingMonitor && matchingMonitor.DnsServer) || '',
//         dnsQuery: (matchingMonitor && matchingMonitor.DnsQuery) || '',
//         expectedResult: (matchingMonitor && matchingMonitor.DnsExpectedResult) || '',
//         checkInterval: matchingMonitor && matchingMonitor.CheckInterval,
//         monitorType: matchingMonitor && matchingMonitor.MonitorType
//       }
//     };
//   });

//   console.log('Merged Data:', mergedData);

//   if (loading) {
//     console.log('Rendering loading skeleton');
//     return <LoadingSkeleton />;
//   }

//   function MonitorCard({ data }) {
//     console.log('Rendering MonitorCard for:', data.name);

//     function getStatusColor(status) {
//       console.log('Getting status color for:', status);
//       switch (status) {
//         case 'NoError':
//           return 'bg-green-100 text-green-800';
//         case 'Error':
//           return 'bg-red-100 text-red-800';
//         default:
//           return 'bg-gray-100 text-gray-800';
//       }
//     }

//     return (
//       <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//         <h3 className="font-bold text-lg mb-2">{data.name}</h3>
//         <div className="space-y-2">
//           <div className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(data.status)}`}>
//             {data.status}
//           </div>
//           <p className="text-sm text-gray-600">
//             Response Time: <span className="font-medium">{data.responseTime}ms</span>
//           </p>
//           {data.monitorDetails.dnsServer && (
//             <p className="text-sm text-gray-600">
//               DNS Server: <span className="font-mono text-xs">{data.monitorDetails.dnsServer}</span>
//             </p>
//           )}
//           <p className="text-sm text-gray-600">
//             Resolved IP: <span className="font-mono text-xs">{data.resolvedIp}</span>
//           </p>
//           <p className="text-sm text-gray-600">
//             Last Check: {new Date(data.timestamp).toLocaleString()}
//           </p>
//           {data.monitorDetails.errorMessage && (
//             <p className="text-sm text-red-600">
//               Error: {data.monitorDetails.errorMessage}
//             </p>
//           )}
//           <div className="mt-4 pt-4 border-t text-xs text-gray-500">
//             <p>Monitor Type: {data.monitorDetails.monitorType}</p>
//             <p>Check Interval: {data.monitorDetails.checkInterval} minute(s)</p>
//             {data.monitorDetails.dnsQuery && (
//               <React.Fragment>
//                 <p>Query Type: {data.monitorDetails.dnsQuery}</p>
//                 <p>Expected: {data.monitorDetails.expectedResult}</p>
//               </React.Fragment>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   console.log('Rendering dashboard with data');
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">DNS Monitor Dashboard</h1>
//         <select
//           value={selectedGroupGuid}
//           onChange={(e) => {
//             console.log('Group selection changed to:', e.target.value);
//             setSelectedGroupGuid(e.target.value);
//           }}
//           className="border rounded-md p-2"
//         >
//           {monitorGroups.map(group => (
//             <option key={group.MonitorGuid} value={group.MonitorGuid}>
//               {group.Name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <LoadingSkeleton />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {mergedData.map(item => (
//             <MonitorCard key={item.id} data={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MonitorDashboard;

'use client';

import React, { useEffect, useState } from 'react';

function LoadingSkeleton() {
  console.log('Rendering LoadingSkeleton component');
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => {
          console.log('Rendering skeleton item:', i);
          return (
            <div key={i} className="border rounded-lg p-4 space-y-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonitorDashboard() {
  console.log('========== MonitorDashboard Component Rendered ==========');

  const [monitorGroups, setMonitorGroups] = useState([]);
  const [selectedGroupGuid, setSelectedGroupGuid] = useState('');
  const [monitorChecks, setMonitorChecks] = useState([]);
  const [monitorDetails, setMonitorDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('Current State:', {
    monitorGroupsCount: monitorGroups.length,
    selectedGroupGuid,
    monitorChecksCount: monitorChecks.length,
    monitorDetailsCount: monitorDetails.length,
    loading
  });

  useEffect(() => {
    console.log('========== Monitor Groups Fetch Effect Triggered ==========');

    async function fetchMonitorGroups() {
      try {
        console.log('🔍 Fetching monitor groups...');
        const response = await fetch('/api/uptrends/monitor-groups');
        console.log('📡 Monitor groups response status:', response.status);
        console.log('📡 Monitor groups response ok:', response.ok);

        if (!response.ok) {
          console.error('❌ Failed to fetch monitor groups - Status:', response.status);
          throw new Error('Failed to fetch monitor groups');
        }

        const data = await response.json();
        console.log('📦 Fetched monitor groups count:', data.length);
        console.log('📦 First monitor group:', data[0]);

        setMonitorGroups(data);
        if (data.length > 0) {
          console.log('🎯 Setting default group:', {
            guid: data[0].MonitorGuid,
            name: data[0].Name
          });
          setSelectedGroupGuid(data[0].MonitorGuid);
        } else {
          console.warn('⚠️ No monitor groups available');
        }
      } catch (error) {
        console.error('❌ Error fetching monitor groups:', error);
      }
    }

    fetchMonitorGroups();
  }, []);

  useEffect(() => {
    console.log('========== Monitor Data Fetch Effect Triggered ==========');
    console.log('🎯 Selected GUID:', selectedGroupGuid);

    async function fetchAllData() {
      if (!selectedGroupGuid) {
        console.log('⚠️ No group selected, skipping data fetch');
        return;
      }

      try {
        const queryParams = new URLSearchParams({
          Sorting: 'Descending',
          Take: '100',
          PresetPeriod: 'Last24Hours'
        });
        console.log('🔍 Query parameters:', queryParams.toString());

        console.log('🔍 Fetching monitor checks and details...');
        const [checksResponse, detailsResponse] = await Promise.all([
          fetch(`/api/uptrends/monitor-groups/${selectedGroupGuid}?${queryParams}`),
          fetch('/api/uptrends/Monitor')
        ]);

        console.log('📡 Checks Response status:', checksResponse.status);
        console.log('📡 Details Response status:', detailsResponse.status);

        if (!checksResponse.ok || !detailsResponse.ok) {
          console.error('❌ API Response not ok:', {
            checks: checksResponse.status,
            details: detailsResponse.status
          });
          throw new Error('Failed to fetch monitor data');
        }

        const checksData = await checksResponse.json();
        const detailsData = await detailsResponse.json();

        console.log('📦 Checks Data count:', checksData.Data?.length || 0);
        console.log('📦 Details Data count:', detailsData?.length || 0);

        setMonitorChecks(checksData.Data || []);
        setMonitorDetails(detailsData || []);
      } catch (error) {
        console.error('❌ Error fetching monitor data:', error);
      } finally {
        console.log('✅ Setting loading to false');
        setLoading(false);
      }
    }

    fetchAllData();
  }, [selectedGroupGuid]);

  const mergedData = monitorChecks.map(check => {
    console.log('🔄 Processing check:', check.Id);

    const matchingMonitor = monitorDetails.find(
      monitor => monitor.MonitorGuid === (check.Attributes && check.Attributes.MonitorGuid)
    );

    console.log('🔍 Matching monitor found:', matchingMonitor ? {
      guid: matchingMonitor.MonitorGuid,
      name: matchingMonitor.Name
    } : 'No match');

    const attributes = check.Attributes || {};

    return {
      id: check.Id,
      name: (matchingMonitor && matchingMonitor.Name) || 'Unknown Monitor',
      timestamp: attributes.Timestamp,
      responseTime: attributes.TotalTime,
      status: attributes.ErrorLevel,
      resolvedIp: attributes.ResolvedIpAddress,
      monitorDetails: {
        guid: attributes.MonitorGuid,
        errorDescription: attributes.ErrorDescription,
        errorMessage: attributes.ErrorMessage,
        serverId: attributes.ServerId,
        dnsServer: (matchingMonitor && matchingMonitor.DnsServer) || '',
        dnsQuery: (matchingMonitor && matchingMonitor.DnsQuery) || '',
        expectedResult: (matchingMonitor && matchingMonitor.DnsExpectedResult) || '',
        checkInterval: matchingMonitor && matchingMonitor.CheckInterval,
        monitorType: matchingMonitor && matchingMonitor.MonitorType
      }
    };
  });

  console.log('📊 Merged Data count:', mergedData.length);

  if (loading) {
    console.log('⌛ Rendering loading skeleton');
    return <LoadingSkeleton />;
  }

  function MonitorCard({ data }) {
    console.log('🎴 Rendering MonitorCard:', {
      id: data.id,
      name: data.name,
      status: data.status
    });

    function getStatusColor(status) {
      console.log('🎨 Getting status color for:', status);
      switch (status) {
        case 'NoError':
          return 'bg-green-100 text-green-800';
        case 'Error':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }

    return (
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* ... Rest of the MonitorCard JSX ... */}
      </div>
    );
  }

  console.log('📱 Rendering dashboard with data');
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">DNS Monitor Dashboard</h1>
        <select
          value={selectedGroupGuid}
          onChange={(e) => {
            console.log('🔄 Group selection changed:', {
              from: selectedGroupGuid,
              to: e.target.value
            });
            setSelectedGroupGuid(e.target.value);
          }}
          className="border rounded-md p-2"
        >
          {monitorGroups.map(group => {
            console.log('📝 Rendering option for group:', group.Name);
            return (
              <option key={group.MonitorGuid} value={group.MonitorGuid}>
                {group.Name}
              </option>
            );
          })}
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

export default MonitorDashboard;