import Link from "next/link";
import { locationEntries } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Google Review Growth Blog | Local Reviews Boost",
  description:
    "Practical guides for getting more Google reviews, increasing review volume, and improving Google ratings for local businesses.",
  path: "/blog",
});

const posts = [
  {
    title: "How to Get Google Reviews",
    href: "/blog/how-to-get-google-reviews",
    description:
      "Build a steady review request process that is easy for customers and useful for local SEO.",
  },
  {
    title: "How to Increase Google Reviews",
    href: "/blog/how-to-increase-google-reviews",
    description:
      "Create a repeatable workflow for increasing Google reviews without spammy tactics.",
  },
  {
    title: "How to Improve Google Rating",
    href: "/blog/how-to-improve-google-rating",
    description:
      "Improve ratings by fixing customer experience gaps and asking satisfied customers consistently.",
  },
];

const serviceLinks = [
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
];

const featuredCities = locationEntries.filter((location) =>
  ["new-york", "london"].includes(location.city),
);

export default function BlogIndexPage() {
  return (
    <div className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Blog
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
          Google review growth guides for local businesses.
        </h1>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="rounded-lg border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/70"
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
        <section className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
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
          </div>
        </section>
      </div>
    </div>
  );
}
