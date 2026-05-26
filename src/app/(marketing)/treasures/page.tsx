import {
  buildMetadata,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { treasures, getTreasures, getProducts } from "@/content/treasures";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";

const PAGE_PATH = "/treasures";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-05-19T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Treasures — The Sildel Collection",
  description:
    "The Sildel collection — sculptural cork pieces, signed and numbered, hand-finished in Esmoriz, Portugal. Lamps, vessels, mirrors, pedestals, tables. Free worldwide shipping.",
  path: PAGE_PATH,
  image: treasures.hero.image,
  imageAlt: treasures.hero.imageAlt,
  keywords: [
    // Brand collection
    "Sildel treasures",
    "Sildel collection",
    "Sildel cork pieces",
    // Product types — EN
    "cork sculpture",
    "cork table",
    "cork lamp",
    "cork vessel",
    "cork mirror",
    "cork pedestal",
    "cork wall art",
    // Product types — PT
    "escultura em cortiça",
    "mesa de cortiça",
    "candeeiro cortiça",
    "vaso cortiça",
    "espelho cortiça",
    "pedestal cortiça",
    // Signature pieces
    "Carré d'Or",
    "Shell cork",
    "Abyss cork",
    "Granada cork mosaic",
    "Halley cork",
    "Crescent cork",
    // Buyer intent
    "buy cork art online",
    "Portuguese cork art for sale",
    "comprar peças cortiça",
    "loja online cortiça luxo",
    "limited edition cork art",
    "signed cork pieces",
    "edição limitada cortiça",
  ],
});

export default async function TreasuresPage() {
  const locale = await getLocale();
  const localizedTreasures = getTreasures(locale);
  const localizedProducts = getProducts(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Tesouros" : "Treasures", href: PAGE_PATH },
  ]);

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": new URL(PAGE_PATH, siteConfig.url).toString(),
    url: new URL(PAGE_PATH, siteConfig.url).toString(),
    name: `${localizedTreasures.products.title} — ${siteConfig.name}`,
    description: localizedTreasures.products.body,
    inLanguage: locale === "pt" ? "pt-PT" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: localizedProducts.length,
      itemListElement: localizedProducts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          category: p.category,
          image: new URL(p.image, siteConfig.url).toString(),
          url: new URL(`/treasures/${p.slug}`, siteConfig.url).toString(),
          brand: { "@type": "Brand", name: siteConfig.name },
          offers: {
            "@type": "Offer",
            price: (p.priceCents / 100).toFixed(2),
            priceCurrency: p.currency,
            availability: "https://schema.org/InStock",
            url: new URL(`/treasures/${p.slug}`, siteConfig.url).toString(),
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, collectionPageJsonLd]} />
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="treasures" />
      </main>
    </>
  );
}