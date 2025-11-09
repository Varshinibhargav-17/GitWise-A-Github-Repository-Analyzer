
"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log('SignupPage - Session:', session, 'Status:', status);

  useEffect(() => {
    if (session) {
      console.log('Redirecting to dashboard');
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  if (session) {
    return null; // Redirect handled by useEffect
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
