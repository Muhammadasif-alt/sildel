"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Upload, X, UserCircle2 } from "lucide-react";
import { removeAvatar } from "@/app/admin/profile/actions";

const MAX_SOURCE_BYTES = 8 * 1024 * 1024; // reject huge originals before resizing
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

/**
 * Downscale the picked image to a small square-ish data URL using a canvas.
 * Keeps what we store in MongoDB tiny (~tens of KB) and avoids any
 * server-side image library or filesystem writes.
 */
function fileToResizedDataUrl(file: File, max = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not process image."));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image."));
    };
    img.src = url;
  });
}

export function AvatarUpload({
  currentUrl,
  initials,
}: {
  currentUrl: string;
  initials: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [removing, startRemove] = useTransition();

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    if (!ALLOWED.includes(file.type)) {
      setError("Use a PNG, JPG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setError("Image too large — max 8 MB.");
      return;
    }
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      setPreview(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process image.");
    }
  }

  function onRemove() {
    if (!confirm("Remove your profile photo?")) return;
    startRemove(async () => {
      await removeAvatar();
      if (inputRef.current) inputRef.current.value = "";
      setPreview(null);
    });
  }

  const displayed = preview ?? currentUrl;
  const isDataUrl = displayed.startsWith("data:");

  return (
    <div className="flex items-center gap-5">
      {/* The resized data URL rides along with the form submit. */}
      <input type="hidden" name="avatarData" value={preview ?? ""} />

      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border bg-primary/10">
        {displayed ? (
          <Image
            src={displayed}
            alt="Avatar"
            fill
            sizes="96px"
            className="object-cover"
            unoptimized={isDataUrl}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium uppercase tracking-wider text-primary">
            {initials || <UserCircle2 className="h-12 w-12" strokeWidth={1.4} />}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs uppercase tracking-wider text-foreground transition-colors hover:border-primary/50 hover:bg-accent">
          <Upload className="h-3.5 w-3.5" strokeWidth={1.8} />
          Choose photo
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={onPick}
            className="hidden"
          />
        </label>
        {currentUrl && (
          <button
            type="button"
            onClick={onRemove}
            disabled={removing}
            className="inline-flex w-fit items-center gap-2 rounded-md border border-border px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50"
          >
            <X className="h-3.5 w-3.5" />
            {removing ? "Removing…" : "Remove photo"}
          </button>
        )}
        {error ? (
          <p className="text-[11px] text-destructive">{error}</p>
        ) : (
          <p className="text-[11px] text-muted-foreground/80">
            PNG, JPG, WebP, or GIF · max 8 MB
          </p>
        )}
      </div>
    </div>
  );
}