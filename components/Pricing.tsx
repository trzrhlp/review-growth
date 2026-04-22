import Link from "next/link";
import { Check, CircleDollarSign, MapPinned, MessageCircleMore, ShieldCheck, Star } from "lucide-react";
import { whatsappHref } from "@/lib/contact";

const plans = [
  {
    name: "Starter Pack",
    planKey: "Starter",
    price: "$50",
    description: "10 Google Business Profile reviews for businesses testing a smaller launch.",
    features: [
      "10 reviews",
      "Clear starter option for smaller campaigns",
      "Secure crypto checkout with WhatsApp follow-up",
    ],
  },
  {
    name: "Growth Pack",
    planKey: "Growth",
    price: "$99",
    description:
      "20 Google My Business reviews for teams that want stronger month-to-month momentum.",
    features: [
      "20 reviews",
      "Balanced package for steady review growth",
      "Designed for local reputation campaigns",
    ],
    featured: true,
  },
  {
    name: "Pro Pack",
    planKey: "Pro",
    price: "$199",
    description:
      "50 GMB reviews for businesses that need the strongest package and broader visibility support.",
    features: [
      "50 reviews",
      "Best fit for aggressive local trust goals",
      "Built for higher-volume review growth",
    ],
  },
];

function getStartOrderHref(planName: string) {
  return `/start-order?plan=${encodeURIComponent(planName)}`;
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="border-y border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(244,244,245,0.9))] px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Pricing
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Plans built for reputation growth.
        </h2>
        <p className="mt-5 text-lg leading-8 text-zinc-600">
          Start with the workflow you need today and upgrade as your locations,
          teams, and customer feedback goals grow.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
        {[
          { icon: CircleDollarSign, label: "Fixed USD pricing" },
          { icon: ShieldCheck, label: "Secure checkout" },
          { icon: MapPinned, label: "Location-aware support" },
        ].map((item) => (
          <span
            key={item.label}
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm"
          >
            <item.icon aria-hidden="true" className="h-4 w-4 text-zinc-950" />
            {item.label}
          </span>
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`flex h-full flex-col rounded-[2rem] border bg-white/95 p-8 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.4)] transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.35)] ${
              plan.featured
                ? "border-zinc-950 ring-1 ring-zinc-950/10"
                : "border-zinc-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-zinc-950">
                  {plan.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {plan.description}
                </p>
              </div>
              {plan.featured ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">
                  <Star aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
                  Popular
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-zinc-950">
                {plan.price}
              </span>
              <span className="pb-2 text-sm font-medium text-zinc-500">USD</span>
            </div>

            <ul className="mt-8 flex-1 space-y-4 text-sm text-zinc-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getStartOrderHref(plan.planKey)}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
              >
                Buy Now
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contact us on WhatsApp about the ${plan.name}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 text-zinc-950 shadow-sm transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:w-auto"
              >
                <MessageCircleMore aria-hidden="true" className="h-5 w-5" />
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
