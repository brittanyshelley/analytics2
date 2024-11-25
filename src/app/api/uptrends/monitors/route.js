// import { fetchMonitors } from '../../../../services/uptrendsService';

// export async function GET() {
//   try {
//     const monitors = await fetchMonitors();
//     return new Response(JSON.stringify(monitors), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// import axios from 'axios';

// export async function GET() {
//   // Load credentials securely from environment variables
//   const username = process.env.UPTRENDS_API_USERNAME;
//   const password = process.env.UPTRENDS_API_PASSWORD;

//   if (!username || !password) {
//     return new Response(
//       JSON.stringify({ error: 'API credentials are missing' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   // Encode credentials to Base64
//   const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

//   // Set up Axios instance
//   const apiClient = axios.create({
//     baseURL: 'https://api.uptrends.com/v4',
//     headers: {
//       Authorization: `Basic ${encodedCredentials}`,
//     },
//   });

//   try {
//     // Fetch monitor data from Uptrends API
//     const response = await apiClient.get('/Monitor');
//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching monitors:', error.response?.data || error.message);
//     return new Response(
//       JSON.stringify({ error: error.response?.data || error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

import { fetchMonitors } from '../../../../services/uptrendsService';

export async function GET() {
  try {
    const data = await fetchMonitors();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in API route:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
