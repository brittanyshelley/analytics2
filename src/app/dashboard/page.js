'use client'
import React, { useState } from 'react';
import GroupStatus from '../../components/GroupStatus';
import GroupStatus2 from '../../components/GroupStatus2';
import MonitorGroupComponent from '../../components/MonitorGroupComponent';

const Dashboard = () => {
  const [groupId, setGroupId] = useState('groupId');

  return (
    <div>
      <h1>Dashboard</h1>
      <GroupStatus />
      <GroupStatus2 />
      <MonitorGroupComponent groupId={groupId}/>
    </div>
  );
};

export default Dashboard;