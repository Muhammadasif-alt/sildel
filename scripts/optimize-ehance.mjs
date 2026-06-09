/**
 * Optimise every PNG/JPG under public/Ehance Slidel/ to a sized WebP and
 * place the results under public/Slidel/enhance/ with descriptive names.
 *
 * Output naming:
 *   enhance-<category>-NN.webp
 *   where <category> = sculpture | tables | lighting | fine-arts | carre-dor | misc
 *
 *   - Category folders go to their own slug (Sculpture → sculpture, etc.)
 *   - The "First Impression Matters Portfolio" folder is SKIPPED (reference
 *     designs, not Sildel assets).
 *   - Loose ChatGPT root files go to enhance-misc-NN.webp.
 *
 * Run:  node scripts/optimize-ehance.mjs
 */
import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_BASE = path.join(ROOT, "public", "Ehance Slidel");
const OUT_DIR = path.join(ROOT, "public", "Slidel", "enhance");

// Map source subfolder → output slug. Folders not listed are skipped.
const CATEGORIES = {
  Sculpture: "sculpture",
  Tables: "tables",
  Lighting: "lighting",
  "Fine Arts": "fine-arts",
  "Carré d'Or": "carre-dor",
};
// Files at the root of "Ehance Slidel" → misc.
const ROOT_SLUG = "misc";

await mkdir(OUT_DIR, { recursive: true });

let totalSrc = 0;
let totalOut = 0;
let totalCount = 0;

async function processFolder(srcDir, slug, label) {
  let files;
  try {
    files = await readdir(srcDir);
  } catch {
    console.warn(`Skipping (not found): ${label}`);
    return;
  }
  const images = files
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .filter((f) => !/^\./.test(f))
    .sort();
  if (images.length === 0) return;
  console.log(`\n${label}: ${images.length} images`);

  let i = 0;
  for (const name of images) {
    i += 1;
    const src = path.join(srcDir, name);
    const outName = `enhance-${slug}-${String(i).padStart(2, "0")}.webp`;
    const out = path.join(OUT_DIR, outName);
    const srcSize = (await stat(src)).size;
    await sharp(src)
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);
    const outSize = (await stat(out)).size;
    totalSrc += srcSize;
    totalOut += outSize;
    totalCount += 1;
    const pct = Math.round((1 - outSize / srcSize) * 100);
    console.log(
      `  [${String(i).padStart(2, " ")}/${images.length}] ${name.slice(0, 70)}… → ${outName}  ${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB  (−${pct}%)`,
    );
  }
}

// 1. Process each named category folder.
for (const [folderName, slug] of Object.entries(CATEGORIES)) {
  await processFolder(path.join(SRC_BASE, folderName), slug, folderName);
}

// 2. Process the loose files at the root of the Ehance Slidel folder.
const rootFiles = (await readdir(SRC_BASE)).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (rootFiles.length > 0) {
  console.log(`\nRoot (loose files): ${rootFiles.length} images`);
  let i = 0;
  for (const name of rootFiles) {
    i += 1;
    const src = path.join(SRC_BASE, name);
    const outName = `enhance-${ROOT_SLUG}-${String(i).padStart(2, "0")}.webp`;
    const out = path.join(OUT_DIR, outName);
    const srcSize = (await stat(src)).size;
    await sharp(src)
      .rotate()
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);
    const outSize = (await stat(out)).size;
    totalSrc += srcSize;
    totalOut += outSize;
    totalCount += 1;
    const pct = Math.round((1 - outSize / srcSize) * 100);
    console.log(
      `  [${String(i).padStart(2, " ")}/${rootFiles.length}] ${name.slice(0, 70)}… → ${outName}  ${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB  (−${pct}%)`,
    );
  }
}

console.log(
  `\nTotal: ${totalCount} images, ${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`,
);