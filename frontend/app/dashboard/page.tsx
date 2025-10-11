"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import RepoOverview from "../../components/RepoOverview";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoData, setRepoData] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") signIn("github");
  }, [status]);

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
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
        Dashboard
      </h2>
      <p className="text-gray-700 mb-12 text-center">
        Welcome, {session?.user?.name || session?.user?.email}
      </p>

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
    </section>
  );
}
