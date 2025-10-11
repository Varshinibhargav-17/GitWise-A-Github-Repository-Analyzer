
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignupPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Welcome, {session.user?.name}
          </h2>
          <p className="text-gray-700 mb-2">Email: {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 max-w-md w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent text-center">
          Sign In with GitHub
        </h2>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg w-full shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
