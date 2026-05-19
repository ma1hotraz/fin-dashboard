import { NextResponse } from "next/server";
import { log } from "@/lib/logger";

export async function GET(req: Request) {
  log("User logged out");
  const origin = new URL(req.url).origin;
  const response = NextResponse.redirect(new URL("/login", origin));

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
