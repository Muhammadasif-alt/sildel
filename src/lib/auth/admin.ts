/**
 * Admin auth — JWT session in an HttpOnly cookie.
 *
 * Single-admin model: credentials come from env vars (ADMIN_EMAIL +
 * ADMIN_PASSWORD), validated on login. The session JWT is signed with
 * ADMIN_SESSION_SECRET and lives in cookie `sildel-admin`.
 *
 * Server components/pages use `requireAdmin()` which redirects to
 * /admin/login if the session is missing or invalid.
 */
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "sildel-admin";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

type AdminSession = {
  email: string;
  iat: number;
  exp: number;
};

function getSecretBytes(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or shorter than 32 chars. See .env.local.example."
    );
  }
  return new TextEncoder().encode(secret);
}

export function getAdminCredentials(): { email: string; password: string } {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL / ADMIN_PASSWORD missing. See .env.local.example.");
  }
  return { email, password };
}

/** Constant-time string comparison to avoid timing attacks. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function verifyCredentials(email: string, password: string): boolean {
  const expected = getAdminCredentials();
  return safeEqual(email.trim().toLowerCase(), expected.email.toLowerCase()) &&
    safeEqual(password, expected.password);
}

export async function createAdminSession(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSecretBytes());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretBytes(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

/** Server-only — redirects to /admin/login if not authed. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
