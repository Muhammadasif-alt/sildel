import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { fromCategoryEnum } from "@/lib/db/product-category";
import { formatPrice } from "@/content/treasures";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "treasure" : "treasures"} in the catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add product
        </Link>
      </header>

      <div className="overflow-hidden rounded-none border border-border bg-card">
        {products.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground">
            No products yet. Click <em>Add product</em> or run <code>npm run seed</code>.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.slug} className="hover:bg-accent/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-foreground">{p.name}</div>
                        <div className="truncate font-mono text-xs text-muted-foreground">
                          {p.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {fromCategoryEnum(p.category)}
                  </td>
                  <td className="px-6 py-4 tabular-nums text-foreground">
                    {formatPrice(p.priceCents)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ring-1 " +
                        (p.inStock
                          ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground ring-border")
                      }
                    >
                      {p.inStock ? "In stock" : "Sold out"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.slug}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.6} />
                      </Link>
                      <DeleteProductButton slug={p.slug} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}