// app/dashboard/page.js

'use client'
import React, { useState } from 'react';
import GroupStatus from '../../components/GroupStatus';
import GroupStatus2 from '../../components/GroupStatus2';
import MonitorGroups from '../../components/MonitorGroups';
import MonitorDashboard from '../../components/MonitorDashboard';
import MonitorDetails from '../../components/MonitorDetails';

const Dashboard = () => {
  const [monitorGroupGuid, setmonitorGroupGuid] = useState('monitorGroupGuid');

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <GroupStatus /> */}
      <GroupStatus2 />
      <MonitorDetails />
      {/* <MonitorGroups />
      <MonitorDashboard/> */}
    </div>
  );
};

export default Dashboard;