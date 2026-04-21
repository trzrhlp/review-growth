import crypto from "node:crypto";

export const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1";
export const defaultPaymentCurrency = "usdttrc20";
export const alternativePaymentCurrencies = ["usdterc20", "eth", "btc"] as const;

export type NowPaymentsInvoiceResponse = {
  id?: string;
  invoice_url?: string;
};

export type NowPaymentsWebhookPayload = {
  payment_id?: string | number | null;
  invoice_id?: string | number | null;
  order_id?: string | null;
  payment_status?: string | null;
  pay_currency?: string | null;
  price_amount?: string | number | null;
  price_currency?: string | null;
  pay_amount?: string | number | null;
  actually_paid?: string | number | null;
  purchase_id?: string | null;
};

function sortObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }

  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((result, key) => {
        result[key] = sortObjectKeys((value as Record<string, unknown>)[key]);
        return result;
      }, {});
  }

  return value;
}

export function verifyNowPaymentsSignature(rawBody: string, signature: string | null) {
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

  if (!signature || !ipnSecret) {
    return false;
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return false;
  }

  const sortedPayload = JSON.stringify(sortObjectKeys(payload));
  const expectedSignature = crypto
    .createHmac("sha512", ipnSecret)
    .update(sortedPayload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "hex"),
    Buffer.from(signature, "hex"),
  );
}

export function buildWebhookEventKey(payload: NowPaymentsWebhookPayload) {
  return [
    payload.payment_id ?? "unknown-payment",
    payload.payment_status ?? "unknown-status",
    payload.actually_paid ?? "unknown-paid",
    payload.pay_amount ?? "unknown-pay-amount",
  ].join(":");
}

export function isSuccessfulNowPaymentsStatus(status: string | null | undefined) {
  return status === "finished";
}

export function isFailedNowPaymentsStatus(status: string | null | undefined) {
  return status === "failed" || status === "expired";
}
