import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";

export type FAQItem = {
  question: string;
  answer: string;
};

export const defaultFaqs: FAQItem[] = [
  {
    question: "What are GMB reviews?",
    answer:
      "GMB reviews is a common shorthand for customer reviews left on a Google business listing. Many businesses still search for GMB reviews, even though Google My Business is now called Google Business Profile. These reviews influence local trust, click-through rate, and reputation management.",
  },
  {
    question:
      "What is the difference between Google My Business reviews and Google Business Profile reviews?",
    answer:
      "There is no practical difference in the reviews themselves. Google My Business reviews is the older name people still search for, while Google Business Profile reviews is the current name for the same review system connected to your business listing on Google Search and Maps.",
  },
  {
    question: "How does the process work?",
    answer:
      "The process starts with your business details, target market, and preferred plan so the campaign matches your goals. From there, we structure a measured review growth approach around your timeline, location focus, and broader reputation management priorities to keep the rollout clear and organized.",
  },
  {
    question: "Is this safe for my business profile?",
    answer:
      "A safer approach focuses on steady pacing, clear business information, and a review growth plan that fits normal customer activity. We avoid spammy promises and position the service around long-term reputation management, because trust and consistency matter more than short bursts of activity.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Setup is usually straightforward once you submit the required details. Most businesses can be reviewed and prepared quickly, although the exact timeline depends on the plan, your target market, and whether the campaign involves one location or multiple locations.",
  },
  {
    question: "Do I need to share my Google Maps link?",
    answer:
      "Yes, sharing your Google Maps link or business profile URL helps us identify the correct listing and reduce setup errors. It also lets us align your Google Business Profile reviews strategy with the exact profile you want to strengthen.",
  },
  {
    question: "Can I target a specific city or country?",
    answer:
      "Yes, campaigns can be planned around a specific city, service area, or country based on your business goals. That location focus is often important for local SEO, review growth, and reputation management when customers compare nearby providers.",
  },
  {
    question: "Can I start with a smaller plan and upgrade later?",
    answer:
      "Yes, many businesses begin with a smaller package to test fit and pacing before expanding. That approach works well for review growth because it gives you a controlled starting point and leaves room to scale once you are comfortable with the process.",
  },
  {
    question: "Do you support multiple business locations?",
    answer:
      "Yes, support can be structured for businesses managing more than one location. Multi-location planning is common in reputation management because each profile may need its own review growth strategy, market focus, and setup details.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "After you submit the form, we review your details, confirm the plan, and prepare the next steps for onboarding. If anything is unclear, we follow up so the campaign for your GMB reviews, Google My Business reviews, or Google Business Profile reviews starts with accurate information.",
  },
];

type FAQProps = {
  title?: string;
  intro?: string;
  items?: readonly FAQItem[];
  className?: string;
};

export default function FAQ({
  title = "Frequently asked questions",
  intro = "Clear answers for businesses planning a compliant review growth program.",
  items = defaultFaqs,
  className = "",
}: FAQProps) {
  return (
    <section className={`px-6 py-20 lg:px-8 ${className}`.trim()}>
      <JsonLd data={buildFaqSchema(items)} />
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          FAQ
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-zinc-600">{intro}</p>
        <div className="mt-10 divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
          {items.map((item) => (
            <details key={item.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-zinc-950">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-zinc-600">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-8 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Ready to improve your review presence?
          </h3>
          <div className="mt-5">
            <Button href="/start-order">Start Your Plan</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
