import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // ggtting the path name
  const path = request.nextUrl.pathname;
  // getting the token;
  const token = request.cookies.get("token")?.value || "";

  const isPublic =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
};
