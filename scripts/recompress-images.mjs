#!/usr/bin/env node
// Phase D — image recompression. Finds every webp in /public >400KB and
// re-encodes it at q=80, effort=6, max dimension 1920px. Reports
// before/after sizes. Run from repo root.
//
// Why: many source webp files were exported at high quality with the
// original 2000-3000px dimensions, sitting at 600-900KB. next/image
// optimizes them on-demand but the SOURCE is still served to the
// optimizer per cold-cache request — fatter source = slower cold path,
// more CPU on Vercel, and bandwidth waste for any raw <img> reference.
// 1920px wide at q80 is already richer than any browser viewport renders.

import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { resolve, join, extname } from "node:path";
import sharp from "sharp";

const ROOT = resolve(process.cwd(), "public");
const MIN_BYTES = 400 * 1024; // 400 KB
const MAX_DIM = 1920;
const QUALITY = 80;

async function walk(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".webp") {
      out.push(full);
    }
  }
  return out;
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}K`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
}

const all = await walk(ROOT);
let totalBefore = 0;
let totalAfter = 0;
let touched = 0;
let skipped = 0;

for (const file of all) {
  const before = await stat(file);
  if (before.size < MIN_BYTES) continue;

  const buf = await readFile(file);
  const meta = await sharp(buf).metadata();
  const needsResize =
    (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM;

  let pipeline = sharp(buf);
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_DIM,
      height: MAX_DIM,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  const out = await pipeline
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();

  // Don't write if the recompression made it bigger (rare, but possible
  // for already-aggressive sources).
  if (out.length >= before.size) {
    skipped++;
    console.log(
      `  ⊘ ${file.replace(ROOT, "")}  ${fmt(before.size)} → ${fmt(out.length)} (skipped — would be larger)`,
    );
    continue;
  }

  await writeFile(file, out);
  totalBefore += before.size;
  totalAfter += out.length;
  touched++;
  const dims = needsResize
    ? `  [${meta.width}×${meta.height} → ${MAX_DIM} fit-inside]`
    : "";
  console.log(
    `  ✓ ${file.replace(ROOT, "")}  ${fmt(before.size)} → ${fmt(out.length)}${dims}`,
  );
}

const saved = totalBefore - totalAfter;
const pct = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(0) : 0;
console.log(
  `\n✓ Recompressed ${touched} files, skipped ${skipped}. Saved ${fmt(saved)} (-${pct}%).`,
);