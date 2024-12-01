

import { fetchMonitorGroupMembers } from '../../../../../../services/uptrendsService';

export async function GET(req, { params }) {
  const { monitorGroupGuid } = params;

  if (!monitorGroupGuid) {
    return new Response(
      JSON.stringify({ error: 'Monitor Group GUID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await fetchMonitorGroupMembers(monitorGroupGuid);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching monitor group members for group ${monitorGroupGuid}:`, error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}