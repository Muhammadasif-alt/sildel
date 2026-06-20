import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  badge?: string;
};

/**
 * Continuous product gallery — every photo stacked vertically, each at
 * its own natural aspect ratio so portrait pieces (1920×2880) and the
 * occasional landscape shot (1920×1280) both render edge-to-edge with
 * no pillarbox / letterbox bands.
 *
 * Founder direction (June 2026): the old aspect-square + object-contain
 * combo was letterboxing tall pieces with white side bands. Switched to
 * width/height props matching each /products/ webp so next/image still
 * reserves the right space and avoids layout shift, while CSS w-full
 * h-auto lets the column take the image's true ratio.
 */
export function ProductGallery({ images, alt, badge }: Props) {
  const shots = images.length > 0 ? images : [];

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      {shots.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative w-full overflow-hidden"
        >
          <Image
            src={src}
            alt={i === 0 ? alt : `${alt} — ${i + 1}`}
            width={1920}
            height={2880}
            priority={i === 0}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="block w-full h-auto"
          />
          {badge && i === 0 && (
            <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1.5 text-[10px] tracking-[0.32em] uppercase">
              {badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}