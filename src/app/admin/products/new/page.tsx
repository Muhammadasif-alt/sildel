import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "../actions";

export default function NewProductPage() {
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
        New product
      </h1>
      <ProductForm action={createProductAction} submitLabel="Create product" />
    </div>
  );
}
