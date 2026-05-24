"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
  badge?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProductGallery({ images, alt, badge }: Props) {
  const [active, setActive] = useState(0);
  const showThumbs = images.length > 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image — fills the square fully, no padding */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-muted ring-1 ring-border/60 shadow-xl shadow-foreground/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority={active === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {badge && (
          <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 text-[10px] tracking-[0.3em] uppercase rounded-sm shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      {showThumbs && (
        <ul className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className={cn(
                  "relative block h-20 w-20 overflow-hidden rounded-sm border bg-muted transition-all",
                  i === active
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/60",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
