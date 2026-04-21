import { buildMetadata } from "@/lib/seo";
import { getOrderById } from "@/lib/orders";
import { getPlanLabel } from "@/lib/plans";
import PaymentSuccessContent from "./PaymentSuccessContent";

type PaymentSuccessPageProps = {
  searchParams?: {
    orderId?: string;
  };
};

export const metadata = buildMetadata({
  title: "Payment Success | Local Reviews Boost",
  description:
    "Payment confirmation and next steps for your Local Reviews Boost order.",
  path: "/payment-success",
});

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const orderId = searchParams?.orderId?.trim() ?? null;
  const order = orderId ? await getOrderById(orderId) : null;

  const initialOrder = order
    ? {
        id: order.id,
        planLabel: getPlanLabel(order.plan),
        amountUsd: order.amountUsd,
        status: order.status,
        fullName: order.fullName,
        businessNameOrGoogleMapsLink: order.businessNameOrGoogleMapsLink,
        nowPaymentsPaymentStatus: order.nowPaymentsPaymentStatus,
      }
    : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 lg:px-8">
      <PaymentSuccessContent initialOrder={initialOrder} orderId={orderId} />
    </div>
  );
}
