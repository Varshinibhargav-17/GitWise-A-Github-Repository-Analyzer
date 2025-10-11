export default function CodeTab({ codeMetrics }: { codeMetrics: any }) {
  // Safely destructure with defaults
  const {
    linesAdded = 0,
    linesRemoved = 0,
    netChange = 0,
    mostActiveFiles = [],
  } = codeMetrics || {};

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Code Changes Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">Code Changes</h3>
        <p>Lines Added: {linesAdded}</p>
        <p>Lines Removed: {linesRemoved}</p>
        <p>Net Change: {netChange}</p>
      </div>

      {/* Most Active Files Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">Most Active Files</h3>
        {mostActiveFiles.length > 0 ? (
          <ul>
            {mostActiveFiles.map((file: any) => (
              <li key={file.file}>
                {file.file} ({file.changes} changes)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}
