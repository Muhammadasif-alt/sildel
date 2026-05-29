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
import { PartnersSection } from "@/components/partners/partners-section";

const PAGE_PATH = "/partners";
const DATE_PUBLISHED = "2026-05-29T00:00:00Z";
const DATE_MODIFIED = "2026-05-29T00:00:00Z";
const HERO_IMAGE = "/partners-web/porcel/porcel-1.webp";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Partnerships — Sildel × Porcel, Lightenjin & Festival Mental",
  description:
    "The collaborations behind Sildel — porcelain with Porcel, the CORKLUX cork luminaires with Lightenjin, and the official cork trophy for Festival Mental. Made in Portugal.",
  path: PAGE_PATH,
  image: HERO_IMAGE,
  imageAlt: "Sildel × Porcel — porcelain and genuine cork.",
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    "Sildel partnerships",
    "Sildel Porcel",
    "Sildel Lightenjin",
    "CORKLUX",
    "cork luminaire",
    "Festival Mental cork trophy",
    "Portuguese cork collaborations",
    "parcerias Sildel",
    "cortiça Porcel",
    "candeeiro cortiça",
    "troféu cortiça Festival Mental",
  ],
});

export default async function PartnersPage() {
  const locale = await getLocale();
  const isPt = locale === "pt";

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Parcerias" : "Partnerships", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Partnerships — ${siteConfig.name}`,
    description:
      "Sildel's collaborations: Porcel (porcelain), Lightenjin (CORKLUX cork luminaires) and the Festival Mental cork trophy.",
    image: HERO_IMAGE,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  const t = {
    eyebrow: isPt ? "Parcerias" : "Collaborations",
    title: isPt ? "Parcerias." : "Partnerships.",
    body: isPt
      ? "A cortiça dá o seu melhor em diálogo. Da porcelana à iluminação ao troféu de um festival, estas são as casas e projectos portugueses com quem a Sildel constrói lado a lado."
      : "Cork is at its best in dialogue. From porcelain to lighting to the trophy of a festival, these are the Portuguese houses and projects Sildel builds alongside.",
    ctaEyebrow: isPt ? "Pensa em cortiça?" : "Do you think cork?",
    ctaTitle: isPt
      ? "Vamos criar algo juntos."
      : "Let's create something together.",
    ctaLink: isPt ? "Pensa em Cortiça" : "You Think Cork",
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* Hero */}
        <section className="relative w-full border-b border-border/40">
          <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-16 lg:py-24">
            <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
              {t.eyebrow}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8">
              {t.title}
            </h1>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
              {t.body}
            </p>
          </div>
        </section>

        {/* Partner bands */}
        <PartnersSection locale={locale} showHeader={false} />

        {/* CTA → collaborate */}
        <section className="relative w-full bg-muted/30 border-t border-border/60">
          <div className="mx-auto max-w-3xl px-6 lg:px-12 py-16 lg:py-20 text-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
              {t.ctaEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8">
              {t.ctaTitle}
            </h2>
            <Link
              href="/you-think-cork"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs tracking-[0.32em] uppercase font-medium transition-colors hover:bg-foreground/90"
            >
              {t.ctaLink}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}