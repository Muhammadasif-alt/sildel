/**
 * Media delete endpoint (admin-only). Removes the file from disk and the
 * MediaAsset record. POST { id } or POST { url }.
 */
import { NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import { getAdminSession } from "@/lib/auth/admin";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const rawId = typeof body?.id === "string" ? body.id : undefined;
  const id = rawId ? Number(rawId) : undefined;
  const url = typeof body?.url === "string" ? body.url : undefined;

  if ((!id || Number.isNaN(id)) && !url) {
    return NextResponse.json({ error: "Missing id or url" }, { status: 400 });
  }

  try {
    const doc = id
      ? await prisma.mediaAsset.findUnique({ where: { id } })
      : await prisma.mediaAsset.findUnique({ where: { url: url! } });

    if (doc) {
      // Only allow deleting files inside /public/uploads/
      if (doc.url.startsWith("/uploads/")) {
        const abs = path.join(process.cwd(), "public", doc.url);
        await unlink(abs).catch(() => {});
      }
      await prisma.mediaAsset.delete({ where: { id: doc.id } });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
