import Link from "next/link";
import { locationGroups } from "@/lib/locations";

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

const whatsappHref =
  "https://wa.me/919971194967?text=Hi%20I%20am%20interested%20in%20your%20services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            Custom Google Reviews
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">
            Helping businesses grow their Google reviews with targeted
            strategies, local SEO content, and clear review growth workflows.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/blog/how-to-get-google-reviews"
              className="text-sm font-medium text-zinc-300 underline underline-offset-4 hover:text-white"
            >
              Review guide
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-zinc-300 underline underline-offset-4 hover:text-white"
            >
              Pricing
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Services
          </h2>
          <ul className="mt-4 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-300 transition hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Locations
          </h2>
          <div className="mt-4 space-y-5">
            {locationGroups.map((group) => (
              <div key={group.country}>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {group.countryLabel}
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-300 transition hover:text-white"
                      >
                        {link.cityName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Contact
          </h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-300">
            <p>WhatsApp support for orders and plan selection.</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M10.03 2a7.96 7.96 0 0 0-6.74 12.4L2.25 18.2l3.9-1.03A7.96 7.96 0 1 0 10.03 2Zm3.6 10.55c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.98-.59-.53-.99-1.18-1.1-1.38-.12-.2-.02-.3.08-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.47-.16-.39-.32-.33-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.69.68-.69 1.65s.71 1.92.81 2.05c.1.13 1.39 2.13 3.38 2.98.47.2.84.32 1.13.41.47.15.91.13 1.25.08.38-.06 1.18-.48 1.34-.94.16-.47.16-.87.11-.95-.05-.08-.18-.13-.38-.23Z" />
              </svg>
              +91 99711 94967
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-400 sm:px-6 lg:px-8">
          Copyright &copy; {year} Custom Google Reviews. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
