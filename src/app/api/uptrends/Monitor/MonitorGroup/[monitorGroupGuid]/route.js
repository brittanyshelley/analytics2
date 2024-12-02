// pages/api/Monitor/MonitorGroup/[monitorGroupGuid].js

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
    console.error(`Error fetching monitor group data for GUID ${monitorGroupGuid}:`, error.message);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch monitor group data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}