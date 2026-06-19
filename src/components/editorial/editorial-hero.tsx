import Image from "next/image";

/**
 * Shared image-only hero for the editorial-pass pages (founder
 * direction, June 2026: Quinta Nova History page reference). No
 * overlay copy, just the photograph.
 *
 * Used on /contact, /faq, /privacy, /shipping, /terms — and any
 * future editorial page. The four narrative pages (/our-story,
 * /authentic-cork, /you-think-cork, /partners) still use their
 * page-specific hero wrappers, which render the same shape.
 */
export function EditorialHero({
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
      className="relative w-full overflow-hidden bg-muted"
    >
      <div className="relative h-[60vh] min-h-[420px] w-full md:h-[72vh] lg:h-[88vh] lg:min-h-[640px]">
        <Image
          src={src}
          alt={alt}
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