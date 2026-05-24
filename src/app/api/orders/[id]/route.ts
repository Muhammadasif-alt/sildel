/**
 * /api/orders/[id]
 *   GET   → fetch one order by orderNumber (SIL-2026-XXXXXX) or _id
 *   PATCH → update order status (TODO: protect with admin auth)
 */
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/lib/db/connect";
import { OrderModel, ORDER_STATUSES } from "@/lib/models/order.model";

type RouteContext = { params: Promise<{ id: string }> };

function buildIdFilter(id: string) {
  const orFilter: Array<Record<string, string | mongoose.Types.ObjectId>> = [
    { orderNumber: id },
  ];
  if (mongoose.isValidObjectId(id)) {
    orFilter.push({ _id: new mongoose.Types.ObjectId(id) });
  }
  return { $or: orFilter };
}

export async function GET(_req: Request, { params }: RouteContext) {
  await connectDb();
  const { id } = await params;
  const order = await OrderModel.findOne(buildIdFilter(id)).lean();
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(req: Request, { params }: RouteContext) {
  // TODO: require admin authentication.
  await connectDb();
  const { id } = await params;

  try {
    const body = await req.json();

    // Only allow specific fields to be updated through this endpoint.
    const allowed: Record<string, unknown> = {};
    if (body.status && ORDER_STATUSES.includes(body.status)) {
      allowed.status = body.status;
    }
    if (typeof body.notes === "string") allowed.notes = body.notes;
    if (typeof body.paymentRef === "string") allowed.paymentRef = body.paymentRef;

    const order = await OrderModel.findOneAndUpdate(buildIdFilter(id), allowed, {
      new: true,
      runValidators: true,
    }).lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not update order" },
      { status: 400 }
    );
  }
}
