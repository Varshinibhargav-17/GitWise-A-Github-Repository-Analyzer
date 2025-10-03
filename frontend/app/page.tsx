"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        {/* Left - Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">Gitwise</h1>

        {/* Right - Navigation */}
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        {/* Tagline */}
        <h2 className="text-4xl font-bold text-gray-900">Welcome to Gitwise</h2>
        <p className="mt-4 text-lg text-gray-600">
          Analyze GitHub repositories with insights, metrics, and health scoring 🚀
        </p>

        {/* Single Authorize Button */}
        <button
          onClick={() => router.push("/signup")}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Authorize Gitwise
        </button>
      </main>
    </div>
  );
}

