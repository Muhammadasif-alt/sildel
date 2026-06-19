import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { PartnersSection } from "@/components/partners/partners-section";
import { PartnersHeroEditorial } from "@/components/partners/partners-hero-editorial";
import { PartnersClosing } from "@/components/partners/partners-closing";
import {
  StorySection,
  type StorySectionData,
} from "@/components/our-story/story-section";

/**
 * /partners — editorial pass in the Quinta Nova rhythm (founder
 * direction, June 2026). Image-only hero, a single StorySection
 * intro, the existing PartnersSection editorial cards (kept), and
 * a closing parallax CTA that matches the other editorial pages.
 */
const PAGE_PATH = "/partners";
const DATE_PUBLISHED = "2026-05-29T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";
const HERO_IMAGE =
  "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp";
const INTRO_IMAGE = "/partners-web/porcel/porcel-1.webp";
const CLOSING_BG =
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Partnerships — Sildel × Porcel, Lightenjin & Festival Mental",
  description:
    "The collaborations behind Sildel — porcelain with Porcel, the CORKLUX cork luminaires with Lightenjin, and the official cork trophy for Festival Mental. Made in Portugal.",
  path: PAGE_PATH,
  image: INTRO_IMAGE,
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
    image: INTRO_IMAGE,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  const t = {
    eyebrow: isPt ? "Parcerias" : "Collaborations",
    title: isPt ? "Em" : "In",
    titleAccent: isPt ? "diálogo." : "dialogue.",
    body: isPt
      ? "A cortiça dá o seu melhor em diálogo. Da porcelana à iluminação ao troféu de um festival, estas são as casas e projectos portugueses com quem a Sildel constrói lado a lado."
      : "Cork is at its best in dialogue. From porcelain to lighting to the trophy of a festival, these are the Portuguese houses and projects Sildel builds alongside.",
    ctaEyebrow: isPt ? "Pensa em cortiça?" : "Do you think cork?",
    ctaTitle: isPt ? "Vamos criar" : "Let's create",
    ctaTitleAccent: isPt ? "algo juntos." : "something together.",
    ctaBody: isPt
      ? "Se vê a cortiça como mais do que um material, há lugar para uma conversa. A SILDEL constrói cada parceria devagar — uma peça, um projecto, uma ideia de cada vez."
      : "If you see cork as more than a material, there's room for a conversation. SILDEL builds every partnership slowly — one piece, one project, one idea at a time.",
    ctaLink: isPt ? "Pensa em Cortiça" : "You Think Cork",
    closingLine: isPt
      ? "Desenhado em Portugal · Feito à mão"
      : "Designed in Portugal · Handmade",
  };

  const intro: StorySectionData = {
    eyebrow: t.eyebrow,
    title: t.title,
    titleAccent: t.titleAccent,
    body: [t.body],
    image: INTRO_IMAGE,
    imageAlt: isPt
      ? "Porcel × Sildel — porcelana portuguesa e cortiça autêntica."
      : "Porcel × Sildel — Portuguese porcelain and authentic cork.",
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* Editorial hero — image only, no overlay (founder direction
            June 2026: Quinta Nova History page reference). */}
        <PartnersHeroEditorial
          src={HERO_IMAGE}
          alt={
            isPt
              ? "Atelier português ao pôr-do-sol — luz quente a percorrer a oficina."
              : "Portuguese atelier at golden hour — warm sunlight crossing the workshop."
          }
          eyebrow={t.eyebrow}
        />

        {/* Intro — single narrative row before the partner bands. */}
        <StorySection data={intro} mirror={false} headingId="partners-intro" />

        {/* Partner bands — keep the existing editorial cards. */}
        <PartnersSection locale={locale} showHeader={false} />

        {/* Closing parallax CTA → /you-think-cork. */}
        <PartnersClosing
          eyebrow={t.ctaEyebrow}
          title={t.ctaTitle}
          titleAccent={t.ctaTitleAccent}
          body={t.ctaBody}
          ctaLabel={t.ctaLink}
          ctaHref="/you-think-cork"
          closingLine={t.closingLine}
          backgroundImage={CLOSING_BG}
        />
      </main>
    </>
  );
}