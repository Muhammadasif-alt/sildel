import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Asterisk } from "lucide-react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";

/**
 * "Why Collectors Choose Sildel" — 50/50 editorial band, text + cinematic
 * atelier image. Modelled on the Papi & Lilly's reference shared by the
 * founder (eyebrow pill + bold heading + body + bulleted values + CTA, beside
 * a single richly-lit interior photo). Sildel-styled with serif headings,
 * italic gold accent, hairline borders and the dark inset CTA.
 */
export function WhyChooseSildel({ locale }: { locale: Locale }) {
  const { whyChoose } = getHome(locale);

  return (
    <section
      aria-labelledby="why-choose-sildel-heading"
      className="relative w-full bg-muted/40"
    >
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-28">
        {/* ── TEXT COLUMN ─────────────────────────────────────────── */}
        <div className="max-w-xl">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 border border-primary/40 bg-background px-5 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-primary">
            <Asterisk className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
            {whyChoose.eyebrow}
          </span>

          {/* Heading */}
          <h2
            id="why-choose-sildel-heading"
            className="mt-8 font-serif text-4xl font-light leading-[1.05] text-foreground md:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {whyChoose.title}{" "}
            <span className="italic text-primary">
              {whyChoose.titleAccent}
            </span>
          </h2>

          {/* Body */}
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {whyChoose.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Bullets */}
          <ul className="mt-10 space-y-4">
            {whyChoose.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background"
                >
                  <Asterisk
                    className="h-4 w-4 text-primary"
                    strokeWidth={1.6}
                  />
                </span>
                <span className="pt-1 text-base leading-snug text-foreground/85">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={whyChoose.cta.href}
            className="group mt-12 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
          >
            {whyChoose.cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* ── IMAGE COLUMN ────────────────────────────────────────── */}
        <div className="relative">
          {/* Gold corner brackets — quiet luxury marker, matching the hero
              slider's product frame language. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-2 z-10 h-6 w-6 border-l-2 border-t-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-2 z-10 h-6 w-6 border-r-2 border-t-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -bottom-2 z-10 h-6 w-6 border-l-2 border-b-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -bottom-2 z-10 h-6 w-6 border-r-2 border-b-2 border-primary"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted lg:aspect-[5/6]">
            <Image
              src={whyChoose.image}
              alt={whyChoose.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}