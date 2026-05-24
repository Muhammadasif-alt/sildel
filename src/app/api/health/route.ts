/**
 * GET /api/health — sanity check that the API is up and MongoDB is reachable.
 *
 * Use this to verify your .env.local is wired correctly. Open
 * http://localhost:3000/api/health in a browser.
 */
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";

export async function GET() {
  try {
    const conn = await connectDb();
    return NextResponse.json({
      status: "ok",
      db: "connected",
      database: conn.connection.name,
      readyState: conn.connection.readyState,
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        db: "disconnected",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
