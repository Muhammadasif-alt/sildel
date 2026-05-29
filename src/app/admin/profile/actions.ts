"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { AdminProfileModel } from "@/lib/models/admin-profile.model";

// The avatar is stored in MongoDB as a small data URL (resized client-side),
// not on disk — Vercel's runtime filesystem is read-only, so writing into
// /public would fail there. ~3 MB cap on the stored string is plenty for a
// resized avatar and stays well under MongoDB's 16 MB document limit.
const MAX_DATA_URL_BYTES = 3 * 1024 * 1024;

export async function saveProfile(formData: FormData) {
  const session = await requireAdmin();
  await connectDb();

  const displayName = String(formData.get("displayName") ?? "").trim();
  const avatarData = String(formData.get("avatarData") ?? "");

  let avatarUrl: string | undefined;
  if (avatarData.startsWith("data:image/")) {
    if (avatarData.length > MAX_DATA_URL_BYTES) {
      throw new Error("Image too large — please choose a smaller photo.");
    }
    avatarUrl = avatarData;
  }

  await AdminProfileModel.findOneAndUpdate(
    { email: session.email.toLowerCase() },
    {
      email: session.email.toLowerCase(),
      displayName,
      // Only overwrite the avatar when a new one was picked.
      ...(avatarUrl ? { avatarUrl } : {}),
    },
    { upsert: true, new: true }
  );

  revalidatePath("/admin/profile");
  revalidatePath("/admin", "layout");
  redirect("/admin/profile?saved=1");
}

export async function removeAvatar() {
  const session = await requireAdmin();
  await connectDb();

  await AdminProfileModel.findOneAndUpdate(
    { email: session.email.toLowerCase() },
    { $set: { avatarUrl: "" } }
  );

  revalidatePath("/admin/profile");
  revalidatePath("/admin", "layout");
}