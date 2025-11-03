import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/verifyToken";
import { getServerCookie } from "./helper/server-cookie";

export async function middleware(req: NextRequest) {
  const token = await getServerCookie("access_token");
  const verified = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (verified && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verified && pathname.startsWith("/CreatePool")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
