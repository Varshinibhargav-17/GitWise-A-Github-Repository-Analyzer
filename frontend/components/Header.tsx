"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      {/* Left side - logo */}
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        Gitwise
      </Link>

      {/* Right side - navigation */}
      <nav className="space-x-6">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <Link href="/about" className="hover:text-indigo-600">About</Link>
        <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
      </nav>
    </header>
  );
}
