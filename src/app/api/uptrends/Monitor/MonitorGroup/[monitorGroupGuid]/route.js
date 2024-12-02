// pages/api/Monitor/MonitorGroup/[monitorGroupGuid].js

import { fetchMonitorGroupMonitors } from '../../../../../services/uptrendsService';

export default async function handler(req, res) {
  const { monitorGroupGuid } = req.query;

  if (!monitorGroupGuid) {
    return res.status(400).json({ error: 'Monitor Group GUID is required' });
  }

  try {
    const monitors = await fetchMonitorGroupMonitors(monitorGroupGuid);
    return res.status(200).json(monitors);
  } catch (error) {
    console.error(`Error fetching monitor group monitors for group ${monitorGroupGuid}:`, error.message);
    return res.status(500).json({ error: 'Failed to fetch monitor group monitors' });
  }
}