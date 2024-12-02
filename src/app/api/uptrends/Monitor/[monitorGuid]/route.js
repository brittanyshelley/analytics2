// app/api/Monitor/[monitorGuid].js

import { fetchMonitorDetails } from '../../../../../services/uptrendsService';

export async function GET(req, { params }) {
  try {
    // Access params asynchronously
    const { monitorGuid } = await params;

    if (!monitorGuid) {
      return new Response(
        JSON.stringify({ error: 'Monitor GUID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the monitor details using the monitorGuid
    const monitorDetails = await fetchMonitorDetails(monitorGuid);

    return new Response(JSON.stringify(monitorDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching monitor details for GUID ${params?.monitorGuid || 'unknown'}:`, error.message);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch monitor details' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// export default async function handler(req, res) {
//   const { monitorGuid } = req.query;

//   if (!monitorGuid) {
//     return res.status(400).json({ error: 'Monitor GUID is required' });
//   }

//   try {
//     const monitorDetails = await fetchMonitorDetails(monitorGuid);
//     return res.status(200).json(monitorDetails);
//   } catch (error) {
//     console.error(`Error fetching monitor details for GUID ${monitorGuid}:`, error.message);
//     return res.status(500).json({ error: 'Failed to fetch monitor details' });
//   }
// }

// export async function GET(req, res) {
//   const { monitorGuid } = req.query;

//   if (!monitorGuid) {
//     return res.status(400).json({ error: 'Monitor GUID is required' });
//   }

//   try {
//     const monitorDetails = await fetchMonitorDetails(monitorGuid);
//     return res.status(200).json(monitorDetails);
//   } catch (error) {
//     console.error(`Error fetching monitor details for GUID ${monitorGuid}:`, error.message);
//     return res.status(500).json({ error: 'Failed to fetch monitor details' });
//   }
// }
// export async function GET(request, { params }) {
//   const { monitorGuid } = params;

//   // Validate the monitorGuid
//   if (!monitorGuid) {
//     return new Response(
//       JSON.stringify({ error: 'Monitor GUID is required' }),
//       { status: 400, headers: { 'Content-Type': 'application/json' } }
//     );
//   }

//   try {
//     // Fetch monitor details
//     const monitorDetails = await fetchMonitorDetails(monitorGuid);
//     return new Response(JSON.stringify(monitorDetails), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching monitor details for GUID ${monitorGuid}:`, error.message);
//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch monitor details' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

// export async function GET(req, { params }) {
//   try {
//     // Access params asynchronously
//     const { monitorGuid } =  await params;

//     if (!monitorGuid) {
//       return new Response(
//         JSON.stringify({ error: 'Monitor GUID is required' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Fetch the monitor details using the monitorGuid
//     const monitorDetails = await fetchMonitorDetails(monitorGuid);

//     return new Response(JSON.stringify(monitorDetails), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error fetching monitor details for GUID ${params.monitorGuid}:`, error.message);

//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch monitor details' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }