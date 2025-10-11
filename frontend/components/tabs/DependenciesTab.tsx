"use client";

export default function DependenciesTab({ dependencyMetrics }: { dependencyMetrics: any }) {
  if (!dependencyMetrics) {
    return <p className="text-gray-500">Loading dependency data...</p>;
  }

  const {
    totalDependencies,
    directDependencies,
    vulnerabilities,
    outdatedPackages,
    licenseCompliance,
    lastAudit,
    updatesPerMonth,
    breakingChanges,
    responseTime,
    automatedUpdates,
    bundleSize,
    loadImpact,
    unusedDependencies,
    criticalDependencies,
    framework,
    buildTool,
    testing,
    typeSafety,
    apiLayer,
  } = dependencyMetrics;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1️⃣ Dependency Health */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">🛡️ Security & Maintenance</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Total Dependencies: {totalDependencies}</li>
          <li>• Direct Dependencies: {directDependencies}</li>
          <li>• Security Vulnerabilities: {vulnerabilities === 0 ? "0 ✅" : vulnerabilities}</li>
          <li>• Outdated Packages: {outdatedPackages}</li>
          <li>• License Compliance: {licenseCompliance}% ✅</li>
        </ul>
      </div>

      {/* 2️⃣ Update Management */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">🔄 Maintenance Rhythm</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Last Security Audit: {lastAudit}</li>
          <li>• Dependency Updates/Month: {updatesPerMonth}</li>
          <li>• Breaking Changes (year): {breakingChanges}</li>
          <li>• Update Response Time: {responseTime} days</li>
          <li>• Automated Updates: {automatedUpdates}%</li>
        </ul>
      </div>

      {/* 3️⃣ Impact Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">📊 Dependency Impact</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Bundle Size Contribution: {bundleSize} MB</li>
          <li>• Load Time Impact: {loadImpact} ms</li>
          <li>• Unused Dependencies: {unusedDependencies}</li>
          <li>• Critical Dependencies: {criticalDependencies}</li>
          <li>• Tree-shaking Efficiency: 85%</li>
        </ul>
      </div>

      {/* 4️⃣ Tech Stack Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">🏗️ Architecture Health</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Framework Modernity: {framework}</li>
          <li>• Build Tool Efficiency: {buildTool}</li>
          <li>• Testing Coverage: {testing}</li>
          <li>• Type Safety: {typeSafety}</li>
          <li>• API Layer: {apiLayer}</li>
        </ul>
      </div>

      {/* 5️⃣ Dependency Lists */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold mb-4">📦 Dependencies</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">Production Dependencies:</h4>
            <ul className="text-gray-700 space-y-1">
              {dependencyMetrics.dependencies.length > 0 ? dependencyMetrics.dependencies.map((dep: string, idx: number) => (
                <li key={idx}>• {dep}</li>
              )) : <li>No production dependencies found.</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Development Dependencies:</h4>
            <ul className="text-gray-700 space-y-1">
              {dependencyMetrics.devDependencies.length > 0 ? dependencyMetrics.devDependencies.map((dep: string, idx: number) => (
                <li key={idx}>• {dep}</li>
              )) : <li>No development dependencies found.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
