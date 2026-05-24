import type { Block, Locale } from "@/lib/blocks/types";
import { pickLocalized } from "@/lib/blocks/types";

export function loc(block: Block, key: string, locale: Locale, fallback = ""): string {
  return pickLocalized(block.content?.[key], locale, fallback);
}

export function str(block: Block, key: string, fallback = ""): string {
  const v = block.content?.[key];
  return typeof v === "string" ? v : fallback;
}

export function list(block: Block, key: string): Array<Record<string, unknown>> {
  const v = block.content?.[key];
  return Array.isArray(v) ? (v as Array<Record<string, unknown>>) : [];
}

export function pickFromItem(
  item: Record<string, unknown>,
  key: string,
  locale: Locale,
  fallback = ""
): string {
  return pickLocalized(item[key], locale, fallback);
}

export function itemStr(item: Record<string, unknown>, key: string, fallback = ""): string {
  const v = item[key];
  return typeof v === "string" ? v : fallback;
}

/** Render text with `\n\n` as paragraph breaks and `\n` as line breaks. */
export function renderParagraphs(text: string): React.ReactNode {
  if (!text.trim()) return null;
  return text
    .split(/\n\n+/)
    .map((p, i) => (
      <p key={i}>
        {p.split("\n").map((line, j, arr) => (
          <span key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
}

/** Detect YouTube/Vimeo URLs and convert to embed format. */
export function videoEmbedUrl(raw: string): { kind: "youtube" | "vimeo" | "file"; src: string } | null {
  if (!raw) return null;
  const yt = raw.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (yt) return { kind: "youtube", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = raw.match(/vimeo\.com\/(\d+)/);
  if (vm) return { kind: "vimeo", src: `https://player.vimeo.com/video/${vm[1]}` };
  return { kind: "file", src: raw };
}
