"use server";

import { prisma } from "@/lib/db/prisma";

export type ContactFormState = {
  ok: boolean;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots fill hidden field, humans don't.
  if (asString(formData.get("company"))) {
    return { ok: true, message: "Thank you — we'll be in touch." };
  }

  const name = asString(formData.get("name"));
  const email = asString(formData.get("email")).toLowerCase();
  const phone = asString(formData.get("phone"));
  const subject = asString(formData.get("topic")) || asString(formData.get("subject"));
  const message = asString(formData.get("message"));
  const locale = asString(formData.get("locale")) || "en";

  if (name.length < 2) {
    return { ok: false, message: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return { ok: false, message: "Please write a message of at least 10 characters." };
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message, locale },
    });
    return { ok: true, message: "Thank you — we'll be in touch within two working days." };
  } catch {
    return {
      ok: false,
      message: "Something went wrong. Please email us directly at sildel@sildel.pt.",
    };
  }
}