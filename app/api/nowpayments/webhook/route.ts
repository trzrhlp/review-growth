import { NextResponse } from "next/server";
import { sendPaidOrderConfirmationEmail } from "@/lib/email";
import {
  buildWebhookEventKey,
  isFailedNowPaymentsStatus,
  isSuccessfulNowPaymentsStatus,
  type NowPaymentsWebhookPayload,
  verifyNowPaymentsSignature,
} from "@/lib/nowpayments";
import {
  getOrderByNowPaymentsOrderId,
  markOrderPaid,
  markOrderPaymentFailed,
  syncOrderPaymentStatus,
} from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-nowpayments-sig");

  if (!verifyNowPaymentsSignature(rawBody, signature)) {
    console.warn("Rejected NOWPayments webhook with invalid signature.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: NowPaymentsWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as NowPaymentsWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const nowPaymentsOrderId = payload.order_id?.trim();
  const paymentStatus = payload.payment_status ?? "unknown";
  const eventKey = buildWebhookEventKey(payload);

  if (!nowPaymentsOrderId) {
    console.error("NOWPayments webhook missing order_id", {
      paymentStatus,
      paymentId: payload.payment_id ?? null,
    });

    return NextResponse.json({ error: "Missing order_id." }, { status: 400 });
  }

  const order = await getOrderByNowPaymentsOrderId(nowPaymentsOrderId);

  if (!order) {
    console.error("NOWPayments webhook order not found", {
      nowPaymentsOrderId,
      paymentStatus,
      paymentId: payload.payment_id ?? null,
    });

    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  const paymentId =
    payload.payment_id === null || payload.payment_id === undefined
      ? null
      : String(payload.payment_id);

  if (isSuccessfulNowPaymentsStatus(paymentStatus)) {
    const result = await markOrderPaid({
      orderId: order.id,
      paymentId,
      paymentStatus,
      eventKey,
    });

    if (!result.alreadyProcessed && result.order) {
      console.info("Order marked paid from NOWPayments webhook", {
        orderId: result.order.id,
        nowPaymentsOrderId,
        paymentId,
        paymentStatus,
      });

      try {
        await sendPaidOrderConfirmationEmail(result.order);
      } catch (error) {
        console.error("Failed to send paid order confirmation email", {
          orderId: result.order.id,
          error,
        });
      }
    }

    return NextResponse.json({ ok: true });
  }

  if (isFailedNowPaymentsStatus(paymentStatus)) {
    const result = await markOrderPaymentFailed({
      orderId: order.id,
      paymentStatus,
      eventKey,
    });

    if (!result.alreadyProcessed && result.order) {
      console.info("Order marked payment_failed from NOWPayments webhook", {
        orderId: result.order.id,
        nowPaymentsOrderId,
        paymentId,
        paymentStatus,
      });
    }

    return NextResponse.json({ ok: true });
  }

  await syncOrderPaymentStatus({
    orderId: order.id,
    paymentId,
    paymentStatus,
    eventKey,
  });

  console.info("NOWPayments webhook processed", {
    orderId: order.id,
    nowPaymentsOrderId,
    paymentId,
    paymentStatus,
  });

  return NextResponse.json({ ok: true });
}
