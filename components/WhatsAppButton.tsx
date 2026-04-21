const whatsappHref =
  "https://wa.me/919971194967?text=Hi%20I%20need%20help%20with%20review%20services";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366] text-zinc-950 shadow-lg shadow-zinc-950/15 transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-5 w-5 shrink-0"
        fill="currentColor"
      >
        <path d="M16.04 3.2A12.73 12.73 0 0 0 5.1 22.43L3.2 29.2l6.94-1.82A12.74 12.74 0 1 0 16.04 3.2Zm0 23.28a10.48 10.48 0 0 1-5.34-1.46l-.38-.23-4.12 1.08 1.1-4.02-.25-.41a10.45 10.45 0 1 1 8.99 5.04Zm5.74-7.83c-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.24-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.86-.76 2.12-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
