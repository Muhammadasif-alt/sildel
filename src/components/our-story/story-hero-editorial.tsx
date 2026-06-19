import Image from "next/image";

/**
 * Editorial Our Story hero (founder direction, June 2026: "Hero m
 * khali Image no Text" — Quinta Nova de Nossa Senhora do Carmo
 * History page reference). A single full-bleed atelier image with no
 * overlay text — the chrome line below carries the section name, the
 * narrative starts in the first content row beneath.
 *
 * Data-driven — the route passes the rendered hero (resolved from
 * Mongo or the TS fallback).
 */
export function StoryHeroEditorial({
  hero,
}: {
  hero: { eyebrow: string; image: string; imageAlt: string };
}) {
  return (
    <section
      aria-label={hero.eyebrow}
      className="relative w-full overflow-hidden bg-muted"
    >
      <div className="relative h-[60vh] min-h-[420px] w-full md:h-[72vh] lg:h-[88vh] lg:min-h-[640px]">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            animation:
              "kenBurns 24s cubic-bezier(0.22, 1, 0.36, 1) infinite alternate",
          }}
        />
      </div>
    </section>
  );
}