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