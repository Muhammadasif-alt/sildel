import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import {
  findAward,
  AWARD_SLUGS,
  type Award,
  type AwardPortfolioCard,
} from "@/content/awards";

export const revalidate = 3600;

export function generateStaticParams() {
  return AWARD_SLUGS.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const award = findAward(locale, slug);
  if (!award) {
    return buildMetadata({
      title: "Award not found",
      path: `/awards/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: award.detail.metaTitle,
    description: award.detail.metaDescription,
    path: `/awards/${award.slug}`,
    image: award.detail.heroImage,
    imageAlt: award.detail.heroImageAlt,
    keywords: award.detail.keywords,
    type: "article",
  });
}

export default async function AwardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const award = findAward(locale, slug);
  if (!award) notFound();
  const isPt = locale === "pt";

  const PAGE_PATH = `/awards/${award.slug}`;
  const HOME_LABEL = isPt ? "Início" : "Home";
  const AWARDS_LABEL = isPt ? "Distinções" : "Recognition";
  const BACK_LABEL = isPt ? "Ver todas as distinções" : "View all recognition";
  const EXPLORE_LABEL = isPt ? "Ver tesouros" : "Explore treasures";

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: HOME_LABEL, href: "/" },
    { label: AWARDS_LABEL, href: "/#awards" },
    { label: award.title, href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `${award.title} — ${siteConfig.name}`,
    description: award.detail.metaDescription,
    image: award.detail.heroImage,
    locale,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-1 flex-col bg-background text-foreground">
        <AwardHero award={award} backLabel={AWARDS_LABEL} />
        <AwardOverview award={award} />
        <AwardPortfolio award={award} />
        <AwardCta
          award={award}
          exploreLabel={EXPLORE_LABEL}
          backLabel={BACK_LABEL}
        />
      </main>
    </>
  );
}

/* ─────────────────────────────────────────── Hero ──────────────────── */

function AwardHero({ award, backLabel }: { award: Award; backLabel: string }) {
  const { detail } = award;
  return (
    <section className="relative isolate w-full overflow-hidden border-b border-border/40">
      <Image
        src={detail.heroImage}
        alt={detail.heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/30"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1480px] flex-col justify-end px-6 py-24 lg:px-12 lg:py-32">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-white/80">
          {detail.heroSubtitle}
        </p>
        <h1 className="mb-6 font-serif text-4xl font-light leading-[1.04] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-5xl lg:text-6xl xl:text-7xl">
          {award.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80">
          <span className="font-serif text-lg italic text-white/90 tabular-nums">
            {award.year}
          </span>
          <span aria-hidden className="text-white/40">·</span>
          <span className="text-[11px] uppercase tracking-[0.32em]">
            {award.issuer}
          </span>
          {detail.sourceLink && (
            <>
              <span aria-hidden className="text-white/40">·</span>
              <a
                href={detail.sourceLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:text-primary"
              >
                {detail.sourceLink.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </>
          )}
        </div>

        <div className="mt-10">
          <Link
            href="/#awards"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-white/70 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span>
            <span>{backLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── Overview ──────────────── */

function AwardOverview({ award }: { award: Award }) {
  const { overview } = award.detail;
  return (
    <section
      aria-labelledby={`overview-${award.slug}`}
      className="relative w-full bg-background"
    >
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border/60 bg-muted lg:order-1">
          <Image
            src={overview.image}
            alt={overview.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="max-w-xl lg:order-2">
          <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
            {overview.eyebrow}
          </p>
          <h2
            id={`overview-${award.slug}`}
            className="font-serif text-3xl font-light leading-[1.1] md:text-4xl lg:text-5xl"
          >
            {overview.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {overview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {overview.citation && (
            <blockquote className="mt-10 border-l-2 border-primary/60 pl-6 font-serif text-lg italic leading-relaxed text-foreground/85 md:text-xl">
              &ldquo;{overview.citation}&rdquo;
            </blockquote>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── Portfolio ─────────────── */
/* 2x3 grid of alternating image / text cards — Dehleez-style. */

function AwardPortfolio({ award }: { award: Award }) {
  const { portfolio } = award.detail;
  return (
    <section
      aria-labelledby={`portfolio-${award.slug}`}
      className="relative w-full bg-foreground text-background"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-14 max-w-2xl lg:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
            {portfolio.eyebrow}
          </p>
          <h2
            id={`portfolio-${award.slug}`}
            className="font-serif text-3xl font-light leading-[1.1] md:text-4xl lg:text-5xl"
          >
            {portfolio.title}{" "}
            <span className="italic text-primary">{portfolio.titleAccent}</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {portfolio.cards.map((card, i) => (
            <PortfolioCard key={i} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PortfolioCard({ card }: { card: AwardPortfolioCard }) {
  if (card.kind === "image") {
    return (
      <li className="group relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/5">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </li>
    );
  }
  return (
    <li className="flex aspect-[4/5] flex-col justify-center border border-white/10 bg-white/[0.04] p-8 lg:p-10">
      <h3 className="font-serif text-2xl font-light leading-[1.15] text-background md:text-3xl">
        {card.title}
      </h3>
      <p className="mt-5 text-base leading-relaxed text-background/75">
        {card.body}
      </p>
    </li>
  );
}

/* ─────────────────────────────────────────── CTA ───────────────────── */

function AwardCta({
  award,
  exploreLabel,
  backLabel,
}: {
  award: Award;
  exploreLabel: string;
  backLabel: string;
}) {
  const { cta } = award.detail;
  return (
    <section className="relative w-full border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-12 lg:py-24">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-primary">
          {cta.eyebrow}
        </p>
        <h2 className="mb-6 font-serif text-3xl font-light leading-[1.1] md:text-4xl lg:text-5xl">
          {cta.title}{" "}
          <span className="italic text-primary">{cta.titleAccent}</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {cta.body}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/treasures"
            className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.32em] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            {exploreLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
          <Link
            href="/#awards"
            className="text-[11px] uppercase tracking-[0.32em] text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}