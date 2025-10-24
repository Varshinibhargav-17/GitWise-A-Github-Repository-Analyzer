"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Heart, MessageCircle, Users, TrendingUp } from "lucide-react";

export default function CommunityTab({ communityMetrics }: { communityMetrics: any }) {
  if (!communityMetrics) {
    return <div className="mt-6 text-center text-gray-500">No community data available</div>;
  }

  const {
    contributorRetention,
    newContributorsPerMonth,
    firstTimeSuccessRate,
    communitySentiment,
    toxicComments,
    commentsPerIssue,
    helpfulResponses,
    solutionRate,
    discussionDepth,
    knowledgeSharing,
    firstResponseTime,
    goodFirstIssues,
    documentationQuality,
    mentorshipAvailability,
    learningCurve,
    followerGrowthRate,
    contributorGrowth,
    discussionActivity,
    communityDiversity,
    globalReach,
    contributorGrowthTimeline,
  } = communityMetrics;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1️⃣ Community Health */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Heart className="w-6 h-6 text-red-600 mr-2" />
          <h3 className="text-lg font-bold">🌟 Community Vital Signs</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Contributor Retention: {contributorRetention}%</li>
          <li>• New Contributors/Month: {newContributorsPerMonth}</li>
          <li>• First-time Success Rate: {firstTimeSuccessRate}%</li>
          <li>• Community Sentiment: {communitySentiment} ⭐</li>
          <li>• Toxic Comments: {toxicComments}% (Very Low)</li>
        </ul>
      </div>

      {/* 2️⃣ Engagement Quality */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold">💬 Discussion Analytics</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• Comments per Issue: {commentsPerIssue}</li>
          <li>• Helpful Responses: {helpfulResponses}%</li>
          <li>• Solution Rate: {solutionRate}% (issues marked solved)</li>
          <li>• Discussion Depth: {discussionDepth} messages/thread</li>
          <li>• Knowledge Sharing: {knowledgeSharing}</li>
        </ul>
      </div>

      {/* 3️⃣ Onboarding Experience */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-bold">🎯 Newcomer Friendliness</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <li>• First Response Time: {firstResponseTime} hours</li>
          <li>• Good First Issues: {goodFirstIssues} available</li>
          <li>• Documentation Quality: {documentationQuality}/10</li>
          <li>• Mentorship Availability: {mentorshipAvailability}</li>
          <li>• Learning Curve: {learningCurve}</li>
        </ul>
      </div>

      {/* 4️⃣ Community Growth */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-bold">📈 Growth Metrics</h3>
        </div>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li>• Follower Growth Rate: +{followerGrowthRate}%/month</li>
          <li>• Contributor Growth: +{contributorGrowth}% this quarter</li>
          <li>• Discussion Activity: {discussionActivity} threads/week</li>
          <li>• Community Diversity: {communityDiversity}</li>
          <li>• Global Reach: {globalReach} countries</li>
        </ul>

        {/* Visualization: Contributor Growth Timeline */}
        {contributorGrowthTimeline && contributorGrowthTimeline.length > 0 && (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contributorGrowthTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="contributors" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
