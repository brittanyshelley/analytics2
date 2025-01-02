// app/api/Monitor/MonitorGroup/[monitorGroupGuid].js

import { fetchMonitorGroupMonitors } from '../../../../../../services/uptrendsService';


export async function GET(req, { params }) {
  const { monitorGroupGuid } = params; // Extract the dynamic monitorGroupGuid from params

  if (!monitorGroupGuid) {
    return new Response(
      JSON.stringify({ error: 'Monitor Group GUID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Fetch data for the specified monitor group GUID
    const monitorGroupData = await fetchMonitorGroupMonitors(monitorGroupGuid);

    return new Response(JSON.stringify(monitorGroupData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching monitor group data for GUID ${monitorGuid || 'unknown'}:`, error.message);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch monitor group data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { fetchMonitorGroupMonitors } from '../../../../../../services/uptrendsService';

// export async function GET(request) {
//   // Extract query parameters from the request URL
//   const { searchParams } = new URL(request.url);
//   const monitorGroupGuid = searchParams.get('monitorGroupGuid');
//   if (!monitorGroupGuid) {
//     return NextResponse.json({ error: 'Monitor Group GUID is required' }, { status: 400 });
//   }

//   try {
//     // Fetch data for the specified monitor group GUID
//     const monitorGroupData = await fetchMonitorGroupMonitors(monitorGroupGuid);

//     // Return the data as a JSON response
//     return NextResponse.json(monitorGroupData, { status: 200 });
//   } catch (error) {
//     console.error(
//       `Error fetching monitor group data for GUID ${monitorGroupGuid || 'unknown'}:`,
//       error.message
//     );

//     // Return error details
//     return NextResponse.json(
//       { error: 'Failed to fetch monitor group data.', details: error.message },
//       { status: 500 }
//     );
//   }
// }
