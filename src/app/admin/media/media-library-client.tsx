"use client";

import { useState, useRef } from "react";
import { Trash2, Upload, Copy, Check, Loader2 } from "lucide-react";

type Asset = {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: string | null;
};

function humanSize(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibraryClient({ initialAssets }: { initialAssets: Asset[] }) {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setError(null);
    setUploading(true);
    try {
      for (const f of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", f);
        const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `Upload failed (${res.status})`);
        }
        const j = await res.json();
        setAssets((prev) => [
          {
            id: crypto.randomUUID(),
            url: j.url,
            filename: j.filename,
            mimeType: j.mimeType,
            size: j.size,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(asset: Asset) {
    if (!confirm(`Delete ${asset.filename}?`)) return;
    const res = await fetch("/api/admin/media/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: asset.id, url: asset.url }),
    });
    if (res.ok) {
      setAssets((prev) => prev.filter((a) => a.id !== asset.id));
    } else {
      setError("Delete failed.");
    }
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 1500);
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload files"}
        </button>
        <span className="text-xs text-muted-foreground">
          Images and MP4/WebM video up to 20MB.
        </span>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {assets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center text-sm text-muted-foreground">
          No uploads yet. Click <b>Upload files</b> to add your first image.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {assets.map((a) => {
            const isVideo = a.mimeType.startsWith("video/");
            return (
              <div
                key={a.id}
                className="group overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-square bg-muted">
                  {isVideo ? (
                    <video
                      src={a.url}
                      className="absolute inset-0 h-full w-full object-cover"
                      muted
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.url}
                      alt={a.filename}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-xs text-foreground" title={a.filename}>
                    {a.filename}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {humanSize(a.size)} · {a.mimeType.split("/")[1]}
                  </p>
                  <div className="mt-2 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => copyUrl(a.url)}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] transition-colors hover:bg-accent"
                      title={a.url}
                    >
                      {copiedUrl === a.url ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> URL
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(a)}
                      className="inline-flex items-center justify-center rounded-md border border-border px-2 py-1 text-[11px] text-destructive transition-colors hover:bg-destructive/10"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
