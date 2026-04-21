import Link from "next/link";
import { locationGroups } from "@/lib/locations";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 shadow-sm shadow-zinc-200/70 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl"
        >
          Local Reviews Boost
        </Link>

        <div className="flex items-center gap-5 sm:gap-8">
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
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition group-hover:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="invisible absolute right-0 top-full w-[min(34rem,calc(100vw-2rem))] pt-4 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/10 sm:grid-cols-3">
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
                          className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
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
    </header>
  );
}
