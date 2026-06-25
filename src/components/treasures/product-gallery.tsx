import Image from "next/image";
import IMAGE_SIZES from "@/content/image-sizes.json";

const SIZES = IMAGE_SIZES as unknown as Record<string, [number, number]>;

type Props = {
  images: string[];
  alt: string;
  badge?: string;
};

/**
 * Continuous product gallery — every photo stacked vertically in a uniform,
 * "fit" frame so no piece is cut and none floats in dead space.
 *
 * The real width/height of every /products/ image is read at build time into
 * image-sizes.json (~161 entries). We use it per image:
 *  - Landscape / square shots (the catalogue majority) render at their own
 *    true ratio, edge-to-edge — they already fit, so nothing is cropped.
 *  - Portrait / tall shots (e.g. floor-lamp photos with a long empty pole and
 *    black headroom) are framed to a clean 4:5 and object-cover'd from the top,
 *    so the piece fills the frame and the empty tail is trimmed instead of
 *    leaving a tall band of black.
 * Falls back to 3:2 for any image missing from the manifest.
 */
export function ProductGallery({ images, alt, badge }: Props) {
  const shots = images.length > 0 ? images : [];

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      {shots.map((src, i) => {
        const [w, h] = SIZES[src] ?? [1600, 1067];
        const portrait = h > w;
        return (
          <div
            key={`${src}-${i}`}
            className="relative w-full overflow-hidden bg-muted"
            style={{ aspectRatio: portrait ? "4 / 5" : `${w} / ${h}` }}
          >
            <Image
              src={src}
              alt={i === 0 ? alt : `${alt} — ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className={`object-cover ${portrait ? "object-top" : "object-center"}`}
            />
            {badge && i === 0 && (
              <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-foreground text-background px-3 py-1.5 text-[10px] tracking-[0.32em] uppercase">
                {badge}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}