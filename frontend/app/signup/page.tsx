
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignupPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Welcome, {session.user?.name}</h2>
          <p className="mb-2">Email: {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">Sign In with GitHub</h2>
          <button
            onClick={() => {
              // Redirect in the same tab to allow NextAuth to handle the signin and redirect back to dashboard page
              signIn("github", { callbackUrl: "/dashboard" });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full"
          >
            Continue with GitHub
          </button>
      </div>
    </div>
  );
}
