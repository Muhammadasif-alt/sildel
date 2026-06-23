import Image from "next/image";

/**
 * Image-only hero for /you-think-cork — same treatment as the
 * /our-story and /authentic-cork heroes (founder direction, June
 * 2026: Quinta Nova History page reference).
 */
export function YtcHeroEditorial({
  src,
  alt,
  eyebrow,
}: {
  src: string;
  alt: string;
  eyebrow: string;
}) {
  return (
    <section
      aria-label={eyebrow}
      className="relative w-full overflow-hidden bg-[#15110d]"
    >
      {/* Same treatment as cork-hero-editorial (June 2026): show the
          full source image in a dark gallery frame, eased height, no
          Ken Burns. /you-think-cork hero is ABYSS_Fundo_PRETO too. */}
      <div className="relative h-[55vh] min-h-[360px] w-full md:h-[65vh] lg:h-[70vh] lg:min-h-[520px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}