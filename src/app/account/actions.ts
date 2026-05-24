"use server";

import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db/connect";
import { UserModel } from "@/lib/models/user.model";
import {
  clearUserSession,
  createUserSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth/user";

export type AuthFormState = {
  ok: boolean;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function registerAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email")).toLowerCase();
  const password = asString(formData.get("password"));

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  await connectDb();
  const existing = await UserModel.findOne({ email }).lean();
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const user = await UserModel.create({
    name,
    email,
    passwordHash,
    lastLoginAt: new Date(),
  });

  await createUserSession({
    sub: String(user._id),
    email: user.email,
    name: user.name,
  });

  redirect("/account");
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = asString(formData.get("email")).toLowerCase();
  const password = asString(formData.get("password"));

  if (!EMAIL_RE.test(email) || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  await connectDb();
  const user = await UserModel.findOne({ email });
  if (!user) {
    return { ok: false, error: "Invalid email or password." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { ok: false, error: "Invalid email or password." };
  }

  user.lastLoginAt = new Date();
  await user.save();

  await createUserSession({
    sub: String(user._id),
    email: user.email,
    name: user.name,
  });

  redirect("/account");
}

export async function logoutAction(): Promise<void> {
  await clearUserSession();
  redirect("/");
}
