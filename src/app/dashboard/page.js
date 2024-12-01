'use client'
import React, { useState } from 'react';
import GroupStatus from '../../components/GroupStatus';
import GroupStatus2 from '../../components/GroupStatus2';
import MonitorGroups from '../../components/MonitorGroups';


const Dashboard = () => {
  const [monitorGroupGuid, setmonitorGroupGuid] = useState('monitorGroupGuid');

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <GroupStatus />
      <GroupStatus2 /> */}
      <MonitorGroups />
    </div>
  );
};

export default Dashboard;