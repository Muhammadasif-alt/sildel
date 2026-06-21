/**
 * Media list endpoint (admin-only). Returns recent uploads in reverse-chrono
 * order, used by the media picker dialog.
 */
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";

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
    const where = q
      ? {
          OR: [
            { filename: { contains: q } },
            { title: { contains: q } },
          ],
        }
      : {};
    const docs = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return NextResponse.json({
      assets: docs.map((d) => ({
        id: String(d.id),
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
