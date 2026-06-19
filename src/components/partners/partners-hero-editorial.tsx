import Image from "next/image";

/**
 * Image-only hero for /partners — same treatment as the other
 * editorial pages (founder direction, June 2026: Quinta Nova
 * History page reference). No overlay copy, just the photograph.
 */
export function PartnersHeroEditorial({
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
        />
      </div>
    </section>
  );
}