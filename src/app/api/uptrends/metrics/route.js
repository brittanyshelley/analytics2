import { fetchMetrics } from '../../../../services/uptrendsService';

export async function GET() {
  try {
    const metrics = await fetchMetrics();
    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
