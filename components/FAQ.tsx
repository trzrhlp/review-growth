export type FAQItem = {
  question: string;
  answer: string;
};

export const defaultFaqs: FAQItem[] = [
  {
    question: "Is this safe?",
    answer:
      "Yes, when review growth is handled as a gradual, customer-focused reputation strategy. The safest approach is to use realistic timing, honest customer language, and a complete Google Business Profile rather than sudden spikes or copied content.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery depends on the plan, market, and review volume. Most campaigns are paced over several days or weeks so growth looks natural and gives your profile steady activity instead of a short burst.",
  },
  {
    question: "Are reviews location-based?",
    answer:
      "Yes. Campaigns can be planned around the city or service area you want to strengthen, which is useful for local businesses competing in Google Maps and city-specific searches.",
  },
  {
    question: "Can I customize orders?",
    answer:
      "Yes. You can share your business category, preferred location focus, Google Business Profile link, and service details so the review strategy fits the way customers actually choose your company.",
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
  intro = "Clear answers for businesses planning a Google review growth campaign.",
  items = defaultFaqs,
  className = "",
}: FAQProps) {
  return (
    <section className={`px-6 py-20 lg:px-8 ${className}`.trim()}>
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
