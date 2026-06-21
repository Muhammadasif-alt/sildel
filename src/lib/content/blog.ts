/**
 * Blog reader — MySQL (Prisma) first, static `/content/blog.ts` fallback.
 *
 * /blog and /blog/[slug] read through here. If MySQL is unreachable or
 * has no published rows yet (fresh install before `npm run db:seed`),
 * we serve the hardcoded posts so the marketing page never goes blank.
 */
import "server-only";
import { prisma } from "@/lib/db/prisma";
import { posts as fallbackPosts, type Post } from "@/content/blog";

type PrismaBlog = Awaited<
  ReturnType<typeof prisma.blog.findMany>
>[number];

function rowToPost(b: PrismaBlog): Post {
  return {
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    image: b.image,
    imageAlt: b.imageAlt,
    author: b.author,
    authorRole: b.authorRole,
    date: b.date.toISOString(),
    readMinutes: b.readMinutes,
    tag: b.tag as Post["tag"],
    body: (Array.isArray(b.body) ? b.body : []) as Post["body"],
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const rows = await prisma.blog.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { date: "desc" }],
    });
    if (rows.length === 0) return fallbackPosts;
    return rows.map(rowToPost);
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const row = await prisma.blog.findFirst({
      where: { slug, published: true },
    });
    if (row) return rowToPost(row);
  } catch {
    // fall through to hardcoded
  }
  return fallbackPosts.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, n = 3): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, n);
}