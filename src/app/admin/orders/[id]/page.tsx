import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { connectDb } from "@/lib/db/connect";
import { OrderModel, type LeanOrder } from "@/lib/models/order.model";
import { formatPrice } from "@/content/treasures";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

type RouteContext = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: RouteContext) {
  const { id } = await params;
  await connectDb();
  const order = await OrderModel.findOne({ orderNumber: id }).lean<LeanOrder>();
  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-neutral-500 transition-colors hover:text-amber-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All orders
      </Link>

      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-mono text-2xl tracking-wide text-amber-300 md:text-3xl">
            {order.orderNumber}
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Placed {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
          </p>
        </div>
        <OrderStatusSelect orderNumber={order.orderNumber} current={order.status} />
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Items */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 lg:col-span-2">
          <h2 className="border-b border-neutral-800 px-6 py-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
            Items
          </h2>
          <ul className="divide-y divide-neutral-800">
            {order.items.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="min-w-0">
                  <div className="truncate text-neutral-100">{item.name}</div>
                  <div className="truncate font-mono text-xs text-neutral-500">
                    {item.productSlug} · qty {item.quantity}
                  </div>
                </div>
                <div className="tabular-nums text-neutral-300">
                  {formatPrice(item.priceCents * item.quantity)}
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-neutral-800 px-6 py-5 text-sm">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(order.subtotalCents)}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>Shipping</span>
              <span className="tabular-nums">{formatPrice(order.shippingCents)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-800 pt-3 text-base text-white">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(order.totalCents)}</span>
            </div>
          </div>
        </section>

        {/* Customer + shipping + payment */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
              Customer
            </h2>
            <p className="text-neutral-100">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p className="mt-1 text-sm text-neutral-400">{order.email}</p>
            {order.customer.phone && (
              <p className="mt-1 text-sm text-neutral-400">{order.customer.phone}</p>
            )}
          </section>

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
              Ship to
            </h2>
            <p className="text-sm text-neutral-300">{order.shipping.street}</p>
            <p className="text-sm text-neutral-300">
              {order.shipping.city}, {order.shipping.postcode}
            </p>
            <p className="text-sm text-neutral-300">{order.shipping.country}</p>
          </section>

          <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
              Payment
            </h2>
            <p className="text-sm capitalize text-neutral-300">
              {order.paymentMethod ?? "—"}
            </p>
            {order.paymentRef && (
              <p className="mt-1 break-all font-mono text-xs text-neutral-500">
                Ref: {order.paymentRef}
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
