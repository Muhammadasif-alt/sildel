/**
 * POST /api/newsletter — subscribe an email to the Sildel newsletter.
 *
 * Idempotent: re-submitting an existing email just re-activates it instead of
 * throwing a duplicate-key error.
 *
 * Body: { email: string, source?: string }
 */
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { SubscriberModel } from "@/lib/models/subscriber.model";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  await connectDb();

  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source =
      typeof body.source === "string" && body.source.length > 0 ? body.source : "homepage";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email" }, { status: 400 });
    }

    const subscriber = await SubscriberModel.findOneAndUpdate(
      { email },
      { email, source, active: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ subscribed: true, subscriber }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not subscribe" },
      { status: 500 }
    );
  }
}
