"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Button from "@/components/Button";

const whatsappNumber = "919971194967";

type OrderFormProps = {
  selectedPlan: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  business: string;
};

export default function OrderForm({ selectedPlan }: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    business: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormComplete =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.phone.trim().length > 0;

  function updateField(field: keyof FormData, value: string) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormComplete) {
      return;
    }

    setIsSubmitting(true);

    const message = [
      `Name: ${formData.name.trim()}`,
      `Business: ${formData.business.trim()}`,
      `Plan: ${selectedPlan}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim()}`,
    ].join("\n");

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-zinc-900"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-zinc-900"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-zinc-900"
        >
          WhatsApp Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      <div>
        <label
          htmlFor="business"
          className="block text-sm font-semibold text-zinc-900"
        >
          Business Name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          autoComplete="organization"
          value={formData.business}
          onChange={(event) => updateField("business", event.target.value)}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      <Button
        type="submit"
        disabled={!isFormComplete || isSubmitting}
        className="w-full disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
      >
        {isSubmitting ? "Opening WhatsApp..." : "Continue on WhatsApp"}
      </Button>
    </form>
  );
}
