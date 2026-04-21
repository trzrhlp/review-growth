"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Button from "@/components/Button";
import {
  defaultPaymentCurrency,
  paymentCurrencies,
  paymentCurrencyLabels,
  type PaymentCurrency,
} from "@/lib/paymentMethods";
import { getPlanLabel, type PlanName } from "@/lib/plans";

type OrderFormProps = {
  selectedPlan: PlanName;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  businessNameOrGoogleMapsLink: string;
  paymentMethod: PaymentCurrency;
};

export default function OrderForm({ selectedPlan }: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    businessNameOrGoogleMapsLink: "",
    paymentMethod: defaultPaymentCurrency,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormComplete =
    formData.fullName.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.phone.trim().length > 0 &&
    formData.businessNameOrGoogleMapsLink.trim().length > 0;

  function updateField(field: keyof FormData, value: string) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function getFallbackErrorMessage(response: Response) {
    if (response.status >= 500) {
      return "Unable to start payment right now. Please try again.";
    }

    return "Unable to start payment. Please try again.";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormComplete) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          businessNameOrGoogleMapsLink:
            formData.businessNameOrGoogleMapsLink.trim(),
          paymentMethod: formData.paymentMethod,
        }),
      });

      const responseText = await response.text();
      let payload: { error?: string; paymentUrl?: string } | null = null;

      if (responseText) {
        try {
          payload = JSON.parse(responseText) as {
            error?: string;
            paymentUrl?: string;
          };
        } catch {
          payload = null;
        }
      }

      if (!response.ok || !payload?.paymentUrl) {
        throw new Error(
          payload?.error ?? getFallbackErrorMessage(response),
        );
      }

      window.location.assign(payload.paymentUrl);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-semibold text-zinc-900"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={(event) =>
            updateField("paymentMethod", event.target.value as PaymentCurrency)
          }
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        >
          {paymentCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {paymentCurrencyLabels[currency]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-zinc-900"
        >
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          value={formData.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
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
          Phone Number
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
          htmlFor="businessNameOrGoogleMapsLink"
          className="block text-sm font-semibold text-zinc-900"
        >
          Business Name or Google Maps Link
        </label>
        <input
          id="businessNameOrGoogleMapsLink"
          name="businessNameOrGoogleMapsLink"
          type="text"
          autoComplete="organization"
          required
          minLength={2}
          placeholder="e.g. ABC Cafe or https://maps.google.com/..."
          value={formData.businessNameOrGoogleMapsLink}
          onChange={(event) =>
            updateField("businessNameOrGoogleMapsLink", event.target.value)
          }
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={!isFormComplete || isSubmitting}
        className="w-full disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
      >
        {isSubmitting
          ? "Redirecting to secure payment..."
          : `Continue to ${getPlanLabel(selectedPlan)} payment`}
      </Button>
    </form>
  );
}
