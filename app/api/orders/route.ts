import { NextResponse, type NextRequest } from "next/server";
import { getOrderById } from "@/lib/orders";
import { getPlanLabel } from "@/lib/plans";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId")?.trim();

  if (!orderId) {
    return NextResponse.json(
      { error: "orderId is required." },
      { status: 400 },
    );
  }

  const order = await getOrderById(orderId);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    id: order.id,
    plan: order.plan,
    planLabel: getPlanLabel(order.plan),
    amountUsd: order.amountUsd,
    status: order.status,
    paidAt: order.paidAt,
    fullName: order.fullName,
    businessNameOrGoogleMapsLink: order.businessNameOrGoogleMapsLink,
    nowPaymentsPaymentStatus: order.nowPaymentsPaymentStatus,
  });
}
