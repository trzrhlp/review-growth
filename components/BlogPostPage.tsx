import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import { locationEntries } from "@/lib/locations";
import Link from "next/link";

type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly { title: string; text: string }[];
};

type BlogPostPageProps = {
  title: string;
  description: string;
  sections: readonly BlogSection[];
};

const serviceLinks = [
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
  {
    name: "Google My Business Review Service",
    href: "/google-my-business-review-service",
  },
];

const blogLinks = [
  {
    name: "How to Get Google Reviews",
    href: "/blog/how-to-get-google-reviews",
  },
  {
    name: "How to Increase Google Reviews",
    href: "/blog/how-to-increase-google-reviews",
  },
  {
    name: "How to Improve Google Rating",
    href: "/blog/how-to-improve-google-rating",
  },
];

const featuredCities = locationEntries.filter((location) =>
  ["new-york", "london", "sydney", "chicago"].includes(location.city),
);

export default function BlogPostPage({
  title,
  description,
  sections,
}: BlogPostPageProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Review growth guide
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600">
            {description}
          </p>
        </div>
      </section>

      <article className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.points ? (
                <div className="mt-7 space-y-4">
                  {section.points.map((point) => (
                    <div
                      key={point.title}
                      className="rounded-lg border border-zinc-200 bg-zinc-50 p-5"
                    >
                      <h3 className="text-xl font-semibold text-zinc-950">
                        {point.title}
                      </h3>
                      <p className="mt-2 leading-7 text-zinc-600">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-950">
              Turn the guide into a plan
            </h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                Readers comparing review growth options can move from strategy
                into service pages such as{" "}
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
                without losing context.
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
                often need local proof first, while campaigns in{" "}
                <Link
                  href={featuredCities[2].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {featuredCities[2].cityName}
                </Link>{" "}
                and{" "}
                <Link
                  href={featuredCities[3].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {featuredCities[3].cityName}
                </Link>{" "}
                benefit from city pages that explain competition, review pace,
                and local search pressure.
              </p>
              <p>
                Continue with another guide, then use{" "}
                <Link
                  href="/start-order"
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  the start-order page
                </Link>{" "}
                when you want a direct handoff into a structured campaign.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {link.name}
                </Link>
              ))}
              {featuredCities.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {link.cityName} Reviews
                </Link>
              ))}
              {blogLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <FAQ
        className="bg-zinc-50"
        title="Review growth questions"
        intro="These answers help connect the guide to a practical, location-aware Google review strategy."
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg bg-zinc-950 px-8 py-14 text-center text-white shadow-2xl shadow-zinc-300">
          <h2 className="text-4xl font-semibold tracking-tight">
            Need faster results? Get professional help.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Move from scattered review requests to a structured campaign with
            clear pricing, location targeting, and a simple order flow.
          </p>
          <Button href="/start-order" variant="secondary" className="mt-8">
            Start Order
          </Button>
        </div>
      </section>
    </div>
  );
}
