"use client";

export default function CodeTab() {
  // Mock data for now
  const topFiles = [
    { name: "src/index.js", loc: 1500 },
    { name: "src/App.js", loc: 1200 },
    { name: "src/components/Header.js", loc: 800 },
    { name: "src/utils/helpers.js", loc: 600 },
  ];

  const codeStructure = [
    { dir: "src", files: 25 },
    { dir: "public", files: 10 },
    { dir: "tests", files: 8 },
    { dir: "config", files: 5 },
  ];

  const totalLOC = 9800;

  return (
    <div className="mt-6 space-y-6">
      {/* Total Lines of Code Card */}
      <div className="bg-white p-6 rounded shadow text-center">
        <p className="text-2xl font-bold">{totalLOC.toLocaleString()}</p>
        <p className="text-gray-500">Total Lines of Code</p>
      </div>

      {/* Top Files */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Top Files (by Lines of Code)</h3>
        <ul className="space-y-2">
          {topFiles.map((file, idx) => (
            <li
              key={idx}
              className="flex justify-between border-b pb-2 text-sm text-gray-700"
            >
              <span>{file.name}</span>
              <span className="font-medium">{file.loc} LOC</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Structure */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Code Structure</h3>
        <ul className="space-y-2">
          {codeStructure.map((dir, idx) => (
            <li
              key={idx}
              className="flex justify-between border-b pb-2 text-sm text-gray-700"
            >
              <span>📂 {dir.dir}</span>
              <span className="font-medium">{dir.files} files</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
