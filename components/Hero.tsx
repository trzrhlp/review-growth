import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1fr_0.86fr] lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="mb-5 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">
            Location-based Google review growth
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            Grow Your Google Reviews with Targeted, Location-Based Strategies
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 lg:mx-0">
            Increase trust, visibility, and local rankings with gradual,
            customized review growth.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href="/start-order">Get Started</Button>
            <Button href="#pricing" variant="secondary">
              View Pricing
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-2xl shadow-zinc-200/70">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
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
                ["Gradual delivery", "Paced for natural review growth", "Planned"],
                ["Support", "Order details reviewed before launch", "Ready"],
              ].map(([title, detail, status]) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-4 rounded-lg border border-zinc-100 p-4"
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
