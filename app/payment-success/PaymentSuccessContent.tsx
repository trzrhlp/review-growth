"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Clock3 } from "lucide-react";
import Button from "@/components/Button";
import { whatsappNumber } from "@/lib/contact";
import AutoRedirectToWhatsApp from "./AutoRedirectToWhatsApp";

type PaymentSuccessContentProps = {
  initialOrder: {
    id: string;
    planLabel: string;
    amountUsd: number;
    status: string;
    fullName: string;
    businessNameOrGoogleMapsLink: string;
    nowPaymentsPaymentStatus: string | null;
  } | null;
  orderId: string | null;
};

type OrderStatusResponse = {
  id: string;
  planLabel: string;
  amountUsd: number;
  status: string;
  fullName: string;
  businessNameOrGoogleMapsLink: string;
  nowPaymentsPaymentStatus: string | null;
};

const nextSteps = [
  "Our team will review your business details and prepare onboarding.",
  "We may contact you by email or WhatsApp if any clarification is needed.",
  "Reply to the confirmation email if you want to add more context before we begin.",
];

function buildWhatsAppUrl(order: OrderStatusResponse | null) {
  if (!order || order.status !== "paid") {
    return "";
  }

  const message = [
    "Hi Local Reviews Boost, my payment is confirmed.",
    `Order ID: ${order.id}`,
    `Plan: ${order.planLabel}`,
    `Amount: $${order.amountUsd} USD`,
    `Name: ${order.fullName}`,
    `Business / Google Maps link: ${order.businessNameOrGoogleMapsLink}`,
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function PaymentSuccessContent({
  initialOrder,
  orderId,
}: PaymentSuccessContentProps) {
  const [order, setOrder] = useState<OrderStatusResponse | null>(initialOrder);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!orderId || order?.status === "paid" || order?.status === "payment_failed") {
      return;
    }

    const currentOrderId = orderId;
    let isCancelled = false;

    async function pollOrder() {
      setIsRefreshing(true);

      try {
        const response = await fetch(
          `/api/orders?orderId=${encodeURIComponent(currentOrderId)}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as OrderStatusResponse;

        if (!isCancelled) {
          setOrder(payload);
        }
      } finally {
        if (!isCancelled) {
          setIsRefreshing(false);
        }
      }
    }

    const interval = window.setInterval(() => {
      void pollOrder();
    }, 4000);

    void pollOrder();

    return () => {
      isCancelled = true;
      window.clearInterval(interval);
    };
  }, [order?.status, orderId]);

  const whatsappUrl = buildWhatsAppUrl(order);
  const isPaid = order?.status === "paid";
  const isFailed = order?.status === "payment_failed";

  return (
    <section className="mx-auto w-full max-w-2xl rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)] sm:p-10">
      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {isPaid ? (
          <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" />
        ) : (
          <Clock3 aria-hidden="true" className="h-4 w-4 text-amber-600" />
        )}
        Local Reviews Boost
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-zinc-950 sm:text-4xl">
        {isPaid ? "Payment confirmed" : "Payment received, awaiting confirmation"}
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-600">
        {isPaid
          ? "Your order has been marked as paid. A confirmation email is on its way, and our team will use the details you submitted to prepare onboarding."
          : "You have returned from the hosted payment page. This page will update automatically as soon as NOWPayments confirms the transaction."}
      </p>

      {isFailed ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          The payment did not complete successfully. Please return to checkout and
          try again.
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Selected plan
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">
            {order?.planLabel ?? "Pending"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Amount
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">
            {typeof order?.amountUsd === "number" ? `$${order.amountUsd} USD` : "Pending"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-950">Next steps</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
          {nextSteps.map((step) => (
            <li key={step} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {order?.nowPaymentsPaymentStatus ? (
        <p className="mt-6 text-sm text-zinc-500">
          Current payment status: {order.nowPaymentsPaymentStatus}
          {isRefreshing ? " ..." : ""}
        </p>
      ) : null}

      {isPaid && whatsappUrl ? (
        <>
          <AutoRedirectToWhatsApp whatsappUrl={whatsappUrl} enabled />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappUrl} variant="whatsapp">
              Continue on WhatsApp
            </Button>
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/start-order" variant="secondary">
            Return to Checkout
          </Button>
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      )}
    </section>
  );
}
