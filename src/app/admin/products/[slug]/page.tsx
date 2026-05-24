import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { connectDb } from "@/lib/db/connect";
import { ProductModel } from "@/lib/models/product.model";
import { ProductForm } from "@/components/admin/product-form";
import { updateProductAction } from "../actions";

type RouteContext = { params: Promise<{ slug: string }> };

export default async function EditProductPage({ params }: RouteContext) {
  const { slug } = await params;
  await connectDb();
  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) notFound();

  const update = updateProductAction.bind(null, slug);

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All products
      </Link>
      <h1 className="mb-8 font-serif text-3xl text-foreground md:text-4xl">
        Edit · {product.name}
      </h1>
      <ProductForm
        action={update}
        submitLabel="Save changes"
        initial={{
          slug: product.slug,
          name: product.name,
          tagline: product.tagline,
          category: product.category,
          priceCents: product.priceCents,
          badge: product.badge ?? undefined,
          material: product.material ?? undefined,
          description: product.description,
          image: product.image,
          gallery: Array.isArray(product.gallery) ? (product.gallery as string[]) : [],
          inStock: product.inStock,
        }}
      />
    </div>
  );
}
