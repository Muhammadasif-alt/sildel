import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { ourStory } from "@/content/our-story";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { StoryVideo } from "@/components/our-story/story-video";

const PAGE_PATH = "/our-story";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-05-19T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Our Story — A Portuguese Cork Atelier in Esmoriz",
  description:
    "The story behind Sildel — a Portuguese cork atelier in Esmoriz built on slow craft, sustainable harvest from the Alentejo cork forests, and signed-and-numbered treasures.",
  path: PAGE_PATH,
  image: ourStory.hero.image,
  imageAlt: ourStory.hero.imageAlt,
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    // Brand/identity
    "Sildel story",
    "Sildel atelier",
    "Sildel founder",
    "história Sildel",
    "atelier Sildel Esmoriz",
    // Heritage
    "Portuguese cork heritage",
    "herança cortiça Portugal",
    "tradição cortiça",
    "Alentejo cork",
    "cortiça Alentejo",
    // Craft
    "slow craft",
    "artesanato lento",
    "handmade cork sculpture",
    "escultura cortiça artesanal",
    "cork harvesting tradition",
    "tradição extração cortiça",
    // Material + location
    "cork oak Portugal",
    "sobreiro Portugal",
    "sustainable design Portugal",
    "design sustentável Portugal",
    "Esmoriz atelier",
    "Aveiro Portugal",
  ],
});

export default async function OurStoryPage() {
  const locale = await getLocale();

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "A Nossa História" : "Our Story", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Our Story — ${siteConfig.name}`,
    description:
      "The story behind Sildel — a Portuguese cork atelier built on slow craft and sustainable harvest.",
    image: ourStory.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="our-story" />
        <StoryVideo locale={locale} />
      </main>
    </>
  );
}