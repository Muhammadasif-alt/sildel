import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getOurStory, ourStory } from "@/content/our-story";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { StoryHeroEditorial } from "@/components/our-story/story-hero-editorial";
import { StorySection, type StorySectionData } from "@/components/our-story/story-section";
import { StoryBleed } from "@/components/our-story/story-bleed";
import { FounderEditorial } from "@/components/our-story/founder-editorial";
import { StoryVideo } from "@/components/our-story/story-video";

const PAGE_PATH = "/our-story";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-19T00:00:00Z";

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
  const content = getOurStory(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "A Nossa História" : "Our Story", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Our Story — ${siteConfig.name}`,
    description:
      "The story behind Sildel — a Portuguese cork atelier built on a slow practice and sustainable harvest.",
    image: ourStory.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  // Narrative reel — five alternating image+text rows built from the
  // existing localised content (no new copy invented). Each row maps
  // to one cinematic Nano Banana 2 image so the page reads as a
  // single editorial sequence.
  const sections: StorySectionData[] = [
    {
      eyebrow: content.origin.eyebrow,
      title: content.origin.title,
      titleAccent: content.origin.titleAccent,
      body: content.origin.body,
      image: content.origin.image,
      imageAlt: content.origin.imageAlt,
    },
    {
      eyebrow: content.heritage.images[0].eyebrow,
      title: content.heritage.images[0].title,
      body: [content.heritage.body, content.heritage.images[0].body],
      image: content.heritage.images[0].src,
      imageAlt: content.heritage.images[0].alt,
    },
    {
      eyebrow: content.heritage.images[1].eyebrow,
      title: content.heritage.images[1].title,
      body: [content.heritage.images[1].body],
      image: content.heritage.images[1].src,
      imageAlt: content.heritage.images[1].alt,
    },
    {
      eyebrow: content.atelier.eyebrow,
      title: content.atelier.title,
      titleAccent: content.atelier.titleAccent,
      body: [content.atelier.body, content.atelier.images[1].body],
      image: content.atelier.images[1].src,
      imageAlt: content.atelier.images[1].alt,
    },
    {
      eyebrow: content.symbol.eyebrow,
      title: content.symbol.title,
      titleAccent: content.symbol.titleAccent,
      body: content.symbol.body,
      image: content.symbol.image,
      imageAlt: content.symbol.imageAlt,
    },
  ];

  // Full-bleed palette-cleansers slotted between the narrative rows.
  const bleedAfterOrigin = {
    src: content.heritage.images[2].src,
    alt: content.heritage.images[2].alt,
  };
  const bleedBeforeAtelier = {
    src: content.atelier.images[0].src,
    alt: content.atelier.images[0].alt,
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-1 flex-col">
        {/* Editorial hero — image only, no overlay (founder direction
            June 2026: Quinta Nova History page reference). */}
        <StoryHeroEditorial locale={locale} />

        {/* Origin (image LEFT) */}
        <StorySection
          data={sections[0]}
          mirror={false}
          headingId="story-origin"
        />

        {/* Full-bleed: cork sheets curing in the open air */}
        <StoryBleed src={bleedAfterOrigin.src} alt={bleedAfterOrigin.alt} />

        {/* Heritage: Quercus suber (image RIGHT) */}
        <StorySection
          data={sections[1]}
          mirror={true}
          headingId="story-heritage-oak"
        />

        {/* Heritage: descortiçador hands (image LEFT) */}
        <StorySection
          data={sections[2]}
          mirror={false}
          headingId="story-heritage-hands"
        />

        {/* Full-bleed: atelier interior at golden hour */}
        <StoryBleed src={bleedBeforeAtelier.src} alt={bleedBeforeAtelier.alt} />

        {/* Atelier (image RIGHT) */}
        <StorySection
          data={sections[3]}
          mirror={true}
          headingId="story-atelier"
        />

        {/* Symbol — the Iberian lynx (image LEFT) */}
        <StorySection
          data={sections[4]}
          mirror={false}
          headingId="story-symbol"
        />

        {/* Founder — portrait + pull quote (image RIGHT) */}
        <FounderEditorial locale={locale} mirror={true} />

        {/* Cinematic video — kept from the previous design per founder
            direction "Vedio ka Section tu rakhna hai". */}
        <StoryVideo locale={locale} />
      </main>
    </>
  );
}