/**
 * Customer auth — bcrypt-hashed password + JWT session cookie.
 *
 * Mirrors lib/auth/admin.ts but for end-users registered in MongoDB.
 * Cookie: `sildel-user`. Secret: SILDEL_SESSION_SECRET (≥ 32 chars).
 */
import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "sildel-user";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const BCRYPT_ROUNDS = 12;

export type UserSession = {
  sub: string; // user _id as string
  email: string;
  name: string;
  iat: number;
  exp: number;
};

function getSecretBytes(): Uint8Array {
  const secret = process.env.SILDEL_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SILDEL_SESSION_SECRET is missing or shorter than 32 chars. Add it to .env.local.",
    );
  }
  return new TextEncoder().encode(secret);
}

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createUserSession(payload: {
  sub: string;
  email: string;
  name: string;
}): Promise<void> {
  const token = await new SignJWT(payload)
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

export async function clearUserSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getUserSession(): Promise<UserSession | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretBytes(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}

/** Server-only — redirects to /account/login if not authed. */
export async function requireUser(): Promise<UserSession> {
  const session = await getUserSession();
  if (!session) redirect("/account/login");
  return session;
}
