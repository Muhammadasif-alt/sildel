import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Quote as QuoteIcon,
  User,
} from "lucide-react";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildBlogPostingJsonLd,
} from "@/lib/seo";
import { formatPostDate, type PostBlock } from "@/content/blog";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content/blog";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return buildMetadata({ title: "Letter not found", noIndex: true });
  }
  return buildMetadata({
    title: `${post.title} — Sildel Journal`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    keywords: [
      post.tag,
      `${post.tag} cork`,
      `${post.tag} cortiça`,
      // Author
      post.author,
      `Sildel ${post.author}`,
      // Journal context
      "Sildel journal",
      "Sildel blog",
      "jornal Sildel",
      "blog Sildel",
      // Subject matter
      "cork",
      "cortiça",
      "Portuguese cork",
      "cortiça portuguesa",
      "cork atelier",
      "atelier cortiça",
      // Location
      "Portugal",
      "Esmoriz",
      "Alentejo cork",
    ],
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const locale = await getLocale();
  const related = await getRelatedPosts(post.slug, 3);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Jornal" : "Journal", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ]);

  // Word count from post body — helps Google judge depth + ranks reading-time
  // estimates accurately. Iterate over body blocks and count text fields.
  const wordCount = post.body.reduce((sum, block) => {
    const text =
      block.kind === "heading" || block.kind === "paragraph" || block.kind === "quote"
        ? block.text
        : "";
    return sum + (text ? text.trim().split(/\s+/).length : 0);
  }, 0);

  const articleJsonLd = buildBlogPostingJsonLd({
    slug: post.slug,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    author: post.author,
    authorRole: post.authorRole,
    datePublished: post.date,
    dateModified: post.date,
    tag: post.tag,
    wordCount,
    readMinutes: post.readMinutes,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, articleJsonLd]} />
      <main className="flex flex-1 flex-col">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border/40 bg-muted/30"
        >
          <div className="mx-auto flex max-w-[1480px] items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:px-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {locale === "pt" ? "Todas as notas" : "All letters"}
            </Link>
            <span aria-hidden className="text-muted-foreground/40">/</span>
            <span className="truncate text-foreground">{post.title}</span>
          </div>
        </nav>

        {/* ─────────── HERO ─────────── */}
        <section
          aria-labelledby="post-hero-heading"
          className="relative w-full overflow-hidden isolate"
        >
          {/* Background image */}
          <Image
            src={post.image}
            alt={post.imageAlt}
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

          {/* Content — left-aligned, bottom-anchored */}
          <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-32 lg:px-12 lg:py-44 min-h-[80vh] flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-8">
              <span aria-hidden className="h-px w-10 bg-primary" />
              <p className="text-xs tracking-[0.45em] uppercase text-primary font-medium">
                {post.tag}
              </p>
            </div>

            <h1
              id="post-hero-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] text-white max-w-4xl mb-6"
            >
              {post.title}
            </h1>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
              {post.excerpt}
            </p>

            <div aria-hidden className="h-px w-16 bg-primary/80 mb-8" />

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-white/80">
              <span className="inline-flex items-center gap-2 text-white">
                <User className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span className="font-medium">{post.author}</span>
                <span className="text-white/60">· {post.authorRole}</span>
              </span>
              <span aria-hidden className="hidden sm:inline-block h-3 w-px bg-white/30" />
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden />
                {formatPostDate(post.date, locale)}
              </span>
              <span aria-hidden className="hidden sm:inline-block h-3 w-px bg-white/30" />
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
                {post.readMinutes} {locale === "pt" ? "min" : "min read"}
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            aria-hidden
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <span className="h-8 w-px bg-white/40" />
          </div>
        </section>

        {/* ─────────── ARTICLE BODY ─────────── */}
        <article className="relative w-full bg-background">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
            {post.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}

            {/* Signature footer */}
            <div className="mt-16 border-t border-border pt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {locale === "pt" ? "Escrito por" : "Written by"}
              </p>
              <p className="mt-2 font-serif text-2xl text-foreground">{post.author}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.authorRole}</p>
            </div>
          </div>
        </article>

        {/* ─────────── RELATED POSTS ─────────── */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-posts-heading"
            className="relative w-full bg-muted/30 border-t border-border/60 py-20 lg:py-28"
          >
            <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
              <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
                    {locale === "pt" ? "Continuar a ler" : "Keep reading"}
                  </p>
                  <h2
                    id="related-posts-heading"
                    className="font-serif text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
                  >
                    {locale === "pt" ? "Mais notas" : "More letters"}
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:text-primary"
                >
                  {locale === "pt" ? "Todas as notas" : "All letters"}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>

              <ul className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-8">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-muted ring-1 ring-border/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-foreground/10 group-hover:ring-primary/40">
                        <Image
                          src={r.image}
                          alt={r.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground backdrop-blur-sm">
                          {r.tag}
                        </span>
                      </div>
                      <div className="mt-5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                          {formatPostDate(r.date, locale)} · {r.readMinutes}{" "}
                          {locale === "pt" ? "min" : "min read"}
                        </p>
                        <h3 className="mt-2 font-serif text-xl font-light leading-tight transition-colors group-hover:text-primary md:text-2xl">
                          {r.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {r.excerpt}
                        </p>
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

function BlockView({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h2 className="mt-12 mb-5 font-serif text-2xl font-light leading-tight text-foreground md:text-3xl">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mb-6 text-base leading-[1.75] text-foreground/85 md:text-lg">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <figure className="my-10 border-l-2 border-primary bg-card px-6 py-6 lg:px-8 lg:py-7">
          <QuoteIcon
            className="mb-3 h-6 w-6 text-primary/40"
            strokeWidth={1.4}
            aria-hidden
          />
          <blockquote className="font-serif text-xl font-light italic leading-snug text-foreground md:text-2xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.author && (
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {block.author}
            </figcaption>
          )}
        </figure>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-muted">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}