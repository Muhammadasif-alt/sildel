import Link from "next/link";
import Image from "next/image";
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
const HERO_BG =
  "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp";

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
        {/* Hero — full-bleed atelier backdrop with white text */}
        <section className="relative w-full overflow-hidden isolate border-b border-border/40">
          <Image
            src={HERO_BG}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover -z-10"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40"
          />
          <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1480px] flex-col justify-center px-6 py-24 lg:px-12 lg:py-36">
            <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-white/70">
              {t.eyebrow}
            </p>
            <h1 className="mb-8 font-serif text-4xl font-light leading-[1.05] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
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