import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { youThinkCork } from "@/content/you-think-cork";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";

const PAGE_PATH = "/you-think-cork";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-05-19T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "You Think Cork — Cork Reconsidered as Fine Art",
  description:
    "Reframing cork as fine art — Sildel's perspective on the most under-considered luxury material. From Portuguese cork forests to signed-and-numbered sculpture.",
  path: PAGE_PATH,
  image: youThinkCork.hero.image,
  imageAlt: youThinkCork.hero.imageAlt,
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    // Reframing thesis
    "cork as fine art",
    "cortiça como arte",
    "cork reconsidered",
    "repensar cortiça",
    "Sildel manifesto",
    "manifesto Sildel",
    // Luxury / design
    "luxury cork design",
    "design cortiça luxo",
    "high-end cork",
    "cortiça alta gama",
    "cork sculpture",
    "escultura cortiça",
    "cork furniture",
    "mobiliário cortiça",
    "cork in interiors",
    "cortiça em interiores",
    // Brand + origin
    "Portuguese cork art",
    "arte portuguesa cortiça",
    "Sildel cork",
    "Sildel cortiça",
    // Aesthetic
    "contemporary cork design",
    "design contemporâneo cortiça",
    "luxury home decor Portugal",
    "decoração luxo Portugal",
  ],
});

export default async function YouThinkCorkPage() {
  const locale = await getLocale();

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Pensa em Cortiça" : "You Think Cork", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `You Think Cork — ${siteConfig.name}`,
    description: "Sildel's perspective on cork as fine art — sculpture, furniture, and quiet luxury.",
    image: youThinkCork.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="you-think-cork" />
      </main>
    </>
  );
}