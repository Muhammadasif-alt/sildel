"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, Loader2, Search } from "lucide-react";

type Asset = {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
};

export function MediaPicker({
  open,
  onClose,
  onPick,
  accept = "image",
}: {
  open: boolean;
  onClose: () => void;
  onPick: (url: string) => void;
  accept?: "image" | "video" | "any";
}) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [q, setQ] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const url = `/api/admin/media/list?limit=80${q ? `&q=${encodeURIComponent(q)}` : ""}`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => setAssets(j.assets ?? []))
      .finally(() => setLoading(false));
  }, [open, q]);

  async function handleUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      for (const f of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", f);
        const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
        if (!res.ok) continue;
        const j = await res.json();
        setAssets((prev) => [
          {
            id: crypto.randomUUID(),
            url: j.url,
            filename: j.filename,
            mimeType: j.mimeType,
            size: j.size,
          },
          ...prev,
        ]);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  if (!open) return null;

  const filtered = assets.filter((a) => {
    if (accept === "image") return a.mimeType.startsWith("image/");
    if (accept === "video") return a.mimeType.startsWith("video/");
    return true;
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
      <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="font-serif text-xl text-foreground">Media library</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Pick existing media or upload a new file.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex items-center gap-3 border-b border-border px-6 py-3">
          <input
            ref={fileRef}
            type="file"
            multiple
            accept={accept === "image" ? "image/*" : accept === "video" ? "video/*" : undefined}
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? "Uploading…" : "Upload"}
          </button>
          <div className="relative ml-auto w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search filename…"
              className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-2 text-xs outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
              <p>No media yet.</p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-primary hover:underline"
              >
                Upload your first file
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {filtered.map((a) => {
                const isVideo = a.mimeType.startsWith("video/");
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      onPick(a.url);
                      onClose();
                    }}
                    className="group overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-primary/60"
                  >
                    <div className="relative aspect-square bg-muted">
                      {isVideo ? (
                        <video src={a.url} className="absolute inset-0 h-full w-full object-cover" muted />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.url} alt={a.filename} className="absolute inset-0 h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="truncate p-1.5 text-[10px] text-muted-foreground" title={a.filename}>
                      {a.filename}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
