import Link from "next/link";
import { Mail, MapPinned, MessageCircleMore, ShieldCheck, Sparkles } from "lucide-react";
import {
  supportEmail,
  whatsappDisplayNumber,
  whatsappHref,
} from "@/lib/contact";
import { locationGroups } from "@/lib/locations";

const serviceLinks = [
  { name: "Local Reviews Boost", href: "/custom-google-reviews" },
  {
    name: "Google My Business Review Service",
    href: "/google-my-business-review-service",
  },
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Increase Google Reviews", href: "/increase-google-reviews" },
  { name: "Google Review Service", href: "/google-review-service" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms and Conditions", href: "/terms-and-conditions" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Local Reviews Boost
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
              Helping businesses improve review growth, reputation management,
              and local review visibility with clear, practical support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-200">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 px-4 py-2">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" />
              Trust
            </span>
            <span className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 px-4 py-2">
              <MapPinned aria-hidden="true" className="h-4 w-4 text-amber-300" />
              Locations
            </span>
            <span className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 px-4 py-2">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              Review growth
            </span>
          </div>
        </div>

        <div className="grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-6">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            Local Reviews Boost
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">
            Helping businesses improve review growth, reputation management,
            and local review visibility with clear, practical support.
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
                  className="inline-flex min-h-11 items-center py-1 text-sm text-zinc-300 transition hover:text-white sm:min-h-0 sm:py-0"
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
                  <Link href={group.href} className="hover:text-white">
                    {group.countryLabel}
                  </Link>
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center py-1 text-sm text-zinc-300 transition hover:text-white sm:min-h-0 sm:py-0"
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
            <p>WhatsApp support for plan questions and setup guidance.</p>
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex min-h-11 items-center gap-2 text-zinc-300 transition hover:text-white sm:min-h-0"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {supportEmail}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-700 px-4 py-2 font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              <MessageCircleMore aria-hidden="true" className="h-4 w-4" />
              {whatsappDisplayNumber}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Company
          </h2>
          <ul className="mt-4 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center py-1 text-sm text-zinc-300 transition hover:text-white sm:min-h-0 sm:py-0"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Trust
          </h2>
          <ul className="mt-4 space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center py-1 text-sm text-zinc-300 transition hover:text-white sm:min-h-0 sm:py-0"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-400 sm:px-6 lg:px-8">
          Copyright &copy; {year} Local Reviews Boost. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
