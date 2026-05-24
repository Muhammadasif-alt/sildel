/**
 * Media list endpoint (admin-only). Returns recent uploads in reverse-chrono
 * order, used by the media picker dialog.
 */
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { MediaAssetModel } from "@/lib/models/media-asset.model";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 60), 200);
  const q = (searchParams.get("q") ?? "").trim();

  try {
    await connectDb();
    const filter = q
      ? { $or: [{ filename: { $regex: q, $options: "i" } }, { title: { $regex: q, $options: "i" } }] }
      : {};
    const docs = await MediaAssetModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return NextResponse.json({
      assets: docs.map((d) => ({
        id: String(d._id),
        url: d.url,
        filename: d.filename,
        mimeType: d.mimeType,
        size: d.size,
        createdAt: d.createdAt,
      })),
    });
  } catch {
    return NextResponse.json({ assets: [] });
  }
}
