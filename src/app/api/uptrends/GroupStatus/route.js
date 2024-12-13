import { NextResponse } from 'next/server';
import { fetchMonitorGroupStatus } from '../../../../services/uptrendsService';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const monitorGroupGuid = searchParams.get('monitorGroupGuid');
  const skip = searchParams.get('skip') || 0;
  const take = searchParams.get('take') || 10000;

  if (!monitorGroupGuid) {
    return NextResponse.json({ error: 'monitorGroupGuid is required' }, { status: 400 });
  }

  try {
    const data = await fetchMonitorGroupStatus(monitorGroupGuid, skip, take);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}