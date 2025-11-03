import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerCookie } from "./helper/server-cookie";
import { verifyToken } from "./lib/verifyToken";

export async function middleware(req: NextRequest) {
  const token = await getServerCookie("access_token");
  const verified = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (verified !== null && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!verified && pathname == "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!verified && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
