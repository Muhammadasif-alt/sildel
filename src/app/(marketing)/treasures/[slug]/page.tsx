import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Check, Mail, MapPin, ShoppingBag, Truck } from "lucide-react";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildProductJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import {
  formatPrice,
  products,
  getFindProduct,
  getProducts,
} from "@/content/treasures";
import { getProductExtras } from "@/content/product-extras";
import { getLocale } from "@/lib/i18n/get-locale";
import { getUi } from "@/lib/i18n/ui";
import { JsonLd } from "@/components/common/json-ld";
import { AddToCartButton } from "@/components/treasures/add-to-cart-button";
import { ProductGallery } from "@/components/treasures/product-gallery";
import { ProductFaqs } from "@/components/treasures/product-faqs";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const product = getFindProduct(locale)(slug);
  if (!product) {
    return buildMetadata({
      title: "Treasure not found",
      noIndex: true,
    });
  }
  // Localised title suffix — gives the title a buying-intent shape.
  const titleSuffix =
    locale === "pt"
      ? `${product.category} em cortiça | Sildel Portugal`
      : `${product.category} in cork | Sildel Portugal`;

  // Localised description — opens with name+tagline, ends with shipping CTA
  // so it surfaces well in SERP snippets.
  const desc =
    locale === "pt"
      ? `${product.name} — ${product.tagline}. ${product.description} Peça assinada e numerada, feita à mão em Esmoriz, Portugal. Envio gratuito mundial.`
      : `${product.name} — ${product.tagline}. ${product.description} Signed & numbered, handmade in Esmoriz, Portugal. Free worldwide shipping.`;

  return buildMetadata({
    title: `${product.name} — ${titleSuffix}`,
    description: desc,
    path: `/treasures/${product.slug}`,
    image: product.image,
    imageAlt: `${product.name} — ${product.tagline}`,
    keywords: [
      // Name variants (EN + PT — name is the same word in both)
      product.name,
      `Sildel ${product.name}`,
      `${product.name} cork`,
      `${product.name} cortiça`,
      // Category (EN + PT)
      product.category,
      `${product.category} cork`,
      `${product.category} cortiça`,
      `cork ${product.category}`,
      `cortiça ${product.category}`,
      // Material
      ...(product.material ? [product.material, `${product.material} cortiça`] : []),
      // Buyer intent (EN + PT)
      `buy ${product.name}`,
      `comprar ${product.name}`,
      `${product.name} for sale`,
      `${product.name} price`,
      `${product.name} preço`,
      // Made in
      `${product.name} made in Portugal`,
      `${product.name} feito em Portugal`,
      // Signed & numbered
      `${product.name} signed numbered`,
      `${product.name} assinado numerado`,
      "limited edition cork piece",
      "peça cortiça edição limitada",
    ],
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const locale = await getLocale();
  const ui = getUi(locale);
  const localizedProducts = getProducts(locale);
  const product = localizedProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const extras = getProductExtras(slug, locale);

  // Up to 3 "you may also like" picks, excluding self
  const related = localizedProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: ui.nav.treasures, href: "/treasures" },
    { label: product.name, href: `/treasures/${product.slug}` },
  ]);

  const productJsonLd = buildProductJsonLd({
    slug: product.slug,
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    material: product.material,
    priceCents: product.priceCents,
    currency: product.currency,
  });

  const faqJsonLd = buildFaqJsonLd(extras.faqs);

  const i18n = {
    allTreasures: locale === "pt" ? "Todos os Tesouros" : "All Treasures",
    overview: locale === "pt" ? "Visão geral" : "Overview",
    price: locale === "pt" ? "Preço" : "Price",
    material: locale === "pt" ? "Material" : "Material",
    benefitsEyebrow: locale === "pt" ? "Porquê esta peça" : "Why this piece",
    benefitsTitle: locale === "pt" ? "Feita para" : "Made to",
    benefitsAccent: locale === "pt" ? "durar gerações." : "outlast trends.",
    faqEyebrow: locale === "pt" ? "Perguntas" : "Questions",
    faqTitle: locale === "pt" ? "Tudo o que precisa" : "Everything you might",
    faqAccent: locale === "pt" ? "de saber." : "want to know.",
    youMayLike: locale === "pt" ? "Também pode gostar" : "You may also like",
    moreTreasures: locale === "pt" ? "Mais tesouros" : "More treasures",
    signedNumbered: locale === "pt" ? "Assinado e numerado" : "Signed & numbered",
    madeInPortugal: locale === "pt" ? "Feito em Portugal" : "Made in Portugal",
    freeShipping: locale === "pt" ? "Envio gratuito mundial" : "Free worldwide shipping",
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, productJsonLd, faqJsonLd]} />
      <main className="flex flex-col flex-1">
        {/* Breadcrumb bar */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border/40 bg-muted/30"
        >
          <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-4 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <Link href="/treasures" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              {i18n.allTreasures}
            </Link>
            <span aria-hidden className="text-muted-foreground/40">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </nav>

        {/* ─────────── HERO ─────────── */}
        <section
          aria-labelledby="product-hero-heading"
          className="relative w-full overflow-hidden isolate"
        >
          {/* Background image */}
          <Image
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            fill
            priority
            sizes="100vw"
            className="object-cover -z-10"
          />

          {/* Gradient overlays for legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent"
          />

          {/* Content — left-aligned, bottom-anchored like Treasures hero */}
          <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-32 lg:px-12 lg:py-44 min-h-[80vh] flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-8">
              <span aria-hidden className="h-px w-10 bg-primary" />
              <p className="text-xs tracking-[0.45em] uppercase text-primary font-medium">
                {product.category}
              </p>
            </div>

            <h1
              id="product-hero-heading"
              className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.02] text-white max-w-4xl mb-4"
            >
              {product.name}
            </h1>

            <p className="font-serif italic text-primary text-2xl md:text-3xl lg:text-4xl font-light leading-snug max-w-3xl mb-10">
              {product.tagline}
            </p>

            <div aria-hidden className="h-px w-16 bg-primary/80 mb-8" />

            {/* Description preview */}
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              {product.description}
            </p>

            {/* Price + signed line */}
            <div className="flex flex-wrap items-end gap-5 sm:gap-8 mb-10">
              <span className="font-serif text-4xl md:text-5xl font-light text-white">
                {formatPrice(product.priceCents, product.currency)}
              </span>
              <span aria-hidden className="hidden sm:inline-block h-8 w-px bg-white/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/70">
                {i18n.signedNumbered}
              </span>
            </div>

            {/* Badge + CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#cart-section"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-sm text-xs tracking-[0.35em] uppercase font-medium hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                {locale === "pt" ? "Adquirir esta peça" : "Acquire this piece"}
              </Link>
              <Link
                href="#story-section"
                className="text-xs tracking-[0.3em] uppercase text-white hover:text-primary transition-colors border-b border-white/40 hover:border-primary pb-1"
              >
                {locale === "pt" ? "Saber mais" : "Learn more"}
              </Link>
              {product.badge && (
                <span className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm ring-1 ring-white/30 rounded-sm px-5 py-3">
                  <span aria-hidden className="inline-block size-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-primary">
                    {product.badge}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Scroll indicator (matches Treasures hero) */}
          <div
            aria-hidden
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <span className="h-8 w-px bg-white/40" />
          </div>
        </section>

        {/* ─────────── CART / ADD-TO-CART ─────────── */}
        <section
          id="cart-section"
          aria-label={locale === "pt" ? "Adicionar ao carrinho" : "Add to cart"}
          className="relative w-full bg-background"
        >
          <div className="mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20 px-6 py-16 lg:px-12 lg:py-24 items-start">
            {/* Gallery */}
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                images={(product.gallery && product.gallery.length > 0)
                  ? product.gallery
                  : [product.image]}
                alt={`${product.name} — ${product.tagline}`}
                badge={product.badge}
              />
            </div>

            {/* Buy panel */}
            <div className="flex flex-col">
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
                {i18n.overview}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] mb-5">
                {product.name}
              </h2>

              {/* Price + material */}
              <div className="flex flex-wrap items-end justify-between gap-4 border-y border-border/60 py-6 mb-10">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                    {i18n.price}
                  </p>
                  <div className="font-serif text-4xl md:text-5xl font-light text-foreground leading-none">
                    {formatPrice(product.priceCents, product.currency)}
                  </div>
                </div>
                {product.material && (
                  <div className="text-right">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                      {i18n.material}
                    </p>
                    <p className="font-serif text-base md:text-lg text-foreground/85 max-w-xs">
                      {product.material}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-foreground/85 text-base md:text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {product.longDescription && (
                <div className="space-y-4 text-muted-foreground text-base leading-relaxed mb-10">
                  {product.longDescription.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {/* Add to cart */}
              <div className="mb-10">
                <AddToCartButton
                  slug={product.slug}
                  name={product.name}
                  priceCents={product.priceCents}
                  image={product.image}
                  labels={{
                    addToCart: ui.common.addToCart,
                    added: ui.common.added,
                  }}
                />
              </div>

              {/* Trust strip */}
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <li className="group flex flex-col items-start gap-2 rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary/60">
                  <Award className="h-5 w-5 text-primary" aria-hidden />
                  <span className="text-[11px] tracking-[0.2em] uppercase text-foreground leading-snug">
                    {i18n.signedNumbered}
                  </span>
                </li>
                <li className="group flex flex-col items-start gap-2 rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary/60">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden />
                  <span className="text-[11px] tracking-[0.2em] uppercase text-foreground leading-snug">
                    {i18n.madeInPortugal}
                  </span>
                </li>
                <li className="group flex flex-col items-start gap-2 rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary/60">
                  <Truck className="h-5 w-5 text-primary" aria-hidden />
                  <span className="text-[11px] tracking-[0.2em] uppercase text-foreground leading-snug">
                    {i18n.freeShipping}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─────────── BENEFITS ─────────── */}
        <section
          aria-labelledby="benefits-heading"
          className="relative w-full bg-muted/30 border-y border-border/60"
        >
          <div className="mx-auto max-w-[1480px] px-6 py-20 lg:px-12 lg:py-28">
            <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {i18n.benefitsEyebrow}
              </p>
              <h2
                id="benefits-heading"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]"
              >
                {i18n.benefitsTitle}{" "}
                <span className="italic text-primary">{i18n.benefitsAccent}</span>
              </h2>
              <div className="mx-auto h-px w-16 bg-primary/60 my-8" aria-hidden />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {extras.benefits.map((b, i) => (
                <li
                  key={i}
                  className="group flex flex-col gap-4 rounded-sm border border-border bg-card p-7 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/5"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <Check className="h-5 w-5" />
                  </span>
                  <p className="font-serif text-lg lg:text-xl text-foreground leading-snug">
                    {b}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────── ABOUT THIS PIECE ─────────── */}
        <section
          id="story-section"
          aria-labelledby="story-heading"
          className="relative w-full bg-background border-t border-border/60"
        >
          <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Square editorial image */}
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 rounded-sm border border-primary/20"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 -left-3 h-6 w-6 border-l-2 border-t-2 border-primary"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-primary"
                />
                <div className="relative aspect-square w-full overflow-hidden rounded-sm ring-1 ring-border bg-muted shadow-2xl shadow-foreground/15">
                  <Image
                    src={
                      (product.gallery && product.gallery.length > 1)
                        ? product.gallery[1]
                        : product.image
                    }
                    alt={`${product.name} — ${product.tagline}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text content */}
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
                  {extras.story.eyebrow}
                </p>
                <h2
                  id="story-heading"
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] mb-8"
                >
                  {extras.story.title}
                </h2>

                <div className="space-y-5 text-muted-foreground text-base lg:text-lg leading-relaxed mb-10">
                  {extras.story.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 pb-10 border-b border-border">
                  {extras.story.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block size-1.5 rounded-full bg-primary shrink-0"
                      />
                      <span className="text-foreground/85 leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Contact CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-sm text-xs tracking-[0.35em] uppercase font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {extras.story.ctaLabel}
                  </Link>
                  <Link
                    href="#cart-section"
                    className="text-xs tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors border-b border-primary/40 hover:border-primary pb-1"
                  >
                    {locale === "pt" ? "Adquirir agora" : "Or acquire now"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── FAQs ─────────── */}
        <section
          aria-labelledby="faq-heading"
          className="relative w-full bg-background"
        >
          <div className="mx-auto max-w-4xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="text-center mb-12 lg:mb-14">
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {i18n.faqEyebrow}
              </p>
              <h2
                id="faq-heading"
                className="font-serif text-4xl md:text-5xl font-light leading-[1.05]"
              >
                {i18n.faqTitle}{" "}
                <span className="italic text-primary">{i18n.faqAccent}</span>
              </h2>
              <div className="mx-auto h-px w-16 bg-primary/60 my-8" aria-hidden />
            </div>

            <ProductFaqs faqs={extras.faqs} />
          </div>
        </section>

        {/* ─────────── You may also like ─────────── */}
        {related.length > 0 && (
          <section className="relative w-full bg-muted/30 border-t border-border/60">
            <div className="mx-auto max-w-[1480px] px-6 py-20 lg:px-12 lg:py-24">
              <div className="flex items-end justify-between gap-6 mb-10 lg:mb-12">
                <div>
                  <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">
                    {i18n.youMayLike}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight">
                    {i18n.moreTreasures}
                  </h2>
                </div>
                <Link
                  href="/treasures"
                  className="hidden sm:inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors"
                >
                  {ui.common.viewAll}
                </Link>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/treasures/${p.slug}`}
                      className="group block overflow-hidden rounded-sm border border-border bg-card transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/5"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                          {p.category}
                        </p>
                        <div className="flex items-end justify-between gap-2">
                          <h3 className="font-serif text-xl lg:text-2xl font-light leading-tight">
                            {p.name}
                          </h3>
                          <span className="font-serif text-base text-primary">
                            {formatPrice(p.priceCents, p.currency)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
    </>
  );
}