import { connectDb } from "@/lib/db/connect";
import { MediaAssetModel } from "@/lib/models/media-asset.model";
import { MediaLibraryClient } from "./media-library-client";

export const dynamic = "force-dynamic";

async function loadAssets() {
  try {
    await connectDb();
    const docs = await MediaAssetModel.find().sort({ createdAt: -1 }).limit(200).lean();
    return docs.map((d) => ({
      id: String(d._id),
      url: d.url,
      filename: d.filename,
      mimeType: d.mimeType,
      size: d.size,
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
    }));
  } catch {
    return [];
  }
}

export default async function MediaPage() {
  const assets = await loadAssets();
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Media library</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Upload and manage images and videos. Files live in <code>/public/uploads/</code>.
        </p>
      </header>
      <MediaLibraryClient initialAssets={assets} />
    </div>
  );
}
