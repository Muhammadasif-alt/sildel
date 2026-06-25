"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";

// The avatar is stored as a small data URL (resized client-side) in the
// `avatarUrl` column — Vercel's runtime filesystem is read-only, so writing
// to disk would fail there. 3MB cap stays well under MySQL's MEDIUMTEXT
// limits while comfortably holding a resized portrait.
const MAX_DATA_URL_BYTES = 3 * 1024 * 1024;

export async function saveProfile(formData: FormData) {
  const session = await requireAdmin();
  const email = session.email.toLowerCase();

  const displayName = String(formData.get("displayName") ?? "").trim();
  const avatarData = String(formData.get("avatarData") ?? "");

  let avatarUrl: string | undefined;
  if (avatarData.startsWith("data:image/")) {
    if (avatarData.length > MAX_DATA_URL_BYTES) {
      throw new Error("Image too large — please choose a smaller photo.");
    }
    avatarUrl = avatarData;
  }

  await prisma.adminProfile.upsert({
    where: { email },
    update: {
      displayName,
      ...(avatarUrl ? { avatarUrl } : {}),
    },
    create: {
      email,
      displayName,
      avatarUrl: avatarUrl ?? "",
    },
  });

  revalidatePath("/admin/profile");
  revalidatePath("/admin", "layout");
  redirect("/admin/profile?saved=1");
}

export async function removeAvatar() {
  const session = await requireAdmin();
  const email = session.email.toLowerCase();

  await prisma.adminProfile.updateMany({
    where: { email },
    data: { avatarUrl: "" },
  });

  revalidatePath("/admin/profile");
  revalidatePath("/admin", "layout");
}