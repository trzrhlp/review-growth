import { markConfirmationEmailSent, type OrderRecord } from "@/lib/orders";
import { getPlanLabel } from "@/lib/plans";

const resendApiUrl = "https://api.resend.com/emails";

function getNextSteps(order: OrderRecord) {
  return [
    "Our team will review your business details and prepare onboarding.",
    "We may contact you on email or WhatsApp if any clarification is needed.",
    "You can reply to the confirmation email with extra context or priorities.",
  ];
}

export async function sendPaidOrderConfirmationEmail(order: OrderRecord) {
  if (order.emailSent || order.emailSentAt) {
    return { skipped: true };
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is not configured. Skipping payment confirmation email.");
    return { skipped: true };
  }

  const nextSteps = getNextSteps(order);
  const subject = `Your ${getPlanLabel(order.plan)} payment is confirmed`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18181b;">
      <h1 style="font-size: 24px; margin-bottom: 16px;">Payment confirmed</h1>
      <p>Thanks for choosing Local Reviews Boost. We have verified your payment and your order is now in progress.</p>
      <p><strong>Plan:</strong> ${getPlanLabel(order.plan)}</p>
      <p><strong>Amount paid:</strong> $${order.amountUsd} USD</p>
      <p><strong>Full name:</strong> ${order.fullName}</p>
      <p><strong>Business name or Google Maps link:</strong> ${order.businessNameOrGoogleMapsLink}</p>
      <p><strong>Next steps:</strong></p>
      <ul>
        ${nextSteps.map((step) => `<li>${step}</li>`).join("")}
      </ul>
      <p>You can reply to this email if you want to add more context before onboarding starts.</p>
    </div>
  `.trim();

  const text = [
    "Payment confirmed",
    "",
    "Thanks for choosing Local Reviews Boost. We have verified your payment and your order is now in progress.",
    "",
    `Plan: ${getPlanLabel(order.plan)}`,
    `Amount paid: $${order.amountUsd} USD`,
    `Full name: ${order.fullName}`,
    `Business name or Google Maps link: ${order.businessNameOrGoogleMapsLink}`,
    "",
    "Next steps:",
    ...nextSteps.map((step, index) => `${index + 1}. ${step}`),
  ].join("\n");

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Local Reviews Boost <hello@localreviewsboost.com>",
      to: [order.email],
      reply_to: "hello@localreviewsboost.com",
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to send confirmation email: ${response.status} ${errorBody}`);
  }

  await markConfirmationEmailSent(order.id);

  return { skipped: false };
}
