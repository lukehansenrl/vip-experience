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

export const PLATFORMS = ["PC", "PlayStation", "Xbox", "Switch"] as const;

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

export const HOW_FOUND_US = [
  "YouTube",
  "Discord",
  "Friend",
  "Twitter/X",
  "TikTok",
  "Other",
] as const;

export const INTEREST = [
  "Yes — that's why I'm here",
  "Maybe — tell me more",
  "No — just want the community",
] as const;

// Curated country list — top RL-relevant countries.
// Ordered roughly by community size, with "Other" as a catch-all.
export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Netherlands",
  "Belgium",
  "Spain",
  "Italy",
  "Portugal",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Switzerland",
  "Austria",
  "Poland",
  "Czech Republic",
  "Australia",
  "New Zealand",
  "Japan",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
  "Mexico",
  "Brazil",
  "Argentina",
  "Chile",
  "Colombia",
  "South Africa",
  "Philippines",
  "Indonesia",
  "India",
  "Turkey",
  "Russia",
  "Ukraine",
  "Other",
] as const;

// Countries where local purchasing power makes $500 USD a major
// commitment for most buyers. Used as a SOFT signal in combination
// with the spending question — not a hard disqualifier on its own.
//
// People in these countries with high training spend ($201+) are still
// real buyers and SHOULD be pitched. People in these countries with
// low spend ($0-50) are very unlikely to convert at $497/quarter.
const LOW_PPP_COUNTRIES = new Set<string>([
  "Brazil",
  "Argentina",
  "Colombia",
  "South Africa",
  "Philippines",
  "Indonesia",
  "India",
  "Turkey",
  "Russia",
  "Ukraine",
]);

export type OnboardingSubmission = {
  discord: string;
  email: string;
  age: (typeof AGES)[number];
  country: (typeof COUNTRIES)[number];
  rank: (typeof RANKS)[number];
  platform: (typeof PLATFORMS)[number];
  hours: (typeof HOURS)[number];
  goal: (typeof GOALS)[number];
  tried: string[];
  spent: (typeof SPENT)[number];
  howFoundUs: (typeof HOW_FOUND_US)[number];
  interest: (typeof INTEREST)[number];
};

// ── AGE GATE (HARD BLOCK) ──────────────────────────────────────────────
// Anyone under 18 is blocked entirely — no Discord access, no thank-you page.
// Checked by the form (inline UX) and the API (server-side enforcement).

export function isUnderageAge(age: string | undefined): boolean {
  return age === "13-15" || age === "16-17";
}

// ── ROUTING LOGIC ──────────────────────────────────────────────────────
// Hard gates: anyone who trips one is unqualified for the call.

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

  // Gate 4: Budget signal — combination of country + spending.
  //
  // For high-PPP countries: $0-50 spent on training in past year = unqualified.
  // For low-PPP countries: $0-200 spent = unqualified (higher bar because
  //   $500 USD is a much bigger ask in their economy, so we want stronger
  //   proof of willingness to invest).
  const isLowPpp = LOW_PPP_COUNTRIES.has(s.country);
  const lowSpend = s.spent === "$0" || s.spent === "$1-50";
  const mediumSpend = s.spent === "$51-200";
  if (lowSpend) {
    reasons.push("low-budget-signal");
  } else if (isLowPpp && mediumSpend) {
    reasons.push("low-ppp-medium-spend");
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
    "country",
    "rank",
    "platform",
    "hours",
    "goal",
    "spent",
    "howFoundUs",
    "interest",
  ];
  for (const k of required) {
    if (!body[k]) return { ok: false, error: `Missing field: ${k}` };
  }
  if (!body.email || !body.email.includes("@")) {
    return { ok: false, error: "Invalid email" };
  }
  if (isUnderageAge(body.age)) {
    return {
      ok: false,
      error:
        "RL Clubhouse memberships are limited to users 18 and older. Sorry we can't get you in just yet.",
    };
  }
  if (!Array.isArray(body.tried)) {
    body.tried = [];
  }
  // Trust caller — types are enforced by the form's radios/checkboxes.
  return { ok: true, data: body as OnboardingSubmission };
}
