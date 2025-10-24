"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#E11D48", "#0EA5E9"];

const OverviewTab = () => {
  // Mock Data (replace with real API data later)
  const keyMetrics = [
    { title: "Total Contributors", value: 42 },
    { title: "Latest Release", value: "v18.2.0" },
    { title: "Open PRs", value: 15 },
    { title: "Watchers", value: 1200 },
  ];

  const languageData = [
    { name: "JavaScript", value: 60 },
    { name: "TypeScript", value: 25 },
    { name: "CSS", value: 10 },
    { name: "Others", value: 5 },
  ];

  const commitData = [
    { month: "Jan", commits: 40 },
    { month: "Feb", commits: 55 },
    { month: "Mar", commits: 30 },
    { month: "Apr", commits: 70 },
    { month: "May", commits: 90 },
    { month: "Jun", commits: 60 },
    { month: "Jul", commits: 45 },
    { month: "Aug", commits: 80 },
    { month: "Sep", commits: 50 },
    { month: "Oct", commits: 75 },
    { month: "Nov", commits: 65 },
    { month: "Dec", commits: 85 },
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, idx) => (
          <Card key={idx} className="shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500 text-sm">{metric.title}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Language Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Language Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Commit Activity Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Commit Activity (Last 12 Months)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={commitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="commits" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewTab;
