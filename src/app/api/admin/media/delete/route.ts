/**
 * Media delete endpoint (admin-only). Removes the file from disk and the
 * MediaAsset record. POST { id } or POST { url }.
 */
import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import { getAdminSession } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { MediaAssetModel } from "@/lib/models/media-asset.model";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : undefined;
  const url = typeof body?.url === "string" ? body.url : undefined;

  if (!id && !url) {
    return NextResponse.json({ error: "Missing id or url" }, { status: 400 });
  }

  try {
    await connectDb();
    const doc = id
      ? await MediaAssetModel.findById(id).lean()
      : await MediaAssetModel.findOne({ url }).lean();

    if (doc) {
      // Only allow deleting files inside /public/uploads/
      if (doc.url.startsWith("/uploads/")) {
        const abs = path.join(process.cwd(), "public", doc.url);
        await unlink(abs).catch(() => {});
      }
      await MediaAssetModel.deleteOne({ _id: doc._id });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
