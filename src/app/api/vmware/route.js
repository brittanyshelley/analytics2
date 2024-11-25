// app/api/vmware/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

const { VCENTER_HOST, VCENTER_USER, VCENTER_PASSWORD } = process.env;

export async function GET() {
  if (!VCENTER_HOST || !VCENTER_USER || !VCENTER_PASSWORD) {
    return NextResponse.json(
      { error: 'Missing environment variables for vCenter credentials' },
      { status: 500 }
    );
  }

  try {
    const sessionResponse = await axios.post(
      `https://${VCENTER_HOST}/rest/com/vmware/cis/session`,
      {},
      {
        auth: { username: VCENTER_USER, password: VCENTER_PASSWORD },
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      }
    );

    const sessionToken = sessionResponse.data.value;

    const vmListResponse = await axios.get(
      `https://${VCENTER_HOST}/rest/vcenter/vm`,
      { headers: { 'vmware-api-session-id': sessionToken } }
    );

    return NextResponse.json(vmListResponse.data);
  } catch (error) {
    console.error("Error fetching VMware data:", error.message);
    return NextResponse.json(
      { error: 'Unable to fetch VMware data', details: error.message },
      { status: 500 }
    );
  }
}

