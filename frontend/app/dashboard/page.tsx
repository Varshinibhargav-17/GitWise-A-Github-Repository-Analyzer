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

  if (status === "loading") return <p>Loading...</p>;

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
        // TODO: Navigate to Results Dashboard or update UI with data
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      <h2 className="text-4xl font-bold text-indigo-600 mb-6">Dashboard</h2>
      <p className="text-gray-700 mb-8">
        Welcome, {session?.user?.name || session?.user?.email}
      </p>

      <div className="flex w-full max-w-lg space-x-4">
        <input
          type="text"
          placeholder="https://github.com/owner/repository"
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Display Repo Overview after analyze */}
      {repoData && <RepoOverview repoData={repoData} />}
    </section>
  );
}
