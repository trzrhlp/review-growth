import { NextResponse } from "next/server";

const plans = ["Starter", "Growth", "Pro"] as const;

type PlanName = (typeof plans)[number];

type OrderRequest = {
  name?: unknown;
  email?: unknown;
  business?: unknown;
  link?: unknown;
  plan?: unknown;
};

function isPlanName(plan: unknown): plan is PlanName {
  return typeof plan === "string" && plans.includes(plan as PlanName);
}

function getRequiredString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidLink(link: string) {
  try {
    const url = new URL(link);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isOrderRequest(value: unknown): value is OrderRequest {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!isOrderRequest(body)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const name = getRequiredString(body.name);
  const email = getRequiredString(body.email);
  const business = getRequiredString(body.business);
  const link = getRequiredString(body.link);
  const plan = body.plan;

  if (!name || !email || !business || !link) {
    return NextResponse.json(
      { error: "All order fields are required." },
      { status: 400 },
    );
  }

  if (name.length < 2 || business.length < 2) {
    return NextResponse.json(
      { error: "Name and business must be at least 2 characters." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isValidLink(link)) {
    return NextResponse.json(
      { error: "Enter a valid link." },
      { status: 400 },
    );
  }

  if (!isPlanName(plan)) {
    return NextResponse.json(
      { error: "A valid plan is required." },
      { status: 400 },
    );
  }

  const orderId = crypto.randomUUID();
  const order = {
    id: orderId,
    name,
    email,
    business,
    link,
    plan,
    submittedAt: new Date().toISOString(),
  };

  console.info("New order submitted", order);

  return NextResponse.json({ success: true, orderId }, { status: 201 });
}
