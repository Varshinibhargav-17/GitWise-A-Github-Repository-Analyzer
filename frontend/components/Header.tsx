"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname(); // Get current route

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          Gitwise
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6 text-gray-700 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group ${
                pathname === item.href ? "text-black font-semibold" : "hover:text-black"
              }`}
            >
              {item.name}
              {/* Hover underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-200 ${
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

