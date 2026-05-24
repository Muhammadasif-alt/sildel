"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Upload, X, UserCircle2 } from "lucide-react";
import { removeAvatar } from "@/app/admin/profile/actions";

export function AvatarUpload({
  currentUrl,
  initials,
}: {
  currentUrl: string;
  initials: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [removing, startRemove] = useTransition();

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
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

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border bg-primary/10">
        {displayed ? (
          <Image
            src={displayed}
            alt="Avatar"
            fill
            sizes="96px"
            className="object-cover"
            unoptimized={preview !== null}
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
            name="avatar"
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
        <p className="text-[11px] text-muted-foreground/80">
          PNG, JPG, WebP, or GIF · max 4 MB
        </p>
      </div>
    </div>
  );
}