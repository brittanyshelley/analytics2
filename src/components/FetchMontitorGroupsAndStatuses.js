import createUptrendsApiClient from './uptrendsApiClient';

const apiClient = createUptrendsApiClient();

export const fetchMonitorGroupsAndStatuses = async () => {
  try {
    // Step 1: Fetch all monitor groups
    const monitorGroupsResponse = await apiClient.get('/MonitorGroup');
    const monitorGroups = monitorGroupsResponse.data;

    // Step 2: For each monitor group, fetch monitorGuids
    const monitorGroupStatuses = await Promise.all(
      monitorGroups.map(async (group) => {
        const monitorGroupDataResponse = await apiClient.get(`/MonitorCheck/MonitorGroup/${group.id}`, {
          params: { PresetPeriod: 'Last24Hours' }
        });
        const monitorGroupData = monitorGroupDataResponse.data;

        // Step 3: Check the status of each monitorGuid for the last 24 hours
        const monitorStatuses = await Promise.all(
          monitorGroupData.map(async (monitor) => {
            const monitorStatusResponse = await apiClient.get(`/MonitorCheck/Monitor/${monitor.id}`, {
              params: { PresetPeriod: 'Last24Hours' }
            });
            return { monitorId: monitor.id, status: monitorStatusResponse.data };
          })
        );

        return { monitorGroupGuid: group.id, monitorStatuses };
      })
    );

    return monitorGroupStatuses;
  } catch (error) {
    console.error('Error fetching monitor group statuses:', error.message);
    throw error;
  }
};