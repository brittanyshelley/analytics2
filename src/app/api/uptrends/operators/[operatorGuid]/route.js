// import axios from 'axios';

// export async function GET(req) {
//   const { operatorGuid } = req.params || {};

//   if (!operatorGuid) {
//     return new Response(
//       JSON.stringify({ error: 'Missing operator GUID' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   const username = process.env.UPTRENDS_API_USERNAME;
//   const password = process.env.UPTRENDS_API_PASSWORD;

//   if (!username || !password) {
//     return new Response(
//       JSON.stringify({ error: 'Missing API credentials' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

//   try {
//     const response = await axios.get(`https://api.uptrends.com/v4/Operator/${operatorGuid}`, {
//       headers: {
//         Authorization: `Basic ${encodedCredentials}`,
//       },
//     });

//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching operator ${operatorGuid}:`, error.response?.data || error.message);
//     return new Response(
//       JSON.stringify({ error: error.response?.data || error.message }),
//       { status: error.response?.status || 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// import axios from 'axios';

// export async function GET(req) {
//   const { operatorGuid } = req.params || {};
//   if (!operatorGuid) {
//     return new Response(
//       JSON.stringify({ error: 'Missing operator GUID' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   const username = process.env.UPTRENDS_API_USERNAME;
//   const password = process.env.UPTRENDS_API_PASSWORD;
//   if (!username || !password) {
//     return new Response(
//       JSON.stringify({ error: 'Missing API credentials' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
//   try {
//     const response = await axios.get(`https://api.uptrends.com/v4/Operator/${operatorGuid}`, {
//       headers: {
//         Authorization: `Basic ${encodedCredentials}`,
//       },
//     });
//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching operator ${operatorGuid}:`, error.response?.data || error.message);
//     return new Response(
//       JSON.stringify({ error: error.response?.data || error.message }),
//       { status: error.response?.status || 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// const axios = require('axios');

// async function GET(req) {
//   const { OperatorGuid } = req.params || {};

//   if (!OperatorGuid) {
//     return createErrorResponse('Missing operator GUID', 400);
//   }

//   const { username, password } = getApiCredentials();
//   if (!username || !password) {
//     return createErrorResponse('Missing API credentials', 500);
//   }

//   const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
//   return await fetchOperatorDetails(OperatorGuid, encodedCredentials);
// }

// function getApiCredentials() {
//   return {
//     username: process.env.UPTRENDS_API_USERNAME,
//     password: process.env.UPTRENDS_API_PASSWORD,
//   };
// }

// function createErrorResponse(message, status) {
//   return {
//     status,
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ error: message }),
//   };
// }

// async function fetchOperatorDetails(OperatorGuid, encodedCredentials) {
//   try {
//     const response = await axios.get(`https://api.uptrends.com/v4/Operator/${OperatorGuid}`, {
//       headers: {
//         Authorization: `Basic ${encodedCredentials}`,
//       },
//     });
//     return {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(response.data),
//     };
//   } catch (error) {
//     console.error(`Error fetching operator ${OperatorGuid}:`, error.response?.data || error.message);
//     return createErrorResponse(error.response?.data || error.message, error.response?.status || 500);
//   }
// }

// module.exports = { GET };
// import axios from 'axios';
// import { NextResponse } from 'next/server';

// // Named export for the GET method
// export async function GET(request, { params }) {
//   const { OperatorGuid } = params || {};

//   if (!OperatorGuid) {
//     return createErrorResponse('Missing operator GUID', 400);
//   }

//   const { username, password } = getApiCredentials();
//   if (!username || !password) {
//     return createErrorResponse('Missing API credentials', 500);
//   }

//   const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
//   return await fetchOperatorDetails(OperatorGuid, encodedCredentials);
// }

// // Helper function to retrieve API credentials
// function getApiCredentials() {
//   return {
//     username: process.env.UPTRENDS_API_USERNAME,
//     password: process.env.UPTRENDS_API_PASSWORD,
//   };
// }

// // Helper function to create an error response
// function createErrorResponse(message, status) {
//   return NextResponse.json({ error: message }, { status });
// }

// // Helper function to fetch operator details from the external API
// async function fetchOperatorDetails(OperatorGuid, encodedCredentials) {
//   try {
//     const response = await axios.get(`https://api.uptrends.com/v4/Operator/${OperatorGuid}`, {
//       headers: {
//         Authorization: `Basic ${encodedCredentials}`,
//       },
//     });

//     // Return successful JSON response
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error(`Error fetching operator ${OperatorGuid}:`, error.response?.data || error.message);

//     // Handle API errors gracefully
//     const status = error.response?.status || 500;
//     const message = error.response?.data || error.message || 'Internal Server Error';
//     return createErrorResponse(message, status);
//   }
// }

import { fetchOperatorDetails } from '../../../../../services/uptrendsService';

export async function GET() {
  try {
    const data = await fetchOperatorDetails();
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