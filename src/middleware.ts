import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const adminPath = ["/dashboard"];
const authenticationPath = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  const baseUrl = process.env.NEXTAUTH_URL;
  const isLoggined = !!token;
  const isAuthRoute = authenticationPath.includes(pathname);
  console.log("Token in middleware:", token);

  if (isLoggined && isAuthRoute) {
    return NextResponse.redirect(`${baseUrl}`);
  }
  if (!isLoggined && adminPath.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(`${baseUrl}/login`);
  }
  if (adminPath.some((path) => pathname.startsWith(path))) {
    if (!isLoggined || token?.role !== "Admin") {
      return NextResponse.redirect(`${baseUrl}`);
    }
  }
  console.log("=======Token Role: ", token?.role);
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
