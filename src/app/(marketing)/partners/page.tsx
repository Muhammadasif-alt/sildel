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
import { StorySection } from "@/components/our-story/story-section";
import { resolvePartners } from "@/lib/editorial/resolvers/partners";

const PAGE_PATH = "/partners";
const DATE_PUBLISHED = "2026-05-29T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Partnerships — Sildel × Porcel, Lightenjin & Festival Mental",
  description:
    "The collaborations behind Sildel — porcelain with Porcel, the CORKLUX cork luminaires with Lightenjin, and the official cork trophy for Festival Mental. Made in Portugal.",
  path: PAGE_PATH,
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
  // Resolved from Mongo if the founder has edited the page in admin,
  // otherwise from the TS file fallback. Same shape either way.
  const content = await resolvePartners(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    {
      label: locale === "pt" ? "Parcerias" : "Partnerships",
      href: PAGE_PATH,
    },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Partnerships — ${siteConfig.name}`,
    description:
      "Sildel's collaborations: Porcel (porcelain), Lightenjin (CORKLUX cork luminaires) and the Festival Mental cork trophy.",
    image: content.intro.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* Editorial hero — image only, no overlay. */}
        <PartnersHeroEditorial
          src={content.hero.image}
          alt={content.hero.imageAlt}
          eyebrow={content.hero.eyebrow}
        />

        {/* Intro — single narrative row before the partner bands. */}
        <StorySection
          data={content.intro}
          mirror={false}
          headingId="partners-intro"
        />

        {/* Partner bands — own component, separate edit surface. */}
        <PartnersSection locale={locale} showHeader={false} />

        {/* Closing parallax CTA → /you-think-cork. */}
        <PartnersClosing
          eyebrow={content.cta.eyebrow}
          title={content.cta.title}
          titleAccent={content.cta.titleAccent}
          body={content.cta.body}
          ctaLabel={content.cta.label}
          ctaHref={content.cta.href}
          closingLine={content.cta.closingLine}
          backgroundImage={content.cta.backgroundImage}
        />
      </main>
    </>
  );
}