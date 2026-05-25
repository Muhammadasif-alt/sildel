/**
 * Optimizer for client product photography under /public/FOTOS PRODUTO/.
 *
 * - Reads every "/FOTOS PRODUTO/..." path referenced from treasures.ts +
 *   home.en.ts + home.pt.ts.
 * - Re-encodes each one as WebP, max-width 1600px, quality 82.
 * - Writes a deterministic short hash-based filename under /public/products/
 *   to keep the URL tidy and ASCII-safe.
 * - Prints a JSON map { originalPath -> newPath } at the end so we can do a
 *   single find-and-replace across the content files.
 *
 * Run with:  node scripts/optimize-fotos.mjs
 */
import { readFile, mkdir, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "products");
const MAX_WIDTH = 1600;
const QUALITY = 82;

const SOURCES = [
  "src/content/treasures.ts",
  "src/content/home.en.ts",
  "src/content/home.pt.ts",
];

// Matches both:
//   "/FOTOS PRODUTO/foo/bar.jpg"           (full path in string literal)
//   fp("foo/bar.jpg")                       (helper-prefixed in treasures.ts)
// Match the path inside a string literal — be permissive on inner chars so
// paths with apostrophes (e.g. "CARRÉ D'OR fp/...") still match. We anchor on
// the surrounding quote to know where the literal ends.
const RE_FULL = /"\/FOTOS PRODUTO\/([^"]+?\.(?:jpg|jpeg|png|webp))"/gi;
const RE_FP = /\bfp\(\s*"([^"]+?\.(?:jpg|jpeg|png|webp))"\s*\)/gi;

const collected = new Set();
for (const s of SOURCES) {
  const text = await readFile(path.join(ROOT, s), "utf8");
  for (const m of text.matchAll(RE_FULL)) collected.add(`/FOTOS PRODUTO/${m[1]}`);
  for (const m of text.matchAll(RE_FP)) collected.add(`/FOTOS PRODUTO/${m[1]}`);
}

console.log(`→ Found ${collected.size} referenced FOTOS PRODUTO paths.`);

await mkdir(OUT_DIR, { recursive: true });

const mapping = {};
let bytesIn = 0;
let bytesOut = 0;

for (const orig of collected) {
  const src = path.join(PUBLIC_DIR, orig.slice(1)); // drop leading /
  let st;
  try {
    st = await stat(src);
  } catch {
    console.warn(`  ! missing: ${orig}`);
    continue;
  }
  bytesIn += st.size;

  const hash = createHash("sha1").update(orig).digest("hex").slice(0, 10);
  const slug = orig
    .split("/")
    .filter(Boolean)
    .slice(1) // drop "FOTOS PRODUTO"
    .join("_")
    .replace(/[^a-z0-9._-]/gi, "-")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .slice(0, 60);
  const outName = `${slug}-${hash}.webp`;
  const outPath = path.join(OUT_DIR, outName);
  const outUrl = `/products/${outName}`;

  try {
    await sharp(src)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    const outStat = await stat(outPath);
    bytesOut += outStat.size;
    mapping[orig] = outUrl;
    console.log(
      `  ✓ ${(st.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB  ${outName}`,
    );
  } catch (e) {
    console.error(`  ✗ ${orig}: ${e.message}`);
  }
}

const mapPath = path.join(ROOT, "scripts/.fotos-mapping.json");
await writeFile(mapPath, JSON.stringify(mapping, null, 2));

console.log(`\n📊 Done.`);
console.log(`   Files:  ${Object.keys(mapping).length}`);
console.log(`   In:     ${(bytesIn / 1024 / 1024).toFixed(1)} MB`);
console.log(`   Out:    ${(bytesOut / 1024 / 1024).toFixed(1)} MB`);
console.log(`   Saving: ${((1 - bytesOut / bytesIn) * 100).toFixed(0)}%`);
console.log(`\n   Mapping written: ${mapPath}`);