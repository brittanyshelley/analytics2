// import apiClient from './apiClient';

// // Fetch monitor data
// export const fetchMonitors = async () => {
//   const { data } = await apiClient.get('/monitors');
//   return data;
// };

// // Fetch metrics data
// export const fetchMetrics = async () => {
//   const { data } = await apiClient.get('/metrics');
//   return data;
// };

// // Fetch alerts data
// export const fetchAlerts = async () => {
//   const { data } = await apiClient.get('/alerts');
//   return data;
// };

// import apiClient from './apiClient';

// // Fetch monitor data
// export const fetchMonitors = async () => {
//   const { data } = await apiClient.get('/monitors');
//   return data;
// };

// // Fetch metrics data
// export const fetchMetrics = async () => {
//   const { data } = await apiClient.get('/metrics');
//   console.log(metrics);
//   return data;
// };

// // Fetch alerts data
// export const fetchAlerts = async () => {
//   const { data } = await apiClient.get('/alerts');
//   console.log(alerts);
//   return data;
// };

// // Fetch all operators
// export const fetchOperators = async () => {
//   const { data } = await apiClient.get('/operators'); // Adjust endpoint as needed
//   console.log(operators);
//   return data;
// };

// // Fetch details of a specific operator by GUID
// export const fetchOperatorDetails = async (operatorGuid) => {
//   if (!operatorGuid) {
//     throw new Error('operatorGuid is required to fetch operator details.');
//   }
//   const { data } = await apiClient.get(`/Operator/${operatorGuid}`); // Adjust endpoint as needed
//   console.log(operatorGuid);
//   return data;
// };

// export const fetchMonitorGroupData = async (groupId, params = {}) => {
//   if (!groupId) throw new Error('Group ID is required');
//   const response = await apiClient.get(`/MonitorCheck/MonitorGroup/${groupId}`, { params });
//   return response.data;
// };

// import apiClient from './apiClient'; // Axios instance for API calls

// // Fetch monitor data
// export const fetchMonitors = async (params = {}) => {
//   try {
//     const { data } = await apiClient.get('/monitors', { params });
//     console.log('Monitors fetched:', data); // Log fetched data for debugging
//     return data;
//   } catch (error) {
//     console.error('Error fetching monitors:', error.message);
//     throw error; // Rethrow to handle errors in calling function
//   }
// };

// // Fetch metrics data
// export const fetchMetrics = async (params = {}) => {
//   try {
//     const { data } = await apiClient.get('/metrics', { params });
//     console.log('Metrics fetched:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching metrics:', error.message);
//     throw error;
//   }
// };

// // Fetch alerts data
// export const fetchAlerts = async (params = {}) => {
//   try {
//     const { data } = await apiClient.get('/alerts', { params });
//     console.log('Alerts fetched:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching alerts:', error.message);
//     throw error;
//   }
// };

// // Fetch all operators
// export const fetchOperators = async (params = {}) => {
//   try {
//     const { data } = await apiClient.get('/operators', { params }); // Adjust endpoint as needed
//     console.log('Operators fetched:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching operators:', error.message);
//     throw error;
//   }
// };

// // Fetch details of a specific operator by GUID
// export const fetchOperatorDetails = async (operatorGuid) => {
//   if (!operatorGuid) {
//     throw new Error('operatorGuid is required to fetch operator details.');
//   }

//   try {
//     const { data } = await apiClient.get(`/Operator/${operatorGuid}`); // Adjust endpoint as needed
//     console.log(`Details fetched for operator ${operatorGuid}:`, data);
//     return data;
//   } catch (error) {
//     console.error(`Error fetching details for operator ${operatorGuid}:`, error.message);
//     throw error;
//   }
// };

// // Fetch monitor group data
// export const fetchMonitorGroupData = async (groupId, params = {}) => {
//   if (!groupId) {
//     throw new Error('Group ID is required to fetch monitor group data.');
//   }

//   try {
//     const { data } = await apiClient.get(`/MonitorCheck/MonitorGroup/${groupId}`, { params });
//     console.log(`Monitor group data fetched for group ${groupId}:`, data);
//     return data;
//   } catch (error) {
//     console.error(`Error fetching monitor group data for group ${groupId}:`, error.message);
//     throw error;
//   }
// };

// import createUptrendsApiClient from './uptrendsApiClient';

// // Fetch monitor data from Uptrends
// export const fetchMonitors = async () => {
//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get('/Monitor');
//     console.log('Monitors fetched:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching monitors:', error.message);
//     throw error;
//   }
// };

// // Fetch monitor group data by group ID
// export const fetchMonitorGroupData = async (groupId, params = {}) => {
//   if (!groupId) {
//     throw new Error('Group ID is required to fetch monitor group data.');
//   }

//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get(`/MonitorCheck/MonitorGroup/${groupId}`, { params });
//     console.log(`Monitor group data fetched for group ${groupId}:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching monitor group data for group ${groupId}:`, error.message);
//     throw error;
//   }
// };

// // Fetch metrics data from Uptrends
// export const fetchMetrics = async (params = {}) => {
//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get('/Metrics', { params });
//     console.log('Metrics fetched:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching metrics:', error.message);
//     throw error;
//   }
// };

// // Fetch alerts data from Uptrends
// export const fetchAlerts = async (params = {}) => {
//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get('/Alerts', { params });
//     console.log('Alerts fetched:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching alerts:', error.message);
//     throw error;
//   }
// };

// // Fetch all operators from Uptrends
// export const fetchOperators = async (params = {}) => {
//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get('/Operators', { params });
//     console.log('Operators fetched:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching operators:', error.message);
//     throw error;
//   }
// };

// // Fetch details of a specific operator by GUID
// export const fetchOperatorDetails = async (operatorGuid) => {
//   if (!operatorGuid) {
//     throw new Error('operatorGuid is required to fetch operator details.');
//   }

//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get(`/Operator/${operatorGuid}`);
//     console.log(`Details fetched for operator ${operatorGuid}:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching details for operator ${operatorGuid}:`, error.message);
//     throw error;
//   }
// };

// // Helper function to create an error response
// function createErrorResponse(message, status) {
//   return NextResponse.json({ error: message }, { status });
// }
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
// Fetch monitor group data by group ID
export const fetchMonitorGroupData = async (groupId, params = {}) => {
  if (!groupId) {
    throw new Error('Group ID is required to fetch monitor group data.');
  }

  try {
    const response = await apiClient.get(`/MonitorCheck/MonitorGroup/${groupId}`, { params });
    console.log(`Monitor group data fetched for group ${groupId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching monitor group data for group ${groupId}:`, error.message);
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
