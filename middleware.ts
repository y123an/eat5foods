import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const url = request.nextUrl.pathname;
    const token = request.nextauth.token;

    // If no token exists, redirect to sign-in
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Admin route protection
    if (url.startsWith("/admin")) {
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/shop/access-denied", request.url));
      }
    }

    // Protected shop routes
    if (url.startsWith("/shop/checkout") || 
        url.startsWith("/shop/rate-us") || 
        url.startsWith("/shop/testimonials")) {
      if (!token) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/shop/rate-us",
    "/shop/testimonials",
    "/shop/checkout/:path*",
    "/profile/:path*"
  ]
};
