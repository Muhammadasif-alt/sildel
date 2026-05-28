/**
 * Blog (Journal) preset block renderers. Sections are split as:
 *   blog.hero     — page header copy
 *   blog.featured — featured post card (looks up the first post from DB/fallback)
 *   blog.grid     — all-posts grid + subscribe link
 *
 * Post data is dynamic — the admin only controls section copy.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str } from "./block-utils";
import { getAllPosts } from "@/lib/content/blog";
import { formatPostDate, type Post } from "@/content/blog";

export function BlogHeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const title = loc(block, "title", locale);
  const titleAccent = loc(block, "titleAccent", locale);
  const intro = loc(block, "intro", locale);

  return (
    <section
      aria-labelledby="journal-hero"
      className="relative w-full overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              {eyebrow}
            </p>
            <h1
              id="journal-hero"
              className="font-serif text-4xl font-light leading-[1.02] text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {title}{" "}
              <span className="italic text-primary">{titleAccent}</span>
            </h1>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}

export async function BlogFeaturedBlock({
  block,
  locale,
}: {
  block: Block;
  locale: Locale;
}) {
  const posts = await getAllPosts();
  const featured = posts[0];
  if (!featured) return null;

  const eyebrow = loc(block, "eyebrow", locale);
  const featuredLabel = loc(block, "featuredLabel", locale);
  const readLabel = loc(block, "readLabel", locale);

  return (
    <section
      aria-labelledby="featured-post-heading"
      className="relative w-full bg-muted/30 border-y border-border/60 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-none border border-border bg-card shadow-xl shadow-foreground/5 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/10 lg:grid-cols-2 lg:gap-0"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
            />
            <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-card/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur-sm">
              {featuredLabel} · {featured.tag}
            </span>
          </div>
          <div className="p-8 lg:p-14">
            <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
              <span className="h-px w-8 bg-primary/60" aria-hidden />
              {eyebrow}
            </p>
            <h2
              id="featured-post-heading"
              className="font-serif text-3xl font-light leading-[1.1] text-foreground transition-colors group-hover:text-primary md:text-4xl lg:text-5xl"
            >
              {featured.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {featured.excerpt}
            </p>
            <PostMeta post={featured} locale={locale} />
            <span className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
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

export async function BlogGridBlock({
  block,
  locale,
}: {
  block: Block;
  locale: Locale;
}) {
  const posts = await getAllPosts();
  const rest = posts.slice(1);
  if (rest.length === 0) return null;

  const eyebrow = loc(block, "eyebrow", locale);
  const title = loc(block, "title", locale);
  const subscribeLabel = loc(block, "subscribeLabel", locale);
  const subscribeHref = str(block, "subscribeHref", "/#newsletter");

  return (
    <section
      aria-labelledby="all-posts-heading"
      className="relative w-full bg-background py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
              {eyebrow}
            </p>
            <h2
              id="all-posts-heading"
              className="font-serif text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
          </div>
          <Link
            href={subscribeHref}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:text-primary"
          >
            {subscribeLabel}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rest.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-muted ring-1 ring-border/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-foreground/10 group-hover:ring-primary/40">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground backdrop-blur-sm">
          {post.tag}
        </span>
      </div>
      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {formatPostDate(post.date, locale)} · {post.readMinutes}{" "}
          {locale === "pt" ? "min" : "min read"}
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

function PostMeta({ post, locale }: { post: Post; locale: Locale }) {
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
        {post.readMinutes} {locale === "pt" ? "min" : "min read"}
      </span>
    </div>
  );
}
