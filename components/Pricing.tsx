import Link from "next/link";
import { whatsappHref } from "@/lib/contact";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "For solo operators building a repeatable review habit.",
    features: ["100 review requests", "Email and SMS templates", "Basic reporting"],
  },
  {
    name: "Growth",
    price: "$149",
    description: "For growing teams that need automation and visibility.",
    features: [
      "500 review requests",
      "Automated reminder flows",
      "Team inbox and analytics",
    ],
    featured: true,
  },
  {
    name: "Pro",
    price: "$349",
    description: "For multi-location brands scaling reputation programs.",
    features: [
      "Unlimited review requests",
      "Multi-location dashboards",
      "Priority onboarding",
    ],
  },
];

function getStartOrderHref(planName: string) {
  return `/start-order?plan=${encodeURIComponent(planName)}`;
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-zinc-50 px-6 py-24 lg:px-8">
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

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-lg border bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/70 ${
              plan.featured
                ? "border-zinc-950 shadow-2xl shadow-zinc-300/80"
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
                <span className="rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">
                  Popular
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-zinc-950">
                {plan.price}
              </span>
              <span className="pb-2 text-sm font-medium text-zinc-500">
                /month
              </span>
            </div>

            <ul className="mt-8 space-y-4 text-sm text-zinc-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 mt-8">
              <Link
                href={getStartOrderHref(plan.name)}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-zinc-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
              >
                Buy Now
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contact us on WhatsApp about the ${plan.name} plan`}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-sm transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M16.04 3.2A12.74 12.74 0 0 0 5.26 22.73L3.6 28.8l6.22-1.63A12.74 12.74 0 1 0 16.04 3.2Zm0 23.3a10.52 10.52 0 0 1-5.36-1.47l-.38-.22-3.69.97.99-3.6-.25-.37a10.51 10.51 0 1 1 8.69 4.69Zm5.77-7.88c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.31-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.64s1.13 3.06 1.29 3.27c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.88-.77 2.14-1.51.26-.75.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
