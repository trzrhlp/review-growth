import Button from "@/components/Button";
import FAQ, { type FAQItem } from "@/components/FAQ";
import { locationEntries } from "@/lib/locations";
import Link from "next/link";

type ArticleSection = {
  heading: string;
  body: readonly string[];
};

type ArticlePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly ArticleSection[];
  ctaTitle: string;
  ctaText: string;
  faqs?: readonly FAQItem[];
};

const serviceLinks = [
  { name: "Custom Google Reviews", href: "/custom-google-reviews" },
  {
    name: "Google My Business Review Service",
    href: "/google-my-business-review-service",
  },
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Increase Google Reviews", href: "/increase-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
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
  ["new-york", "london", "sydney", "los-angeles"].includes(location.city),
);

export default function ArticlePage({
  eyebrow,
  title,
  intro,
  sections,
  ctaTitle,
  ctaText,
  faqs,
}: ArticlePageProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/start-order">Start Order</Button>
            <Button href="/#pricing" variant="secondary">
              View Pricing
            </Button>
          </div>
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
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-2xl font-semibold text-zinc-950">
              Connect services, cities, and guides
            </h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-zinc-700">
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
                often compare review recency, service detail, and local trust
                before they enquire, while brands in{" "}
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
                need the same proof in fast-moving local searches.
              </p>
              <p>
                Compare core service pages like{" "}
                <Link
                  href={serviceLinks[2].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {serviceLinks[2].name}
                </Link>{" "}
                and{" "}
                <Link
                  href={serviceLinks[4].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {serviceLinks[4].name}
                </Link>{" "}
                with practical guides such as{" "}
                <Link
                  href={blogLinks[0].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {blogLinks[0].name}
                </Link>{" "}
                and{" "}
                <Link
                  href={blogLinks[2].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {blogLinks[2].name}
                </Link>{" "}
                so visitors can move naturally from research to the right order
                path.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  {link.name}
                </Link>
              ))}
              {blogLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <FAQ
        items={faqs}
        className="bg-zinc-50"
        intro="Use these answers to plan a safer, more realistic review growth campaign before you order."
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg bg-zinc-950 px-8 py-14 text-center text-white shadow-2xl shadow-zinc-300">
          <h2 className="text-4xl font-semibold tracking-tight">{ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            {ctaText}
          </p>
          <Button href="/start-order" variant="secondary" className="mt-8">
            Get professional help
          </Button>
        </div>
      </section>
    </div>
  );
}
