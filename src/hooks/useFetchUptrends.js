// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useFetchUptrends = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const endpoints = [
//     '/Alert/Monitor/{monitorGuid}',
//     '/Alert/MonitorGroup/{monitorGroupGuid}',
//     '/AlertDefinition',
//     '/AlertDefinition/{alertDefinitionGuid}',
//     '/AlertDefinition/{alertDefinitionGuid}/Member',
//     '/AlertDefinition/{alertDefinitionGuid}/EscalationLevel/{escalationLevelId}',
//     '/AlertDefinition/{alertDefinitionGuid}/EscalationLevel/{escalationLevelId}/Member',
//     '/AlertDefinition/{alertDefinitionGuid}/EscalationLevel/{escalationLevelId}/Integration',
//     '/AlertDefinition/{alertDefinitionGuid}/Authorizations',
//     '/Monitor',
//     '/Monitor/MonitorGroup/{monitorGroupGuid}',
//     '/Monitor/{monitorGuid}',
//     '/Monitor/{monitorGuid}/MonitorGroup',
//     '/Monitor/{monitorGuid}/MaintenancePeriod',
//     '/MonitorCheck',
//     '/MonitorCheck/{monitorCheckId}',
//     '/MonitorCheck/Monitor/{monitorGuid}',
//     '/MonitorCheck/MonitorGroup/{monitorGroupGuid}',
//     '/MonitorGroup',
//     '/MonitorGroup/{monitorGroupGuid}',
//     '/MonitorGroup/{monitorGroupGuid}/Member',
//     '/Operator',
//     '/Operator/{operatorGuid}',
//     '/Operator/{operatorGuid}/OperatorGroup',
//     '/Operator/{operatorGuid}/Authorization',
//     '/Operator/{operatorGuid}/DutySchedule',
//     '/Operator/{operatorGuid}/Newsletter',
//     '/OperatorGroup',
//     '/OperatorGroup/{operatorGroupGuid}',
//     '/OperatorGroup/{operatorGroupGuid}/Member',
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const results = await Promise.all(
//           endpoints.map(async (endpoint) => {
//             const response = await axios.get(`https://api.uptrends.com/v4${endpoint}`);
//             return { endpoint, data: response.data };
//           })
//         );
//         const dataMap = results.reduce((acc, result) => {
//           acc[result.endpoint] = result.data;
//           return acc;
//         }, {});
//         setData(dataMap);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { data, loading, error };
// };

// export default useFetchUptrends;
'use client';
import { useState, useEffect } from 'react';
import createUptrendsApiClient from '../services/uptrendsApiClient';

const useFetchUptrends = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoints = [
    '/Alert/Monitor/{monitorGuid}',
    '/Alert/MonitorGroup/{monitorGroupGuid}',
    '/AlertDefinition',
    '/AlertDefinition/{alertDefinitionGuid}',
    '/AlertDefinition/{alertDefinitionGuid}/Member',
    '/AlertDefinition/{alertDefinitionGuid}/EscalationLevel/{escalationLevelId}',
    '/AlertDefinition/{alertDefinitionGuid}/EscalationLevel/{escalationLevelId}/Member',
    '/AlertDefinition/{alertDefinitionGuid}/EscalationLevel/{escalationLevelId}/Integration',
    '/AlertDefinition/{alertDefinitionGuid}/Authorizations',
    '/Monitor',
    '/Monitor/MonitorGroup/{monitorGroupGuid}',
    '/Monitor/{monitorGuid}',
    '/Monitor/{monitorGuid}/MonitorGroup',
    '/Monitor/{monitorGuid}/MaintenancePeriod',
    '/MonitorCheck',
    '/MonitorCheck/{monitorCheckId}',
    '/MonitorCheck/Monitor/{monitorGuid}',
    '/MonitorCheck/MonitorGroup/{monitorGroupGuid}',
    '/MonitorGroup',
    '/MonitorGroup/{monitorGroupGuid}',
    '/MonitorGroup/{monitorGroupGuid}/Member',
    '/Operator',
    '/Operator/{operatorGuid}',
    '/Operator/{operatorGuid}/OperatorGroup',
    '/Operator/{operatorGuid}/Authorization',
    '/Operator/{operatorGuid}/DutySchedule',
    '/Operator/{operatorGuid}/Newsletter',
    '/OperatorGroup',
    '/OperatorGroup/{operatorGroupGuid}',
    '/OperatorGroup/{operatorGroupGuid}/Member',
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const apiClient = createUptrendsApiClient();
      try {
        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            const response = await apiClient.get(endpoint);
            return { endpoint, data: response.data };
          })
        );
        const dataMap = results.reduce((acc, result) => {
          acc[result.endpoint] = result.data;
          return acc;
        }, {});
        setData(dataMap);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchUptrends;