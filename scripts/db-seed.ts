/**
 * Sildel — Prisma/MySQL seed.
 *
 * Idempotent: upserts by slug. Run any time the static catalogue
 * (src/content/treasures.ts) or the journal posts (src/content/blog.ts)
 * change, and the MySQL tables catch up.
 *
 *   npm run db:seed
 *
 * dotenv-cli (wired in package.json) loads .env.local before this runs,
 * so DATABASE_URL is picked up automatically.
 */
import { PrismaClient, ProductCategory, BlogTag } from "@prisma/client";
import { products as staticProducts } from "../src/content/treasures";
import { posts as staticPosts } from "../src/content/blog";

const prisma = new PrismaClient();

// treasures.ts uses "Fine Arts" (with space). Prisma enum can't have
// spaces, so we map "Fine Arts" ↔ "FineArts" at the seed/read boundary.
function toCategoryEnum(label: string): ProductCategory {
  if (label === "Fine Arts") return ProductCategory.FineArts;
  if (label === "Sculpture") return ProductCategory.Sculpture;
  if (label === "Tables") return ProductCategory.Tables;
  if (label === "Lighting") return ProductCategory.Lighting;
  throw new Error(`Unknown product category: ${label}`);
}

function toBlogTagEnum(label: string): BlogTag {
  if (label === "Atelier") return BlogTag.Atelier;
  if (label === "Forest") return BlogTag.Forest;
  if (label === "Craft") return BlogTag.Craft;
  if (label === "Material") return BlogTag.Material;
  if (label === "Collectors") return BlogTag.Collectors;
  throw new Error(`Unknown blog tag: ${label}`);
}

async function main() {
  console.log("→ Seeding products…");
  for (const p of staticProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        tagline: p.tagline,
        category: toCategoryEnum(p.category),
        priceCents: p.priceCents,
        currency: p.currency,
        badge: p.badge ?? null,
        material: p.material ?? null,
        description: p.description,
        longDescription: p.longDescription ?? [],
        image: p.image,
        gallery: p.gallery ?? [],
      },
      create: {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        category: toCategoryEnum(p.category),
        priceCents: p.priceCents,
        currency: p.currency,
        badge: p.badge ?? null,
        material: p.material ?? null,
        description: p.description,
        longDescription: p.longDescription ?? [],
        image: p.image,
        gallery: p.gallery ?? [],
        inStock: true,
        editionSize: 1,
      },
    });
    console.log(`  • ${p.slug}`);
  }

  console.log(`\n→ Seeding blogs…`);
  for (const b of staticPosts) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        excerpt: b.excerpt,
        image: b.image,
        imageAlt: b.imageAlt,
        author: b.author,
        authorRole: b.authorRole,
        date: new Date(b.date),
        readMinutes: b.readMinutes,
        tag: toBlogTagEnum(b.tag),
        body: b.body,
      },
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        image: b.image,
        imageAlt: b.imageAlt,
        author: b.author,
        authorRole: b.authorRole,
        date: new Date(b.date),
        readMinutes: b.readMinutes,
        tag: toBlogTagEnum(b.tag),
        featured: false,
        published: true,
        body: b.body,
      },
    });
    console.log(`  • ${b.slug}`);
  }

  const [pcount, bcount, mcount] = await Promise.all([
    prisma.product.count(),
    prisma.blog.count(),
    prisma.mediaAsset.count(),
  ]);
  console.log(`\n📊 MySQL state:`);
  console.log(`   products:     ${pcount}`);
  console.log(`   blogs:        ${bcount}`);
  console.log(`   media_assets: ${mcount}`);

  console.log(`\n✓ Seed complete.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error("✗ Seed failed:", err);
    await prisma.$disconnect();
    process.exit(1);
  });