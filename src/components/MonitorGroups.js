// import { useApplicationData } from '@/hooks/useApplicationData';

// export default function MonitorGroups() {
//   const { monitorGroups, monitors, loading } = useApplicationData();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {monitorGroups.map((group) => (
//         <div key={group.monitorGroupGuid}>
//           <h2>{group.name}</h2>
//           <ul>
//             {monitors[group.monitorGroupGuid]?.map((monitor) => (
//               <li key={monitor.monitorGuid}>{monitor.name}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// //MonitorGroups.js
// import { useApplicationData } from '../hooks/useApplicationData';

// export default function MonitorGroups() {
//   const { monitorGroups, monitors, loading } = useApplicationData();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {monitorGroups.map((group) => (
//         <div key={group.monitorGroupGuid}>
//           <h2>{group.name}</h2>
//           <ul>
//             {monitors[group.monitorGroupGuid]?.map((monitor) => (
//               <li key={monitor.monitorGuid}>{monitor.name}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useApplicationData } from '../hooks/useApplicationData';

// export default function MonitorGroups() {
//   const { monitorGroups, monitors, loading } = useApplicationData();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {monitorGroups.map((group) => (
//         <div key={group.MonitorGroupGuid}>
//           <h2>{group.Description}</h2>
//           <ul>
//             {monitors[group.MonitorGroupGuid]?.map((monitor) => (
//               <li key={monitor.MonitorGuid}>{monitor.Name}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useApplicationData } from '../hooks/useApplicationData';
import React from 'react';

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MonitorGroups() {
  const { monitorGroups, monitors, loading } = useApplicationData();

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-4">
      {monitorGroups.map((group) => (
        <div key={group.MonitorGroupGuid} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-bold text-lg mb-2">{group.Description}</h2>
          <ul>
            {monitors[group.MonitorGroupGuid]?.map((monitor) => (
              <li key={monitor.MonitorGuid}>{monitor.Name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
