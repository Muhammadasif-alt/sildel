/**
 * Seed the static blog posts (src/content/blog.ts) into MongoDB.
 *
 * Idempotent — upserts by slug. After this runs, the admin at /admin/blogs
 * shows the posts and edits there reflect on /blog immediately.
 *
 * Run with:  npx tsx scripts/seed-blogs.ts
 */
import { config as loadEnv } from "dotenv";
import path from "path";
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });

import { connectDb } from "../src/lib/db/connect";
import { BlogModel } from "../src/lib/models/blog.model";
import { posts } from "../src/content/blog";

async function main() {
  console.log("→ Connecting to MongoDB…");
  await connectDb();
  console.log("✓ Connected.");

  console.log(`→ Upserting ${posts.length} blog posts…`);
  for (const p of posts) {
    await BlogModel.findOneAndUpdate(
      { slug: p.slug },
      {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        image: p.image,
        imageAlt: p.imageAlt,
        author: p.author,
        authorRole: p.authorRole,
        date: new Date(p.date),
        readMinutes: p.readMinutes,
        tag: p.tag,
        body: p.body,
        published: true,
        featured: false,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`  • ${p.slug}`);
  }

  // Mark the first post as featured if none is yet.
  const hasFeatured = await BlogModel.countDocuments({ featured: true });
  if (hasFeatured === 0 && posts.length > 0) {
    await BlogModel.findOneAndUpdate(
      { slug: posts[0].slug },
      { featured: true }
    );
    console.log(`  ★ marked ${posts[0].slug} as featured`);
  }

  const total = await BlogModel.countDocuments();
  console.log(`\n📊 Total blog posts in DB: ${total}`);
  console.log("✓ Blog seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("✗ Blog seed failed:", err);
  process.exit(1);
});