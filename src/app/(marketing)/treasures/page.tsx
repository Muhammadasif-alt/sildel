import {
  buildMetadata,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { treasures, getTreasures, getProducts } from "@/content/treasures";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { TreasuresProvider } from "@/content/treasures-provider";
import { ProductGrid } from "@/components/treasures/product-grid";
import { TreasuresClosing } from "@/components/treasures/treasures-closing";
import { resolveTreasuresChrome } from "@/lib/editorial/resolvers/treasures";

/**
 * /treasures — editorial pass in the Quinta Nova rhythm (founder
 * direction, June 2026). Image-only hero, centered title block,
 * the existing ProductGrid catalogue (kept verbatim — the magazine
 * single+pair layout was the founder's pick), then a closing
 * parallax CTA that matches the other editorial pages.
 *
 * Bypasses the BlocksRenderer for the same reason as the other
 * pages — the CMS layout no longer matches the live design.
 */
const PAGE_PATH = "/treasures";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Treasures — The Sildel Collection",
  description:
    "The Sildel collection — sculptural cork pieces, signed and numbered, hand-finished in Esmoriz, Portugal. Lamps, vessels, mirrors, pedestals, tables. Free worldwide shipping.",
  path: PAGE_PATH,
  image: treasures.hero.image,
  imageAlt: treasures.hero.imageAlt,
  keywords: [
    "Sildel treasures",
    "Sildel collection",
    "Sildel cork pieces",
    "cork sculpture",
    "cork table",
    "cork lamp",
    "cork vessel",
    "cork mirror",
    "cork pedestal",
    "cork wall art",
    "escultura em cortiça",
    "mesa de cortiça",
    "candeeiro cortiça",
    "vaso cortiça",
    "espelho cortiça",
    "pedestal cortiça",
    "Carré d'Or",
    "Shell cork",
    "Abyss cork",
    "Granada cork mosaic",
    "Halley cork",
    "Crescent cork",
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
  // Catalogue content (categories, products) stays on getTreasures —
  // chrome (hero/title/closing CTA) goes through the editorial resolver
  // so the founder can edit it in /admin/editorial/treasures.
  const content = getTreasures(locale);
  const chrome = await resolveTreasuresChrome(locale);
  const products = getProducts(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Tesouros" : "Treasures", href: PAGE_PATH },
  ]);

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": new URL(PAGE_PATH, siteConfig.url).toString(),
    url: new URL(PAGE_PATH, siteConfig.url).toString(),
    name: `${content.products.title} — ${siteConfig.name}`,
    description: content.products.body,
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
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
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
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* Editorial hero — image only, no overlay (founder direction
            June 2026: Quinta Nova History page reference). */}
        <EditorialHero
          src={chrome.hero.image}
          alt={chrome.hero.imageAlt}
          eyebrow={chrome.hero.eyebrow}
        />

        {/* Title block — wider container so the hero type breathes;
            intro paragraph stays narrower for readability. */}
        <section className="border-b border-border/40">
          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
              {chrome.intro.eyebrow}
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.04] tracking-tight md:text-5xl lg:text-6xl">
              {chrome.intro.title}
              {chrome.intro.titleAccent ? (
                <>
                  {" "}
                  <span className="italic text-primary">
                    {chrome.intro.titleAccent}
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {chrome.intro.intro}
            </p>
          </div>
        </section>

        {/* The catalogue — kept verbatim. ProductGrid is a client
            component that pulls from the TreasuresProvider context. */}
        <TreasuresProvider content={content} products={products}>
          <ProductGrid />
        </TreasuresProvider>

        {/* Closing parallax CTA → /our-story. */}
        <TreasuresClosing cta={chrome.cta} />
      </main>
    </>
  );
}