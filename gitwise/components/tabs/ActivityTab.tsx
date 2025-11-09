import { BarChart3, Users, Zap, Calendar } from "lucide-react";

export default function ActivityTab({ activityMetrics }: { activityMetrics?: any }) {
  const data = activityMetrics;
  if (!data) {
    return <div className="mt-6 text-center text-gray-500">No activity data available</div>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1️⃣ Development Velocity */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold">🚀 Development Momentum</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Commit Frequency: {data.developmentVelocity.commitsPerWeek} commits/week</li>
          <li>• PR Merge Rate: {data.developmentVelocity.prPerWeek} PRs/week</li>
          <li>• Issue Closure Rate: {data.developmentVelocity.issuesPerWeek} issues/week</li>
          <li>• Release Cadence: {data.developmentVelocity.releaseCadence}</li>
          <li>• Velocity Trend: {data.developmentVelocity.velocityTrend}</li>
        </ul>
      </div>

      {/* 2️⃣ Team Collaboration */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-bold">👥 Contributor Network</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Core Team: {data.teamCollaboration.coreTeam} developers (50+ commits)</li>
          <li>• Occasional Contributors: {data.teamCollaboration.occasionalContributors} developers</li>
          <li>• Community Ratio: {data.teamCollaboration.communityRatio} of total commits</li>
          <li>• Review Distribution: {data.teamCollaboration.reviewDistribution}</li>
          <li>• Knowledge Sharing: {data.teamCollaboration.knowledgeSharing}</li>
        </ul>
      </div>

      {/* 3️⃣ Workflow Efficiency */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-bold">⚡ Process Metrics</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• PR Review Time: {data.workflowEfficiency.prReviewTime} average</li>
          <li>• First Response Time: {data.workflowEfficiency.firstResponseTime}</li>
          <li>• CI/CD Pass Rate: {data.workflowEfficiency.ciCdPassRate}</li>
          <li>• Test Coverage Trend: {data.workflowEfficiency.testCoverageTrend}</li>
          <li>• Documentation Sync: {data.workflowEfficiency.documentationSync}</li>
        </ul>
      </div>

      {/* 4️⃣ Project Rhythm */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-bold">📅 Development Patterns</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Most Active: {data.projectRhythm.activeDays}</li>
          <li>• Peak Hours: {data.projectRhythm.peakHours}</li>
          <li>• Sprint Consistency: {data.projectRhythm.sprintConsistency}</li>
          <li>• Maintenance Windows: {data.projectRhythm.maintenanceWindows}</li>
          <li>• Hotfix Frequency: {data.projectRhythm.hotfixFrequency}</li>
        </ul>
      </div>
    </div>
  );
}
