import Image from "next/image";
import { getAuthenticCork } from "@/content/authentic-cork";
import type { Locale } from "@/lib/i18n/config";

/**
 * Image-only hero for /authentic-cork (founder direction, June 2026:
 * Quinta Nova History page reference — same treatment as the
 * /our-story hero). No overlay copy, just the photograph.
 */
export function CorkHeroEditorial({ locale }: { locale: Locale }) {
  const { hero } = getAuthenticCork(locale);

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