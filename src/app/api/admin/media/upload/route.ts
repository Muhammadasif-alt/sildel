/**
 * Media upload endpoint (admin-only).
 *
 * POST /api/admin/media/upload
 *   multipart/form-data with `file` field.
 *   Saves to `/public/uploads/YYYY/MM/<slug>-<rand>.<ext>` and records a
 *   MediaAsset doc. Returns the public URL.
 */
import { NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { randomBytes } from "crypto";
import { getAdminSession } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { MediaAssetModel } from "@/lib/models/media-asset.model";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
]);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "file";
}

function extFromMime(mime: string, fallback: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "video/mp4": "mp4",
    "video/webm": "webm",
  };
  return map[mime] ?? fallback;
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 20MB)" }, { status: 413 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type}` },
      { status: 415 }
    );
  }

  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");

  const rawExt = path.extname(file.name).replace(".", "").toLowerCase();
  const ext = extFromMime(file.type, rawExt || "bin");
  const baseSlug = slugify(file.name);
  const rand = randomBytes(4).toString("hex");
  const filename = `${baseSlug}-${rand}.${ext}`;

  const relDir = path.posix.join("uploads", yyyy, mm);
  const absDir = path.join(process.cwd(), "public", "uploads", yyyy, mm);
  await mkdir(absDir, { recursive: true });

  const absPath = path.join(absDir, filename);
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(absPath, buf);

  const publicUrl = "/" + path.posix.join(relDir, filename);

  try {
    await connectDb();
    await MediaAssetModel.create({
      url: publicUrl,
      filename,
      mimeType: file.type,
      size: file.size,
    });
  } catch {
    // Index write failure shouldn't block the upload; the file is still served.
  }

  return NextResponse.json({
    url: publicUrl,
    filename,
    mimeType: file.type,
    size: file.size,
  });
}
