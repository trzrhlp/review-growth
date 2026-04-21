"use client";

import { useEffect, useState } from "react";

type AutoRedirectToWhatsAppProps = {
  whatsappUrl: string;
  enabled: boolean;
};

const redirectDelaySeconds = 8;

export default function AutoRedirectToWhatsApp({
  whatsappUrl,
  enabled,
}: AutoRedirectToWhatsAppProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(redirectDelaySeconds);

  useEffect(() => {
    if (!enabled) {
      setSecondsRemaining(redirectDelaySeconds);
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(countdownInterval);
          window.location.assign(whatsappUrl);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(countdownInterval);
    };
  }, [enabled, whatsappUrl]);

  if (!enabled) {
    return null;
  }

  return (
    <p className="mt-4 text-sm text-zinc-500">
      Redirecting to WhatsApp in {secondsRemaining} seconds. If you prefer, you
      can stay on this page and use the button below instead.
    </p>
  );
}
