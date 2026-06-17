import Image from "next/image";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Alentejo Origins — wine-and-cork origin story (founder direction,
 * June 2026). Same soil, same sky, same patience. The Alentejo
 * montado is the working cork forest where every piece begins, and
 * it's the same landscape that feeds Portugal's most respected wine
 * cellars. Editorial pause, no CTA — origin sections work better as
 * a contemplative moment than a sales beat.
 *
 * Layout: 60/40 — large landscape image left (with a small overlap
 * inset of cork curing under the oaks), editorial copy + three-beat
 * cadence on the right.
 */
export function AlentejoOrigins({ locale }: { locale: Locale }) {
  const { alentejoOrigins: data } = getHome(locale);

  return (
    <section
      aria-labelledby="alentejo-origins-heading"
      className="relative w-full border-t border-border/60 bg-background"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Image column — large landscape + offset inset */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Inset — cork stacks curing under the oaks, offset to
                the bottom-right so the composition reads as a layered
                editorial spread rather than a flat hero. Hidden on
                mobile to keep the column from getting busy. */}
            <div className="absolute -bottom-10 right-0 hidden w-[42%] overflow-hidden border-[6px] border-background bg-muted shadow-xl lg:block lg:-bottom-14 lg:right-6">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={data.inset}
                  alt={data.insetAlt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 0vw"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Copy column */}
          <ScrollReveal delay={0.15} className="max-w-xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-primary">
              {data.eyebrow}
            </p>
            <h2
              id="alentejo-origins-heading"
              className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-[3.25rem]"
            >
              {data.title}{" "}
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
              {data.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Three-beat cadence — small caps row beneath the body,
                separated by gold dots, anchors the closing rhythm. */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-14">
              {data.cadence.map((line, i) => (
                <div key={line} className="flex items-center gap-x-6">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-foreground/85">
                    {line}.
                  </span>
                  {i < data.cadence.length - 1 && (
                    <span
                      aria-hidden
                      className="inline-block h-1 w-1 rounded-full bg-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}