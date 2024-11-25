import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.UPTRENDS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic Authentication: Encode API key and secret
const authHeader = `Basic ${Buffer.from(`${process.env.UPTRENDS_API_KEY}:${process.env.UPTRENDS_API_SECRET}`).toString('base64')}`;

// Add Authorization Header to Requests
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = authHeader;
  return config;
});

export const fetchUptrendsData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Uptrends API:', error);
    throw error;
  }
};
