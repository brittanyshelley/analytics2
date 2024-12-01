import { useApplicationData } from '@/hooks/useApplicationData';

export default function MonitorGroups() {
  const { monitorGroups, monitors, loading } = useApplicationData();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {monitorGroups.map((group) => (
        <div key={group.monitorGroupGuid}>
          <h2>{group.name}</h2>
          <ul>
            {monitors[group.monitorGroupGuid]?.map((monitor) => (
              <li key={monitor.monitorGuid}>{monitor.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}