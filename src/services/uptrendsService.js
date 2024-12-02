//uptrendsService.js
import createUptrendsApiClient from './uptrendsApiClient';

const apiClient = createUptrendsApiClient(); // Create a single instance for reuse

// Fetch monitor data from Uptrends
export const fetchMonitors = async () => {
  try {
    const response = await apiClient.get('/Monitor');
    console.log('Monitors fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching monitors:', error.message);
    throw error;
  }
};

export const fetchMonitorGroup = async () => {
  try {
    const response = await apiClient.get('/MonitorGroup');
    console.log('MonitorGroup fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching monitors:', error.message);
    throw error;
  }
};

/**
 * Fetches monitor group members for a given group ID.
 */
// export const fetchMonitorGroupMembers = async (monitorGrouGuid) => {
//   if (!monitorGrouGuid) {
//     throw new Error('Group ID is required to fetch monitor group members.');
//   }

//   try {
//     const response = await apiClient.get(`/MonitorGroup/${monitorGrouGuid}/Member`);
//     console.log(`Monitor group members fetched for group ${monitorGrouGuid}:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching monitor group members for group ${monitorGrouGuid}:`, error.message);
//     throw error;
//   }
// };

export const fetchMonitorGroupMembers = async (monitorGroupGuid) => {
  if (!monitorGroupGuid) {
    throw new Error('Group GUID is required to fetch monitor group members.');
  }

  try {
    const response = await apiClient.get(`/MonitorGroup/${monitorGroupGuid}/Member`);
    console.log(`Monitor group members fetched for group ${monitorGroupGuid}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching monitor group members for group ${monitorGroupGuid}:`, error.message);
    throw error;
  }
};

// export const fetchMonitorDetails = async (monitorGuid) => {
//   if (!monitorGuid) {
//     throw new Error('Monitor GUID is required to fetch monitor details.');
//   }

//   try {
//     const response = await apiClient.get(`/Monitor/${monitorGuid}`);
//     console.log('Monitor details fetched:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching monitor details:', error.message);
//     throw error;
//   }
// };

//Fetch Monitor details by monitorGuid
export const fetchMonitorDetails = async (monitorGuid) => {
  if (!monitorGuid) {
    throw new Error('Monitor GUID is required to fetch monitor details.');
  }

  try {
    const response = await apiClient.get(`/Monitor/${monitorGuid}`);
    console.log(`Monitor details fetched for GUID ${monitorGuid}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching monitor details for GUID ${monitorGuid}:`, error.message);
    throw error;
  }
};

//Fetch Monitor details by monitorGroupGuid
export const fetchMonitorGroupMonitors = async (monitorGroupGuid) => {
  if (!monitorGroupGuid) {
    throw new Error('Group GUID is required to fetch monitor group members.');
  }

  try {
    const response = await apiClient.get(`/Monitor/MonitorGroup/${monitorGroupGuid}`);
    console.log('MonitorGroup fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching monitors:', error.message);
    throw error;
  }
};

export const fetchMonitorChecksAndCategorize = async (monitorGroupGuid) => {
  try {
    const members = await fetchMonitorGroupMembers(monitorGroupGuid);

    const monitorStatuses = await Promise.all(
      members.map(async (member) => {
        const response = await apiClient.get(`/MonitorCheck/Monitor/${member.monitorGuid}`, {
          params: { Sorting: 'Descending', Take: 100, PresetPeriod: 'Last24Hours' },
        });
        console.log(`member.monitorGuid:${member.monitorGuid}`, response.data);
        return { monitorGuid: member.monitorGuid, status: response.data };
      })
    );

    // Categorize the monitor statuses into their respective groups
    const categorizedStatuses = monitorStatuses.reduce((acc, curr) => {
      const monitorGroupGuid = curr.status.monitorGroupGuid;
      if (!acc[monitorGroupGuid]) {
        acc[monitorGroupGuid] = [];
      }
      acc[monitorGroupGuid].push(curr);
      return acc;
    }, {});

    return categorizedStatuses;
  } catch (error) {
    console.error(`Error fetching monitor checks and categorizing for group ${monitorGroupGuid}:`, error.message);
    throw error;
  }
};

export const fetchMonitorGroupChecks = async (monitorGroupGuid, params = {}) => {
  if (!monitorGroupGuid) {
    throw new Error('Group ID is required to fetch monitor group data.');
  }

  // Build query parameters dynamically
  const queryParams = new URLSearchParams(params).toString();

  try {
    // Construct the full API URL with query parameters
    const apiUrl = `/MonitorCheck/MonitorGroup/${monitorGroupGuid}?${queryParams}`;

    // Fetch data from the Uptrends API
    const response = await apiClient.get(apiUrl);

    console.log(`Monitor group data fetched for group ${monitorGroupGuid}:`, response.data);

    // Return the data to the caller
    return response.data;
  } catch (error) {
    // Log and rethrow the error for higher-level handling
    const errorMessage = error.response?.data || error.message || 'Unknown error occurred';
    console.error(`Error fetching monitor group data for group ${monitorGroupGuid}:`, errorMessage);
    throw new Error(errorMessage);
  }
};

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

// Fetch metrics data from Uptrends
export const fetchMetrics = async (params = {}) => {
  try {
    const response = await apiClient.get('/Metrics', { params });
    console.log('Metrics fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error.message);
    throw error;
  }
};

// Fetch alerts data from Uptrends
export const fetchAlerts = async (params = {}) => {
  try {
    const response = await apiClient.get('/Alerts', { params });
    console.log('Alerts fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error.message);
    throw error;
  }
};

// Fetch all operators from Uptrends
export const fetchOperators = async (params = {}) => {
  try {
    const response = await apiClient.get('/Operator', { params });
    console.log('Operators fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching operators:', error.message);
    throw error;
  }
};

// Fetch details of a specific operator by GUID
export const fetchOperatorDetails = async (operatorGuid) => {
  if (!operatorGuid) {
    throw new Error('operatorGuid is required to fetch operator details.');
  }

  try {
    const response = await apiClient.get(`/Operator/${operatorGuid}`);
    console.log(`Details fetched for operator ${operatorGuid}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for operator ${operatorGuid}:`, error.message);
    throw error;
  }
};