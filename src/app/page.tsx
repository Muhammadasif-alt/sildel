import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { buildMetadata, buildVideoJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getHome } from "@/content/home";
import { PartnersStrip } from "@/components/partners/partners-strip";
import { Awards } from "@/components/home/awards";
import { BrandStoryProdigy } from "@/components/home/brand-story-prodigy";
import { ProductFeature } from "@/components/home/product-feature";
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
        {/* Hero is rendered manually so we can slip the editorial
            ProductFeature reel directly under it; the CMS pass below
            paints the remaining sustainability / newsletter blocks
            with the hero filtered out so it isn't rendered twice. */}
        <HeroSlider slides={content.heroSlider} />
        {/* Four-product editorial reel — alternating layouts (image
            left/right/left/right) so the eye crosses the page in a
            Z while the visitor scrolls through the catalogue's
            strongest pieces. Founder direction June 2026 (twenty-first
            pass): replaces the earlier atelier intro + single spotlight
            with a four-up product reel. */}
        {content.productFeatures.map((feature, i) => (
          <ProductFeature
            key={feature.title}
            data={feature}
            mirror={i % 2 === 1}
            headingId={`product-feature-${i}`}
          />
        ))}
        {/* Founder story + social proof — the only editorial below the
            product reel. Isabel's 30-years framing anchors the brand;
            awards + partners do the proof. Everything else (Alentejo
            origins, Why Authentic Cork facts, Materials & Colours, Why
            Choose Sildel, CMS sustainability) was cut per founder
            direction (June 2026, twenty-second pass — "neacha wala
            mostly remove kr do") to stop the page running long. */}
        <BrandStoryProdigy locale={locale} />
        <Awards locale={locale} />
        <PartnersStrip locale={locale} />
        {/* CMS blocks — only the newsletter signup remains; everything
            else from the CMS pass is skipped. */}
        <BlocksRenderer
          pageKey="home"
          skipTypes={[
            "home.heroShop",
            "home.shopCategories",
            "home.featuredTreasures",
            "home.brandVideo",
            "home.sustainability",
            "home.whySildel",
          ]}
        />
      </main>
    </>
  );
}