import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getPartners } from "@/content/partners";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * "Collaborations / In good company" — home + our-story footer strip.
 * Founder direction (June 2026): replace the flat name+kicker text row
 * with editorial cards — image on one side, content on the other,
 * 50/50 — each tile clickable to the partner's section on /partners.
 *
 * Layout: three side-by-side cards on lg, single column on mobile.
 * Each card has a square cover image (using the partner's first
 * /partners-web/ photo) paired with name + kicker + a one-line
 * excerpt + a "Discover →" arrow. The whole card is a Link to
 * /partners#<slug>, where the matching band scrolls into view
 * thanks to the `scroll-mt-24` + `id` we added on PartnerBand.
 */
export function PartnersStrip({ locale }: { locale: Locale }) {
  const { section, partners } = getPartners(locale);
  const isPt = locale === "pt";
  const cta = isPt ? "Ver parcerias" : "View partnerships";
  const tileCta = isPt ? "Descobrir" : "Discover";

  return (
    <section
      aria-labelledby="partners-strip-heading"
      className="relative w-full border-t border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-16 lg:py-20">
        <ScrollReveal className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-primary">
              {section.eyebrow}
            </p>
            <h2
              id="partners-strip-heading"
              className="font-serif text-3xl font-light leading-[1.1] md:text-4xl lg:text-5xl"
            >
              {section.title}{" "}
              <span className="italic text-primary">{section.titleAccent}</span>
            </h2>
          </div>
          <Link
            href="/partners"
            className="group inline-flex items-center gap-2 self-start text-[11px] tracking-[0.32em] uppercase text-foreground/75 transition-colors hover:text-foreground lg:self-end"
          >
            {cta}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </ScrollReveal>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {partners.map((partner, i) => {
            const cover = partner.images[0]?.src ?? "/products/ALEXIS_MV_1036-769ae6c3e3.webp";
            const excerpt = partner.intro || partner.paragraphs[0] || "";
            return (
              <ScrollReveal key={partner.slug} delay={0.15 + i * 0.1}><li>
                <Link
                  href={`/partners#${partner.slug}`}
                  aria-label={`${partner.name} — ${partner.kicker}`}
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.28)]">
                    {/* Cover image — full bleed, fills card top edge to edge */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={cover}
                        alt={partner.name}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                      {/* Quiet arrow indicator that this is a link */}
                      <span
                        aria-hidden
                        className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-foreground group-hover:text-background"
                      >
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>

                    {/* Content panel */}
                    <div className="flex flex-1 flex-col gap-3 px-6 py-7 md:px-7 md:py-8">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-primary">
                        {partner.kicker}
                      </p>
                      <h3 className="font-serif text-2xl font-light leading-tight text-foreground md:text-3xl">
                        {partner.name}
                      </h3>
                      {excerpt && (
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                          {excerpt}
                        </p>
                      )}
                      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[11px] uppercase tracking-[0.32em] text-foreground/70 transition-colors group-hover:text-foreground">
                        {tileCta}
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </article>
                </Link>
              </li></ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}