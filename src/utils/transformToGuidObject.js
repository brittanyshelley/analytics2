export const transformToGuidObject = (data) =>
  data.reduce((acc, monitor) => {
    acc[monitor.MonitorGuid] = monitor;
    return acc;
  }, {});