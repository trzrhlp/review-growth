"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { locationGroups } from "@/lib/locations";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLocationsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.65)] backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="LocalReviewsBoost home"
        >
          <Image
            src="/logo-icon.svg"
            alt="LocalReviewsBoost"
            width={40}
            height={40}
            priority
            className="h-10 w-10 sm:hidden"
          />
          <Image
            src="/logo.svg"
            alt="LocalReviewsBoost"
            width={720}
            height={160}
            priority
            className="hidden h-auto w-[184px] sm:block md:w-[210px]"
          />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 sm:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-site-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>

        <div className="hidden items-center gap-5 sm:flex sm:gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
          >
            Home
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
          >
            Pricing
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
              aria-haspopup="true"
            >
              Locations
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 transition group-hover:rotate-180"
              />
            </button>

            <div className="pointer-events-none invisible absolute right-0 top-full w-[min(34rem,calc(100vw-2rem))] pt-4 opacity-0 transition duration-150 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <div className="grid gap-5 rounded-3xl border border-zinc-200/80 bg-white/95 p-5 shadow-2xl shadow-zinc-950/10 sm:grid-cols-3">
                {locationGroups.map((group) => (
                  <div key={group.country}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-500">
                      {group.countryLabel}
                    </p>
                    <div className="space-y-1">
                      {group.links.map((location) => (
                        <Link
                          key={location.href}
                          href={location.href}
                          className="block rounded-2xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                        >
                          {location.cityName}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-site-menu"
        className={`${isMobileMenuOpen ? "pointer-events-auto grid-rows-[1fr] border-t border-zinc-200 opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"} grid overflow-hidden bg-white/95 shadow-lg shadow-zinc-950/5 transition-[grid-template-rows,opacity] duration-200 sm:hidden`}
      >
        <div className="min-h-0">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="space-y-2">
              <Link
                href="/"
                className="flex min-h-11 items-center rounded-lg px-4 text-base font-medium text-zinc-900 transition hover:bg-zinc-100"
              >
                Home
              </Link>
              <Link
                href="/#pricing"
                className="flex min-h-11 items-center rounded-lg px-4 text-base font-medium text-zinc-900 transition hover:bg-zinc-100"
              >
                Pricing
              </Link>
              <Link
                href="/start-order"
                className="flex min-h-12 items-center rounded-2xl bg-zinc-950 px-4 text-base font-semibold text-white transition hover:bg-zinc-800"
              >
                Start Order
              </Link>
            </div>

            <div className="mt-4 rounded-3xl border border-zinc-200 bg-zinc-50/80">
              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-base font-semibold text-zinc-950"
                aria-expanded={isLocationsOpen}
                aria-controls="mobile-location-links"
                onClick={() => setIsLocationsOpen((open) => !open)}
              >
                Locations
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 transition ${isLocationsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                id="mobile-location-links"
                className={`${isLocationsOpen ? "grid-rows-[1fr] border-t border-zinc-200" : "grid-rows-[0fr]"} grid overflow-hidden transition-[grid-template-rows] duration-200`}
              >
                <div className="min-h-0">
                  <div className="grid gap-5 p-4">
                    {locationGroups.map((group) => (
                      <div key={group.country}>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                          {group.countryLabel}
                        </p>
                        <div className="grid gap-1">
                          {group.links.map((location) => (
                            <Link
                              key={location.href}
                              href={location.href}
                              className="flex min-h-12 items-center rounded-2xl bg-white px-4 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
                            >
                              {location.cityName}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
