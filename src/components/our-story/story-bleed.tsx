import Image from "next/image";

/**
 * Full-bleed single-image divider for /our-story (founder direction,
 * June 2026: "darmin m kahi single image full page ke b ho"). A
 * cinematic palette-cleanser between the alternating narrative rows
 * — no copy, no overlay, just the photograph.
 *
 * Aspect ratio scales: nearly square on phones, ~21:9 cinemascope on
 * desktop, so the row reads as a deliberate breath in the page flow
 * without dominating the entire viewport.
 */
export function StoryBleed({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <section aria-label={alt} className="relative w-full overflow-hidden bg-muted">
      <div className="relative aspect-[4/3] w-full md:aspect-[16/9] lg:aspect-[21/9] lg:h-[90vh] lg:min-h-[640px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}