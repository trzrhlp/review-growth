import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import { whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Local Reviews Boost | Grow Your Google Reviews",
  description:
    "Grow your Google reviews with location-based strategies that improve trust, visibility, and local rankings.",
  path: "/",
});

const howItWorks = [
  {
    title: "Choose a plan",
    description:
      "Pick the review growth package that matches your current goals, market, and pace.",
    icon: "01",
  },
  {
    title: "Share your details",
    description:
      "Share your Google Business Profile link, location focus, and customer feedback priorities.",
    icon: "02",
  },
  {
    title: "Launch a structured plan",
    description:
      "Use a measured review growth and reputation management process that supports steady progress over time.",
    icon: "03",
  },
];

const advantages = [
  "Location targeting",
  "Reputation management",
  "Customer feedback strategy",
  "Review generation support",
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />

      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              A simple path from plan to review growth.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howItWorks.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-zinc-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-zinc-950">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Why choose us
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Built for local trust, not short-term noise.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Local Reviews Boost focuses on review growth, reputation
              management, and local review visibility that help businesses earn
              confidence where customers are actively comparing options.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <div
                key={advantage}
                className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.26a1 1 0 0 1-1.42 0L3.29 9.124A1 1 0 1 1 4.71 7.716l4.09 4.12 6.49-6.54a1 1 0 0 1 1.414-.006Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="text-lg font-semibold text-zinc-950">
                  {advantage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 text-center sm:grid-cols-2">
          {[
            ["500+", "Businesses Supported"],
            ["10,000+", "Feedback Touchpoints Guided"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg bg-zinc-950 p-10 text-white">
              <p className="text-5xl font-semibold tracking-tight">{value}</p>
              <p className="mt-3 text-lg text-zinc-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing />

      <FAQ className="bg-white" />

      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg bg-zinc-950 px-8 py-14 text-center shadow-2xl shadow-zinc-300">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Improve your review presence with a focused plan.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Choose a review growth strategy built around your location,
            service category, and customer feedback goals.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/start-order" variant="secondary">
              Get Started
            </Button>
            <Button
              href={whatsappHref}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
