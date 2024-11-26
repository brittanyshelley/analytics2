// import apiClient from './apiClient';


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


export const fetchMonitorGroupData = async (groupId, params = {}) => {
  if (!groupId) {
    throw new Error('Group ID is required to fetch monitor group data.');
  }

  // Build query parameters dynamically
  const queryParams = new URLSearchParams(params).toString();

  try {
    // Construct the full API URL with query parameters
    const apiUrl = `/MonitorCheck/MonitorGroup/${groupId}?${queryParams}`;

    // Fetch data from the Uptrends API
    const response = await apiClient.get(apiUrl);

    console.log(`Monitor group data fetched for group ${groupId}:`, response.data);

    // Return the data to the caller
    return response.data;
  } catch (error) {
    // Log and rethrow the error for higher-level handling
    const errorMessage = error.response?.data || error.message || 'Unknown error occurred';
    console.error(`Error fetching monitor group data for group ${groupId}:`, errorMessage);
    throw new Error(errorMessage);
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
