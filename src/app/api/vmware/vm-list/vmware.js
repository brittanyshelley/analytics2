// app/api/vmware/vm-list/route.js
import axios from 'axios';

const vcenter = process.env.VCENTER_HOST;
const username = process.env.VCENTER_USER;
const password = process.env.VCENTER_PASSWORD;

export default async function handler(req, res) {
  try {
    const sessionResponse = await axios.post(
      `https://${vcenter}/rest/com/vmware/cis/session`,
      {},
      {
        auth: { username, password },
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      }
    );
    const sessionToken = sessionResponse.data.value;

    const vmListResponse = await axios.get(`https://${vcenter}/rest/vcenter/vm`, {
      headers: { 'vmware-api-session-id': sessionToken },
    });

    res.status(200).json(vmListResponse.data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
}

