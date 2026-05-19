import { NextResponse } from "next/server";
import { MOCK_PORTFOLIO } from "@/lib/portfolio";
import { log } from "@/lib/logger";

export async function GET() {
  try {
    log("Portfolio data fetched");
    return NextResponse.json(MOCK_PORTFOLIO);
  } catch (error) {
    log(`Portfolio API error: ${error}`, "error");
    return NextResponse.json({ message: "Failed to fetch portfolio" }, { status: 500 });
  }
}
