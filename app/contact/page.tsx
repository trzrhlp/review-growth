import Breadcrumbs from "@/components/Breadcrumbs";
import { supportEmail, whatsappDisplayNumber, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | Local Reviews Boost",
  description:
    "Contact Local Reviews Boost for review growth, reputation management, and customer feedback strategy support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-zinc-50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
          className="mb-6"
        />
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Contact
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Speak with Local Reviews Boost
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Contact us for professional support on review growth, reputation
          management, customer feedback strategy, and local review visibility.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <a
            href={`mailto:${supportEmail}`}
            className="rounded-xl border border-zinc-200 p-6 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Email
            </p>
            <p className="mt-3 text-xl font-semibold text-zinc-950">
              {supportEmail}
            </p>
            <p className="mt-2 text-zinc-600">
              Use email for general questions, partnership enquiries, and
              planning discussions.
            </p>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-200 p-6 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              WhatsApp
            </p>
            <p className="mt-3 text-xl font-semibold text-zinc-950">
              {whatsappDisplayNumber}
            </p>
            <p className="mt-2 text-zinc-600">
              Use WhatsApp for quick plan questions and onboarding follow-up.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
