"use client";

import { useState } from "react";
import Link from "next/link";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import CodeTab from "./tabs/CodeTab";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"];

export default function RepoOverview({ repoData }: { repoData: any }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const repo = repoData.repo;
  const languages = repoData.languages;
  const commits = repoData.commits;

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500">
        <Link href="/">Home</Link> &gt; {repo.name}
      </div>

      {/* Overview Card */}
      <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={repo.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{repo.owner}/{repo.name}</h2>
            <p className="text-sm text-gray-500">
              {repo.language} • {repo.license} • Updated {repo.lastUpdated}
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600">{repo.healthScore}/100</div>
          <p className="text-sm text-gray-500">Health Score</p>
        </div>
        <button className="px-4 py-2 bg-yellow-400 rounded shadow hover:bg-yellow-500">
          ⭐ Save to Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 text-gray-600">
        {["Overview", "Code", "Activity", "Community", "Dependencies"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${
              activeTab === tab ? "text-indigo-600 border-b-2 border-indigo-600" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-lg font-bold">{repo.stars}</p>
              <p className="text-gray-500">Stars</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-lg font-bold">{repo.forks}</p>
              <p className="text-gray-500">Forks</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-lg font-bold">{repo.issues}</p>
              <p className="text-gray-500">Open Issues</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-lg font-bold">{repo.watchers}</p>
              <p className="text-gray-500">Watchers</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Language Chart */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Language Breakdown</h3>
              <PieChart width={300} height={250}>
                <Pie
                  data={languages}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {languages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Commit Activity */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Commit Activity</h3>
              <BarChart width={300} height={250} data={commits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" fill="#6366f1" />
              </BarChart>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Code" && <CodeTab />}
    </div>
  );
}
