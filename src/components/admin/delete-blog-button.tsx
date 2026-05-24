"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteBlog } from "@/app/admin/blogs/actions";

export function DeleteBlogButton({ slug, title }: { slug: string; title: string }) {
  const [pending, start] = useTransition();

  function onClick() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    start(async () => {
      await deleteBlog(slug);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}