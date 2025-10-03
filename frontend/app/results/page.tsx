"use client";

import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RepoOverview from "@/components/RepoOverview";

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return <RepoOverview />;
}
