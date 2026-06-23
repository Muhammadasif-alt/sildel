import Image from "next/image";

/**
 * Image-only hero for /authentic-cork (founder direction, June 2026:
 * Quinta Nova History page reference). Data-driven — the route passes
 * the rendered hero (resolved from Mongo or the TS fallback).
 */
export function CorkHeroEditorial({
  hero,
}: {
  hero: { eyebrow: string; image: string; imageAlt: string };
}) {
  return (
    <section
      aria-label={hero.eyebrow}
      className="relative w-full overflow-hidden bg-[#15110d]"
    >
      {/* object-contain so the whole source image is visible (founder
          feedback, June 2026: "puri image nai aa rhi"). Container goes
          to a dark frame so a Fundo_PRETO macro sits seamlessly; an
          ambient shot reads as a framed gallery print. Height eased
          from 88vh -> 70vh so the empty bands above/below a portrait
          image stay short. Ken Burns dropped — no further crop. */}
      <div className="relative h-[55vh] min-h-[360px] w-full md:h-[65vh] lg:h-[70vh] lg:min-h-[520px]">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}