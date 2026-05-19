import { NextResponse } from "next/server";
import { log } from "@/lib/logger";

export async function GET() {
  log("User logged out");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = NextResponse.redirect(new URL("/login", baseUrl));

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}