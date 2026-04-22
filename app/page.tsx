import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import { CheckCircle2, MapPinned, ShieldCheck, Star } from "lucide-react";
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
    icon: MapPinned,
  },
  {
    title: "Share your details",
    description:
      "Share your Google Business Profile link, location focus, and the customer feedback priorities behind your Google Business Profile reviews.",
    icon: ShieldCheck,
  },
  {
    title: "Launch a structured plan",
    description:
      "Use a measured review growth and reputation management process that supports steady progress over time.",
    icon: Star,
  },
];

const advantages = [
  { title: "Location targeting", icon: MapPinned },
  { title: "Reputation management", icon: ShieldCheck },
  { title: "Customer feedback strategy", icon: CheckCircle2 },
  { title: "Review generation support", icon: Star },
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
                className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_60px_-34px_rgba(15,23,42,0.35)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-bold text-white">
                  <step.icon aria-hidden="true" className="h-5 w-5" />
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
              confidence where customers are actively comparing options. Many
              owners still describe this work as GMB reviews or Google My
              Business reviews, even though the current profile name is Google
              Business Profile. Many businesses still search for GMB reviews,
              even though Google My Business is now called Google Business
              Profile.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <div
                key={advantage.title}
                className="flex items-center gap-4 rounded-[1.5rem] border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <advantage.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="text-lg font-semibold text-zinc-950">
                  {advantage.title}
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
            <div
              key={label}
              className="rounded-[2rem] bg-zinc-950 p-10 text-white shadow-[0_28px_70px_-36px_rgba(15,23,42,0.75)]"
            >
              <p className="text-5xl font-semibold tracking-tight">{value}</p>
              <p className="mt-3 text-lg text-zinc-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing />

      <FAQ className="bg-white" />

      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-zinc-950 px-8 py-14 text-center shadow-[0_28px_70px_-32px_rgba(15,23,42,0.75)]">
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
