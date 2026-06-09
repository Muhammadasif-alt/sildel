/**
 * Scan public/Slidel/ for files that are NOT referenced anywhere in src/.
 * Prints two lists:
 *   - referenced (keep)
 *   - orphaned  (safe to delete)
 *
 * Run:  node scripts/audit-slidel-usage.mjs
 * Or:   node scripts/audit-slidel-usage.mjs --delete   (to remove orphans)
 */
import { readdir, readFile, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SLIDEL_DIR = path.join(ROOT, "public", "Slidel");
const SRC_DIR = path.join(ROOT, "src");

const shouldDelete = process.argv.includes("--delete");

// Walk src/ and collect all text content (.ts, .tsx, .js, .jsx, .css, .md).
async function collectSourceText(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await collectSourceText(full)));
    } else if (/\.(tsx?|jsx?|css|md|mdx)$/.test(e.name)) {
      out.push(await readFile(full, "utf8"));
    }
  }
  return out;
}

const sources = await collectSourceText(SRC_DIR);
const haystack = sources.join("\n");

const files = await readdir(SLIDEL_DIR);
const referenced = [];
const orphaned = [];
let referencedBytes = 0;
let orphanedBytes = 0;

// treasures.ts builds Nano Banana paths via a helper:
//   const nb = (suffix: string) => `/Slidel/Nano Banana 2 - ${suffix}`;
// so the literal string in source is only the SUFFIX (without the
// "Nano Banana 2 - " prefix). For those files, check the suffix.
const NB_PREFIX = "Nano Banana 2 - ";

for (const name of files) {
  const fp = path.join(SLIDEL_DIR, name);
  const s = await stat(fp);
  if (!s.isFile()) continue;
  const suffixOnly = name.startsWith(NB_PREFIX) ? name.slice(NB_PREFIX.length) : null;
  // Considered referenced if the full basename appears anywhere in src, OR
  // (for Nano Banana files) if the suffix-only form appears (nb() helper).
  const isReferenced =
    haystack.includes(name) || (suffixOnly !== null && haystack.includes(suffixOnly));
  if (isReferenced) {
    referenced.push({ name, size: s.size });
    referencedBytes += s.size;
  } else {
    orphaned.push({ name, size: s.size });
    orphanedBytes += s.size;
  }
}

const fmt = (b) => (b / 1024 / 1024).toFixed(2) + " MB";

console.log(`\nReferenced (${referenced.length} files, ${fmt(referencedBytes)}):`);
for (const f of referenced) console.log(`  ✓ ${f.name}`);

console.log(`\nOrphaned (${orphaned.length} files, ${fmt(orphanedBytes)}):`);
for (const f of orphaned) console.log(`  ✗ ${f.name}`);

if (shouldDelete && orphaned.length > 0) {
  console.log(`\nDeleting ${orphaned.length} orphaned files…`);
  for (const f of orphaned) {
    await unlink(path.join(SLIDEL_DIR, f.name));
  }
  console.log(`Done. Reclaimed ${fmt(orphanedBytes)}.`);
} else if (orphaned.length > 0) {
  console.log(`\nRun with --delete to remove orphans and reclaim ${fmt(orphanedBytes)}.`);
}