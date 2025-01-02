
'use client';
import { getMonitorName } from '../../services/uptrendsService';
import { useApplicationData } from '../../hooks/useApplicationData';
import { evaluateGroupStatuses } from '../../utils/checkGroupStatuses';
import Link from 'next/link';

export default function Dashboard() {
  console.log('Rendering Dashboard component');

  const {
    monitorGroups,
    monitors,
    groupStatuses,
    loading,
  } = useApplicationData();

  console.log('Application Data:', { monitorGroups, monitors, groupStatuses, loading });

  if (loading) {
    console.log('Loading state is true');
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Evaluate statuses for all groups
  const groupStatusIcons = evaluateGroupStatuses(groupStatuses);
  console.log('Group status icons:', groupStatusIcons);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Dashboard Status</h1>
        <p className="text-base-content">Current status of all monitor groups</p>
      </header>

      {/* Grid Layout for Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitorGroups.map((group) => {
          const groupId = group.MonitorGroupGuid;
          console.log('Processing group:', groupId, group);

          const groupData = groupStatuses[groupId]?.Data || [];
          console.log(`Group ${groupId} data:`, groupData);

          // Filter monitors with errors
          const errorMonitors = groupData.filter(
            (monitor) => monitor.Attributes.ErrorLevel !== 'NoError'
          );
          console.log(`Error monitors for group ${groupId}:`, errorMonitors);

          const groupStatus = groupStatusIcons[groupId];
          const statusBadge =
            groupStatus === '✅' ? 'text-success' : 'text-error';
          console.log(`Group ${groupId} status:`, groupStatus);

          return (
            <div
              key={groupId}
              className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="card-body">
                {/* Group Title */}
                <h2 className="card-title text-secondary">{group.Description}</h2>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`text-2xl font-bold ${statusBadge}`}>
                    {groupStatus}
                  </span>
                </div>

                {/* Display Error Monitors */}
                {errorMonitors.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {errorMonitors.map((monitor) => {
                      const monitorName = getMonitorName(monitor.Id, monitors);
                      console.log(`Monitor ID: ${monitor.Id}, Name: ${monitorName}`);
                      const monitorUrl = `/healthoverview/monitor/${monitor.Id}`;

                      return (
                        //     <li key={monitor.Id}>
                        //       <span className="text-error">
                        //         {monitorName}: {monitor.Attributes?.ErrorLevel || 'Unknown'}
                        //       </span>
                        //     </li>
                        //   );
                        // })}
                        <li key={monitor.Id}>
                          <Link href={monitorUrl} className="text-error underline hover:text-primary">
                            {monitorName}
                          </Link>
                          : Error Level {monitor.Attributes?.ErrorLevel || 'Unknown'}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-success">All monitors operational</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
