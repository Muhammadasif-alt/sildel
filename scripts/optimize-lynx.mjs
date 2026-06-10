/**
 * Optimise the restored Iberian lynx PNGs into WebP and place them under
 * public/images/our-story/ alongside the existing lynx.webp.
 *
 * Naming: lynx-01..07.webp — ordered Studio (1–4) → Forest (5–6) → Editorial (7).
 */
import sharp from "sharp";
import { readdir, stat, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public", "lynx-restore");
const OUT = path.join(ROOT, "public", "images", "our-story");

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.png$/i.test(f));

// Order: studio portraits first (Sildel-styled, on cork-bark plinth),
// then forest shots (in habitat), then editorial portrait.
const order = (n) => {
  if (/Studio portrait/i.test(n)) return 0;
  if (/cork oak.*forest/i.test(n)) return 1;
  if (/Editorial portrait/i.test(n)) return 2;
  return 3;
};
files.sort((a, b) => order(a) - order(b) || a.localeCompare(b));

let i = 0;
let totalSrc = 0;
let totalOut = 0;

for (const name of files) {
  i += 1;
  const src = path.join(SRC, name);
  const out = path.join(OUT, `lynx-${String(i).padStart(2, "0")}.webp`);
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
    `[${i}/${files.length}] ${name.slice(0, 60)}…  ${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB  (−${pct}%)`,
  );
}

console.log(
  `\nTotal: ${files.length} files  ${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`,
);

// Remove the temp PNG folder once optimised.
await rm(SRC, { recursive: true, force: true });
console.log(`Removed temp folder ${SRC}`);