import { FileText, BarChart3 } from "lucide-react";

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
      {/* Code Statistics Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold">📊 Code Statistics</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Total Lines of Code: {linesAdded.toLocaleString()}</li>
          <li>• Lines Added: {linesAdded.toLocaleString()}</li>
          <li>• Lines Removed: {linesRemoved.toLocaleString()}</li>
          <li>• Net Change: {netChange > 0 ? '+' : ''}{netChange.toLocaleString()} lines</li>
        </ul>
      </div>

      {/* Largest Files Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-bold">📁 Largest Files</h3>
        </div>
        {mostActiveFiles.length > 0 ? (
          <ul className="space-y-2 text-gray-700">
            {mostActiveFiles.slice(0, 5).map((file: any, index: number) => (
              <li key={file.file} className="flex justify-between items-center">
                <span className="truncate flex-1 mr-2">{file.file}</span>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {file.changes.toLocaleString()} lines
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No file data available</p>
        )}
      </div>
    </div>
  );
}
