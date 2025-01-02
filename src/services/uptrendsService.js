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

// Fetches monitor group members for a given group ID.


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
    throw new Error('monitorGroupGuid is required.');
  }
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await apiClient.get(`/MonitorCheck/MonitorGroup/${monitorGroupGuid}?${queryParams}`);
    console.log(`Fetched monitor checks for group ${monitorGroupGuid}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching monitor checks for group ${monitorGroupGuid}:`, error.message);
    throw error;
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



export const linkDataByMonitorGuid = (monitors, checks) => {
  console.log('Linking Data...');
  console.log('Monitors:', monitors);
  console.log('Checks:', checks);

  return monitors.map((monitor) => {
    const relatedChecks = checks.filter(
      (check) => check.Attributes?.MonitorGuid === monitor.MonitorGuid
    );
    console.log(`Monitor: ${monitor.Name}, Related Checks:`, relatedChecks);

    return {
      ...monitor,
      MonitorChecks: relatedChecks,
    };
  });
};


export const fetchAndLinkMonitorData = async (monitorGroupGuid) => {
  try {
    console.log('Fetching data for MonitorGroupGuid:', monitorGroupGuid);

    // Fetch monitor group members
    const membersResponse = await apiClient.get(`/MonitorGroup/${monitorGroupGuid}/Member`);
    console.log('Members Response:', membersResponse.data);

    // Fetch monitor checks
    const checksResponse = await apiClient.get(`/MonitorCheck/MonitorGroup/${monitorGroupGuid}`);
    console.log('Checks Response:', checksResponse.data);

    // Link the data by MonitorGuid
    const linkedData = linkDataByMonitorGuid(membersResponse.data, checksResponse.data);

    console.log('Linked Data:', linkedData);

    return linkedData;
  } catch (error) {
    console.error('Error fetching and linking monitor data:', error.response?.data || error.message);
    throw error;
  }
};


// Fetch Monitor Checks by monitorGuid
export const fetchMonitorChecks = async (monitorGuid, params = {}) => {
  if (!monitorGuid) {
    throw new Error('Monitor GUID is required to fetch monitor checks.');
  }

  try {
    // Default parameters for the API call
    const defaultParams = {
      Sorting: 'Descending',
      Take: 100,
      PresetPeriod: 'Last24Hours',
    };

    // Merge default parameters with any additional ones provided
    const queryParams = new URLSearchParams({ ...defaultParams, ...params }).toString();

    // Make the API call
    const response = await apiClient.get(`/MonitorCheck/Monitor/${monitorGuid}?${queryParams}`);
    console.log(`Fetched checks for Monitor GUID ${monitorGuid}:`, response.data);

    return response.data; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching monitor checks for Monitor GUID ${monitorGuid}:`, error.message);
    throw error;
  }
};

// Function to find the most recent check for each monitor


// const monitors = [
//   {
//     MonitorGuid: 'example-guid-1',
//     Name: 'Example Monitor 1',
//     MonitorChecks: [
//       {
//         Attributes: {
//           Timestamp: '2024-12-08T21:19:10',
//           ErrorDescription: 'OK',
//           TotalTime: 100,
//         },
//       },
//       {
//         Attributes: {
//           Timestamp: '2024-12-08T21:15:10',
//           ErrorDescription: 'Timeout',
//           TotalTime: 0,
//         },
//       },
//     ],
//   },
//   {
//     MonitorGuid: 'example-guid-2',
//     Name: 'Example Monitor 2',
//     MonitorChecks: [
//       {
//         Attributes: {
//           Timestamp: '2024-12-08T21:20:10',
//           ErrorDescription: 'OK',
//           TotalTime: 50,
//         },
//       },
//     ],
//   },
// ];
// const recentChecks = getMostRecentChecks(monitors);
// console.log(recentChecks);


export function getMostRecentChecks(monitors) {
  return monitors.map((monitor) => {
    const { MonitorGuid, Name, MonitorChecks } = monitor;

    // Find the most recent check by comparing timestamps
    const mostRecentCheck = MonitorChecks.reduce((latest, current) => {
      return new Date(current.Attributes.Timestamp) > new Date(latest.Attributes.Timestamp)
        ? current
        : latest;
    });

    return {
      MonitorGuid,
      Name,
      MostRecentCheck: mostRecentCheck,
    };
  });
}

// Fetch monitor group status with skip and take
export const fetchMonitorGroupStatus = async (monitorGroupGuid, skip = 0, take = 10000) => {
  if (!monitorGroupGuid) {
    throw new Error('monitorGroupGuid is required.');
  }
  try {
    const response = await apiClient.get(`/Status/MonitorGroup/${monitorGroupGuid}`, {
      params: { skip, take }
    });
    console.log(`Fetched monitor group status for group ${monitorGroupGuid}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching monitor group status for group ${monitorGroupGuid}:`, error.message);
    throw error;
  }
};

export function getMonitorName(monitorGuid, monitors) {
  for (const groupGuid in monitors) {
    const groupMonitors = monitors[groupGuid];
    const monitor = groupMonitors.find((m) => m.MonitorGuid === monitorGuid);
    if (monitor) {
      return monitor.Name;
    }
  }
  return 'Monitor Name Not Found';
}
