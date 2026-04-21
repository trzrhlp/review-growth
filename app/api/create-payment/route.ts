import { NextResponse, type NextRequest } from "next/server";
import {
  createOrder,
  updateOrderPayment,
} from "@/lib/orders";
import {
  alternativePaymentCurrencies,
  defaultPaymentCurrency,
  NOWPAYMENTS_API_URL,
  type NowPaymentsInvoiceResponse,
} from "@/lib/nowpayments";
import { PLAN_PRICES_USD, isPlanName } from "@/lib/plans";

export const runtime = "nodejs";

type CreatePaymentRequest = {
  plan?: unknown;
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  businessNameOrGoogleMapsLink?: unknown;
};

function getRequiredString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").length >= 7;
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

  const fullName = getRequiredString(body.fullName);
  const email = getRequiredString(body.email);
  const phone = getRequiredString(body.phone);
  const businessNameOrGoogleMapsLink = getRequiredString(
    body.businessNameOrGoogleMapsLink,
  );

  if (!fullName || !email || !phone || !businessNameOrGoogleMapsLink) {
    return NextResponse.json(
      { error: "All form fields are required." },
      { status: 400 },
    );
  }

  if (fullName.length < 2 || businessNameOrGoogleMapsLink.length < 2) {
    return NextResponse.json(
      { error: "Please provide complete customer and business details." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Enter a valid phone number." },
      { status: 400 },
    );
  }

  const origin = getOrigin(request);
  const plan = body.plan;
  const priceAmount = PLAN_PRICES_USD[plan];
  const nowPaymentsOrderId = `lrb-${plan.toLowerCase()}-${crypto.randomUUID()}`;
  const order = await createOrder({
    plan,
    fullName,
    email,
    phone,
    businessNameOrGoogleMapsLink,
    nowPaymentsOrderId,
    paymentMethodDefault: defaultPaymentCurrency,
    paymentMethodAlternatives: [...alternativePaymentCurrencies],
  });

  try {
    const nowPaymentsResponse = await fetch(`${NOWPAYMENTS_API_URL}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        price_amount: priceAmount,
        price_currency: "usd",
        pay_currency: defaultPaymentCurrency,
        order_id: nowPaymentsOrderId,
        order_description: `Local Reviews Boost ${plan} plan for ${email}`,
        success_url: `${origin}/payment-success?orderId=${encodeURIComponent(order.id)}`,
        cancel_url: `${origin}/start-order?plan=${encodeURIComponent(plan)}&payment=cancelled&orderId=${encodeURIComponent(order.id)}`,
        ipn_callback_url: `${origin}/api/nowpayments/webhook`,
        is_fixed_rate: true,
      }),
    });

    let invoice: NowPaymentsInvoiceResponse | null = null;

    try {
      invoice = (await nowPaymentsResponse.json()) as NowPaymentsInvoiceResponse;
    } catch {
      invoice = null;
    }

    if (!nowPaymentsResponse.ok || !invoice?.invoice_url) {
      console.error("NOWPayments invoice creation failed", {
        status: nowPaymentsResponse.status,
        orderId: order.id,
        nowPaymentsOrderId,
        response: invoice,
      });

      return NextResponse.json(
        { error: "Unable to create payment. Please try again." },
        { status: nowPaymentsResponse.ok ? 502 : nowPaymentsResponse.status },
      );
    }

    await updateOrderPayment({
      orderId: order.id,
      invoiceId: invoice.id ?? null,
      invoiceUrl: invoice.invoice_url,
    });

    return NextResponse.json({
      orderId: order.id,
      paymentUrl: invoice.invoice_url,
      invoiceId: invoice.id ?? null,
    });
  } catch (error) {
    console.error("Failed to create NOWPayments invoice", {
      orderId: order.id,
      nowPaymentsOrderId,
      error,
    });

    return NextResponse.json(
      { error: "Unable to create payment. Please try again." },
      { status: 502 },
    );
  }
}
