import { MessageCircleMore } from "lucide-react";
import { whatsappHref } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed right-4 z-50 inline-flex h-14 min-w-14 items-center justify-center rounded-full bg-[#25D366] px-4 text-zinc-950 shadow-[0_18px_45px_-24px_rgba(37,211,102,0.9)] transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:right-6 sm:h-14 sm:min-w-14 sm:px-4"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <MessageCircleMore aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
