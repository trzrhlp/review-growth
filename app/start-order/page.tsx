import Image from "next/image";
import { Mail, ShieldCheck, WalletCards } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { supportEmail } from "@/lib/contact";
import { isPlanName, planNames } from "@/lib/plans";
import OrderForm from "./OrderForm";

const defaultPlan = planNames[0];

type StartOrderPageProps = {
  searchParams?: {
    plan?: string;
    payment?: string;
  };
};

export const metadata = buildMetadata({
  title: "Start Order | Local Reviews Boost",
  description:
    "Start your Local Reviews Boost plan with your selected package and support details.",
  path: "/start-order",
});

function getSelectedPlan(plan?: string) {
  if (!plan) {
    return defaultPlan;
  }

  const normalizedPlan = decodeURIComponent(plan).trim();

  return isPlanName(normalizedPlan) ? normalizedPlan : defaultPlan;
}

export default function StartOrderPage({ searchParams }: StartOrderPageProps) {
  const selectedPlan = getSelectedPlan(searchParams?.plan);
  const paymentWasCancelled = searchParams?.payment === "cancelled";

  return (
    <div className="px-6 py-16 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 px-6 py-8 text-white shadow-[0_28px_70px_-32px_rgba(15,23,42,0.75)] sm:px-8 sm:py-10">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            Secure checkout
          </p>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
            Start Your Plan
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            Share your details first, then continue to secure crypto checkout with
            a fixed USD price.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Prefer email?{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-medium text-white underline underline-offset-4"
            >
              {supportEmail}
            </a>
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            You&apos;ll choose your preferred payment coin or network on the hosted
            checkout page.
          </p>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
            <Image
              src="/checkout-illustration.svg"
              alt="Illustration of secure hosted checkout and plan selection."
              width={760}
              height={520}
              className="w-full"
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <WalletCards aria-hidden="true" className="h-4 w-4 text-emerald-300" />
                Hosted payment
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <Mail aria-hidden="true" className="h-4 w-4 text-amber-300" />
                Confirmation email
              </p>
            </div>
          </div>
        </div>

        <section className="mx-auto w-full max-w-lg rounded-[2rem] border border-zinc-200 bg-white/95 p-6 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)] sm:p-8">

          {paymentWasCancelled ? (
            <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Payment was cancelled. Your order details are still here if you want
              to try again.
            </div>
          ) : null}

          <OrderForm selectedPlan={selectedPlan} />
        </section>
      </section>
    </div>
  );
}
