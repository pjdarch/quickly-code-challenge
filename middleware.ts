import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Retrieve authentication token from cookie
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if the token exists
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/profile"],
};
