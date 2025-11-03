/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/verifyToken";
import { getServerCookie } from "./helper/server-cookie";

export async function proxy(req: NextRequest) {
  const token = await getServerCookie("access_token");
  const verified: any = await verifyToken(token);
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboardPage = pathname.startsWith("/dashboard");

  if (!verified && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (verified && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (verified && verified.role !== "ADMIN" && isDashboardPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
