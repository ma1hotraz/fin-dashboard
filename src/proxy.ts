import { NextRequest, NextResponse } from "next/server";
import { log } from "@/lib/logger";

const PROTECTED_ROUTES = ["/dashboard", "/news"];

export function proxy(req: NextRequest) {
  const isProtected = PROTECTED_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token");

  if (!token?.value || token.value.trim() === "") {
    log(`Unauthorized access attempt: ${req.nextUrl.pathname}`, "warn");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const parsed = JSON.parse(token.value);

    if (!parsed.userId || !parsed.exp) {
      log("Malformed token detected", "warn");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (parsed.exp < Date.now()) {
      log("Expired token detected", "warn");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch {
    log("Invalid token, JSON parse failed", "warn");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/news/:path*"],
};
