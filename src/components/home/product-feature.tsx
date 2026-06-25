import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { HomeContent } from "@/content/home";

type Feature = HomeContent["productFeatures"][number];

/**
 * Generic product feature row — Quinta Nova-style editorial section
 * (founder direction, June 2026, twenty-first pass: collapse the
 * earlier AtelierIntro + ProductSpotlight into one reusable
 * component used four times, alternating layouts).
 *
 *   mirror=false  → image LEFT  (55%) | text RIGHT (45%)
 *   mirror=true   → text LEFT  (45%)  | image RIGHT (55%)
 *
 * Image bleeds to the viewport edge on its side (no outer container)
 * so the row reads as one tall window beside the breathing-room text.
 * Padding is intentionally moderate (lg:py-20) so four rows stacked
 * don't push the page into runaway length, while still leaving clean
 * whitespace between rows.
 */
export function ProductFeature({
  data,
  mirror = false,
  headingId,
}: {
  data: Feature;
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
            ? "flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-0 xl:px-24 2xl:pl-32"
            : "flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-0 xl:px-24 2xl:pr-32"
        }
      >
        <div className={mirror ? "max-w-xl lg:ml-auto" : "max-w-xl"}>
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
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {data.body}
          </p>
          <Link
            href={data.cta.href}
            className="group mt-9 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.28em] text-foreground/85 transition-colors hover:text-foreground"
          >
            {data.cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
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