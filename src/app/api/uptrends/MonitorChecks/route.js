//src/app/api/uptrends/MonitorChecks/route.js

import {
  fetchMonitorGroupMonitors,
  fetchMonitorGroupChecks,
  linkDataByMonitorGuid,
} from '../../../../services/uptrendsService';

export async function GET(req) {
  try {
    const monitorGroupGuid = req.nextUrl.searchParams.get('monitorGroupGuid');
    if (!monitorGroupGuid) {
      return new Response(
        JSON.stringify({ error: 'monitorGroupGuid is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Received monitorGroupGuid:', monitorGroupGuid);

    // Fetch monitor details
    const monitorDetails = await fetchMonitorGroupMonitors(monitorGroupGuid);
    console.log('Fetched monitor details:', monitorDetails);

    // Fetch monitor checks
    const monitorChecksResponse = await fetchMonitorGroupChecks(monitorGroupGuid, {
      Sorting: 'Descending',
      Take: 100,
    });
    console.log('Raw monitorChecks response:', monitorChecksResponse);

    // Ensure monitorChecks is an array from the Data property
    const monitorChecks = monitorChecksResponse?.Data || [];
    console.log('Extracted monitorChecks:', monitorChecks);

    // Link monitors with their checks
    const linkedData = linkDataByMonitorGuid(monitorDetails, monitorChecks);
    console.log('Linked Data:', linkedData);

    return new Response(JSON.stringify(linkedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in MonitorChecks API route:', error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch monitor data.',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
