import Button from "@/components/Button";
import FAQ from "@/components/FAQ";
import {
  getLocation,
  getRelatedLocations,
  locationEntries,
  type Location,
} from "@/lib/locations";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    country: string;
    city: string;
  };
};

type CityProfile = {
  intro: string;
  localRelevance: string;
  businesses: string;
  whyNeed: string;
  strategy: string;
  metaTitle: string;
  metaDescription: string;
};

const cityProfiles: Record<string, CityProfile> = {
  "us/new-york": {
    intro:
      "New York moves quickly, and local buyers make shortlists even faster. Whether the search starts in Manhattan, Brooklyn, Queens, or a surrounding borough, strong Google reviews can decide which business earns the first serious enquiry.",
    localRelevance:
      "In New York, competition is high and businesses rely on Google reviews to stand out. Dense local results mean review count, review recency, and proof of quality all shape who looks trustworthy first.",
    businesses:
      "Popular businesses in New York include restaurants, dentists, real estate agencies, and service providers. Clinics, law firms, salons, agencies, contractors, and specialty shops also depend on visible reputation signals to compete block by block.",
    whyNeed:
      "Businesses in New York need more reviews because buyers compare several credible options at once and often choose the provider with the freshest, most specific feedback.",
    strategy:
      "A New York review strategy should emphasize current service quality, neighborhood relevance, and believable momentum that supports both map visibility and conversion.",
    metaTitle: "Get More Google Reviews in New York",
    metaDescription:
      "Location-focused Google review growth for New York businesses with stronger local trust, service relevance, and steady review momentum.",
  },
  "us/los-angeles": {
    intro:
      "Los Angeles is spread across neighborhoods, routines, and long decision paths. Businesses need reviews that build confidence before a customer drives across town, books a visit, or requests a quote.",
    localRelevance:
      "In Los Angeles, competition is high and businesses rely on Google reviews to stand out. Searchers compare style, convenience, reputation, and distance at the same time, especially in crowded categories.",
    businesses:
      "Popular businesses in Los Angeles include restaurants, dentists, real estate agencies, and service providers. Med spas, studios, beauty brands, contractors, fitness operators, and creative firms also win more often when the profile looks current.",
    whyNeed:
      "Businesses in Los Angeles need more reviews because local search results are packed with similar offers, and public proof helps separate serious providers from generic listings.",
    strategy:
      "An LA campaign should reflect neighborhood intent, keep review growth measured, and reinforce the experience customers expect before they commit.",
    metaTitle: "Get More Google Reviews in Los Angeles",
    metaDescription:
      "Build a Google review strategy for Los Angeles businesses with stronger neighborhood relevance, recent feedback, and local SEO support.",
  },
  "us/chicago": {
    intro:
      "Chicago buyers tend to compare carefully. In busy areas such as the Loop, River North, Lincoln Park, and West Loop, reviews help local businesses look dependable before a prospect makes contact.",
    localRelevance:
      "In Chicago, competition is high and businesses rely on Google reviews to stand out. Searchers often use reviews to judge reliability, service quality, and whether the company still feels active right now.",
    businesses:
      "Popular businesses in Chicago include restaurants, dentists, real estate agencies, and service providers. Legal offices, clinics, contractors, hospitality brands, and B2B firms also benefit from richer review coverage.",
    whyNeed:
      "Businesses in Chicago need more reviews because the market rewards visible consistency, and recent feedback helps reduce hesitation before a call or booking.",
    strategy:
      "A Chicago review plan should focus on steady growth, practical customer language, and service proof that makes the listing easier to trust in Maps results.",
    metaTitle: "Get More Google Reviews in Chicago",
    metaDescription:
      "Google review growth for Chicago businesses built around steady activity, stronger trust signals, and local search visibility.",
  },
  "us/san-francisco": {
    intro:
      "San Francisco buyers are selective, research-heavy, and quick to compare details. Reviews often become the trust layer that turns interest into action for local service brands, clinics, agencies, and hospitality businesses.",
    localRelevance:
      "In San Francisco, competition is high and businesses rely on Google reviews to stand out. Strong profiles help companies compete in a market where reputation, precision, and perceived quality matter immediately.",
    businesses:
      "Popular businesses in San Francisco include restaurants, dentists, real estate agencies, and service providers. Tech consultancies, healthcare practices, contractors, wellness studios, and premium local brands also rely on visible review depth.",
    whyNeed:
      "Businesses in San Francisco need more reviews because prospects compare quality signals closely and want current proof before they spend in a high-cost market.",
    strategy:
      "A San Francisco campaign should balance credibility, service detail, and realistic pacing so the profile feels polished rather than forced.",
    metaTitle: "Get More Google Reviews in San Francisco",
    metaDescription:
      "San Francisco Google review growth for businesses that need stronger local trust, recent proof, and more persuasive search visibility.",
  },
  "us/dallas": {
    intro:
      "Dallas businesses compete in a fast-growing metro where customers want confidence before they commit. Reviews help local brands look established across service areas, neighborhoods, and high-intent searches.",
    localRelevance:
      "In Dallas, competition is high and businesses rely on Google reviews to stand out. Buyers often compare professionalism, speed, and response quality before they request an estimate.",
    businesses:
      "Popular businesses in Dallas include restaurants, dentists, real estate agencies, and service providers. Home services, legal offices, clinics, financial firms, and local operators also use reviews to support conversion.",
    whyNeed:
      "Businesses in Dallas need more reviews because expanding service areas and crowded local categories make visible trust signals essential.",
    strategy:
      "A Dallas review strategy should support metro-wide discovery, reinforce reliability, and keep recent feedback active enough to strengthen first impressions.",
    metaTitle: "Get More Google Reviews in Dallas",
    metaDescription:
      "Location-based Google review growth for Dallas businesses with better trust signals, fresher feedback, and stronger local intent coverage.",
  },
  "us/seattle": {
    intro:
      "Seattle customers often research before they act, especially in professional services, health, home services, and hospitality. A stronger review profile helps local businesses look credible before prospects narrow the field.",
    localRelevance:
      "In Seattle, competition is high and businesses rely on Google reviews to stand out. Searchers want evidence that the business is responsive, capable, and still delivering strong service now.",
    businesses:
      "Popular businesses in Seattle include restaurants, dentists, real estate agencies, and service providers. Tech-focused consultancies, contractors, clinics, agencies, and neighborhood operators also benefit from consistent review activity.",
    whyNeed:
      "Businesses in Seattle need more reviews because thoughtful buyers compare details closely and prefer companies with recent, specific feedback.",
    strategy:
      "A Seattle campaign should highlight professionalism, reliability, and steady reputation growth that supports longer research cycles.",
    metaTitle: "Get More Google Reviews in Seattle",
    metaDescription:
      "Seattle Google review growth designed for stronger credibility, steady profile activity, and better performance in local searches.",
  },
  "us/boston": {
    intro:
      "Boston blends dense local competition with buyers who pay attention to credibility. Reviews help clinics, agencies, contractors, restaurants, and professional firms look proven before the first conversation starts.",
    localRelevance:
      "In Boston, competition is high and businesses rely on Google reviews to stand out. Local searchers often compare trust, expertise, and consistency before choosing who deserves the next click.",
    businesses:
      "Popular businesses in Boston include restaurants, dentists, real estate agencies, and service providers. Healthcare groups, education-focused businesses, legal practices, and home service teams also gain from stronger review visibility.",
    whyNeed:
      "Businesses in Boston need more reviews because buyers often look for evidence of experience and reliability before they visit, book, or enquire.",
    strategy:
      "A Boston review plan should build recent social proof, connect the profile to real service outcomes, and maintain a pace that feels credible over time.",
    metaTitle: "Get More Google Reviews in Boston",
    metaDescription:
      "Google review growth for Boston businesses with stronger credibility, useful local proof, and consistent reputation support.",
  },
  "us/atlanta": {
    intro:
      "Atlanta businesses serve a broad, competitive market where convenience and trust can decide the lead. Reviews help local companies look more established before a prospect calls, books, or requests a quote.",
    localRelevance:
      "In Atlanta, competition is high and businesses rely on Google reviews to stand out. Public feedback helps buyers reduce risk when several providers seem similar at first glance.",
    businesses:
      "Popular businesses in Atlanta include restaurants, dentists, real estate agencies, and service providers. Clinics, legal services, contractors, salons, agencies, and event-related companies also benefit from better review coverage.",
    whyNeed:
      "Businesses in Atlanta need more reviews because a stronger reputation profile can move searchers from casual comparison to real action much faster.",
    strategy:
      "An Atlanta campaign should support service-area trust, show recent activity, and reinforce the customer experience themes that matter most locally.",
    metaTitle: "Get More Google Reviews in Atlanta",
    metaDescription:
      "Atlanta Google review growth for businesses that need better trust signals, stronger local relevance, and more current social proof.",
  },
  "us/houston": {
    intro:
      "Houston businesses operate across a wide metro where distance, availability, and confidence all shape the sale. Reviews help customers decide which company is worth contacting before they invest more time.",
    localRelevance:
      "In Houston, competition is high and businesses rely on Google reviews to stand out. Strong reputation signals matter even more when service areas are large and prospects want reassurance quickly.",
    businesses:
      "Popular businesses in Houston include restaurants, dentists, real estate agencies, and service providers. Healthcare offices, contractors, logistics firms, auto shops, and local franchises also depend on trust-rich profiles.",
    whyNeed:
      "Businesses in Houston need more reviews because customers use visible feedback to judge reliability before they request estimates, appointments, or visits.",
    strategy:
      "A Houston review strategy should support service-area searches, demonstrate consistency, and keep review activity fresh enough to stay persuasive.",
    metaTitle: "Get More Google Reviews in Houston",
    metaDescription:
      "Google review growth for Houston businesses with stronger service-area trust, recent customer proof, and local SEO value.",
  },
  "us/miami": {
    intro:
      "Miami buyers move fast, but they still want proof. Reviews help local businesses look more credible in hospitality, wellness, real estate, legal, beauty, and other high-comparison categories.",
    localRelevance:
      "In Miami, competition is high and businesses rely on Google reviews to stand out. Searchers often use reputation signals to separate polished providers from lookalike competitors.",
    businesses:
      "Popular businesses in Miami include restaurants, dentists, real estate agencies, and service providers. Hospitality brands, salons, clinics, property services, and premium consumer businesses also benefit from stronger review recency.",
    whyNeed:
      "Businesses in Miami need more reviews because visible public trust helps convert both local residents and high-intent visitors before they compare another option.",
    strategy:
      "A Miami review campaign should build fresh feedback, local fit, and service detail that works for quick decision-making.",
    metaTitle: "Get More Google Reviews in Miami",
    metaDescription:
      "Miami Google review growth with stronger local proof, recent customer feedback, and better conversion support from search.",
  },
  "uk/london": {
    intro:
      "London gives buyers almost endless options, which means reputation has to work early. From trades and clinics to agencies, restaurants, and service brands, reviews help prospects narrow the list quickly.",
    localRelevance:
      "In London, competition is high and businesses rely on Google reviews to stand out. Borough-level competition makes recent, believable feedback a core part of local visibility and trust.",
    businesses:
      "Popular businesses in London include restaurants, dentists, real estate agencies, and service providers. Hospitality brands, private healthcare practices, estate agents, consultants, and home services all benefit from stronger review depth.",
    whyNeed:
      "Businesses in London need more reviews because prospects often compare several nearby providers and choose the one that looks most active and dependable.",
    strategy:
      "A London review strategy should reinforce professionalism, local relevance, and current proof that helps the business win faster in crowded search results.",
    metaTitle: "Get More Google Reviews in London",
    metaDescription:
      "London Google review growth for businesses that need stronger borough-level relevance, fresher feedback, and better local trust.",
  },
  "uk/manchester": {
    intro:
      "Manchester combines strong local loyalty with growing competition across hospitality, professional services, clinics, and trades. Reviews help businesses look active and dependable when customers compare similar options.",
    localRelevance:
      "In Manchester, competition is high and businesses rely on Google reviews to stand out. Recent feedback tells prospects that the company is trusted locally and still delivering well today.",
    businesses:
      "Popular businesses in Manchester include restaurants, dentists, real estate agencies, and service providers. Independent brands, city-centre operators, clinics, trades, and agencies also need visible customer proof.",
    whyNeed:
      "Businesses in Manchester need more reviews because local searchers often choose providers that feel current, reliable, and familiar to the area.",
    strategy:
      "A Manchester campaign should highlight service quality, practical local trust, and a review pace that supports ongoing Maps visibility.",
    metaTitle: "Get More Google Reviews in Manchester",
    metaDescription:
      "Manchester Google review growth with stronger local proof, consistent profile activity, and better support for city-based searches.",
  },
  "uk/birmingham": {
    intro:
      "Birmingham businesses serve a broad market that values clarity, reliability, and convenience. Reviews help local providers look lower-risk before someone books, visits, or sends an enquiry.",
    localRelevance:
      "In Birmingham, competition is high and businesses rely on Google reviews to stand out. Customers use public feedback to judge value and dependability before they contact a provider.",
    businesses:
      "Popular businesses in Birmingham include restaurants, dentists, real estate agencies, and service providers. Trades, clinics, repair companies, accountants, legal firms, and tutors also benefit from stronger profiles.",
    whyNeed:
      "Businesses in Birmingham need more reviews because customers want visible reassurance before choosing among several practical alternatives.",
    strategy:
      "A Birmingham review plan should build trust through recent customer language, clear local fit, and a steady growth pattern that feels authentic.",
    metaTitle: "Get More Google Reviews in Birmingham",
    metaDescription:
      "Google review growth for Birmingham businesses focused on local trust, current feedback, and stronger conversion from search.",
  },
  "uk/leeds": {
    intro:
      "Leeds has a practical, competitive local market where buyers compare proof before they commit. A strong review profile helps service businesses and local brands look more established without adding friction.",
    localRelevance:
      "In Leeds, competition is high and businesses rely on Google reviews to stand out. Searchers want signs that a company is active, trusted, and worth contacting now rather than later.",
    businesses:
      "Popular businesses in Leeds include restaurants, dentists, real estate agencies, and service providers. Accountants, clinics, trades, consultants, and hospitality venues also gain from clearer reputation signals.",
    whyNeed:
      "Businesses in Leeds need more reviews because recent feedback helps smaller and growing brands compete against providers with stronger name recognition.",
    strategy:
      "A Leeds campaign should focus on useful customer detail, visible consistency, and review growth that supports long-term trust.",
    metaTitle: "Get More Google Reviews in Leeds",
    metaDescription:
      "Leeds Google review growth for businesses that need more recent proof, stronger credibility, and better local SEO support.",
  },
  "uk/liverpool": {
    intro:
      "Liverpool businesses often compete on trust, familiarity, and customer experience. Reviews help local operators show that they deliver well now, not just that they have been around for years.",
    localRelevance:
      "In Liverpool, competition is high and businesses rely on Google reviews to stand out. Visible feedback helps buyers choose with more confidence in crowded local categories.",
    businesses:
      "Popular businesses in Liverpool include restaurants, dentists, real estate agencies, and service providers. Clinics, trades, hospitality brands, beauty businesses, and local specialists also need reputation depth to convert.",
    whyNeed:
      "Businesses in Liverpool need more reviews because customers often compare warmth, reliability, and service quality before they make contact.",
    strategy:
      "A Liverpool review strategy should build believable momentum, strengthen local trust, and keep the profile active enough to support future enquiries.",
    metaTitle: "Get More Google Reviews in Liverpool",
    metaDescription:
      "Liverpool Google review growth with stronger customer proof, fresher feedback, and better local trust for competitive searches.",
  },
  "au/sydney": {
    intro:
      "Sydney customers compare quality, convenience, and reputation before they book. From the CBD to outer suburbs, reviews can strongly influence who gets the enquiry first.",
    localRelevance:
      "In Sydney, competition is high and businesses rely on Google reviews to stand out. High-intent buyers often judge service quality and credibility from the profile before they visit a website.",
    businesses:
      "Popular businesses in Sydney include restaurants, dentists, real estate agencies, and service providers. Health practices, hospitality venues, agencies, property services, and premium local brands also benefit from stronger review activity.",
    whyNeed:
      "Businesses in Sydney need more reviews because recent, specific feedback acts as a major trust signal in a high-choice market.",
    strategy:
      "A Sydney campaign should balance suburb-level relevance, polished presentation, and gradual review growth that looks natural over time.",
    metaTitle: "Get More Google Reviews in Sydney",
    metaDescription:
      "Sydney Google review growth with stronger local trust, better suburb-level relevance, and steady reputation support.",
  },
  "au/melbourne": {
    intro:
      "Melbourne buyers often do their homework before choosing a provider. Reviews help restaurants, clinics, contractors, agencies, and specialty businesses convert that research into action.",
    localRelevance:
      "In Melbourne, competition is high and businesses rely on Google reviews to stand out. Searchers use current feedback to judge consistency, fit, and overall confidence before they enquire.",
    businesses:
      "Popular businesses in Melbourne include restaurants, dentists, real estate agencies, and service providers. Local operators across the CBD and surrounding suburbs also need stronger review recency to stay persuasive.",
    whyNeed:
      "Businesses in Melbourne need more reviews because detailed recent comments often decide which provider feels safest to contact next.",
    strategy:
      "A Melbourne review strategy should emphasize authenticity, service detail, and a steady profile rhythm that supports long-term credibility.",
    metaTitle: "Get More Google Reviews in Melbourne",
    metaDescription:
      "Google review growth for Melbourne businesses with stronger authenticity, local proof, and more useful review momentum.",
  },
  "au/brisbane": {
    intro:
      "Brisbane businesses compete for customers who want reliable local options without wasting time. Reviews help the right companies look easier to trust before the first call or booking.",
    localRelevance:
      "In Brisbane, competition is high and businesses rely on Google reviews to stand out. Public feedback gives growing brands a way to compete with better-known local names.",
    businesses:
      "Popular businesses in Brisbane include restaurants, dentists, real estate agencies, and service providers. Home services, gyms, consultants, clinics, and neighborhood operators also benefit from stronger review visibility.",
    whyNeed:
      "Businesses in Brisbane need more reviews because fresh public proof helps smaller and mid-sized brands close the trust gap faster.",
    strategy:
      "A Brisbane review plan should build credibility gradually, keep review activity current, and connect reputation growth to core service searches.",
    metaTitle: "Get More Google Reviews in Brisbane",
    metaDescription:
      "Brisbane Google review growth focused on fresher proof, stronger local credibility, and better support for customer conversion.",
  },
  "au/perth": {
    intro:
      "Perth businesses often rely on local trust and reputation to win the next enquiry. Reviews help service providers look established across neighborhoods and nearby service areas without overcomplicating the journey.",
    localRelevance:
      "In Perth, competition is high and businesses rely on Google reviews to stand out. Customers compare responsiveness, professionalism, and visible feedback before they decide who to contact.",
    businesses:
      "Popular businesses in Perth include restaurants, dentists, real estate agencies, and service providers. Trades, clinics, hospitality brands, property services, and local specialists also need consistent review growth.",
    whyNeed:
      "Businesses in Perth need more reviews because strong public feedback helps them look current and dependable in a market where trust still drives the click.",
    strategy:
      "A Perth review campaign should support local intent, keep momentum realistic, and reinforce the service themes customers care about most.",
    metaTitle: "Get More Google Reviews in Perth",
    metaDescription:
      "Perth Google review growth for businesses that need stronger local trust, more current feedback, and better search conversion support.",
  },
  "au/adelaide": {
    intro:
      "Adelaide buyers often favor businesses that look clear, reliable, and easy to trust. Reviews help local companies make that impression earlier in the search process.",
    localRelevance:
      "In Adelaide, competition is high and businesses rely on Google reviews to stand out. Searchers use recent customer feedback to judge quality before they visit, call, or book.",
    businesses:
      "Popular businesses in Adelaide include restaurants, dentists, real estate agencies, and service providers. Clinics, trades, hospitality businesses, consultants, and local firms also benefit from stronger reputation signals.",
    whyNeed:
      "Businesses in Adelaide need more reviews because current proof helps them compete against established names and reduces uncertainty for first-time buyers.",
    strategy:
      "An Adelaide review strategy should focus on practical credibility, readable customer detail, and a steady pace that strengthens local trust over time.",
    metaTitle: "Get More Google Reviews in Adelaide",
    metaDescription:
      "Adelaide Google review growth with better local credibility, fresher customer proof, and stronger support for city-based search visibility.",
  },
};

const serviceLinks = [
  { name: "Get More Google Reviews", href: "/get-more-google-reviews" },
  { name: "Increase Google Reviews", href: "/increase-google-reviews" },
  {
    name: "Google My Business Review Service",
    href: "/google-my-business-review-service",
  },
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

function getProfile(location: Location) {
  return cityProfiles[`${location.country}/${location.city}`];
}

export function generateStaticParams() {
  return locationEntries.map((location) => ({
    country: location.country,
    city: location.city,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const location = getLocation(params.country, params.city);

  if (!location) {
    return {
      title: "Google Review Growth Platform",
      description:
        "Collect more authentic Google reviews with customer-focused review request workflows.",
    };
  }

  const profile = getProfile(location);

  return {
    title: profile.metaTitle,
    description: profile.metaDescription,
  };
}

export default function GoogleReviewsPage({ params }: PageProps) {
  const location = getLocation(params.country, params.city);

  if (!location) {
    notFound();
  }

  const profile = getProfile(location);
  const nearbyLocations = getRelatedLocations(location, 2);

  if (!profile) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {location.cityName}, {location.countryName}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            Get more Google reviews in {location.cityName}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {profile.intro}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/start-order">Start growing reviews</Button>
            <Button href="/#pricing" variant="secondary">
              View pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            [
              "Local review requests",
              `Plan review growth around real customer moments for ${location.cityName} buyers.`,
            ],
            [
              "Gradual delivery",
              `Use steady pacing so ${location.cityName} review activity looks credible and supports long-term trust.`,
            ],
            [
              "City reporting",
              `Track campaign direction for ${location.cityName} and connect it to local SEO priorities.`,
            ],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
              <p className="mt-3 leading-7 text-zinc-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Local SEO focus
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
              Local relevance in {location.cityName}
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
              <p>{profile.localRelevance}</p>
              <p>
                Businesses in {location.cityName} can compare service options
                with{" "}
                <Link
                  href={serviceLinks[0].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {serviceLinks[0].name}
                </Link>{" "}
                and{" "}
                <Link
                  href={serviceLinks[2].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {serviceLinks[2].name}
                </Link>{" "}
                before moving into{" "}
                <Link
                  href="/start-order"
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  the start-order page
                </Link>
                .
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Popular business categories in {location.cityName}
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
              <p>{profile.businesses}</p>
              <p>
                If you also target{" "}
                <Link
                  href={nearbyLocations[0].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {nearbyLocations[0].cityName}
                </Link>{" "}
                or{" "}
                <Link
                  href={nearbyLocations[1].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {nearbyLocations[1].cityName}
                </Link>
                , city pages should explain how review pressure, local intent,
                and buyer expectations shift from one market to another.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Why businesses in {location.cityName} need more reviews
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
              <p>{profile.whyNeed}</p>
              <p>
                Fresh reviews help Google profiles look current, trustworthy,
                and relevant to the services customers are actively comparing.
                They also give the sales journey more proof before the website
                has to do all the persuasion.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Build a stronger {location.cityName} review funnel
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
              <p>{profile.strategy}</p>
              <p>
                Read{" "}
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
                for process guidance, then compare{" "}
                <Link
                  href={serviceLinks[1].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {serviceLinks[1].name}
                </Link>{" "}
                and{" "}
                <Link
                  href={serviceLinks[3].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {serviceLinks[3].name}
                </Link>{" "}
                if you want a clearer execution path.
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
              {nearbyLocations.map((relatedLocation) => (
                <Link
                  key={relatedLocation.href}
                  href={relatedLocation.href}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  {relatedLocation.cityName} Reviews
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <FAQ
        className="bg-zinc-50"
        intro={`Answers for ${location.cityName} businesses planning location-based Google review growth.`}
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg bg-zinc-950 px-8 py-14 text-center text-white shadow-2xl shadow-zinc-300">
          <h2 className="text-4xl font-semibold tracking-tight">
            Ready to grow your Google reviews in {location.cityName}?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Launch a city-focused review campaign with realistic pacing,
            readable customer proof, and a direct path to order.
          </p>
          <Button href="/start-order" variant="secondary" className="mt-8">
            Start Order
          </Button>
        </div>
      </section>
    </div>
  );
}
