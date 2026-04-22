import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import FAQ, { type FAQItem } from "@/components/FAQ";
import {
  countryMeta,
  getCountryEntry,
  getLocation,
  getRelatedLocations,
  locationEntries,
  type Location,
} from "@/lib/locations";
import { blogPostEntries } from "@/lib/blogRegistry";
import { buildMetadata } from "@/lib/seo";
import {
  BarChart3,
  MapPinned,
  MessageSquareQuote,
  NotebookText,
  ShieldCheck,
} from "lucide-react";
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

type TestimonialCard = {
  quote: string;
  name: string;
  business: string;
};

type ConversionContent = {
  heroAddition: string;
  heroHighlights: [string, string][];
  testimonialIntro: string;
  testimonials: TestimonialCard[];
  faqTitle: string;
  faqIntro: string;
  faqItems: FAQItem[];
  relatedCitySlugs: string[];
  relatedBlogHrefs: string[];
  midCtaTitle: string;
  midCtaText: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaLabel: string;
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

const blogLinks = blogPostEntries.slice(0, 5).map((post) => ({
  name: post.title,
  href: post.href,
}));

const conversionContentByCity: Record<string, ConversionContent> = {
  "uk/london": {
    heroAddition:
      "For busy London categories, stronger recent proof can remove hesitation before a prospect compares one more provider.",
    heroHighlights: [
      [
        "Borough-level trust",
        "Show current proof that helps buyers choose faster in crowded borough search results.",
      ],
      [
        "Higher-intent enquiries",
        "Give prospects enough confidence to move from comparison into a real call or booking.",
      ],
      [
        "Clearer local fit",
        "Support London-focused service pages with review signals that feel current and relevant.",
      ],
    ],
    testimonialIntro:
      "Simple feedback themes that matter when London businesses want review growth to support real enquiries.",
    testimonials: [
      {
        quote:
          "The plan felt clear and measured, which mattered more to us than anything flashy.",
        name: "Practice manager",
        business: "Private clinic, London",
      },
      {
        quote:
          "We wanted stronger proof before prospects reached the site, and this matched that goal.",
        name: "Operations lead",
        business: "Home services company, London",
      },
      {
        quote:
          "The city focus helped us think about how buyers compare options across nearby areas.",
        name: "Founder",
        business: "Agency, London",
      },
    ],
    faqTitle: "Questions London businesses ask before starting",
    faqIntro:
      "Short answers for local teams that need stronger review proof without changing the rest of their funnel.",
    faqItems: [
      {
        question: "Can this support multiple London boroughs?",
        answer:
          "Yes, the plan can be structured around the areas you serve so the review-growth approach stays aligned with how customers actually search across London.",
      },
      {
        question: "Will this help if customers compare several nearby providers?",
        answer:
          "That is the main use case. Stronger recent reviews help reduce hesitation when buyers are scanning several similar listings in the same area.",
      },
      {
        question: "Do London service businesses need a different pacing approach?",
        answer:
          "Usually yes. A measured pace matters more in dense markets where review recency is visible and prospects can compare providers quickly.",
      },
      {
        question: "Can I start with one location and expand later?",
        answer:
          "Yes, many businesses start with one location or service area first, then widen the plan once the approach is working cleanly.",
      },
    ],
    relatedCitySlugs: ["manchester", "birmingham", "leeds"],
    relatedBlogHrefs: [
      "/blog/how-to-get-google-reviews",
      "/blog/google-business-profile-ranking-and-reviews",
      "/blog/respond-to-negative-google-reviews",
    ],
    midCtaTitle: "Make the shortlist sooner in London search results",
    midCtaText:
      "If buyers are comparing several nearby providers, stronger recent proof can help them choose your business before the next tab opens.",
    finalCtaTitle: "Ready to build stronger Google review trust in London?",
    finalCtaText:
      "Start a London-focused plan built around realistic pacing, borough-level relevance, and clearer proof before prospects enquire.",
    finalCtaLabel: "Start Your London Plan",
  },
  "us/new-york": {
    heroAddition:
      "In a market where prospects compare fast, stronger recent reviews can help your listing win attention before the next option gets the click.",
    heroHighlights: [
      [
        "Neighborhood relevance",
        "Support borough and neighborhood comparisons with proof that feels current and specific.",
      ],
      [
        "Faster trust",
        "Help buyers move from shortlist to enquiry without needing extra reassurance first.",
      ],
      [
        "Search-to-lead support",
        "Strengthen the trust layer on your profile before the website has to close the gap.",
      ],
    ],
    testimonialIntro:
      "Common feedback themes from New York businesses that want their Google profile to convert more local intent.",
    testimonials: [
      {
        quote:
          "We needed the profile to look more current because prospects were deciding before they ever contacted us.",
        name: "Owner",
        business: "Dental practice, New York",
      },
      {
        quote:
          "The city-specific focus matched how people compare businesses block by block here.",
        name: "Marketing lead",
        business: "Real estate team, New York",
      },
      {
        quote:
          "It helped us think about proof and pacing instead of chasing something that looked forced.",
        name: "Director",
        business: "Service business, New York",
      },
    ],
    faqTitle: "Questions New York businesses ask before starting",
    faqIntro:
      "A short FAQ for businesses that need stronger local trust in one of the fastest comparison markets.",
    faqItems: [
      {
        question: "Does this make sense for borough-based targeting?",
        answer:
          "Yes, especially when customers compare providers across Manhattan, Brooklyn, Queens, and nearby areas before they enquire.",
      },
      {
        question: "Is review recency especially important in New York?",
        answer:
          "Usually yes. In dense local results, recent and believable feedback often shapes which businesses feel active and worth contacting now.",
      },
      {
        question: "Can this work for clinics, agencies, and home services?",
        answer:
          "Yes, those categories often depend on trust signals early in the journey, especially when buyers are narrowing options quickly.",
      },
      {
        question: "Can I use this alongside my current local SEO work?",
        answer:
          "Yes, the page and service flow stay the same, so the review-growth plan can sit alongside your existing local search work.",
      },
    ],
    relatedCitySlugs: ["chicago", "boston", "washington"],
    relatedBlogHrefs: [
      "/blog/how-to-increase-google-reviews",
      "/blog/google-review-link-and-qr-code",
      "/blog/industry-specific-google-review-growth",
    ],
    midCtaTitle: "Turn New York comparison traffic into more enquiries",
    midCtaText:
      "When buyers are checking several credible options at once, a stronger review profile can make your business easier to choose quickly.",
    finalCtaTitle: "Ready to improve Google review conversion in New York?",
    finalCtaText:
      "Launch a New York-focused plan that supports neighborhood relevance, current proof, and better trust before prospects reach out.",
    finalCtaLabel: "Start Your New York Plan",
  },
  "au/sydney": {
    heroAddition:
      "For Sydney businesses competing on quality and reputation, stronger review proof can help the profile do more of the persuasion before the first call.",
    heroHighlights: [
      [
        "Suburb-level fit",
        "Support how Sydney buyers compare businesses across the CBD and surrounding suburbs.",
      ],
      [
        "Higher booking confidence",
        "Use current proof to make your business feel easier to trust before a visit or enquiry.",
      ],
      [
        "Natural momentum",
        "Keep review activity steady so the profile feels polished without looking overworked.",
      ],
    ],
    testimonialIntro:
      "The type of feedback Sydney businesses care about when review growth needs to support trust, not just visibility.",
    testimonials: [
      {
        quote:
          "We wanted the profile to feel stronger before people compared us with another local option.",
        name: "Owner",
        business: "Health clinic, Sydney",
      },
      {
        quote:
          "The approach suited a premium service where presentation and trust matter early.",
        name: "General manager",
        business: "Hospitality brand, Sydney",
      },
      {
        quote:
          "It gave us a clearer path for building momentum without making the activity feel unnatural.",
        name: "Founder",
        business: "Property services company, Sydney",
      },
    ],
    faqTitle: "Questions Sydney businesses ask before starting",
    faqIntro:
      "Relevant answers for local teams trying to improve trust and conversion from search across Sydney.",
    faqItems: [
      {
        question: "Can this support suburb-level targeting in Sydney?",
        answer:
          "Yes, the plan can align with the suburbs and service areas you want to support so the review-growth strategy fits local search behavior.",
      },
      {
        question: "Does this help if buyers care about quality before they call?",
        answer:
          "Yes, that is often where stronger review proof helps most. It gives prospects more confidence before they commit to an enquiry or booking.",
      },
      {
        question: "Is a gradual review pace better for Sydney businesses?",
        answer:
          "Usually yes. A gradual, believable pace tends to support long-term trust better than anything abrupt.",
      },
      {
        question: "Can this work for premium local services?",
        answer:
          "Yes, premium and comparison-heavy categories often benefit when the profile looks current, consistent, and easier to trust.",
      },
    ],
    relatedCitySlugs: ["melbourne", "brisbane", "perth"],
    relatedBlogHrefs: [
      "/blog/how-to-get-google-reviews",
      "/blog/sms-and-email-templates-for-google-reviews",
      "/blog/google-business-profile-ranking-and-reviews",
    ],
    midCtaTitle: "Build more booking confidence from Sydney search traffic",
    midCtaText:
      "When customers compare quality, convenience, and reputation together, stronger recent proof can help your business win the enquiry first.",
    finalCtaTitle: "Ready to strengthen your Google review presence in Sydney?",
    finalCtaText:
      "Start a Sydney-focused plan built around suburb-level relevance, polished trust signals, and steady review momentum.",
    finalCtaLabel: "Start Your Sydney Plan",
  },
};

function getProfile(location: Location) {
  const directProfile = cityProfiles[`${location.country}/${location.city}`];

  if (directProfile) {
    return directProfile;
  }

  const country = countryMeta[location.country];

  return {
    intro: `${location.cityName} is a competitive market where businesses need visible trust before customers call, book, or request a quote. Google reviews help local teams look active, dependable, and easier to choose.`,
    localRelevance: `In ${location.cityName}, ${country.competitiveNote}. ${country.cityDescription}`,
    businesses: `Popular businesses in ${location.cityName} include restaurants, dentists, real estate agencies, and service providers. ${location.cityName} also has strong demand from ${country.businessFocus} that benefit from more visible review proof.`,
    whyNeed: `Businesses in ${location.cityName} need more reviews because stronger public feedback reduces hesitation, supports local search visibility, and helps prospects compare providers with more confidence.`,
    strategy: `A ${location.cityName} review strategy should focus on realistic pacing, useful customer language, and internal links that connect this city page with the wider ${country.countryName} review-growth plan.`,
    metaTitle: `Get More Google Reviews in ${location.cityName}`,
    metaDescription: `Google review growth for ${location.cityName} businesses with stronger local trust, better review recency, and clearer support for conversion from search.`,
  };
}

function getConversionContent(location: Location) {
  return conversionContentByCity[`${location.country}/${location.city}`] ?? null;
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
    return buildMetadata({
      title: "Local Reviews Boost | Google Review Growth",
      description:
        "Grow your Google reviews with location-based strategies that improve trust, visibility, and local rankings.",
    });
  }

  const profile = getProfile(location);

  return buildMetadata({
    title: `${profile?.metaTitle ?? `Get More Google Reviews in ${location.cityName}`}, ${location.countryName} | Local Reviews Boost`,
    description:
      profile?.metaDescription ??
      `Build stronger Google review visibility in ${location.cityName}, ${location.countryName} with location-based review strategies that support local trust and rankings.`,
    path: location.href,
  });
}

export default function GoogleReviewsPage({ params }: PageProps) {
  const location = getLocation(params.country, params.city);

  if (!location) {
    notFound();
  }

  const profile = getProfile(location);
  const nearbyLocations = getRelatedLocations(location, 2);
  const countryHub = getCountryEntry(location.country);
  const conversionContent = getConversionContent(location);
  const featuredRelatedLocations =
    conversionContent?.relatedCitySlugs.flatMap((city) => {
      const entry = getLocation(location.country, city);

      if (
        !entry ||
        nearbyLocations.some((nearbyLocation) => nearbyLocation.href === entry.href)
      ) {
        return [];
      }

      return [entry];
    }) ?? [];
  const featuredBlogLinks =
    conversionContent?.relatedBlogHrefs
      .map((href) => blogPostEntries.find((post) => post.href === href))
      .filter(
        (entry): entry is (typeof blogPostEntries)[number] =>
          Boolean(entry) &&
          !blogLinks.some((blogLink) => blogLink.href === entry?.href),
      ) ??
    [];

  if (!profile || !countryHub) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: `${location.countryLabel} Reviews`, path: countryHub.href },
              { name: `${location.cityName} Reviews`, path: location.href },
            ]}
            className="mb-6 text-left"
          />
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            <MapPinned aria-hidden="true" className="h-4 w-4" />
            {location.cityName}, {location.countryName}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            Get more Google reviews in {location.cityName}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {profile.intro}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-zinc-500">
            Many local teams still search for GMB reviews or Google My
            Business reviews, but the same trust signals now live on your
            Google Business Profile.
          </p>
          {conversionContent ? (
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-zinc-600">
              {conversionContent.heroAddition}
            </p>
          ) : null}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/start-order">Start Your Plan</Button>
            <Button href="/#pricing" variant="secondary">
              View pricing
            </Button>
          </div>
          {conversionContent ? (
            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {conversionContent.heroHighlights.map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50/80 p-5 shadow-[0_20px_40px_-38px_rgba(15,23,42,0.6)]"
                >
                  <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          ) : null}
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
              "Steady pacing",
              `Use steady pacing so ${location.cityName} review activity looks credible and supports long-term trust.`,
            ],
            [
              "City reporting",
              `Track campaign direction for ${location.cityName} and connect it to local SEO priorities.`,
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

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <section className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              <BarChart3 aria-hidden="true" className="h-4 w-4" />
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
                </Link>{" "}
                for a tailored plan, or return to the{" "}
                <Link
                  href={countryHub.href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {location.countryLabel} review hub
                </Link>{" "}
                to compare other cities in {location.countryName}.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8">
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

          <section className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Why businesses in {location.cityName} need more reviews
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-8 text-zinc-700">
              <p>{profile.whyNeed}</p>
              <p>
                Fresh reviews help Google profiles look current, trustworthy,
                and relevant to the services customers are actively comparing.
                Strong Google Business Profile reviews also give the sales
                journey more proof before the website has to do all the
                persuasion.
              </p>
            </div>
          </section>

          {conversionContent ? (
            <section className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.7)]">
              <h2 className="text-3xl font-semibold tracking-tight">
                {conversionContent.midCtaTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
                {conversionContent.midCtaText}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/start-order" variant="secondary">
                  Start Your Plan
                </Button>
                <Link
                  href="/#pricing"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
                >
                  View pricing
                </Link>
              </div>
            </section>
          ) : null}

          {conversionContent ? (
            <section className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                <MessageSquareQuote aria-hidden="true" className="h-4 w-4" />
                Testimonials
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
                What local businesses want from a review plan
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
                {conversionContent.testimonialIntro}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {conversionContent.testimonials.map((testimonial) => (
                  <article
                    key={`${testimonial.name}-${testimonial.business}`}
                    className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50/80 p-6"
                  >
                    <p className="text-base leading-7 text-zinc-700">
                      "{testimonial.quote}"
                    </p>
                    <p className="mt-5 text-sm font-semibold text-zinc-950">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {testimonial.business}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Build a stronger {location.cityName} review presence
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
                  href={blogLinks[3].href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {blogLinks[3].name}
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
                if you want a clearer execution path. For wider market coverage,
                use the{" "}
                <Link
                  href={countryHub.href}
                  className="font-semibold text-zinc-950 underline underline-offset-4"
                >
                  {location.countryLabel} hub page
                </Link>{" "}
                to browse related city pages.
              </p>
              {conversionContent && featuredRelatedLocations.length > 0 ? (
                <p>
                  You can also compare{" "}
                  {featuredRelatedLocations.map((relatedLocation, index) => (
                    <span key={relatedLocation.href}>
                      {index > 0 && index === featuredRelatedLocations.length - 1
                        ? " and "
                        : index > 0
                          ? ", "
                          : ""}
                      <Link
                        href={relatedLocation.href}
                        className="font-semibold text-zinc-950 underline underline-offset-4"
                      >
                        {relatedLocation.cityName}
                      </Link>
                    </span>
                  ))}{" "}
                  to see how review pressure shifts across comparable markets.
                </p>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={countryHub.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
              >
                <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                {location.countryLabel} Review Hub
              </Link>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  <ShieldCheck aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {link.name}
                </Link>
              ))}
              {blogLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  <NotebookText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {link.name}
                </Link>
              ))}
              {nearbyLocations.map((relatedLocation) => (
                <Link
                  key={relatedLocation.href}
                  href={relatedLocation.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {relatedLocation.cityName} Reviews
                </Link>
              ))}
              {featuredBlogLinks.map((link) => (
                <Link
                  key={`${link.href}-featured`}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  <NotebookText aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {link.title}
                </Link>
              ))}
              {featuredRelatedLocations.map((relatedLocation) => (
                <Link
                  key={`${relatedLocation.href}-featured`}
                  href={relatedLocation.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-100"
                >
                  <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  {relatedLocation.cityName} Reviews
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <FAQ
        className="bg-zinc-50"
        title={
          conversionContent?.faqTitle ?? "Frequently asked questions"
        }
        intro={
          conversionContent?.faqIntro ??
          `Answers for ${location.cityName} businesses planning location-based Google review growth.`
        }
        items={conversionContent?.faqItems}
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-zinc-950 px-8 py-14 text-center text-white shadow-[0_28px_70px_-32px_rgba(15,23,42,0.75)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            {conversionContent?.finalCtaTitle ??
              `Ready to grow your Google reviews in ${location.cityName}?`}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            {conversionContent?.finalCtaText ??
              "Launch a city-focused review growth plan with realistic pacing, readable customer proof, and practical support."}
          </p>
          <Button href="/start-order" variant="secondary" className="mt-8">
            {conversionContent?.finalCtaLabel ?? "Improve Your Review Presence"}
          </Button>
        </div>
      </section>
    </div>
  );
}
