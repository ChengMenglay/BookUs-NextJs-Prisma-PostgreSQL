import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const adminPath = ["/dashboard"];
const authenticationPath = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isLoggined = !!token;
  const isAuthRoute = authenticationPath.includes(pathname);

  if (isLoggined && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isLoggined && adminPath.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (adminPath.some((path) => pathname.startsWith(path))) {
    if (!isLoggined || token?.role !== "Admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  console.log("=======Token Role: ", token?.role);
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
