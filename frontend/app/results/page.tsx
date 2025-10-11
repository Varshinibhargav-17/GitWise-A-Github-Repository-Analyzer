"use client";

import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RepoOverview from "@/components/RepoOverview";

export default function ResultsPage({ searchParams }: { searchParams: { repoUrl?: string } }) {
  const [loading, setLoading] = useState(true);
  const [repoData, setRepoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const repoUrl = searchParams.repoUrl || ""; // get repo URL from query params

  useEffect(() => {
    if (!repoUrl) {
      setError("Repo URL not provided");
      setLoading(false);
      return;
    }

    const fetchRepoData = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repoUrl }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch repo data");
        }

        const data = await res.json();
        setRepoData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-16 flex flex-col items-center">
      {/* Optional floating gradient blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Page Heading */}
      <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
        Repository Analysis Results
      </h2>

      {/* Repo Overview Card */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
        <RepoOverview repoData={repoData} />
      </div>

      {/* Example Graph Section */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Graph Card 1 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Commits Over Time
          </h3>
          <div className="w-full h-64">
            {/* Replace with your graph component */}
            <canvas id="commitsChart" className="w-full h-full"></canvas>
          </div>
        </div>

        {/* Graph Card 2 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Contributors
          </h3>
          <div className="w-full h-64">
            {/* Replace with your graph component */}
            <canvas id="contributorsChart" className="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
