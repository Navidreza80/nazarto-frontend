"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className=" mb-4 lg:w-6xl mx-auto md:w-4xl max-w-3xl">
      <div className="container mx-auto">
        <nav className="flex justify-center items-center gap-6 pt-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-primary"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/dashboard"
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
    </header>
  );
}
