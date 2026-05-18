import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/news"];

export function middleware(req: NextRequest) {
  const isProtected = PROTECTED_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token");

  if (!token?.value) {
    console.log("Unauthorized access attempt:", req.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const parsed = JSON.parse(token.value);

    if (!parsed.userId || !parsed.exp) {
      console.log("Malformed token detected");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (parsed.exp < Date.now()) {
      console.log("Expired token detected");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch {
    console.log("Invalid token, JSON parse failed");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/news/:path*"],
};