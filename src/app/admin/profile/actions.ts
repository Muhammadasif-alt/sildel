"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { AdminProfileModel } from "@/lib/models/admin-profile.model";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

function extFor(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "png";
}

export async function saveProfile(formData: FormData) {
  const session = await requireAdmin();
  await connectDb();

  const displayName = String(formData.get("displayName") ?? "").trim();
  const file = formData.get("avatar");

  let avatarUrl: string | undefined;

  if (file && typeof file !== "string" && file.size > 0) {
    if (!ALLOWED.includes(file.type)) {
      throw new Error("Unsupported image type — use PNG, JPG, WebP, or GIF.");
    }
    if (file.size > MAX_BYTES) {
      throw new Error("Image too large — max 4 MB.");
    }

    const ext = extFor(file.type);
    const dir = path.join(process.cwd(), "public", "uploads", "admin");
    await mkdir(dir, { recursive: true });

    const filename = `avatar-${Date.now()}.${ext}`;
    const dest = path.join(dir, filename);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(dest, buf);

    avatarUrl = `/uploads/admin/${filename}`;

    // Best-effort delete of previous avatar
    const prev = await AdminProfileModel.findOne({ email: session.email.toLowerCase() }).lean();
    if (prev?.avatarUrl && prev.avatarUrl.startsWith("/uploads/admin/")) {
      const prevPath = path.join(process.cwd(), "public", prev.avatarUrl);
      unlink(prevPath).catch(() => {});
    }
  }

  await AdminProfileModel.findOneAndUpdate(
    { email: session.email.toLowerCase() },
    {
      email: session.email.toLowerCase(),
      displayName,
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

  const prev = await AdminProfileModel.findOne({ email: session.email.toLowerCase() }).lean();
  if (prev?.avatarUrl && prev.avatarUrl.startsWith("/uploads/admin/")) {
    const prevPath = path.join(process.cwd(), "public", prev.avatarUrl);
    unlink(prevPath).catch(() => {});
  }

  await AdminProfileModel.findOneAndUpdate(
    { email: session.email.toLowerCase() },
    { $set: { avatarUrl: "" } }
  );

  revalidatePath("/admin/profile");
  revalidatePath("/admin", "layout");
}