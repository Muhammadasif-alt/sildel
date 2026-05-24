/**
 * One-time seed — load the static product catalog (src/content/treasures.ts)
 * into MongoDB. Idempotent: re-running upserts by slug.
 *
 * Run with:  npx tsx scripts/seed.ts
 */
import { config as loadEnv } from "dotenv";
import path from "path";
// Next.js stores secrets in `.env.local`; tsx scripts must load it explicitly.
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });

import { connectDb } from "../src/lib/db/connect";
import { ProductModel } from "../src/lib/models/product.model";
import { SubscriberModel } from "../src/lib/models/subscriber.model";
import { products } from "../src/content/treasures";

async function main() {
  console.log("→ Connecting to MongoDB…");
  await connectDb();
  console.log("✓ Connected.");

  console.log(`→ Upserting ${products.length} products…`);
  for (const p of products) {
    await ProductModel.findOneAndUpdate(
      { slug: p.slug },
      {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        category: p.category,
        priceCents: p.priceCents,
        currency: p.currency,
        badge: p.badge,
        material: p.material,
        description: p.description,
        longDescription: p.longDescription ?? [],
        image: p.image,
        gallery: p.gallery ?? [],
        inStock: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`  • ${p.slug}`);
  }

  const productCount = await ProductModel.countDocuments();
  const subscriberCount = await SubscriberModel.countDocuments();
  console.log("\n📊 Database state:");
  console.log(`   products:    ${productCount}`);
  console.log(`   subscribers: ${subscriberCount}`);

  console.log("\n✓ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
