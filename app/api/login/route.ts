import { NextResponse } from "next/server";
import { MOCK_USER, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      console.log("Login failed for:", email);
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

    console.log("Login success");
    return response;
  } catch (error) {
    console.log("Login API error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}