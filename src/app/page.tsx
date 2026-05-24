import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { buildMetadata, buildVideoJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site-config";

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
    "Step inside the cork forests of Portugal and the Sildel atelier where each treasure is finished by hand — slow craft, signed and numbered.",
  thumbnailUrl: `https://i.ytimg.com/vi/${BRAND_VIDEO_YT_ID}/maxresdefault.jpg`,
  uploadDate: siteConfig.foundingDate,
  youtubeId: BRAND_VIDEO_YT_ID,
});

export default async function HomePage() {
  return (
    <>
      <JsonLd data={[videoJsonLd]} />
      <main className="flex flex-1 flex-col">
        <BlocksRenderer pageKey="home" />
      </main>
    </>
  );
}