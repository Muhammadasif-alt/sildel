/**
 * One-off backfill: add `image` + `imageAlt` to the existing
 * `youThinkCork.manifesto` block on the /you-think-cork page.
 *
 * Run with:  npx tsx scripts/backfill-manifesto-image.ts
 */
import { config as loadEnv } from "dotenv";
import path from "path";
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });

import { connectDb } from "../src/lib/db/connect";
import { PageContentModel } from "../src/lib/models/page-content.model";
import { youThinkCorkEn } from "../src/content/you-think-cork.en";
import { youThinkCorkPt } from "../src/content/you-think-cork.pt";

async function main() {
  console.log("→ Connecting to MongoDB…");
  await connectDb();

  const doc = await PageContentModel.findOne({ pageKey: "you-think-cork" });
  if (!doc) {
    console.log("✗ No you-think-cork document found — run `npm run seed:cms` first.");
    process.exit(1);
  }

  const blocks = Array.isArray(doc.blocks) ? doc.blocks : [];
  let updated = 0;

  for (const b of blocks) {
    if (b.type !== "youThinkCork.manifesto") continue;
    const c = (b.content ?? {}) as Record<string, unknown>;
    if (!c.image) {
      c.image = youThinkCorkEn.manifesto.image;
      updated++;
    }
    if (!c.imageAlt) {
      c.imageAlt = {
        pt: youThinkCorkPt.manifesto.imageAlt,
        en: youThinkCorkEn.manifesto.imageAlt,
      };
      updated++;
    }
    b.content = c;
  }

  if (updated === 0) {
    console.log("✓ Manifesto block already has image fields — nothing to do.");
    process.exit(0);
  }

  doc.markModified("blocks");
  await doc.save();
  console.log(`✓ Backfilled ${updated} field(s) on the manifesto block.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("✗ Backfill failed:", err);
  process.exit(1);
});