export type CountryCode = "us" | "uk" | "au";

export type Location = {
  country: CountryCode;
  countryName: string;
  countryLabel: string;
  city: string;
  cityName: string;
  href: string;
};

type CountryMeta = {
  countryName: string;
  countryLabel: string;
  hubTitle: string;
  hubDescription: string;
  cityDescription: string;
  hubIntro: string;
  hubSectionTitle: string;
  hubSectionBody: string;
  businessFocus: string;
  competitiveNote: string;
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
    "phoenix",
    "philadelphia",
    "san-diego",
    "austin",
    "denver",
    "washington",
    "las-vegas",
    "orlando",
    "charlotte",
    "nashville",
  ],
  uk: [
    "london",
    "manchester",
    "birmingham",
    "leeds",
    "liverpool",
    "glasgow",
    "edinburgh",
    "bristol",
    "sheffield",
    "newcastle",
  ],
  au: [
    "sydney",
    "melbourne",
    "brisbane",
    "perth",
    "adelaide",
    "gold-coast",
    "canberra",
    "newcastle",
    "geelong",
    "sunshine-coast",
  ],
} as const satisfies Record<CountryCode, readonly string[]>;

export const countryMeta: Record<CountryCode, CountryMeta> = {
  us: {
    countryName: "United States",
    countryLabel: "USA",
    hubTitle: "Google Review Growth in the United States",
    hubDescription:
      "Explore city-focused Google review growth pages for businesses across major US markets.",
    cityDescription:
      "US buyers often compare several providers quickly, so review recency and specificity carry real weight.",
    hubIntro:
      "US local search moves quickly, and review profiles often shape trust before a visitor reaches the website. This country hub is built for businesses comparing national review-growth guidance, major city pages, and practical service resources across the United States.",
    hubSectionTitle: "Review growth across the United States",
    hubSectionBody:
      "In the US, buyers often shortlist fast and compare several credible providers at once. Stronger review recency, clearer service proof, and steady profile activity help businesses look more current in competitive local categories without repeating the city-level framing used on individual location pages.",
    businessFocus:
      "clinics, contractors, legal practices, restaurants, agencies, and local service brands",
    competitiveNote:
      "competition is high and trust signals need to work early in the decision process",
  },
  uk: {
    countryName: "United Kingdom",
    countryLabel: "UK",
    hubTitle: "Google Review Growth in the United Kingdom",
    hubDescription:
      "Find Google review growth pages for UK cities where local trust and review recency influence enquiries.",
    cityDescription:
      "UK searchers often compare reliability, clarity, and recent customer proof before they enquire.",
    hubIntro:
      "UK businesses often win or lose attention on reliability, clarity, and recent customer proof before an enquiry starts. This hub gives a country-level path into the main UK city pages, review-growth services, and blog resources without duplicating any single city page.",
    hubSectionTitle: "Review growth across the United Kingdom",
    hubSectionBody:
      "In the UK, review growth tends to work best when it reinforces dependability and keeps the business visibly current in local search. The goal at country level is to connect city demand, service education, and practical next steps while leaving the detailed local competition angles to each city page.",
    businessFocus:
      "trades, clinics, hospitality brands, estate agents, accountants, and local specialists",
    competitiveNote:
      "buyers often choose the provider that looks most current and dependable in local search",
  },
  au: {
    countryName: "Australia",
    countryLabel: "AU",
    hubTitle: "Google Review Growth in Australia",
    hubDescription:
      "Browse Australian city pages built around Google review growth, local trust, and conversion from search.",
    cityDescription:
      "Australian buyers tend to compare service quality, responsiveness, and visible trust before they book.",
    hubIntro:
      "Australian buyers tend to compare service quality, responsiveness, and visible trust before they book. This country hub brings together the main Australian city pages with supporting review-growth services and blog content for businesses planning broader market coverage.",
    hubSectionTitle: "Review growth across Australia",
    hubSectionBody:
      "In Australia, stronger review growth usually supports conversion by making the business look easier to trust before a call or booking. At the country level, the emphasis is on connecting national intent with city-specific pages and service guidance rather than reusing the suburb or city competition language from individual locations.",
    businessFocus:
      "health practices, hospitality venues, tradies, consultants, property services, and premium local operators",
    competitiveNote:
      "strong public feedback helps businesses look current and easier to trust in local search",
  },
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

export const countryEntries = (Object.keys(countryMeta) as CountryCode[]).map(
  (country) => ({
    country,
    ...countryMeta[country],
    href: `/${country}/google-reviews`,
    links: locationEntries.filter((location) => location.country === country),
  }),
);

export const locationGroups = countryEntries.map((country) => ({
  country: country.country,
  countryName: country.countryName,
  countryLabel: country.countryLabel,
  href: country.href,
  links: country.links,
}));

export function getLocation(country: string, city: string) {
  return locationEntries.find(
    (location) => location.country === country && location.city === city,
  );
}

export function getCountryEntry(country: string) {
  return countryEntries.find((entry) => entry.country === country);
}

export function getCountryLocations(country: string) {
  return locationEntries.filter((location) => location.country === country);
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
