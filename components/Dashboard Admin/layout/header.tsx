"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className=" mb-4 max-w-6xl mx-auto">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-foreground">Nazarto</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard/polls"
                  ? "text-primary"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Polls
            </Link>
            <Link
              href="/dashboard/create-poll"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard/create-poll"
                  ? "text-primary"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Create Poll
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
