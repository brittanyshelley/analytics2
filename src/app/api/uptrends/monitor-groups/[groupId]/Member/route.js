// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import createUptrendsApiClient from '../../../../../../services/uptrendsApiClient';

// export async function GET(request, { params }) {
//   const { groupId } = params;
//   const apiClient = createUptrendsApiClient();

//   try {
//     // Call the Uptrends API using the extracted groupId
//     const response = await apiClient.get(`/MonitorGroup/${groupId}/Member`);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error(`Error fetching members for MonitorGroup ${groupId}:`, error.message);
//     return NextResponse.json({ error: 'Failed to fetch monitor group members' }, { status: 500 });
//   }
// }
// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import createUptrendsApiClient from '../../../../../../services/uptrendsApiClient';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const groupId = searchParams.get('groupId');
//   const apiClient = createUptrendsApiClient();

//   try {
//     const response = await apiClient.get(`/MonitorGroup/${groupId}/Member`);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error(`Error fetching members for MonitorGroup ${groupId}:`, error.message);
//     return NextResponse.json({ error: 'Failed to fetch monitor group members' }, { status: 500 });
//   }
// }
// import { NextResponse } from 'next/server';

// import createUptrendsApiClient from '../../../../../../services/uptrendsApiClient';

// export async function GET(request, { params }) {
//   const { groupId } = params;
//   const apiClient = createUptrendsApiClient();

//   if (!groupId) {
//     return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
//   }

//   try {
//     const response = await apiClient.get(`/MonitorGroup/${groupId}/Member`);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error(`Error fetching members for MonitorGroup ${groupId}:`, error.message);
//     return NextResponse.json({ error: 'Failed to fetch monitor group members' }, { status: 500 });
//   }
// }
// import { NextResponse } from 'next/server';
// import { fetchMonitorGroupMembers } from '../../../../../../services/uptrendsService';

// export async function GET(request, { params }) {
//   const { groupId } = params;

//   if (!groupId) {
//     return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
//   }

//   try {
//     const data = await fetchMonitorGroupMembers(groupId);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(`Error fetching members for MonitorGroup ${groupId}:`, error.message);
//     return NextResponse.json({ error: 'Failed to fetch monitor group members' }, { status: 500 });
//   }
// }
// import { fetchMonitorChecksAndCategorize } from '../../../../../../services/uptrendsService';

// export async function GET(request, { params }) {
//   const { groupId } = params;

//   if (!groupId) {
//     return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
//   }

//   try {
//     const data = await fetchMonitorChecksAndCategorize(groupId);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(`Error fetching monitor checks and categorizing for group ${groupId}:`, error.message);
//     return NextResponse.json({ error: 'Failed to fetch monitor checks and categorize' }, { status: 500 });
//   }
// }
// export async function GET() {
//   try {
//     const data = await fetchMonitorChecksAndCategorize(groupId);
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error in API route:', error.message);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

import { fetchMonitorChecksAndCategorize } from '../../../../../../services/uptrendsService';

export async function GET(request, { params }) {
  const { groupId } = params;

  if (!groupId) {
    return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
  }

  try {
    const data = await fetchMonitorChecksAndCategorize(groupId);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching monitor checks and categorizing for group ${groupId}:`, error.message);
    return NextResponse.json({ error: 'Failed to fetch monitor checks and categorize' }, { status: 500 });
  }
}