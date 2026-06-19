import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { buildMetadata, buildVideoJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getHome } from "@/content/home";
import { PartnersStrip } from "@/components/partners/partners-strip";
import { Awards } from "@/components/home/awards";
import { WhyChooseSildel } from "@/components/home/why-choose-sildel";
import { MaterialsColors } from "@/components/home/materials-colors";
import { BrandStoryProdigy } from "@/components/home/brand-story-prodigy";
import { AlentejoOrigins } from "@/components/home/alentejo-origins";
import { WhyAuthenticCork } from "@/components/home/why-authentic-cork";
import { AtelierIntro } from "@/components/home/atelier-intro";
import { ProductSpotlight } from "@/components/home/product-spotlight";
import { HeroSlider } from "@/components/home/hero-slider";

// ISR — serve a cached HTML for one hour. Admin "save" actions call
// revalidatePath() so editorial changes still land immediately.
export const revalidate = 3600;

export const metadata = buildMetadata({
  // Home: no title prefix — buildMetadata adds the brand+tagline default.
  description:
    "Sildel — sculptural pieces shaped from sustainably harvested Portuguese cork. Fine arts, signed and numbered, made in Esmoriz, Portugal. Free worldwide shipping.",
  path: "/",
  keywords: [
    // Buyer intent — EN
    "buy Portuguese cork art",
    "luxury cork sculpture online",
    "cork home decor shop",
    "cork art for sale",
    "Sildel collection",
    // Buyer intent — PT
    "comprar arte cortiça",
    "loja cortiça luxo",
    "escultura cortiça online",
    "decoração cortiça Portugal",
    // Hero terms
    "We Think Cork",
    "Pensamos cortiça",
    "Portuguese cork atelier",
    "atelier cortiça Portugal",
  ],
});

const BRAND_VIDEO_YT_ID = "U6N8YkiLSHY";

const videoJsonLd = buildVideoJsonLd({
  name: `${siteConfig.name} — From Cork Forest to Atelier`,
  description:
    "Step inside the cork forests of Portugal and the Sildel atelier where each treasure is finished by hand — made slowly, signed and numbered.",
  thumbnailUrl: `https://i.ytimg.com/vi/${BRAND_VIDEO_YT_ID}/maxresdefault.jpg`,
  uploadDate: siteConfig.foundingDate,
  youtubeId: BRAND_VIDEO_YT_ID,
});

export default async function HomePage() {
  const locale = await getLocale();
  const content = getHome(locale);
  return (
    <>
      <JsonLd data={[videoJsonLd]} />
      <main className="flex flex-1 flex-col">
        {/* Hero is rendered manually now so we can slip the Quinta Nova-
            style AtelierIntro section directly under it (founder
            direction, June 2026, fourteenth pass). The CMS pass then
            paints the remaining shop / featured / video / sustainability
            blocks with the hero filtered out so it isn't rendered twice. */}
        <HeroSlider slides={content.heroSlider} />
        <AtelierIntro locale={locale} />
        {/* Mirror twin of AtelierIntro — flipped layout, product image
            on the right. Founder direction June 2026 (nineteenth pass). */}
        <ProductSpotlight locale={locale} />
        <BlocksRenderer pageKey="home" skipTypes={["home.heroShop"]} />
        {/* Editorial sections added June 2026 — who made this (prodigy
            story), where it begins (Alentejo origins), what makes the
            material rare (3 facts). They sit between the CMS shopping
            flow and the closing static sections so visitors travel
            atelier intro → category → maker → land → material → colours
            → why → awards → partners. */}
        <BrandStoryProdigy locale={locale} />
        <AlentejoOrigins locale={locale} />
        <WhyAuthenticCork locale={locale} />
        <MaterialsColors locale={locale} />
        <WhyChooseSildel locale={locale} />
        <Awards locale={locale} />
        <PartnersStrip locale={locale} />
      </main>
    </>
  );
}