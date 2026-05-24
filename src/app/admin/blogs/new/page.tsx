import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/blog-form";
import { createBlog } from "../actions";

export default function NewBlogPage() {
  return (
    <div>
      <Link
        href="/admin/blogs"
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to blogs
      </Link>

      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">New post</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Compose a new journal entry.
        </p>
      </header>

      <BlogForm action={createBlog} submitLabel="Publish post" />
    </div>
  );
}