export const PLAN_PRICES_USD = {
  Starter: 50,
  Growth: 99,
  Pro: 199,
} as const;

export type PlanName = keyof typeof PLAN_PRICES_USD;

export const planNames = Object.keys(PLAN_PRICES_USD) as PlanName[];

export const PLAN_LABELS: Record<PlanName, string> = {
  Starter: "Starter Pack",
  Growth: "Growth Pack",
  Pro: "Pro Pack",
};

export function isPlanName(plan: unknown): plan is PlanName {
  return typeof plan === "string" && planNames.includes(plan as PlanName);
}

export function getPlanLabel(plan: PlanName) {
  return PLAN_LABELS[plan];
}
