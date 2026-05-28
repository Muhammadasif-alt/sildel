import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  badge?: string;
};

/**
 * Continuous product gallery — every photo stacked vertically on a clean
 * white mat, scrolling as one flow (no thumbnail switcher). Founder asked
 * for a continuous format rather than the small thumbnail squares.
 *
 * Plain component (no client state needed): the buy panel beside it is what
 * stays sticky while this column scrolls.
 */
export function ProductGallery({ images, alt, badge }: Props) {
  const shots = images.length > 0 ? images : [];

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {shots.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative aspect-square w-full overflow-hidden bg-white"
        >
          <Image
            src={src}
            alt={i === 0 ? alt : `${alt} — ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
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