// import { fetchUptrendsData } from '../../../../utils/uptrendsApi';

// export async function GET(req, { params }) {
//   const { groupId } = params; // Extract the MonitorGroupId from the URL
//   const { Sorting = 'Descending', Take = 100, PresetPeriod = 'Last24Hours' } = req.nextUrl.searchParams;

//   if (!groupId) {
//     return new Response(JSON.stringify({ error: 'MonitorGroupId is required' }), { status: 400 });
//   }

//   try {
//     const endpoint = `/MonitorCheck/MonitorGroup/${groupId}?Sorting=${Sorting}&Take=${Take}&PresetPeriod=${PresetPeriod}`;
//     const data = await fetchUptrendsData(endpoint);
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error fetching monitor group data:', error.message);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

// import axios from 'axios';

// export async function GET(req, { params }) {
//   const { monitorGroupGuid } = params; // Extract monitorGroupGuid from the route
//   const { Sorting = 'Descending', Take = 100, PresetPeriod = 'Last24Hours' } = req.nextUrl.searchParams;

//   // Load credentials from environment variables
//   const username = process.env.UPTRENDS_API_USERNAME;
//   const password = process.env.UPTRENDS_API_PASSWORD;

//   if (!username || !password) {
//     return new Response(
//       JSON.stringify({ error: 'API credentials are missing' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   // Encode credentials
//   const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

//   // Set up Axios instance
//   const apiClient = axios.create({
//     baseURL: 'https://api.uptrends.com/v4',
//     headers: {
//       Authorization: `Basic ${encodedCredentials}`,
//     },
//   });

//   try {
//     // Build API URL dynamically
//     const apiUrl = `/MonitorCheck/MonitorGroup/${monitorGroupGuid}?Sorting=${Sorting}&Take=${Take}&PresetPeriod=${PresetPeriod}`;

//     // Fetch monitor group data
//     const response = await apiClient.get(apiUrl);

//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching data for monitor group ${monitorGroupGuid}:`, error.message);
//     return new Response(
//       JSON.stringify({ error: error.response?.data || error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }


// import { fetchMonitorGroupData } from '../../../../services/uptrendsService';

// export async function GET() {
//   try {
//     const data = await fetchMonitorGroupData();
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error in API route:', error.message);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }



// src/app/api/uptrends/monitor-groups/[groupId]/route.js
// import { fetchMonitorGroupData } from '../../../../../services/uptrendsService';

// export async function GET(req, { params }) {
//   const { groupId } = params;

//   if (!groupId) {
//     return new Response(
//       JSON.stringify({ error: 'Monitor Group ID is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   const { Sorting = 'Descending', Take = 100, PresetPeriod = 'Last24Hours' } = Object.fromEntries(req.nextUrl.searchParams);

//   try {
//     // Fetch monitor group data using the server-side service
//     const data = await fetchMonitorGroupData(groupId, { Sorting, Take, PresetPeriod });
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching monitor group ${groupId}:`, error.message);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// import { fetchMonitorGroupData } from '../../../../../services/uptrendsService';

// export async function GET(req, context) {
//   // Await the params from the context
//   const { params } = context;
//   const { groupId } = await params;

//   if (!groupId) {
//     return new Response(
//       JSON.stringify({ error: 'Monitor Group ID is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   try {
//     // Fetch monitor group data using the server-side service
//     const data = await fetchMonitorGroupData(groupId);
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching monitor group ${groupId}:`, error.message);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// import { fetchMonitorGroupData } from '../../../../../services/uptrendsService';

// export async function GET(req, context) {
//   const { params } = context;
//   const { groupId } = await params;

//   if (!groupId) {
//     return new Response(
//       JSON.stringify({ error: 'Monitor Group ID is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   try {
//     const allMonitorChecks = [];
//     let nextCursor = null;

//     do {
//       // Fetch paginated monitor group data
//       const response = await fetchMonitorGroupData(groupId, nextCursor);
//       if (response?.Data) {
//         allMonitorChecks.push(...response.Data);
//       }
//       // Update the cursor for the next request
//       nextCursor = response?.Cursors?.Next || null;
//     } while (nextCursor); // Continue while there's a next page

//     return new Response(
//       JSON.stringify({ monitors: allMonitorChecks }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error(`Error fetching monitor group ${groupId}:`, error.message);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// import { fetchMonitorGroupData } from '../../../../../services/uptrendsService';

// export async function GET(req, context) {
//   const { params } = await context; // Destructure params from context
//   const groupId = params ? params.groupId : null; // Safely extract groupId

//   if (!groupId) {
//     return new Response(
//       JSON.stringify({ error: 'Monitor Group ID is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   // Extract query parameters
//   const { Sorting = 'Descending', Take = 100, PresetPeriod = 'Last24Hours' } = Object.fromEntries(req.nextUrl.searchParams);

//   try {
//     // Fetch monitor group data using the service
//     const data = await fetchMonitorGroupData(groupId, { Sorting, Take, PresetPeriod });

//     // Return successful response
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching monitor group ${groupId}:`, error.message);

//     // Return error response
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
// import { fetchMonitorGroupData } from '../../../../../services/uptrendsService';

// export async function GET(req, context) {
//   const { params } = context;

//   // Await params to handle async dynamic routes
//   const { groupId } = await params;

//   if (!groupId) {
//     return new Response(
//       JSON.stringify({ error: 'Monitor Group ID is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   // Extract query parameters from the request
//   const searchParams = Object.fromEntries(req.nextUrl.searchParams);
//   const { Sorting = 'Descending', Take = 100, PresetPeriod = 'Last24Hours' } = searchParams;

//   try {
//     // Call the service function to fetch monitor group data
//     const data = await fetchMonitorGroupData(groupId, { Sorting, Take, PresetPeriod });

//     // Return the data as a response
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching monitor group ${groupId}:`, error.message);

//     // Return an error response
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
import { fetchMonitorGroupData } from '../../../../../services/uptrendsService';

export async function GET(req, context) {
  try {
    // Destructure `params` from the context and ensure it's resolved
    const { params } = context;
    const { groupId } = await params || {};

    if (!groupId) {
      return new Response(
        JSON.stringify({ error: 'Monitor Group ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract and parse query parameters
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const {
      Sorting = 'Descending',
      Take = 100,
      PresetPeriod = 'Last24Hours',
    } = searchParams;

    // Call the service function to fetch monitor group data
    const data = await fetchMonitorGroupData(groupId, { Sorting, Take, PresetPeriod });

    // Return the fetched data as a JSON response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching monitor group data:`, error.message);

    // Return an error response
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
