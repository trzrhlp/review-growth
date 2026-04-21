import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PLAN_PRICES_USD, type PlanName } from "@/lib/plans";

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
  emailSentAt: string | null;
};

type OrderStoreShape = {
  orders: OrderRecord[];
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
  paymentStatus: string;
  eventKey: string;
};

type SyncOrderStatusInput = {
  orderId: string;
  paymentId: string | null;
  paymentStatus: string;
  eventKey: string;
};

const dataDirectory = path.join(process.cwd(), ".data");
const storePath = path.join(dataDirectory, "orders.json");

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(storePath, "utf8");
  } catch {
    const initialStore: OrderStoreShape = { orders: [] };
    await writeFile(storePath, JSON.stringify(initialStore, null, 2), "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await readFile(storePath, "utf8");
  const parsed = JSON.parse(raw) as Partial<OrderStoreShape>;

  return {
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
  } satisfies OrderStoreShape;
}

async function writeStore(store: OrderStoreShape) {
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function createOrder(input: CreateOrderInput) {
  const store = await readStore();
  const timestamp = new Date().toISOString();
  const order: OrderRecord = {
    id: crypto.randomUUID(),
    plan: input.plan,
    amountUsd: PLAN_PRICES_USD[input.plan],
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    businessNameOrGoogleMapsLink: input.businessNameOrGoogleMapsLink,
    status: "pending",
    createdAt: timestamp,
    updatedAt: timestamp,
    paidAt: null,
    nowPaymentsOrderId: input.nowPaymentsOrderId,
    nowPaymentsInvoiceId: null,
    nowPaymentsPaymentId: null,
    nowPaymentsInvoiceUrl: null,
    nowPaymentsPaymentStatus: null,
    lastWebhookEventKey: null,
    paymentMethodDefault: input.paymentMethodDefault,
    paymentMethodAlternatives: input.paymentMethodAlternatives,
    emailSentAt: null,
  };

  store.orders.push(order);
  await writeStore(store);

  return order;
}

export async function updateOrderPayment(
  input: UpdateOrderPaymentInput,
) {
  const store = await readStore();
  const order = store.orders.find((entry) => entry.id === input.orderId);

  if (!order) {
    return null;
  }

  order.nowPaymentsInvoiceId = input.invoiceId ?? order.nowPaymentsInvoiceId;
  order.nowPaymentsInvoiceUrl = input.invoiceUrl ?? order.nowPaymentsInvoiceUrl;
  order.updatedAt = new Date().toISOString();

  await writeStore(store);

  return order;
}

export async function getOrderById(orderId: string) {
  const store = await readStore();
  return store.orders.find((order) => order.id === orderId) ?? null;
}

export async function getOrderByNowPaymentsOrderId(nowPaymentsOrderId: string) {
  const store = await readStore();
  return (
    store.orders.find((order) => order.nowPaymentsOrderId === nowPaymentsOrderId) ??
    null
  );
}

export async function markOrderPaid(input: MarkOrderPaidInput) {
  const store = await readStore();
  const order = store.orders.find((entry) => entry.id === input.orderId);

  if (!order) {
    return { order: null, alreadyProcessed: false };
  }

  if (order.lastWebhookEventKey === input.eventKey) {
    return { order, alreadyProcessed: true };
  }

  order.status = "paid";
  order.paidAt = order.paidAt ?? new Date().toISOString();
  order.updatedAt = new Date().toISOString();
  order.nowPaymentsPaymentId = input.paymentId ?? order.nowPaymentsPaymentId;
  order.nowPaymentsPaymentStatus = input.paymentStatus;
  order.lastWebhookEventKey = input.eventKey;

  await writeStore(store);

  return { order, alreadyProcessed: false };
}

export async function markOrderPaymentFailed(input: MarkOrderFailedInput) {
  const store = await readStore();
  const order = store.orders.find((entry) => entry.id === input.orderId);

  if (!order) {
    return { order: null, alreadyProcessed: false };
  }

  if (order.lastWebhookEventKey === input.eventKey) {
    return { order, alreadyProcessed: true };
  }

  if (order.status !== "paid") {
    order.status = "payment_failed";
  }

  order.updatedAt = new Date().toISOString();
  order.nowPaymentsPaymentStatus = input.paymentStatus;
  order.lastWebhookEventKey = input.eventKey;

  await writeStore(store);

  return { order, alreadyProcessed: false };
}

export async function markConfirmationEmailSent(orderId: string) {
  const store = await readStore();
  const order = store.orders.find((entry) => entry.id === orderId);

  if (!order) {
    return null;
  }

  order.emailSentAt = new Date().toISOString();
  order.updatedAt = new Date().toISOString();

  await writeStore(store);

  return order;
}

export async function syncOrderPaymentStatus(input: SyncOrderStatusInput) {
  const store = await readStore();
  const order = store.orders.find((entry) => entry.id === input.orderId);

  if (!order) {
    return { order: null, alreadyProcessed: false };
  }

  if (order.lastWebhookEventKey === input.eventKey) {
    return { order, alreadyProcessed: true };
  }

  order.updatedAt = new Date().toISOString();
  order.nowPaymentsPaymentId = input.paymentId ?? order.nowPaymentsPaymentId;
  order.nowPaymentsPaymentStatus = input.paymentStatus;
  order.lastWebhookEventKey = input.eventKey;

  await writeStore(store);

  return { order, alreadyProcessed: false };
}
