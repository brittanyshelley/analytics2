// app/dashboard/loading.js
// export default function Loading() {
//   return <p>Loading dashboard...</p>;
// }
export default function Loading() {
  return (
    <div className="w-full h-full p-4 space-y-4">
      {/* Header Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded-md w-1/4 mb-6"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart Placeholder */}
        <div className="border rounded-lg p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-[200px] bg-gray-200 rounded"></div>
        </div>

        {/* Table Placeholder */}
        <div className="border rounded-lg p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    </div>
  );
}