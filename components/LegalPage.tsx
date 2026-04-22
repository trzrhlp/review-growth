import Breadcrumbs from "@/components/Breadcrumbs";
import { ShieldCheck } from "lucide-react";

type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  path: string;
  sections: readonly LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  path,
  sections,
}: LegalPageProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: title, path },
            ]}
            className="mb-6"
          />
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            {eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            {intro}
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-42px_rgba(15,23,42,0.55)] sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-zinc-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
