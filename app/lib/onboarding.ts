/**
 * Onboarding form data + routing logic.
 * Shared between the form page and the API route so the question schema
 * lives in exactly one place.
 */

// ── QUESTION SCHEMA ────────────────────────────────────────────────────

export const AGES = ["13-15", "16-17", "18-22", "23-29", "30+"] as const;
export const RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Champion",
  "Grand Champion",
  "SSL",
] as const;
export const HOURS = ["<2", "2-5", "5-10", "10+"] as const;
export const GOALS = [
  "Just have fun, no specific goal",
  "Rank up one tier",
  "Hit a specific rank or MMR",
  "Compete in tournaments or work toward pro",
] as const;
export const TRIED_OPTIONS = [
  "YouTube tutorials",
  "Free Discord communities",
  "Training packs only",
  "Paid 1-on-1 coaching",
  "Online courses",
  "Just grinding ranked",
] as const;
export const SPENT = ["$0", "$1-50", "$51-200", "$201-500", "$500+"] as const;
export const INTEREST = [
  "Yes — that's why I'm here",
  "Maybe — tell me more",
  "No — just want the community",
] as const;

export type OnboardingSubmission = {
  discord: string;
  email: string;
  age: (typeof AGES)[number];
  rank: (typeof RANKS)[number];
  hours: (typeof HOURS)[number];
  goal: (typeof GOALS)[number];
  tried: string[];
  spent: (typeof SPENT)[number];
  interest: (typeof INTEREST)[number];
};

// ── ROUTING LOGIC ──────────────────────────────────────────────────────
// Five hard gates. Anyone who clears all five sees the call CTA.

export type RoutingDecision = {
  qualified: boolean;
  reasons: string[]; // disqualification reasons if any
};

export function routeSubmission(s: OnboardingSubmission): RoutingDecision {
  const reasons: string[] = [];

  // Gate 1: Age (legal)
  if (s.age === "13-15" || s.age === "16-17") {
    reasons.push("under-18");
  }

  // Gate 2: Rank (community is built for high gold to low SSL)
  if (s.rank === "Bronze" || s.rank === "Silver") {
    reasons.push("below-plat");
  }

  // Gate 3: Goal (coaching is for people who want to improve)
  if (s.goal === "Just have fun, no specific goal") {
    reasons.push("not-goal-driven");
  }

  // Gate 4: Budget proxy (best predictor of actually paying)
  if (s.spent === "$0" || s.spent === "$1-50") {
    reasons.push("low-budget-signal");
  }

  // Gate 5: Explicit coaching interest
  if (s.interest === "No — just want the community") {
    reasons.push("not-interested-in-coaching");
  }

  return {
    qualified: reasons.length === 0,
    reasons,
  };
}

// ── VALIDATION ─────────────────────────────────────────────────────────

export function validateSubmission(
  body: Partial<OnboardingSubmission>,
): { ok: true; data: OnboardingSubmission } | { ok: false; error: string } {
  const required: Array<keyof OnboardingSubmission> = [
    "discord",
    "email",
    "age",
    "rank",
    "hours",
    "goal",
    "spent",
    "interest",
  ];
  for (const k of required) {
    if (!body[k]) return { ok: false, error: `Missing field: ${k}` };
  }
  if (!body.email || !body.email.includes("@")) {
    return { ok: false, error: "Invalid email" };
  }
  if (!Array.isArray(body.tried)) {
    body.tried = [];
  }
  // Trust caller — types are enforced by the form's radios/checkboxes.
  return { ok: true, data: body as OnboardingSubmission };
}
