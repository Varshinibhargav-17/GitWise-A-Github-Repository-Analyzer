"use client";

import { Shield, RefreshCw, BarChart3, Settings, Package } from "lucide-react";

export default function DependenciesTab({ dependencyMetrics }: { dependencyMetrics: any }) {
  if (!dependencyMetrics) {
    return <div className="mt-6 text-center text-gray-500">No dependency data available</div>;
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
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-bold">🛡️ Security & Maintenance</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Total Dependencies: {totalDependencies}</li>
          <li>• Direct Dependencies: {directDependencies}</li>
          <li>• Security Vulnerabilities: {vulnerabilities === 0 ? "0 ✅" : vulnerabilities}</li>
          <li>• Outdated Packages: {outdatedPackages}</li>
          <li>• License Compliance: {licenseCompliance}% ✅</li>
        </ul>
      </div>

      {/* 2️⃣ Update Management */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <RefreshCw className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold">🔄 Maintenance Rhythm</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Last Security Audit: {lastAudit}</li>
          <li>• Dependency Updates/Month: {updatesPerMonth}</li>
          <li>• Breaking Changes (year): {breakingChanges}</li>
          <li>• Update Response Time: {responseTime} days</li>
          <li>• Automated Updates: {automatedUpdates}%</li>
        </ul>
      </div>

      {/* 3️⃣ Impact Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-bold">📊 Dependency Impact</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Bundle Size Contribution: {bundleSize} MB</li>
          <li>• Load Time Impact: {loadImpact} ms</li>
          <li>• Unused Dependencies: {unusedDependencies}</li>
          <li>• Critical Dependencies: {criticalDependencies}</li>
          <li>• Tree-shaking Efficiency: 85%</li>
        </ul>
      </div>

      {/* 4️⃣ Tech Stack Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Settings className="w-6 h-6 text-orange-600 mr-2" />
          <h3 className="text-lg font-bold">🏗️ Architecture Health</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Framework Modernity: {framework}</li>
          <li>• Build Tool Efficiency: {buildTool}</li>
          <li>• Testing Coverage: {testing}</li>
          <li>• Type Safety: {typeSafety}</li>
          <li>• API Layer: {apiLayer}</li>
        </ul>
      </div>

      {/* 5️⃣ Dependency Lists */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 md:col-span-2">
        <div className="flex items-center mb-4">
          <Package className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-bold">📦 Dependencies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Production Dependencies:</h4>
            <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
              <ul className="text-gray-700 space-y-1">
                {dependencyMetrics.dependencies.length > 0 ? dependencyMetrics.dependencies.map((dep: string, idx: number) => (
                  <li key={idx} className="text-sm">• {dep}</li>
                )) : <li className="text-sm">No production dependencies found.</li>}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Development Dependencies:</h4>
            <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
              <ul className="text-gray-700 space-y-1">
                {dependencyMetrics.devDependencies.length > 0 ? dependencyMetrics.devDependencies.map((dep: string, idx: number) => (
                  <li key={idx} className="text-sm">• {dep}</li>
                )) : <li className="text-sm">No development dependencies found.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
