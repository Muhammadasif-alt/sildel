import Image from "next/image";
import { getOurStory } from "@/content/our-story";
import type { Locale } from "@/lib/i18n/config";

/**
 * Editorial Our Story hero (founder direction, June 2026: "Hero m
 * khali Image no Text" — Quinta Nova de Nossa Senhora do Carmo
 * History page reference). A single full-bleed atelier image with no
 * overlay text — the chrome line below carries the section name, the
 * narrative starts in the first content row beneath.
 *
 * Kept as a server component: no client JS, no animation overhead.
 * The image is `priority` because it is above the fold on /our-story.
 */
export function StoryHeroEditorial({ locale }: { locale: Locale }) {
  const { hero } = getOurStory(locale);

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
        />
      </div>
    </section>
  );
}