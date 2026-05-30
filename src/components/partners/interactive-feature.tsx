"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PartnerImage } from "@/content/partners";

/**
 * Split-layout media — a tall feature photo whose height tracks the text
 * column (via `lg:flex-1` inside a stretched grid cell), plus a row of
 * thumbnails. Tap a thumb to swap it into the main slot.
 */
export function InteractiveFeature({
  images,
  name,
}: {
  images: PartnerImage[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  const active = images[selected] ?? images[0];
  // Tailwind needs literal classes; only 3 / 4 occur in our data.
  const colsClass =
    images.length === 3 ? "grid-cols-3" : images.length === 5 ? "grid-cols-5" : "grid-cols-4";

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-border/60 bg-muted shadow-sm lg:aspect-auto lg:min-h-[420px] lg:flex-1">
        <Image
          key={active.src}
          src={active.src}
          alt={`${name} × Sildel`}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-opacity duration-300"
          priority={selected === 0}
        />
      </div>

      {images.length > 1 && (
        <ul className={cn("grid gap-3", colsClass)}>
          {images.map((img, i) => {
            const isActive = i === selected;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={`${name} — view image ${i + 1}`}
                  aria-current={isActive}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden rounded-[14px] border bg-muted transition cursor-pointer",
                    isActive
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-border/60 hover:border-foreground/40",
                  )}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 12vw, 25vw"
                    className={cn(
                      "object-cover transition-opacity",
                      isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}