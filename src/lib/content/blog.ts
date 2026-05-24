/**
 * Blog reader — DB first, hardcoded fallback.
 *
 * The /blog and /blog/[slug] pages call into this. If the DB has no published
 * posts yet (fresh install / seed not run), we fall back to the hardcoded
 * `src/content/blog.ts` posts so the marketing page never goes blank.
 */
import "server-only";
import { connectDb } from "@/lib/db/connect";
import { BlogModel } from "@/lib/models/blog.model";
import { posts as fallbackPosts, type Post } from "@/content/blog";

function leanToPost(b: Record<string, unknown>): Post {
  return {
    slug: String(b.slug),
    title: String(b.title),
    excerpt: String(b.excerpt),
    image: String(b.image),
    imageAlt: String(b.imageAlt ?? ""),
    author: String(b.author),
    authorRole: String(b.authorRole ?? ""),
    date: (b.date instanceof Date
      ? b.date
      : new Date(String(b.date))
    ).toISOString(),
    readMinutes: Number(b.readMinutes ?? 5),
    tag: (b.tag as Post["tag"]) ?? "Atelier",
    body: (Array.isArray(b.body) ? b.body : []) as Post["body"],
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    await connectDb();
    const docs = await BlogModel.find({ published: true })
      .sort({ featured: -1, date: -1 })
      .lean();
    if (docs.length === 0) return fallbackPosts;
    return docs.map(leanToPost);
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    await connectDb();
    const doc = await BlogModel.findOne({ slug, published: true }).lean();
    if (doc) return leanToPost(doc);
  } catch {
    // fall through to hardcoded
  }
  return fallbackPosts.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, n = 3): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, n);
}