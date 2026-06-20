import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { PressAccordion } from "@/components/press/press-accordion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { pressEn } from "@/content/press";
import { resolvePress } from "@/lib/editorial/resolvers/press";

/**
 * /press — Sildel in print, editorial pass in the Quinta Nova
 * rhythm. Image-only hero, centered title block, an accordion of
 * magazine features (each row expands to the spread), then a
 * dark closing band with a "writing about us?" CTA pointing to
 * /contact.
 */
const PAGE_PATH = "/press";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Press — Sildel in International Design Media",
  description:
    "Sildel in print — features in Vogue, Mobiliário em Notícia, Camden House and more. Higher-resolution images and press samples on request.",
  path: PAGE_PATH,
  image: pressEn.hero.image,
  imageAlt: pressEn.hero.imageAlt,
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    "Sildel press",
    "Sildel media",
    "Sildel in Vogue",
    "Sildel imprensa",
    "Sildel revista",
    "Vogue cork",
    "Mobiliário em Notícia Sildel",
    "Camden House Sildel",
    "Portuguese cork press",
    "imprensa cortiça portuguesa",
    "Sildel media kit",
    "kit imprensa Sildel",
  ],
});

export default async function PressPage() {
  const locale = await getLocale();
  const isPt = locale === "pt";
  // Resolved from Mongo if the founder has edited the page in admin,
  // otherwise from the TS file fallback. Same shape either way.
  const content = await resolvePress(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Imprensa" : "Press", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Press — ${siteConfig.name}`,
    description:
      "Sildel in the international design press — Vogue, Mobiliário em Notícia, Camden House and more.",
    image: pressEn.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  const closeLabel = isPt ? "Toque para fechar" : "Tap to close";

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-1 flex-col bg-background text-foreground">
        {/* Editorial hero — image only, no overlay. */}
        <EditorialHero
          src={content.hero.image}
          alt={content.hero.imageAlt}
          eyebrow={content.hero.eyebrow}
        />

        {/* Title block — wider container so the title can breathe. */}
        <section className="border-b border-border/40">
          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
              {content.intro.eyebrow}
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.04] tracking-tight md:text-5xl lg:text-6xl">
              {content.intro.title}
              {content.intro.titleAccent ? (
                <>
                  {" "}
                  <span className="italic text-primary">
                    {content.intro.titleAccent}
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.intro.intro}
            </p>
          </div>
        </section>

        {/* Accordion of press features. */}
        <section>
          <div className="mx-auto max-w-4xl px-6 py-14 lg:px-10 lg:py-20">
            <PressAccordion
              features={content.features}
              closeLabel={closeLabel}
            />
          </div>
        </section>

        {/* Closing CTA → /contact (press enquiries). */}
        <section className="border-t border-border/60 bg-muted/30">
          <ScrollReveal className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-20">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {content.cta.eyebrow}
            </p>
            <h2 className="font-serif text-3xl font-light leading-[1.04] tracking-tight md:text-4xl lg:text-5xl">
              {content.cta.title}{" "}
              <span className="italic text-primary">
                {content.cta.titleAccent}
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.cta.body}
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href={content.cta.href}
                className="group inline-flex items-center justify-center gap-3 bg-[#5b6740] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-[#4a5530]"
              >
                {content.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
            {content.cta.closingLine ? (
              <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-foreground/55">
                {content.cta.closingLine}
              </p>
            ) : null}
          </ScrollReveal>
        </section>
      </main>
    </>
  );
}