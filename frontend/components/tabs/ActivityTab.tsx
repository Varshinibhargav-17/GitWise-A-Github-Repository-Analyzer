import { BarChart3, Users, Zap, Calendar } from "lucide-react";

export default function ActivityTab({ activityMetrics }: { activityMetrics?: any }) {
  // Optional: fallback data (in case backend doesn’t send yet)
  const data = activityMetrics || {
    developmentVelocity: {
      commitsPerWeek: 42,
      prPerWeek: 8,
      issuesPerWeek: 15,
      releaseCadence: "Every 3 weeks",
      velocityTrend: "Stable →",
    },
    teamCollaboration: {
      coreTeam: 12,
      occasionalContributors: 45,
      communityRatio: "35%",
      reviewDistribution: "Balanced across team",
      knowledgeSharing: "High",
    },
    workflowEfficiency: {
      prReviewTime: "1.8 days",
      firstResponseTime: "6.2 hours",
      ciPassRate: "92%",
      testCoverageTrend: "+3% this quarter",
      documentationSync: "88%",
    },
    projectRhythm: {
      activeDays: "Weekdays (94% of activity)",
      peakHours: "10AM–4PM UTC",
      sprintConsistency: "Regular",
      maintenanceWindows: "Weekend deployments",
      hotfixFrequency: "Low (2% of releases)",
    },
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1️⃣ Development Velocity */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold">🚀 Development Momentum</h3>
        </div>
        <ul className="space-y-1 text-gray-700">
          <li>Commit Frequency: {data.developmentVelocity.commitsPerWeek} commits/week</li>
          <li>PR Merge Rate: {data.developmentVelocity.prPerWeek} PRs/week</li>
          <li>Issue Closure Rate: {data.developmentVelocity.issuesPerWeek} issues/week</li>
          <li>Release Cadence: {data.developmentVelocity.releaseCadence}</li>
          <li>Velocity Trend: {data.developmentVelocity.velocityTrend}</li>
        </ul>
      </div>

      {/* 2️⃣ Team Collaboration */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-bold">👥 Contributor Network</h3>
        </div>
        <ul className="space-y-1 text-gray-700">
          <li>Core Team: {data.teamCollaboration.coreTeam} developers (50+ commits)</li>
          <li>Occasional Contributors: {data.teamCollaboration.occasionalContributors} developers</li>
          <li>Community Ratio: {data.teamCollaboration.communityRatio} of total commits</li>
          <li>Review Distribution: {data.teamCollaboration.reviewDistribution}</li>
          <li>Knowledge Sharing: {data.teamCollaboration.knowledgeSharing}</li>
        </ul>
      </div>

      {/* 3️⃣ Workflow Efficiency */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-bold">⚡ Process Metrics</h3>
        </div>
        <ul className="space-y-1 text-gray-700">
          <li>PR Review Time: {data.workflowEfficiency.prReviewTime} average</li>
          <li>First Response Time: {data.workflowEfficiency.firstResponseTime}</li>
          <li>CI/CD Pass Rate: {data.workflowEfficiency.ciPassRate}</li>
          <li>Test Coverage Trend: {data.workflowEfficiency.testCoverageTrend}</li>
          <li>Documentation Sync: {data.workflowEfficiency.documentationSync}</li>
        </ul>
      </div>

      {/* 4️⃣ Project Rhythm */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-bold">📅 Development Patterns</h3>
        </div>
        <ul className="space-y-1 text-gray-700">
          <li>Most Active: {data.projectRhythm.activeDays}</li>
          <li>Peak Hours: {data.projectRhythm.peakHours}</li>
          <li>Sprint Consistency: {data.projectRhythm.sprintConsistency}</li>
          <li>Maintenance Windows: {data.projectRhythm.maintenanceWindows}</li>
          <li>Hotfix Frequency: {data.projectRhythm.hotfixFrequency}</li>
        </ul>
        <div className="mt-4 text-sm text-gray-500">
          Visualization: Team activity calendar heatmap & PR lifecycle flow chart
        </div>
      </div>
    </div>
  );
}
