import Image from "next/image";
import { BarChart3, MapPinned, ShieldCheck, Star } from "lucide-react";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.18),transparent_60%)]" />
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-teal-700" />
            Review growth and reputation management
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            Strengthen Your Review Presence with Local Reputation Support
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 lg:mx-0">
            Improve trust, local review visibility, and customer confidence
            with a structured, location-aware strategy for GMB reviews, Google
            My Business reviews, and Google Business Profile reviews.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {[
              { icon: Star, label: "Reviews" },
              { icon: MapPinned, label: "Locations" },
              { icon: BarChart3, label: "Growth" },
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
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href="/start-order">Get Started</Button>
            <Button href="#pricing" variant="secondary">
              View Pricing
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.5rem] border border-zinc-100">
              <Image
                src="/review-growth-dashboard.svg"
                alt="Illustration of local review growth metrics and location planning."
                width={720}
                height={420}
                priority
                className="w-full bg-zinc-50"
              />
            </div>
            <div className="mt-5 flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  Local review campaign
                </p>
                <p className="mt-1 text-2xl font-semibold text-zinc-950">
                  4.9 rating
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                +38% MoM
              </span>
            </div>

            <div className="grid gap-4 py-5 sm:grid-cols-3">
              {[
                ["Markets", "11"],
                ["Businesses", "500+"],
                ["Reviews", "10k+"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-zinc-50 p-4">
                  <p className="text-sm text-zinc-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                ["Location targeting", "Campaign focus matched to your city", "Active"],
                ["Review pacing", "Planned for steady, credible growth", "Planned"],
                ["Support", "Plan details reviewed before launch", "Ready"],
              ].map(([title, detail, status]) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4"
                >
                  <div>
                    <p className="font-medium text-zinc-950">{title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{detail}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
