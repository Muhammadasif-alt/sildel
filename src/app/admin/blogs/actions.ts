"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { BlogModel, BLOG_TAGS } from "@/lib/models/blog.model";

type BlogTag = (typeof BLOG_TAGS)[number];

type BlockInput = {
  kind: "paragraph" | "heading" | "quote" | "image";
  text?: string;
  author?: string;
  src?: string;
  alt?: string;
  caption?: string;
};

function parseBody(raw: string): BlockInput[] {
  if (!raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b: BlockInput) =>
        b && ["paragraph", "heading", "quote", "image"].includes(b.kind)
    );
  } catch {
    return [];
  }
}

function readForm(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const authorRole = String(formData.get("authorRole") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const readMinutes = Number(formData.get("readMinutes") ?? 5);
  const tag = String(formData.get("tag") ?? "Atelier");
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const body = parseBody(String(formData.get("body") ?? "[]"));

  if (!slug || !title || !excerpt || !image || !author || !date) {
    throw new Error("Missing required fields.");
  }
  if (!(BLOG_TAGS as readonly string[]).includes(tag)) {
    throw new Error("Invalid tag.");
  }

  return {
    slug,
    title,
    excerpt,
    image,
    imageAlt,
    author,
    authorRole,
    date: new Date(date),
    readMinutes,
    tag: tag as BlogTag,
    featured,
    published,
    body,
  };
}

// TODO-auth: should also enforce a CSRF token in production.
export async function createBlog(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const data = readForm(formData);
  await BlogModel.create(data);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  redirect("/admin/blogs");
}

export async function updateBlog(slug: string, formData: FormData) {
  await requireAdmin();
  await connectDb();
  const data = readForm(formData);
  await BlogModel.findOneAndUpdate({ slug }, data, { new: true });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  if (data.slug !== slug) revalidatePath(`/blog/${slug}`);
  redirect("/admin/blogs");
}

export async function deleteBlog(slug: string) {
  await requireAdmin();
  await connectDb();
  await BlogModel.deleteOne({ slug });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}