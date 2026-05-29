import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getPartners } from "@/content/partners";

/**
 * Slim "Collaborations" strip — partner names in a row with a link to the
 * full /partners page. Used near the foot of the Home and Our Story pages.
 */
export function PartnersStrip({ locale }: { locale: Locale }) {
  const { section, partners } = getPartners(locale);
  const cta = locale === "pt" ? "Ver parcerias" : "View partnerships";

  return (
    <section
      aria-labelledby="partners-strip-heading"
      className="relative w-full border-t border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-14 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-4">
              {section.eyebrow}
            </p>
            <h2
              id="partners-strip-heading"
              className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-[1.1]"
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
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border/60 bg-border/60 sm:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.slug} className="bg-background px-6 py-7 text-center">
              <p className="font-serif text-xl md:text-2xl font-light text-foreground">
                {partner.name}
              </p>
              <p className="mt-2 text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                {partner.kicker}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}