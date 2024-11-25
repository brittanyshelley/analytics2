// app/api/uptrends/route.js
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const apiUrl = 'https://api.uptrends.com/path_to_resource'; // Replace with actual endpoint
//   const { UPTRENDS_API_KEY } = process.env;

//   try {
//     const response = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${UPTRENDS_API_KEY}`,
//       },
//     });
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch Uptrends data' }, { status: 500 });
//   }
// }
// import { fetchUptrendsData } from '../../../utils/uptrendsApi';

// export async function GET(request) {
//   try {
//     // Example: Fetch all monitors
//     const endpoint = '/monitors'; // Change this to the desired endpoint
//     const data = await fetchUptrendsData(endpoint);

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
// export async function GET() {
//   try {
//     const response = await fetch('https://external-api.example.com/uptrends', {
//       headers: { Authorization: 'Bearer YOUR_API_KEY' },
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }
// const axios = require('axios');

// // Your API username and password
// const username = 'your-username';
// const password = 'your-password';

// // Encode credentials to Base64
// const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

// // Set up Axios instance with base URL and headers
// const apiClient = axios.create({
//   baseURL: 'https://api.uptrends.com/v4',
//   headers: {
//     Authorization: `Basic ${encodedCredentials}`,
//   },
// });

// // Example API call
// async function fetchData(endpoint) {
//   try {
//     const response = await apiClient.get(endpoint);
//     console.log('API Response:', response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error.response?.data || error.message);
//   }
// }

// // Example usage: Fetch monitors
// fetchData('/monitors');
