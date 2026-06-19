import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

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
      <ScrollReveal direction="scale" distance={0} duration={1.2}>
        <div className="group relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9] lg:aspect-[21/9] lg:h-[90vh] lg:min-h-[640px]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}