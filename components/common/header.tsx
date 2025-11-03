/* eslint-disable */

import { getServerCookie } from "@/helper/server-cookie";
import { verifyToken } from "@/lib/verifyToken";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { redirect } from "next/navigation";

export default async function Header() {
  const token = await getServerCookie("access_token");
  if (!token) redirect("/");
  const decoded: any = jwt.decode(token);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border lg:w-2xl md:w-xl w-lg mx-auto">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-foreground">Nazarto</span>
          </Link>
          <div className="flex items-center space-x-4">
            {!decoded.sub ? (
              <Link
                href="/login"
                className="text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <div>{decoded.email.split("@")[0]}</div>
            )}
            <ThemeToggle className="text-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
