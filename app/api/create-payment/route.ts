import { NextResponse, type NextRequest } from "next/server";

const PLAN_PRICES_USD = {
  Starter: 49,
  Growth: 149,
  Pro: 349,
} as const;

type PlanName = keyof typeof PLAN_PRICES_USD;

type CreatePaymentRequest = {
  plan?: unknown;
};

type NowPaymentsInvoiceResponse = {
  id?: string;
  invoice_url?: string;
};

function isPlanName(plan: unknown): plan is PlanName {
  return (
    typeof plan === "string" &&
    Object.prototype.hasOwnProperty.call(PLAN_PRICES_USD, plan)
  );
}

function getOrigin(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Payment provider is not configured." },
      { status: 500 },
    );
  }

  let body: CreatePaymentRequest;

  try {
    body = (await request.json()) as CreatePaymentRequest;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!isPlanName(body.plan)) {
    return NextResponse.json(
      { error: "A valid plan is required." },
      { status: 400 },
    );
  }

  const origin = getOrigin(request);
  const plan = body.plan;
  const priceAmount = PLAN_PRICES_USD[plan];
  const orderId = `review-growth-${plan.toLowerCase()}-${crypto.randomUUID()}`;

  const nowPaymentsResponse = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      price_amount: priceAmount,
      price_currency: "usd",
      order_id: orderId,
      order_description: `Review Growth ${plan} plan`,
      success_url: `${origin}/start-order?payment=success&plan=${encodeURIComponent(plan)}`,
      cancel_url: `${origin}/start-order?payment=cancelled&plan=${encodeURIComponent(plan)}`,
    }),
  });

  let invoice: NowPaymentsInvoiceResponse | null = null;

  try {
    invoice = (await nowPaymentsResponse.json()) as NowPaymentsInvoiceResponse;
  } catch {
    invoice = null;
  }

  if (!nowPaymentsResponse.ok || !invoice?.invoice_url) {
    return NextResponse.json(
      { error: "Unable to create payment. Please try again." },
      { status: nowPaymentsResponse.ok ? 502 : nowPaymentsResponse.status },
    );
  }

  return NextResponse.json({
    paymentUrl: invoice.invoice_url,
    invoiceId: invoice.id ?? null,
  });
}
