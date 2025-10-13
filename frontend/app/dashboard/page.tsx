"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import RepoOverview from "../../components/RepoOverview";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoData, setRepoData] = useState<any>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Analyze");

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/signup";
    }
  }, [status]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchSavedAnalyses();
    }
  }, [session]);

  const fetchSavedAnalyses = async () => {
    try {
      const res = await fetch(`/api/save-analysis?userEmail=${session?.user?.email}`);
      const data = await res.json();
      if (data.savedAnalyses) {
        setSavedAnalyses(data.savedAnalyses);
      }
    } catch (error) {
      console.error("Error fetching saved analyses:", error);
    }
  };

  if (status === "loading")
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );

  const handleAnalyze = async () => {
    if (!repoUrl) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        console.log("Repo Data:", data);
        setRepoData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-gray-700">
          Welcome, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-6 border-b pb-2 text-gray-600">
          {["Analyze", "Saved Analyses"].map((tab) => (
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
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Analyze" && (
        <div className="flex flex-col items-center">
          {/* Input & Analyze Button */}
          <div className="flex flex-col md:flex-row w-full max-w-2xl space-y-4 md:space-y-0 md:space-x-4 mb-12">
            <input
              type="text"
              placeholder="https://github.com/owner/repository"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {/* Display Repo Overview after analyze */}
          {repoData && (
            <div className="w-full max-w-4xl">
              <RepoOverview repoData={repoData} />
            </div>
          )}
        </div>
      )}

      {activeTab === "Saved Analyses" && (
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Saved Analyses</h3>
          {savedAnalyses.length === 0 ? (
            <p className="text-gray-500 text-center">No saved analyses yet. Analyze a repository and save it to see it here!</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedAnalyses.map((analysis, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 cursor-pointer"
                  onClick={() => setRepoData(analysis.repoData)}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {analysis.repoUrl}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Saved on {new Date(analysis.savedAt).toLocaleDateString()}
                  </p>
                  <div className="text-sm text-gray-600">
                    Health Score: {analysis.repoData.repo.healthScore}/100
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
