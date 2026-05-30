/**
 * Convert every .png in public/Slidel/ to a .webp sibling at quality 82.
 * The Nano Banana PNGs are 1–2 MB each; sharp's WebP encoder typically
 * compresses them ~6–8× with no visible loss at this size.
 *
 * Run:  node scripts/optimize-slidel.mjs
 *
 * After the run completes and the site builds green, delete the source
 * PNGs to shrink the Vercel deploy bundle:
 *   find public/Slidel -name "*.png" -delete
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "public", "Slidel");

const files = await readdir(DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

let totalSrc = 0;
let totalOut = 0;
let i = 0;
for (const name of pngs) {
  i += 1;
  const src = path.join(DIR, name);
  const out = path.join(DIR, name.replace(/\.png$/i, ".webp"));
  const srcSize = (await stat(src)).size;
  await sharp(src)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  const outSize = (await stat(out)).size;
  totalSrc += srcSize;
  totalOut += outSize;
  const pct = Math.round((1 - outSize / srcSize) * 100);
  console.log(
    `[${String(i).padStart(2, " ")}/${pngs.length}] ${name}  ${(srcSize / 1024 / 1024).toFixed(2)}MB → ${(outSize / 1024 / 1024).toFixed(2)}MB  (−${pct}%)`,
  );
}

console.log(
  `\nTotal: ${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`,
);