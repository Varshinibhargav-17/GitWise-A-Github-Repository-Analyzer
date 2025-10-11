"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import CodeTab from "./tabs/CodeTab";
import ActivityTab from "./tabs/ActivityTab";
import DependenciesTab from "./tabs/DependenciesTab";
import CommunityTab from "./tabs/CommunityTab";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"];

export default function RepoOverview({ repoData }: { repoData: any }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const repo = repoData.repo;
  const languages = repoData.languages;
  const commits = repoData.commits;
  const codeMetrics = repoData.codeMetrics;
  const activity = repoData.activity; // expects backend to return activity data

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        &gt; {repo.name}
      </div>

      {/* Overview Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={repo.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              {repo.owner}/{repo.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {repo.language} • {repo.license} • Updated {repo.lastUpdated}
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600">
            {repo.healthScore}/100
          </div>
          <p className="text-sm text-gray-500">Health Score</p>
        </div>
        <button className="px-4 py-2 bg-yellow-400 rounded-xl shadow hover:bg-yellow-500 transition-all duration-200">
          ⭐ Save to Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 text-gray-600">
        {["Overview", "Code", "Activity", "Community", "Dependencies"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 font-medium ${
                activeTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "hover:text-gray-900 transition-colors duration-200"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              { value: repo.stars, label: "Stars" },
              { value: repo.forks, label: "Forks" },
              { value: repo.issues, label: "Open Issues" },
              { value: repo.watchers, label: "Watchers" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-white p-4 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-200"
              >
                <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                <p className="text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Language Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Language Breakdown
              </h3>
              <PieChart width={300} height={250}>
                <Pie
                  data={languages}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {languages.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Commit Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Commit Activity
              </h3>
              <BarChart width={300} height={250} data={commits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Code" && codeMetrics && <CodeTab codeMetrics={codeMetrics} />}

      {activeTab === "Activity" && <ActivityTab activityMetrics={repoData.activityMetrics} />}

      {activeTab === "Community" && <CommunityTab communityMetrics={repoData.communityMetrics} />}

      {activeTab === "Dependencies" && <DependenciesTab dependencyMetrics={repoData.dependencyMetrics} />}


    </div>
  );
}
