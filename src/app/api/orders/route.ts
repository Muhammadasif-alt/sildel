/**
 * /api/orders
 *   POST → create an order (called from the checkout page)
 *   GET  → list orders (TODO: protect with admin auth)
 *
 * The checkout page currently simulates an order with setTimeout. Once this
 * endpoint is wired and a payment provider (Stripe / Mollie) is added, the
 * page should POST here, then redirect to the success page with orderNumber.
 */
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect";
import { OrderModel, generateOrderNumber } from "@/lib/models/order.model";

export async function GET(req: Request) {
  // TODO: require admin authentication before exposing the order list.
  await connectDb();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const email = searchParams.get("email");

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (email) filter.email = email.toLowerCase();

  const orders = await OrderModel.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ orders, count: orders.length });
}

export async function POST(req: Request) {
  await connectDb();

  try {
    const body = await req.json();

    // Compute totals server-side so the client can't tamper with them.
    const items = Array.isArray(body.items) ? body.items : [];
    const subtotalCents = items.reduce(
      (sum: number, it: { priceCents?: number; quantity?: number }) =>
        sum + (it.priceCents ?? 0) * (it.quantity ?? 0),
      0
    );
    const shippingCents = Number(body.shippingCents ?? 0);
    const totalCents = subtotalCents + shippingCents;

    const order = await OrderModel.create({
      ...body,
      orderNumber: generateOrderNumber(),
      subtotalCents,
      shippingCents,
      totalCents,
      status: "pending",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not create order" },
      { status: 400 }
    );
  }
}
