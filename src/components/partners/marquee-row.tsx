import Image from "next/image";
import type { PartnerImage } from "@/content/partners";

/**
 * Festival Mental — a film-strip marquee that auto-scrolls left forever.
 * Content is duplicated so animating to -50% lines copy 2 onto copy 1 for a
 * seamless loop. `motion-safe:` so users with reduced motion get a static row.
 */
export function MarqueeRow({
  images,
  name,
}: {
  images: PartnerImage[];
  name: string;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[20px] border border-border/60 bg-muted lg:h-full lg:min-h-[420px]">
      <div className="flex h-full w-max motion-safe:animate-[partners-marquee_36s_linear_infinite]">
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative mr-3 h-full aspect-[3/4] shrink-0 overflow-hidden bg-muted last:mr-3"
          >
            <Image
              src={img.src}
              alt={`${name} — ${(i % images.length) + 1}`}
              fill
              sizes="(min-width: 1024px) 320px, 280px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Soft side fades so the loop edges don't read as hard cuts. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
      />
    </div>
  );
}