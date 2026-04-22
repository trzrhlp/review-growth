import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import { blogPostEntries } from "@/lib/blogRegistry";
import { countryEntries, locationEntries } from "@/lib/locations";
import { BookOpenText, MapPinned, NotebookText } from "lucide-react";
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
  path?: string;
};

const serviceLinks = [
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
  {
    name: "Google My Business Review Service",
    href: "/google-my-business-review-service",
  },
];

const blogLinks = blogPostEntries.map((post) => ({
  name: post.title,
  href: post.href,
}));

const featuredCities = locationEntries.filter((location) =>
  ["new-york", "london", "sydney", "chicago"].includes(location.city),
);

const featuredHubs = countryEntries;

export default function BlogPostPage({
  title,
  description,
  sections,
  path = "/blog",
}: BlogPostPageProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: title, path },
            ]}
            className="mb-6"
          />
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            <BookOpenText aria-hidden="true" className="h-4 w-4" />
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
            <section
              key={section.heading}
              className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8"
            >
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
                      className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5"
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

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8">
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
                Country hubs for{" "}
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
                help readers move from a broad market to the city page that
                best matches their growth target.
              </p>
              <p>
                Continue with another guide, then use{" "}
                <Link
                  href="/start-order"
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  the start-order page
                </Link>{" "}
                when you want a direct handoff into a structured plan.
              </p>
              <p>
                Businesses researching this topic still use several names,
                including GMB reviews, Google My Business reviews, and Google
                Business Profile reviews. Many businesses still search for GMB
                reviews, even though Google My Business is now called Google
                Business Profile. The guide keeps the language readable while
                addressing the same local reputation need.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <NotebookText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {link.name}
                </Link>
              ))}
              {featuredCities.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {link.cityName} Reviews
                </Link>
              ))}
              {featuredHubs.map((hub) => (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {hub.countryLabel} Hub
                </Link>
              ))}
              {blogLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <BookOpenText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
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
        intro="These answers help connect the guide to a practical, location-aware review growth strategy."
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-zinc-950 px-8 py-14 text-center text-white shadow-[0_28px_70px_-32px_rgba(15,23,42,0.75)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            Need help improving your review presence?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Move from scattered review requests to a structured plan with clear
            pricing, location targeting, and professional support.
          </p>
          <Button href="/start-order" variant="secondary" className="mt-8">
            Start Your Plan
          </Button>
        </div>
      </section>
    </div>
  );
}
