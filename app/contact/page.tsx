import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import { Mail, MessageCircleMore } from "lucide-react";
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
    <div className="px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-[0_28px_70px_-32px_rgba(15,23,42,0.75)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
            Contact
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Speak with Local Reviews Boost
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Contact us for professional support on review growth, reputation
            management, customer feedback strategy, and local review visibility.
          </p>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
            <Image
              src="/contact-support-illustration.svg"
              alt="Illustration of contact support options for review growth planning."
              width={760}
              height={520}
              className="w-full"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)] sm:p-10">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
          className="mb-6"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <a
            href={`mailto:${supportEmail}`}
            className="rounded-[1.5rem] border border-zinc-200 p-6 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              <Mail aria-hidden="true" className="h-4 w-4" />
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
            className="rounded-[1.5rem] border border-zinc-200 p-6 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
              <MessageCircleMore aria-hidden="true" className="h-4 w-4" />
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
    </div>
  );
}
