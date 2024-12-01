
import { fetchMonitorGroupChecks } from '../../../../../services/uptrendsService';

export async function GET(req, context) {
  try {
    // Destructure `params` from the context and ensure it's resolved
    const { params } = context;
    const { monitorGroupGuid } = await params || {};

    if (!monitorGroupGuid) {
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
    const data = await fetchMonitorGroupChecks(monitorGroupGuid, { Sorting, Take, PresetPeriod });

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
