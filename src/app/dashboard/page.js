// app/dashboard/page.js

'use client'
import React, { useState } from 'react';
import GroupStatus from '../../components/GroupStatus';
import GroupStatus2 from '../../components/GroupStatus2';

import MonitorDetails from '../../components/MonitorDetails';
import MonitorGroups from '../../components/MonitorGroupDetails';
import MonitorStatus from '../../components/MonitorStatus';
import MonitorChecks from '../../components/MonitorChecks';

const Dashboard = () => {
  const [monitorGroupGuid, setmonitorGroupGuid] = useState('monitorGroupGuid');

  return (
    <div>
      {/* <GroupStatus /> */}
      <GroupStatus2 />
      <MonitorChecks />
      <MonitorDetails />
      <MonitorGroups/>
      {/* <MonitorGroups />
      <MonitorDashboard/> */}
    </div>
  );
};

export default Dashboard;