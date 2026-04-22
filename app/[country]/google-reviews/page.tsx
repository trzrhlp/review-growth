import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import { blogPostEntries } from "@/lib/blogRegistry";
import { buildMetadata } from "@/lib/seo";
import { countryEntries, getCountryEntry } from "@/lib/locations";
import { BookOpenText, MapPinned, NotebookText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    country: string;
  };
};

const serviceLinks = [
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Increase Google Reviews", href: "/increase-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
];

export function generateStaticParams() {
  return countryEntries.map((country) => ({ country: country.country }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const country = getCountryEntry(params.country);

  if (!country) {
    return buildMetadata({
      title: "Google Review Growth | Local Reviews Boost",
      description:
        "Explore location-based Google review growth pages across supported countries and cities.",
    });
  }

  return buildMetadata({
    title: `${country.hubTitle} | Local Reviews Boost`,
    description: country.hubDescription,
    path: country.href,
  });
}

export default function CountryHubPage({ params }: PageProps) {
  const country = getCountryEntry(params.country);

  if (!country) {
    notFound();
  }

  const featuredBlogs = blogPostEntries.slice(3, 7);

  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: `${country.countryLabel} Reviews`, path: country.href },
            ]}
            className="mb-6"
          />
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            <MapPinned aria-hidden="true" className="h-4 w-4" />
            {country.countryName}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            Grow Google reviews across {country.countryName}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {country.cityDescription} This hub connects the city pages, service
            pages, and practical guides that matter most for businesses working
            in {country.countryName}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/start-order">Start Your Plan</Button>
            <Button href="/blog" variant="secondary">
              Read the guides
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            [
              "Country-level intent",
              `Use ${country.countryLabel} location pages to keep review growth tied to the cities where buyers are already comparing options.`,
            ],
            [
              "Useful internal links",
              `Connect city pages, service pages, and blog posts so visitors can move from research into action without losing context.`,
            ],
            [
              "Local trust coverage",
              `Support ${country.businessFocus} with review content that reflects real customer expectations in competitive local searches.`,
            ],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)]"
            >
              <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
              <p className="mt-3 leading-7 text-zinc-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)]">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              City pages in {country.countryName}
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-700">
              Use these city routes to target local demand with the same URL
              structure, service framing, and review-growth intent. Each page
              links back to this hub and outward to related service and blog
              content.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {country.links.map((location) => (
                <Link
                  key={location.href}
                  href={location.href}
                  className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 px-5 py-5 transition hover:-translate-y-1 hover:border-zinc-300 hover:bg-white"
                >
                  <p className="text-lg font-semibold text-zinc-950">
                    {location.cityName}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {country.competitiveNote}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-2xl font-semibold text-zinc-950">
                Related services
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                  >
                    <NotebookText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-2xl font-semibold text-zinc-950">
                High-intent guides
              </h2>
              <div className="mt-5 space-y-3">
                {featuredBlogs.map((post) => (
                  <Link
                    key={post.href}
                    href={post.href}
                    className="block rounded-[1.5rem] border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:bg-zinc-100"
                  >
                    <p className="text-base font-semibold text-zinc-950">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {post.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <FAQ
        className="bg-zinc-50"
        title={`${country.countryLabel} review growth questions`}
        intro={`Useful answers for businesses building review visibility across ${country.countryName}.`}
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-zinc-950 px-8 py-14 text-center text-white shadow-[0_28px_70px_-32px_rgba(15,23,42,0.75)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            Need a cleaner review growth plan for {country.countryName}?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Use the country hub to compare cities, then move into a structured
            service plan when the market and timing are clear.
          </p>
          <Button href="/start-order" variant="secondary" className="mt-8">
            Start Your Plan
          </Button>
        </div>
      </section>
    </div>
  );
}
