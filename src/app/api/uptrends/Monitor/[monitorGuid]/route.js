
// src/app/api/uptrends/Monitor/[monitorGuid]/route.js

import { fetchMonitorDetails } from '../../../../../services/uptrendsService';

export async function GET(req, { params }) {
  try {
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
    console.error(`Error fetching monitor details for GUID ${monitorGuid || 'unknown'}:`, error.message);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch monitor details' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}