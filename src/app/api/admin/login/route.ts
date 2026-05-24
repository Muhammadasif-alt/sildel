/**
 * POST /api/admin/login — verify credentials and set the admin session cookie.
 *
 * Body: { email: string, password: string }
 */
import { NextResponse } from "next/server";
import { verifyCredentials, createAdminSession } from "@/lib/auth/admin";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    if (!verifyCredentials(email, password)) {
      // Same response for unknown email vs wrong password — don't leak which.
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createAdminSession(email.toLowerCase());
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Login failed" },
      { status: 500 }
    );
  }
}
