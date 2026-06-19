import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export type StorySectionData = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  body: string[];
  image: string;
  imageAlt: string;
};

/**
 * Editorial narrative row for /our-story (founder direction, June
 * 2026: Quinta Nova de Nossa Senhora do Carmo "History" page
 * reference). One tall image on one side, a serif heading and a few
 * paragraphs on the other — no CTAs, no stats grid, just the story.
 *
 *   mirror=false  → image LEFT  (55%) | text RIGHT (45%)
 *   mirror=true   → text LEFT  (45%)  | image RIGHT (55%)
 *
 * Heading splits into a normal segment and an optional italic accent
 * — the established Sildel two-tone title pattern.
 */
export function StorySection({
  data,
  mirror = false,
  headingId,
}: {
  data: StorySectionData;
  mirror?: boolean;
  headingId: string;
}) {
  const imageBlock = (
    <ScrollReveal
      direction={mirror ? "right" : "left"}
      className={mirror ? "order-1 lg:order-2" : undefined}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-auto lg:h-[88vh] lg:min-h-[720px]">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
    </ScrollReveal>
  );

  const copyBlock = (
    <ScrollReveal
      delay={0.15}
      direction={mirror ? "left" : "right"}
      className={mirror ? "order-2 lg:order-1" : undefined}
    >
      <div
        className={
          mirror
            ? "flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-0 xl:px-16 2xl:pl-24"
            : "flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-0 xl:px-16 2xl:pr-24"
        }
      >
        <div className={mirror ? "max-w-2xl lg:ml-auto" : "max-w-2xl"}>
          {data.eyebrow ? (
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-foreground/65">
              {data.eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="font-serif text-3xl font-light leading-[1.15] text-foreground md:text-4xl lg:text-[2.5rem]"
          >
            {data.title}
            {data.titleAccent ? (
              <>
                {" "}
                <span className="italic">{data.titleAccent}</span>
              </>
            ) : null}
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {data.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full bg-background py-12 md:py-16 lg:py-20"
    >
      <div
        className={
          mirror
            ? "grid grid-cols-1 items-center lg:grid-cols-[45%_55%]"
            : "grid grid-cols-1 items-center lg:grid-cols-[55%_45%]"
        }
      >
        {mirror ? copyBlock : imageBlock}
        {mirror ? imageBlock : copyBlock}
      </div>
    </section>
  );
}