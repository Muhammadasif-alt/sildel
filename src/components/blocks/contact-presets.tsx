/**
 * Contact preset block renderers.
 * Sections: hero, form, visit, faq. The contact form itself stays a client
 * component (form action posts to the server); CMS controls only copy.
 */
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Sparkles,
} from "lucide-react";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, list, itemStr, pickFromItem } from "./block-utils";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/contact/contact-form";

export function ContactHeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const title = loc(block, "title", locale);
  const titleAccent = loc(block, "titleAccent", locale);
  const intro = loc(block, "intro", locale);
  const badge = loc(block, "badge", locale);
  const image =
    str(block, "image") ||
    "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp";
  const imageAlt = loc(block, "imageAlt", locale, "Sildel atelier interior at golden hour.");

  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative w-full overflow-hidden bg-foreground"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/30"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="max-w-2xl text-background">
          <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
            <span className="h-px w-8 bg-primary/60" aria-hidden />
            {eyebrow}
          </p>
          <h1
            id="contact-hero-heading"
            className="font-serif text-5xl font-light leading-[1.02] md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {title}{" "}
            <span className="italic text-primary">{titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-background/85 md:text-lg">
            {intro}
          </p>

          {badge && (
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-background backdrop-blur-md ring-1 ring-background/20">
              <MapPin className="h-3 w-3 text-primary" aria-hidden />
              {badge}
            </span>
          )}

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-xl">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-center gap-3 rounded-sm bg-background/10 px-4 py-3 ring-1 ring-background/20 backdrop-blur-md transition-colors hover:bg-background/20 hover:ring-primary/60"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                <span className="text-sm text-background transition-colors group-hover:text-primary">
                  {siteConfig.contact.email}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="group flex items-center gap-3 rounded-sm bg-background/10 px-4 py-3 ring-1 ring-background/20 backdrop-blur-md transition-colors hover:bg-background/20 hover:ring-primary/60"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                <span className="whitespace-nowrap text-sm font-medium text-background transition-colors group-hover:text-primary">
                  {siteConfig.contact.phone}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactFormBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const title = loc(block, "title", locale);
  const cardImage =
    str(block, "cardImage") ||
    "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp";
  const cardImageAlt = loc(block, "cardImageAlt", locale, "Sildel atelier doorway.");
  const cardEyebrow = loc(block, "cardEyebrow", locale, "Atelier Sildel");
  const cardLocation = loc(block, "cardLocation", locale, "Esmoriz, Portugal");
  const emailLabel = loc(block, "emailLabel", locale, "Email");
  const phoneLabel = loc(block, "phoneLabel", locale, "Phone");
  const phoneNote = loc(block, "phoneNote", locale, siteConfig.contact.phoneNote[locale]);
  const addressLabel = loc(block, "addressLabel", locale, "Atelier");
  const hoursLabel = loc(block, "hoursLabel", locale, "Hours");
  const hoursValue = loc(block, "hoursValue", locale);
  const hoursNote = loc(block, "hoursNote", locale);

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="relative w-full bg-muted/30 border-y border-border/60 py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:px-12">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary">
            {eyebrow}
          </p>
          <h2
            id="contact-form-heading"
            className="font-serif text-3xl font-light leading-[1.1] text-foreground md:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <div className="my-7 h-px w-12 bg-primary/60" aria-hidden />
          <ContactForm />
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-none border border-border bg-card shadow-xl shadow-foreground/5">
            <div className="relative aspect-[16/9]">
              <Image
                src={cardImage}
                alt={cardImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent"
              />
              <p className="absolute bottom-5 left-6 text-background">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-primary">
                  {cardEyebrow}
                </span>
                <span className="mt-1 block font-serif text-xl">{cardLocation}</span>
              </p>
            </div>

            <ul className="divide-y divide-border">
              <InfoRow icon={Mail} label={emailLabel}>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-1 inline-block text-sm text-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </InfoRow>
              <InfoRow icon={Phone} label={phoneLabel}>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="mt-1 inline-block whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.contact.phone}
                </a>
                {phoneNote && (
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {phoneNote}
                  </p>
                )}
              </InfoRow>
              <InfoRow icon={MapPin} label={addressLabel}>
                <address className="mt-1 text-sm not-italic leading-relaxed text-foreground">
                  {siteConfig.contact.address.line1}
                  <br />
                  <span className="text-muted-foreground">
                    {siteConfig.contact.address.line2}
                  </span>
                </address>
              </InfoRow>
              <InfoRow icon={Clock} label={hoursLabel}>
                {hoursValue && (
                  <p className="mt-1 text-sm text-foreground">{hoursValue}</p>
                )}
                {hoursNote && (
                  <p className="mt-1 text-[11px] text-muted-foreground">{hoursNote}</p>
                )}
              </InfoRow>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 p-6">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
        {children}
      </div>
    </li>
  );
}

export function ContactVisitBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const title = loc(block, "title", locale);
  const titleAccent = loc(block, "titleAccent", locale);
  const body = loc(block, "body", locale);
  const image =
    str(block, "image") ||
    "/Slidel/Nano Banana 2 - Overhead top-down view of an artisan workbench in low warm tungsten light_ hand tool_1.webp";
  const imageAlt = loc(block, "imageAlt", locale);
  const ctaLabel = loc(block, "ctaLabel", locale);
  const ctaHref = str(block, "ctaHref", "#contact-form-heading");
  const perks = list(block, "perks").map((it) => ({
    title: pickFromItem(it, "title", locale),
    body: pickFromItem(it, "body", locale),
  }));

  return (
    <section
      aria-labelledby="visit-heading"
      className="relative w-full bg-background py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="overflow-hidden rounded-none border border-border bg-card shadow-2xl shadow-foreground/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[480px]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-foreground/30 via-transparent to-transparent"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
                <CalendarCheck className="h-3.5 w-3.5" aria-hidden />
                {eyebrow}
              </p>
              <h2
                id="visit-heading"
                className="font-serif text-3xl font-light leading-[1.1] text-foreground md:text-4xl lg:text-5xl"
              >
                {title}{" "}
                <span className="italic text-primary">{titleAccent}</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {body}
              </p>

              {perks.length > 0 && (
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {perks.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-sm border border-border bg-background p-4"
                    >
                      <Sparkles
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-foreground">
                          {p.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={ctaHref}
                className="group mt-10 inline-flex items-center gap-3 self-start rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                {ctaLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactFaqBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const title = loc(block, "title", locale);
  const titleAccent = loc(block, "titleAccent", locale);
  const intro = loc(block, "intro", locale);
  const emailCta = loc(block, "emailCta", locale);
  const items = list(block, "items").map((it) => ({
    q: pickFromItem(it, "question", locale),
    a: pickFromItem(it, "answer", locale),
  }));

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative w-full bg-muted/30 border-t border-border/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
              <span className="h-px w-8 bg-primary/60" aria-hidden />
              {eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="font-serif text-3xl font-light leading-[1.05] text-foreground md:text-4xl lg:text-5xl"
            >
              {title}{" "}
              <span className="italic text-primary">{titleAccent}</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
            <Link
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary transition-colors hover:text-foreground"
            >
              {emailCta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {items.length > 0 ? (
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i}>
                  <details
                    className="group rounded-sm border border-border bg-card transition-colors hover:border-primary/40 open:border-primary/60 open:shadow-lg open:shadow-foreground/5"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 lg:p-7">
                      <div className="flex items-start gap-4">
                        <span className="font-serif text-2xl font-light text-primary/40 leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-lg font-light leading-snug text-foreground md:text-xl">
                          {item.q}
                        </span>
                      </div>
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition-transform duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground"
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </summary>
                    <div className="px-6 pb-7 pl-[3.75rem] lg:px-7 lg:pl-[4rem]">
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.a}
                      </p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Markers to keep the import used in case of future custom rendering paths.
void itemStr;
