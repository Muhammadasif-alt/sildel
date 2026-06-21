import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { BlogForm } from "@/components/admin/blog-form";
import { updateBlog } from "../actions";

type Params = { params: Promise<{ slug: string }> };

export default async function EditBlogPage({ params }: Params) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) notFound();

  const action = updateBlog.bind(null, slug);

  const initial = {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    image: blog.image,
    imageAlt: blog.imageAlt,
    author: blog.author,
    authorRole: blog.authorRole,
    date: blog.date ? new Date(blog.date).toISOString().slice(0, 10) : "",
    readMinutes: blog.readMinutes,
    tag: blog.tag,
    featured: blog.featured,
    published: blog.published,
    body: (blog.body ?? []) as never,
  };

  return (
    <div>
      <Link
        href="/admin/blogs"
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to blogs
      </Link>

      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">Edit post</h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">/{blog.slug}</p>
        </div>
        <Link
          href={`/blog/${blog.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          View live →
        </Link>
      </header>

      <BlogForm initial={initial} action={action} submitLabel="Save changes" />
    </div>
  );
}