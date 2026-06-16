import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Check, Mail, MapPin, Truck } from "lucide-react";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildProductJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import {
  products,
  getFindProduct,
  getProducts,
} from "@/content/treasures";
import { getProductExtras } from "@/content/product-extras";
import { getLocale } from "@/lib/i18n/get-locale";
import { getUi } from "@/lib/i18n/ui";
import { JsonLd } from "@/components/common/json-ld";
import { ProductHero } from "@/components/treasures/product-hero";
import { ProductGallery } from "@/components/treasures/product-gallery";
import { UseCases } from "@/components/treasures/use-cases";
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

  // Up to 2 "you may also like" picks — paired layout matches the /treasures
  // listing (one-wide / two-paired), keeps the bottom of the page tight.
  const related = localizedProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2);

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
    priceOnRequest: locale === "pt" ? "Preço sob consulta" : "Price on request",
    priceNote:
      locale === "pt"
        ? "Cada peça é única. Contacte-nos para disponibilidade e valor."
        : "Each piece is one of a kind. Contact us for availability and price.",
    enquire: locale === "pt" ? "Falar sobre esta peça" : "Enquire about this piece",
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
        <ProductHero
          category={product.category}
          name={product.name}
          tagline={product.tagline}
          image={product.image}
          priceOnRequest={i18n.priceOnRequest}
          enquireLabel={i18n.enquire}
          enquireHref={`/contact?piece=${encodeURIComponent(product.name)}`}
        />

        {/* ─────────── GALLERY + DETAILS ─────────── */}
        <section
          id="cart-section"
          aria-label={locale === "pt" ? "A peça" : "The piece"}
          className="relative w-full bg-background"
        >
          <div className="mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20 px-6 py-16 lg:px-12 lg:py-24 items-start">
            {/* Gallery — continuous vertical stack */}
            <div>
              <ProductGallery
                images={(product.gallery && product.gallery.length > 0)
                  ? product.gallery
                  : [product.image]}
                alt={`${product.name} — ${product.tagline}`}
                badge={product.badge}
              />
            </div>

            {/* Details panel — sticks in view while the image column scrolls.
                Name + tagline already live in the hero above, so this leads
                with the overview and the enquiry details. */}
            <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
                {i18n.overview}
              </p>

              {/* Price on request — luxury enquiry model (no public price) */}
              <div className="border-y border-border/60 py-7 mb-10">
                <p className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground mb-3">
                  {i18n.price}
                </p>
                <div className="font-serif text-3xl md:text-4xl font-light text-foreground leading-none">
                  {i18n.priceOnRequest}
                </div>
                <p className="mt-4 text-sm text-muted-foreground max-w-md">
                  {i18n.priceNote}
                </p>
                {product.material && (
                  <p className="mt-5 text-sm text-muted-foreground">
                    <span className="text-[10px] tracking-[0.32em] uppercase mr-3">
                      {i18n.material}
                    </span>
                    {product.material}
                  </p>
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

              {/* Single primary CTA — enquire (no cart; price on request) */}
              <div className="mb-12">
                <Link
                  href={`/contact?piece=${encodeURIComponent(product.name)}`}
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-foreground text-background px-9 py-4 text-xs tracking-[0.32em] uppercase font-medium transition-colors hover:bg-foreground/90"
                >
                  <Mail className="h-4 w-4" aria-hidden strokeWidth={1.5} />
                  {i18n.enquire}
                </Link>
              </div>

              {/* Trust strip — inline list, no boxed cards. Less chrome. */}
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-border/60">
                <li className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                  <Award className="h-4 w-4" aria-hidden strokeWidth={1.5} />
                  <span>{i18n.signedNumbered}</span>
                </li>
                <li className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden strokeWidth={1.5} />
                  <span>{i18n.madeInPortugal}</span>
                </li>
                <li className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                  <Truck className="h-4 w-4" aria-hidden strokeWidth={1.5} />
                  <span>{i18n.freeShipping}</span>
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

                {/* Single CTA — "Add to cart" is already the primary action
                    in the buy panel above, so this section just offers the
                    one distinct path: talk to us about the piece. */}
                <div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-sm text-xs tracking-[0.35em] uppercase font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {extras.story.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── Use cases — where it lives ─────────── */}
        <UseCases
          locale={locale}
          productName={product.name}
          slug={product.slug}
          category={product.category}
        />

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
            <div className="mx-auto max-w-[1480px] px-6 py-12 lg:px-12 lg:py-16">
              <div className="text-center mb-10 lg:mb-12">
                <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                  {i18n.youMayLike}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight">
                  {i18n.moreTreasures}
                </h2>
              </div>

              {/* Same editorial language as /treasures grid + home Featured
                  Treasures: no card wrapper, blurred backdrop + contained
                  product so the whole piece is visible, plain inline foot. */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 md:gap-x-10 lg:gap-x-12 lg:gap-y-20">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/treasures/${p.slug}`}
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                        <Image
                          src={p.image}
                          alt=""
                          aria-hidden
                          fill
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="scale-125 object-cover opacity-30 blur-2xl"
                        />
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="relative object-contain p-6 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] md:p-9"
                        />
                      </div>
                      <div className="mt-6 md:mt-7">
                        <p className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground mb-2">
                          {p.category}
                        </p>
                        <h3 className="font-serif text-2xl md:text-[1.7rem] lg:text-[1.85rem] font-light leading-tight text-foreground transition-colors group-hover:text-primary">
                          {p.name}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {p.tagline}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-12 lg:mt-14 flex justify-center">
                <Link
                  href="/treasures"
                  className="group inline-flex items-center gap-3 bg-foreground text-background border border-foreground rounded-full px-7 md:px-9 py-3 md:py-3.5 text-[11px] tracking-[0.32em] uppercase font-medium transition-all duration-300 ease-out hover:bg-transparent hover:text-foreground hover:-translate-y-0.5"
                >
                  {ui.common.viewAll}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}