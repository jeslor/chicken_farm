"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "🐔 All Chickens" },
  { href: "/add", label: "➕ Add Chicken" },
  { href: "/newborn", label: "🐣 New Born" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="farm-header sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
            🐓
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-amber-900 leading-tight tracking-tight">
              FarmFlock
            </h1>
            <p className="text-xs text-amber-700 font-medium">
              Chicken Manager
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-2 flex-wrap justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                  isActive
                    ? "bg-amber-700 text-amber-50 border-amber-700 shadow-md"
                    : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-200 hover:border-amber-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
