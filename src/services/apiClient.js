// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 5000,
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
import axios from 'axios';

// Base Axios Instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set in your environment
  timeout: 5000, // Default timeout
});

// Response Interceptor for Error Logging
apiClient.interceptors.response.use(
  (response) => response, // Pass responses through unchanged
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data || error.message,
    });
    return Promise.reject(error);
  }
);

export default apiClient;