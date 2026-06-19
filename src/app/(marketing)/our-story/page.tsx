import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { ourStory } from "@/content/our-story";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { StoryHeroEditorial } from "@/components/our-story/story-hero-editorial";
import { StorySection } from "@/components/our-story/story-section";
import { StoryBleed } from "@/components/our-story/story-bleed";
import { FounderEditorial } from "@/components/our-story/founder-editorial";
import { StoryVideo } from "@/components/our-story/story-video";
import { StoryClosing } from "@/components/our-story/story-closing";
import { resolveOurStory } from "@/lib/editorial/resolvers/our-story";

const PAGE_PATH = "/our-story";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Our Story — A Portuguese Cork Atelier in Esmoriz",
  description:
    "The story behind Sildel — a Portuguese cork atelier in Esmoriz built on a slow practice, sustainable harvest from the Alentejo cork forests, and signed-and-numbered treasures.",
  path: PAGE_PATH,
  image: ourStory.hero.image,
  imageAlt: ourStory.hero.imageAlt,
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    "Sildel story",
    "Sildel atelier",
    "Sildel founder",
    "história Sildel",
    "atelier Sildel Esmoriz",
    "Portuguese cork heritage",
    "herança cortiça Portugal",
    "tradição cortiça",
    "Alentejo cork",
    "cortiça Alentejo",
    "slow atelier work",
    "ritmo do material",
    "handmade cork sculpture",
    "escultura cortiça atelier",
    "cork harvesting tradition",
    "tradição extração cortiça",
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
  // Resolved from Mongo if the founder has edited the page in admin,
  // otherwise from the TS file fallback. Either way, same shape.
  const content = await resolveOurStory(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "A Nossa História" : "Our Story", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Our Story — ${siteConfig.name}`,
    description:
      "The story behind Sildel — a Portuguese cork atelier built on a slow practice and sustainable harvest.",
    image: content.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-1 flex-col">
        <StoryHeroEditorial hero={content.hero} />

        {/* Origin (image LEFT) */}
        <StorySection
          data={content.sections[0]}
          mirror={false}
          headingId="story-origin"
        />

        {/* Full-bleed: cork sheets curing in the open air */}
        <StoryBleed
          src={content.bleeds.afterOrigin.src}
          alt={content.bleeds.afterOrigin.alt}
        />

        {/* Heritage: Quercus suber (image RIGHT) */}
        <StorySection
          data={content.sections[1]}
          mirror={true}
          headingId="story-heritage-oak"
        />

        {/* Heritage: descortiçador hands (image LEFT) */}
        <StorySection
          data={content.sections[2]}
          mirror={false}
          headingId="story-heritage-hands"
        />

        {/* Full-bleed: atelier interior at golden hour */}
        <StoryBleed
          src={content.bleeds.beforeAtelier.src}
          alt={content.bleeds.beforeAtelier.alt}
        />

        {/* Atelier (image RIGHT) */}
        <StorySection
          data={content.sections[3]}
          mirror={true}
          headingId="story-atelier"
        />

        {/* Symbol — the Iberian lynx (image LEFT) */}
        <StorySection
          data={content.sections[4]}
          mirror={false}
          headingId="story-symbol"
        />

        {/* Founder — portrait + pull quote (image RIGHT) */}
        <FounderEditorial founder={content.founder} mirror={true} />

        {/* Cinematic video — kept from the previous design. */}
        <StoryVideo locale={locale} />

        {/* Closing parallax CTA — added so the video isn't the last
            beat before the footer. */}
        <StoryClosing cta={content.cta} />
      </main>
    </>
  );
}