import Link from "next/link";
import { BookOpenText, MapPinned, NotebookText } from "lucide-react";
import { blogPostEntries } from "@/lib/blogRegistry";
import { countryEntries, locationEntries } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Google Review Growth Blog | Local Reviews Boost",
  description:
    "Practical guides for getting more Google reviews, increasing review volume, and improving Google ratings for local businesses.",
  path: "/blog",
});

const serviceLinks = [
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
];

const featuredCities = locationEntries.filter((location) =>
  ["new-york", "london"].includes(location.city),
);

const featuredHubs = countryEntries;

export default function BlogIndexPage() {
  return (
    <div className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          <BookOpenText aria-hidden="true" className="h-4 w-4" />
          Blog
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
          Google review growth guides for local businesses.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
          Read practical guidance for GMB reviews, Google My Business reviews,
          and Google Business Profile reviews without losing the thread between
          strategy, pricing, and the next action. Many businesses still search
          for GMB reviews, even though Google My Business is now called Google
          Business Profile.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPostEntries.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_60px_-34px_rgba(15,23,42,0.35)]"
            >
              <h2 className="text-2xl font-semibold text-zinc-950">
                {post.title}
              </h2>
              <p className="mt-4 leading-7 text-zinc-600">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
        <section className="mt-16 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Keep the research connected
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-zinc-700">
            <p>
              After reading the guides, compare{" "}
              <Link
                href={serviceLinks[0].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {serviceLinks[0].name}
              </Link>{" "}
              and{" "}
              <Link
                href={serviceLinks[1].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {serviceLinks[1].name}
              </Link>{" "}
              to see how a structured plan fits into a wider review growth
              strategy.
            </p>
            <p>
              Businesses in{" "}
              <Link
                href={featuredCities[0].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {featuredCities[0].cityName}
              </Link>{" "}
              and{" "}
              <Link
                href={featuredCities[1].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {featuredCities[1].cityName}
              </Link>{" "}
              can also use the city pages to match review strategy with local
              competition before they head to{" "}
              <Link
                href="/start-order"
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                the start-order page
              </Link>
              .
            </p>
            <p>
              The related guides and service pages also reflect the language
              businesses still use in search, including GMB reviews, Google My
              Business reviews, and Google Business Profile reviews.
            </p>
            <p>
              Browse broader market pages for{" "}
              <Link
                href={featuredHubs[0].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {featuredHubs[0].countryLabel}
              </Link>
              ,{" "}
              <Link
                href={featuredHubs[1].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {featuredHubs[1].countryLabel}
              </Link>
              , and{" "}
              <Link
                href={featuredHubs[2].href}
                className="font-semibold text-zinc-950 underline underline-offset-4"
              >
                {featuredHubs[2].countryLabel}
              </Link>{" "}
              when you want city-level review growth options grouped by country.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={serviceLinks[0].href}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <NotebookText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
              {serviceLinks[0].name}
            </Link>
            <Link
              href={serviceLinks[1].href}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <NotebookText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
              {serviceLinks[1].name}
            </Link>
            {featuredCities.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
              >
                <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                {city.cityName} Reviews
              </Link>
            ))}
            {featuredHubs.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
              >
                <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                {hub.countryLabel} Hub
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
