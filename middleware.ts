// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const url = req.nextUrl.clone();

  // If user is not authenticated and tries to access protected routes, redirect to login ("/")
  if (!token) {
    // redirect if trying to access protected paths
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/my-reports") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/issue")
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    try {
      // Decode the JWT token to get user role
      const decoded = jwt.decode(token) as { id: string; role: string } | null;
      const userRole = decoded?.role;

      // If authenticated and on login page, redirect based on role
      if (url.pathname === "/") {
        if (userRole === "ADMIN") {
          url.pathname = "/admin";
        } else {
          url.pathname = "/dashboard";
        }
        return NextResponse.redirect(url);
      }

      // Role-based access control
      if (url.pathname.startsWith("/admin") && userRole !== "ADMIN") {
        // Non-admin users trying to access admin routes
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }

      if (url.pathname.startsWith("/dashboard") && userRole === "ADMIN") {
        // Admin users trying to access citizen dashboard
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      // Invalid token, redirect to login
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/my-reports/:path*",
    "/profile/:path*",
    "/issue/:path*",
    "/",
  ],
};
