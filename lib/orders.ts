import { PLAN_PRICES_USD, type PlanName } from "@/lib/plans";
import { supabaseRequest } from "@/lib/supabase";

export type OrderStatus = "pending" | "paid" | "payment_failed";

export type OrderRecord = {
  id: string;
  plan: PlanName;
  amountUsd: number;
  fullName: string;
  email: string;
  phone: string;
  businessNameOrGoogleMapsLink: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  nowPaymentsOrderId: string;
  nowPaymentsInvoiceId: string | null;
  nowPaymentsPaymentId: string | null;
  nowPaymentsInvoiceUrl: string | null;
  nowPaymentsPaymentStatus: string | null;
  lastWebhookEventKey: string | null;
  paymentMethodDefault: string;
  paymentMethodAlternatives: string[];
  emailSent: boolean;
  emailSentAt: string | null;
};

type OrderRow = {
  id: string;
  plan: PlanName;
  amount_usd: number;
  full_name: string;
  email: string;
  phone: string;
  business_name_or_google_maps_link: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  nowpayments_order_id: string;
  nowpayments_invoice_id: string | null;
  nowpayments_payment_id: string | null;
  nowpayments_invoice_url: string | null;
  nowpayments_payment_status: string | null;
  last_webhook_event_key: string | null;
  payment_method_default: string;
  payment_method_alternatives: string[];
  email_sent: boolean;
  email_sent_at: string | null;
};

type CreateOrderInput = {
  plan: PlanName;
  fullName: string;
  email: string;
  phone: string;
  businessNameOrGoogleMapsLink: string;
  nowPaymentsOrderId: string;
  paymentMethodDefault: string;
  paymentMethodAlternatives: string[];
};

type UpdateOrderPaymentInput = {
  orderId: string;
  invoiceId?: string | null;
  invoiceUrl?: string | null;
};

type MarkOrderPaidInput = {
  orderId: string;
  paymentId: string | null;
  paymentStatus: string;
  eventKey: string;
};

type MarkOrderFailedInput = {
  orderId: string;
  paymentId: string | null;
  paymentStatus: string;
  eventKey: string;
};

type SyncOrderStatusInput = {
  orderId: string;
  paymentId: string | null;
  paymentStatus: string;
  eventKey: string;
};

type RpcOrderResult = {
  order: OrderRow | null;
  alreadyProcessed: boolean;
};

function mapOrder(row: OrderRow): OrderRecord {
  return {
    id: row.id,
    plan: row.plan,
    amountUsd: row.amount_usd,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    businessNameOrGoogleMapsLink: row.business_name_or_google_maps_link,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at,
    nowPaymentsOrderId: row.nowpayments_order_id,
    nowPaymentsInvoiceId: row.nowpayments_invoice_id,
    nowPaymentsPaymentId: row.nowpayments_payment_id,
    nowPaymentsInvoiceUrl: row.nowpayments_invoice_url,
    nowPaymentsPaymentStatus: row.nowpayments_payment_status,
    lastWebhookEventKey: row.last_webhook_event_key,
    paymentMethodDefault: row.payment_method_default,
    paymentMethodAlternatives: Array.isArray(row.payment_method_alternatives)
      ? row.payment_method_alternatives
      : [],
    emailSent: row.email_sent,
    emailSentAt: row.email_sent_at,
  };
}

function encodeFilterValue(value: string) {
  return encodeURIComponent(value);
}

async function getSingleOrderByFilter(filter: string) {
  const rows = await supabaseRequest<OrderRow[]>(
    `/orders?${filter}&select=*`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  const firstRow = rows?.[0];

  return firstRow ? mapOrder(firstRow) : null;
}

async function callOrderRpc(
  functionName: string,
  payload: Record<string, string | null>,
) {
  const result = await supabaseRequest<RpcOrderResult>(`/rpc/${functionName}`, {
    method: "POST",
    body: payload,
    headers: {
      Accept: "application/json",
    },
  });

  return {
    order: result?.order ? mapOrder(result.order) : null,
    alreadyProcessed: result?.alreadyProcessed ?? false,
  };
}

export async function createOrder(input: CreateOrderInput) {
  const rows = await supabaseRequest<OrderRow[]>("/orders", {
    method: "POST",
    body: {
      plan: input.plan,
      amount_usd: PLAN_PRICES_USD[input.plan],
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      business_name_or_google_maps_link: input.businessNameOrGoogleMapsLink,
      status: "pending",
      nowpayments_order_id: input.nowPaymentsOrderId,
      payment_method_default: input.paymentMethodDefault,
      payment_method_alternatives: input.paymentMethodAlternatives,
    },
    headers: {
      Prefer: "return=representation",
      Accept: "application/json",
    },
  });

  const firstRow = rows?.[0];

  if (!firstRow) {
    throw new Error("Supabase did not return the created order.");
  }

  return mapOrder(firstRow);
}

export async function updateOrderPayment(input: UpdateOrderPaymentInput) {
  const rows = await supabaseRequest<OrderRow[]>(
    `/orders?id=eq.${encodeFilterValue(input.orderId)}`,
    {
      method: "PATCH",
      body: {
        ...(input.invoiceId !== undefined
          ? { nowpayments_invoice_id: input.invoiceId }
          : {}),
        ...(input.invoiceUrl !== undefined
          ? { nowpayments_invoice_url: input.invoiceUrl }
          : {}),
      },
      headers: {
        Prefer: "return=representation",
        Accept: "application/json",
      },
    },
  );

  const firstRow = rows?.[0];

  return firstRow ? mapOrder(firstRow) : null;
}

export async function getOrderById(orderId: string) {
  return getSingleOrderByFilter(`id=eq.${encodeFilterValue(orderId)}`);
}

export async function getOrderByNowPaymentsOrderId(nowPaymentsOrderId: string) {
  return getSingleOrderByFilter(
    `nowpayments_order_id=eq.${encodeFilterValue(nowPaymentsOrderId)}`,
  );
}

export async function markOrderPaid(input: MarkOrderPaidInput) {
  return callOrderRpc("mark_order_paid", {
    p_order_id: input.orderId,
    p_payment_id: input.paymentId,
    p_payment_status: input.paymentStatus,
    p_event_key: input.eventKey,
  });
}

export async function markOrderPaymentFailed(input: MarkOrderFailedInput) {
  return callOrderRpc("mark_order_payment_failed", {
    p_order_id: input.orderId,
    p_payment_id: input.paymentId,
    p_payment_status: input.paymentStatus,
    p_event_key: input.eventKey,
  });
}

export async function markConfirmationEmailSent(orderId: string) {
  const rows = await supabaseRequest<OrderRow[]>(
    `/orders?id=eq.${encodeFilterValue(orderId)}&email_sent=eq.false`,
    {
      method: "PATCH",
      body: {
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      },
      headers: {
        Prefer: "return=representation",
        Accept: "application/json",
      },
    },
  );

  const firstRow = rows?.[0];

  return firstRow ? mapOrder(firstRow) : null;
}

export async function syncOrderPaymentStatus(input: SyncOrderStatusInput) {
  return callOrderRpc("sync_order_payment_status", {
    p_order_id: input.orderId,
    p_payment_id: input.paymentId,
    p_payment_status: input.paymentStatus,
    p_event_key: input.eventKey,
  });
}
