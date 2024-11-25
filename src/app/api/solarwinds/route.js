// app/api/solarwinds/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = 'https://api.solarwinds.com/path_to_resource'; // Replace with actual endpoint
  const { SOLARWINDS_API_KEY } = process.env;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${SOLARWINDS_API_KEY}`,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch SolarWinds data' }, { status: 500 });
  }
}
