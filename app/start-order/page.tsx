import { buildMetadata } from "@/lib/seo";
import { supportEmail } from "@/lib/contact";
import OrderForm from "./OrderForm";

const planNames = ["Starter", "Growth", "Pro"] as const;
const defaultPlan = planNames[0];

type StartOrderPageProps = {
  searchParams?: {
    plan?: string;
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

  return planNames.find((planName) => planName === normalizedPlan) ?? normalizedPlan;
}

export default function StartOrderPage({ searchParams }: StartOrderPageProps) {
  const selectedPlan = getSelectedPlan(searchParams?.plan);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 lg:px-8">
      <section className="mx-auto w-full max-w-lg rounded-lg border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/60 sm:p-8">
        <div className="rounded-lg border border-zinc-200 bg-zinc-950 px-5 py-4 text-center text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
            Selected plan
          </p>
          <p className="mt-1 text-2xl font-semibold">{selectedPlan}</p>
        </div>

        <h1 className="mt-8 text-center text-3xl font-semibold text-zinc-950 sm:text-4xl">
          Start Your Plan
        </h1>
        <p className="mt-4 text-center text-base leading-7 text-zinc-600">
          Share your details and continue on WhatsApp for onboarding guidance.
        </p>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Prefer email?{" "}
          <a
            href={`mailto:${supportEmail}`}
            className="font-medium text-zinc-700 underline underline-offset-4"
          >
            {supportEmail}
          </a>
        </p>

        <OrderForm selectedPlan={selectedPlan} />
      </section>
    </div>
  );
}
