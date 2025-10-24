export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

      {/* Overview card */}
      <div className="bg-white shadow rounded-xl p-6 flex items-center space-x-6">
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 w-20 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Grid cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
