// pages/api/Monitor/[monitorGuid].js

import { fetchMonitorDetails } from '../../../../../services/uptrendsService';

// export default async function handler(req, res) {
//   const { monitorGuid } = req.query;

//   if (!monitorGuid) {
//     return res.status(400).json({ error: 'Monitor GUID is required' });
//   }

//   try {
//     const monitorDetails = await fetchMonitorDetails(monitorGuid);
//     return res.status(200).json(monitorDetails);
//   } catch (error) {
//     console.error(`Error fetching monitor details for GUID ${monitorGuid}:`, error.message);
//     return res.status(500).json({ error: 'Failed to fetch monitor details' });
//   }
// }

export async function GET(req, res) {
  const { monitorGuid } = req.query;

  if (!monitorGuid) {
    return res.status(400).json({ error: 'Monitor GUID is required' });
  }

  try {
    const monitorDetails = await fetchMonitorDetails(monitorGuid);
    return res.status(200).json(monitorDetails);
  } catch (error) {
    console.error(`Error fetching monitor details for GUID ${monitorGuid}:`, error.message);
    return res.status(500).json({ error: 'Failed to fetch monitor details' });
  }
}