import JsonLd from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";

export type FAQItem = {
  question: string;
  answer: string;
};

export const defaultFaqs: FAQItem[] = [
  {
    question: "Is this safe?",
    answer:
      "Yes, when review growth is handled as a customer-focused reputation strategy. The safest approach is to encourage genuine feedback, use realistic timing, and maintain a complete Google Business Profile with clear business information.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Setup depends on the plan, market, and business details you share. Most programs are planned over days or weeks so review activity stays steady and aligned with normal customer engagement.",
  },
  {
    question: "Are reviews location-based?",
    answer:
      "Yes. Review growth programs can be planned around the city or service area you want to strengthen, which is useful for businesses competing in Google Maps and city-specific searches.",
  },
  {
    question: "Can I customize my plan?",
    answer:
      "Yes. You can share your business category, preferred location focus, Google Business Profile link, and service details so the strategy fits how customers actually choose your company. Many businesses still ask about GMB reviews or Google My Business reviews, and the plan can be tailored around that same Google Business Profile review goal.",
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
      </div>
    </section>
  );
}
