import type { Block } from "@/lib/blocks/types";
import { str } from "./block-utils";

export function SpacerBlock({ block }: { block: Block }) {
  const size = str(block, "size", "md");
  const cls =
    size === "sm" ? "h-10" : size === "lg" ? "h-40" : size === "xl" ? "h-60" : "h-20";
  return <div aria-hidden className={cls} />;
}
