/**
 * Re-master client product photography from the FULL-RES originals under
 * /public/FOTOS PRODUTO/ — replacing the once-downscaled WebP in
 * /public/products/ with sharper, cleaner versions.
 *
 * Why from originals: the files in /public/products were already resized +
 * lossy-encoded once. Re-processing those would compound compression
 * artifacts. Re-running from the originals gives a genuine quality lift.
 *
 * Filenames are derived with the SAME deterministic slug+sha1 logic as
 * optimize-fotos.mjs, so every output overwrites its existing counterpart and
 * NO content/path rewiring is needed.
 *
 * Enhancement pipeline (mild + safe across white-bg, black-bg, and lifestyle
 * shots — no AI, no background removal that could eat product edges):
 *   - rotate() to honour EXIF orientation
 *   - resize to MAX_WIDTH (bumped to 1920 for crisper gallery on large screens)
 *   - linear(1.05, -6): gentle contrast — cleans near-white backgrounds and
 *     deepens black backgrounds without clipping midtones
 *   - modulate(saturation 1.06): subtle colour pop (cork browns stay natural)
 *   - sharpen(sigma 1.0): restores crispness lost to the first downscale
 *   - webp quality 86 (a touch above the catalogue default — these are the
 *     hero product shots)
 *
 * Usage:
 *   node scripts/enhance-fotos.mjs               # process all, in place
 *   node scripts/enhance-fotos.mjs --sample      # 3 samples -> /public/products/_enhance-preview
 */
import { readFile, mkdir, stat, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "products");
const FOTOS_DIR = path.join(PUBLIC_DIR, "FOTOS PRODUTO");
const PREVIEW_DIR = path.join(OUT_DIR, "_enhance-preview");
const MAX_WIDTH = 1920;
const QUALITY = 86;

const SAMPLE = process.argv.includes("--sample");

// Same deterministic name logic as optimize-fotos.mjs, so each original maps
// to exactly the product filename the site already references.
function outNameFor(orig) {
  const hash = createHash("sha1").update(orig).digest("hex").slice(0, 10);
  const slug = orig
    .split("/")
    .filter(Boolean)
    .slice(1)
    .join("_")
    .replace(/[^a-z0-9._-]/gi, "-")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .slice(0, 60);
  return `${slug}-${hash}.webp`;
}

async function walk(dir, base = dir) {
  const out = [];
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...(await walk(full, base)));
    else if (/\.(jpe?g|png|webp)$/i.test(ent.name)) out.push(full);
  }
  return out;
}

// Which product files does the site actually ship? Reverse-map each original
// to its deterministic output name and keep only originals whose output is
// present in /public/products.
const shipped = new Set(
  (await readdir(OUT_DIR)).filter((f) => f.endsWith(".webp")),
);
const originals = await walk(FOTOS_DIR);

const list = [];
for (const abs of originals) {
  const rel = abs.slice(PUBLIC_DIR.length).split(path.sep).join("/"); // "/FOTOS PRODUTO/..."
  const outName = outNameFor(rel);
  if (shipped.has(outName)) list.push({ src: abs, outName });
}

console.log(
  `→ ${originals.length} originals, ${shipped.size} shipped product files, ${list.length} matched for re-master.`,
);

const targetDir = SAMPLE ? PREVIEW_DIR : OUT_DIR;
await mkdir(targetDir, { recursive: true });

let batch = list;
if (SAMPLE) {
  const pick = (re) => list.find((x) => re.test(x.outName));
  batch = [
    pick(/BRANCO/i),
    pick(/PRETO/i),
    pick(/ALEXIS|Candeeiro|MV_/i),
  ].filter(Boolean);
}

let bytesIn = 0;
let bytesOut = 0;
let done = 0;

for (const { src, outName } of batch) {
  const st = await stat(src);
  bytesIn += st.size;
  const outPath = path.join(targetDir, outName);

  try {
    // Read into a buffer first so reading + writing the same dir is safe.
    const input = await readFile(src);
    await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .linear(1.05, -6)
      .modulate({ saturation: 1.06 })
      .sharpen({ sigma: 1.0 })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);
    const outStat = await stat(outPath);
    bytesOut += outStat.size;
    done++;
    console.log(
      `  ✓ ${(st.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB  ${outName}`,
    );
  } catch (e) {
    console.error(`  ✗ ${outName}: ${e.message}`);
  }
}

console.log(`\n📊 Done. ${done} files ${SAMPLE ? `(preview → ${PREVIEW_DIR})` : "(in place)"}`);
console.log(`   In:  ${(bytesIn / 1024 / 1024).toFixed(1)} MB (originals)`);
console.log(`   Out: ${(bytesOut / 1024 / 1024).toFixed(1)} MB`);