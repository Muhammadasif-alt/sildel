"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProductAction } from "@/app/admin/products/actions";

export function DeleteProductButton({ slug, name }: { slug: string; name: string }) {
  const [pending, start] = useTransition();

  function onClick() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    start(async () => {
      await deleteProductAction(slug);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title="Delete"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 transition-colors hover:border-red-500/40 hover:text-red-300 disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" strokeWidth={1.6} />
    </button>
  );
}
