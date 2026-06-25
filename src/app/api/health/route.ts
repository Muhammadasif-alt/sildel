/**
 * GET /api/health — sanity check that the API is up and MySQL is reachable.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const ping = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 AS ok`;
    return NextResponse.json({
      status: "ok",
      db: "connected",
      ping: ping?.[0]?.ok === 1 ? "pong" : "no-rows",
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