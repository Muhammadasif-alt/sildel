import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { Newsletter } from "@/components/home/newsletter";
import { getAllPosts } from "@/lib/content/blog";
import { formatPostDate, type Post } from "@/content/blog";
import type { Locale } from "@/lib/i18n/config";

/**
 * /blog — Journal index in the same Quinta-Nova editorial rhythm as
 * /press and /our-story. Image-only hero, centered title block,
 * featured post split (image-left, copy-right), all-posts grid, and
 * a Newsletter band to close. Independent of the CMS-block system so
 * the page renders even without MongoDB (cPanel deploy uses MySQL).
 */
const PAGE_PATH = "/blog";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-22T00:00:00Z";
const HERO_IMAGE = "/products/SHALE-COLLECTION_red_05_Ambiente-1a60456151.webp";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Journal — Notes from the Sildel Atelier in Portugal",
  description:
    "Notes from the Sildel atelier in Esmoriz, the cork forests of the Alentejo, and the slow atelier work behind every treasure. Essays on Portuguese cork, design, and sustainability.",
  path: PAGE_PATH,
  image: HERO_IMAGE,
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    "Sildel journal",
    "Sildel blog",
    "cork blog",
    "blog cortiça",
    "cork stories",
    "histórias cortiça",
    "Portuguese design notes",
    "notas design Portugal",
    "atelier stories",
    "histórias atelier",
    "luxury cork editorial",
    "design editorial cortiça",
    "Sildel Esmoriz",
  ],
});

const COPY = {
  en: {
    heroEyebrow: "The Sildel journal",
    heroAlt: "An ancient Portuguese cork oak with bark recently harvested.",
    introEyebrow: "Field notes",
    introTitle: "From the forest, from the bench,",
    introTitleAccent: "from the hand.",
    introBody:
      "A slow journal from a slow practice. Essays on the cork oaks of the Alentejo, the rhythm of the atelier in Esmoriz, and the collectors who give each piece a second life.",
    featuredEyebrow: "The latest",
    featuredLabel: "Featured",
    readLabel: "Read the piece",
    allEyebrow: "All entries",
    allTitle: "Every essay, in one place.",
    subscribeLabel: "Subscribe to the Atelier letter",
    minRead: "min read",
  },
  pt: {
    heroEyebrow: "O diário Sildel",
    heroAlt:
      "Um sobreiro português antigo com a casca recentemente extraída.",
    introEyebrow: "Notas de campo",
    introTitle: "Do bosque, do banco de atelier,",
    introTitleAccent: "da mão.",
    introBody:
      "Um diário lento, vindo de uma prática lenta. Ensaios sobre os sobreirais do Alentejo, o ritmo do atelier em Esmoriz e os colecionadores que dão a cada peça uma segunda vida.",
    featuredEyebrow: "Em destaque",
    featuredLabel: "Destaque",
    readLabel: "Ler o ensaio",
    allEyebrow: "Todas as entradas",
    allTitle: "Todos os ensaios, num só sítio.",
    subscribeLabel: "Subscrever a Carta do Atelier",
    minRead: "min",
  },
} as const;

export default async function BlogPage() {
  const locale = await getLocale();
  const isPt = locale === "pt";
  const t = COPY[isPt ? "pt" : "en"];

  const posts = await getAllPosts();
  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Diário" : "Journal", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Journal — ${siteConfig.name}`,
    description:
      "Essays from the Sildel atelier — Portuguese cork, slow craft, and the forests behind every piece.",
    image: HERO_IMAGE,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-1 flex-col bg-background text-foreground">
        <EditorialHero
          src={HERO_IMAGE}
          alt={t.heroAlt}
          eyebrow={t.heroEyebrow}
        />

        {/* Title block — same shape as /press, /faq. */}
        <section className="border-b border-border/40">
          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
            <p className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-primary">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              {t.introEyebrow}
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.04] tracking-tight md:text-5xl lg:text-6xl">
              {t.introTitle}{" "}
              <span className="italic text-primary">{t.introTitleAccent}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.introBody}
            </p>
          </div>
        </section>

        {featured ? (
          <FeaturedPost
            post={featured}
            locale={locale}
            eyebrow={t.featuredEyebrow}
            featuredLabel={t.featuredLabel}
            readLabel={t.readLabel}
            minRead={t.minRead}
          />
        ) : null}

        {rest.length > 0 ? (
          <section
            aria-labelledby="blog-all-heading"
            className="relative w-full bg-background py-20 lg:py-28"
          >
            <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
              <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-primary">
                    {t.allEyebrow}
                  </p>
                  <h2
                    id="blog-all-heading"
                    className="font-serif text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
                  >
                    {t.allTitle}
                  </h2>
                </div>
                <Link
                  href="#newsletter"
                  className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foreground transition-colors hover:text-primary"
                >
                  {t.subscribeLabel}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>

              <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} locale={locale} minRead={t.minRead} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <div id="newsletter">
          <Newsletter />
        </div>
      </main>
    </>
  );
}

function FeaturedPost({
  post,
  locale,
  eyebrow,
  featuredLabel,
  readLabel,
  minRead,
}: {
  post: Post;
  locale: Locale;
  eyebrow: string;
  featuredLabel: string;
  readLabel: string;
  minRead: string;
}) {
  return (
    <section
      aria-labelledby="blog-featured-heading"
      className="relative w-full border-b border-border/60 bg-muted/30 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <Link
          href={`/blog/${post.slug}`}
          className="group grid grid-cols-1 items-center gap-8 overflow-hidden border border-border bg-card shadow-xl shadow-foreground/5 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/10 lg:grid-cols-2 lg:gap-0"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
            />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 bg-card/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur-sm">
              {featuredLabel} · {post.tag}
            </span>
          </div>
          <div className="p-8 lg:p-14">
            <p className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-primary">
              <span className="h-px w-8 bg-primary/60" aria-hidden />
              {eyebrow}
            </p>
            <h2
              id="blog-featured-heading"
              className="font-serif text-3xl font-light leading-[1.1] text-foreground transition-colors group-hover:text-primary md:text-4xl lg:text-5xl"
            >
              {post.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.excerpt}
            </p>
            <PostMeta post={post} locale={locale} minRead={minRead} />
            <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-primary">
              {readLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function PostCard({
  post,
  locale,
  minRead,
}: {
  post: Post;
  locale: Locale;
  minRead: string;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted ring-1 ring-border/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-foreground/10 group-hover:ring-primary/40">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-card/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground backdrop-blur-sm">
          {post.tag}
        </span>
      </div>
      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {formatPostDate(post.date, locale)} · {post.readMinutes} {minRead}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-light leading-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

function PostMeta({
  post,
  locale,
  minRead,
}: {
  post: Post;
  locale: Locale;
  minRead: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      <span className="inline-flex items-center gap-2 text-foreground">
        <span className="font-medium">{post.author}</span>
      </span>
      <span className="h-px w-4 bg-border" aria-hidden />
      <span className="inline-flex items-center gap-2">
        <Calendar className="h-3 w-3 text-primary" aria-hidden />
        {formatPostDate(post.date, locale)}
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock className="h-3 w-3 text-primary" aria-hidden />
        {post.readMinutes} {minRead}
      </span>
    </div>
  );
}