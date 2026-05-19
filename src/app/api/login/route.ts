import { NextResponse } from "next/server";
import { MOCK_USER, generateToken } from "@/lib/auth";
import { log } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      log("Login attempt with missing fields", "warn");
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      log("Login attempt with invalid email format", "warn");
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      log(`Login failed for email: ${email}`, "warn");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    log("Login success for userId: 1");
    return response;
  } catch (error) {
    log(`Login API error: ${error}`, "error");
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
