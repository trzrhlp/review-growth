import Breadcrumbs from "@/components/Breadcrumbs";
import { BadgeCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About | Local Reviews Boost",
  description:
    "Learn how Local Reviews Boost helps local businesses improve review growth, reputation management, and customer feedback strategy with compliant support.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-200 bg-white/95 p-8 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.5)] sm:p-10">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
          className="mb-6"
        />
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" />
          About
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
          Local Reviews Boost
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-700">
          <p>
            Local Reviews Boost helps local businesses improve review growth,
            reputation management, customer feedback strategy, and local review
            visibility through practical, compliant support.
          </p>
          <p>
            The focus is not on shortcuts or inflated claims. The service is
            designed to help teams build stronger review workflows, improve how
            genuine customer feedback is collected, and connect review activity
            with the wider local search journey.
          </p>
          <p>
            That means aligning service pages, city pages, educational content,
            pricing, and onboarding so business owners can move from research to
            a clear next step without confusion. Clear communication, realistic
            pacing, and useful guidance stay at the center of the process.
          </p>
          <p>
            Local Reviews Boost works best for businesses that want a more
            organized approach to reputation growth and customer feedback
            planning across one market or several target locations.
          </p>
        </div>
      </div>
    </div>
  );
}
