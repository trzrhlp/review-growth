export type CountryCode = "us" | "uk" | "au";

export type Location = {
  country: CountryCode;
  countryName: string;
  countryLabel: string;
  city: string;
  cityName: string;
  href: string;
};

export const locations = {
  us: [
    "new-york",
    "los-angeles",
    "chicago",
    "san-francisco",
    "dallas",
    "seattle",
    "boston",
    "atlanta",
    "houston",
    "miami",
  ],
  uk: ["london", "manchester", "birmingham", "leeds", "liverpool"],
  au: ["sydney", "melbourne", "brisbane", "perth", "adelaide"],
} as const satisfies Record<CountryCode, readonly string[]>;

const countryMeta: Record<
  CountryCode,
  { countryName: string; countryLabel: string }
> = {
  us: { countryName: "United States", countryLabel: "USA" },
  uk: { countryName: "United Kingdom", countryLabel: "UK" },
  au: { countryName: "Australia", countryLabel: "AU" },
};

function formatCityName(city: string) {
  return city
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const locationEntries = (Object.keys(locations) as CountryCode[]).flatMap(
  (country) =>
    locations[country].map((city) => ({
      country,
      countryName: countryMeta[country].countryName,
      countryLabel: countryMeta[country].countryLabel,
      city,
      cityName: formatCityName(city),
      href: `/${country}/${city}/google-reviews`,
    })),
) satisfies Location[];

export const locationGroups = (Object.keys(locations) as CountryCode[]).map(
  (country) => ({
    country,
    countryName: countryMeta[country].countryName,
    countryLabel: countryMeta[country].countryLabel,
    links: locationEntries.filter((location) => location.country === country),
  }),
);

export function getLocation(country: string, city: string) {
  return locationEntries.find(
    (location) => location.country === country && location.city === city,
  );
}

export function getRelatedLocations(current: Location, count = 2) {
  const sameCountry = locationEntries.filter(
    (location) =>
      location.country === current.country && location.city !== current.city,
  );
  const otherCountries = locationEntries.filter(
    (location) =>
      location.country !== current.country && location.city !== current.city,
  );

  return [...sameCountry, ...otherCountries].slice(0, count);
}
