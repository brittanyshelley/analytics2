import { fetchAlerts } from '../../../../services/uptrendsService';

export async function GET() {
  try {
    // Call the service function to fetch alerts from Uptrends
    const alerts = await fetchAlerts();
    return new Response(JSON.stringify(alerts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log and return error response
    console.error('Error fetching Uptrends alerts:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
