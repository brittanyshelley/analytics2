// src/app/api/uptrends/MonitorChecks/Monitor/[monitorGuid]/route.js

//Retrieves monitor check by monitorGuid
import { fetchMonitorChecks } from '../../../../../../services/uptrendsService';

export async function GET(req, { params }) {
  const { monitorGuid } = params;

  if (!monitorGuid) {
    return new Response(
      JSON.stringify({ error: 'Monitor GUID is required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Extract query parameters from the URL
  const url = new URL(req.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  try {
    // Fetch monitor checks using the service function
    const checks = await fetchMonitorChecks(monitorGuid, queryParams);

    return new Response(JSON.stringify(checks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(
      `Error fetching monitor checks for monitorGuid ${monitorGuid}:`,
      error.message
    );
    return new Response(
      JSON.stringify({ error: 'Failed to fetch monitor checks.', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
