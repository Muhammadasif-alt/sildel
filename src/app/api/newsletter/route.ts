/**
 * POST /api/newsletter — subscribe an email to the Sildel newsletter.
 *
 * Idempotent: re-submitting an existing email is a no-op.
 *
 * Body: { email: string, source?: string }
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source =
      typeof body.source === "string" && body.source.length > 0 ? body.source : "homepage";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email" }, { status: 400 });
    }

    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: { source },
      create: { email, source },
    });

    return NextResponse.json({ subscribed: true, subscriber }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not subscribe" },
      { status: 500 }
    );
  }
}