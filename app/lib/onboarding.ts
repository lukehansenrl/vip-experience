/**
 * Onboarding form data + routing logic.
 * Shared between the form page and the API route so the question schema
 * lives in exactly one place.
 *
 * v2 architecture (May 11, 2026):
 *   - Form is purely a "can they pay" filter — 3 financial gates + 1
 *     technical gate. Everything else collected as signal for the rep.
 *   - Hard gates only, no scoring (yet). Scores can be layered later
 *     if data shows they predict close rate.
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

export const EMPLOYMENT = [
  "Employed full-time",
  "Self-employed / Business owner",
  "Part-time employed",
  "Student",
  "Retired",
  "Unemployed",
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

// Forward-looking budget (replaced the past-spending question).
// Captures willingness to invest in improvement (coaching, gear,
// training tools, etc.) over the next 12 months.
export const BUDGET = [
  "$0",
  "$10-$99",
  "$100-$300",
  "$301-$500",
  "$501-$1,000",
  "$1,000+",
] as const;

export const HOW_FOUND_US = [
  "YouTube",
  "Discord",
  "Friend",
  "Twitter/X",
  "TikTok",
  "Other",
] as const;

// Replaces the old "Are you open to hearing about 1-on-1 coaching?"
// One step removed from the pitch — asks about improvement commitment
// instead of telegraphing the sales motion.
export const IMPROVEMENT_INTENT = [
  "Yes — I'm willing to invest time, money, and energy into improving faster",
  "No — I'm not interested in improving faster. I play for enjoyment.",
] as const;

// Curated country list — top RL-relevant countries.
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

// Countries where local purchasing power makes $497 USD an automatic
// barrier for nearly all buyers. Hard DQ on its own — does not combine
// with other signals. (Stricter than the previous "low-PPP + medium
// spend" rule per Luke's May 11 decision.)
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
  employment: (typeof EMPLOYMENT)[number];
  rank: (typeof RANKS)[number];
  platform: (typeof PLATFORMS)[number];
  hours: (typeof HOURS)[number];
  goal: (typeof GOALS)[number];
  tried: string[];
  budget: (typeof BUDGET)[number];
  howFoundUs: (typeof HOW_FOUND_US)[number];
  improvementIntent: (typeof IMPROVEMENT_INTENT)[number];
};

// ── ROUTING LOGIC ──────────────────────────────────────────────────────
//
// Eight hard gates. Anyone tripping one is unqualified for the call.
// Three financial, one technical, four fit-related.
//
// Financial:
//   1. Age (legal — can't make purchase decisions under 18)
//   2. Country (local purchasing power)
//   3. Employment (no income source)
//   8. Forward budget (explicit "I won't spend" signal)
//
// Technical:
//   4. Platform (Console makes most drills/training impossible)
//
// Fit:
//   5. Rank (community is built for Plat and above)
//   6. Goal (coaching is for people who want to improve)
//   7. Improvement intent (explicit "not trying to improve")

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

  // Gate 2: Country (local purchasing power)
  if (LOW_PPP_COUNTRIES.has(s.country)) {
    reasons.push("low-ppp-country");
  }

  // Gate 3: Employment (no income source)
  if (s.employment === "Unemployed") {
    reasons.push("unemployed");
  }

  // Gate 4: Platform (Console can't run Bakkesmod or import training packs)
  if (s.platform !== "PC") {
    reasons.push("not-pc");
  }

  // Gate 5: Rank (community built for high gold to low SSL — but Plat+ for VIP)
  if (s.rank === "Bronze" || s.rank === "Silver" || s.rank === "Gold") {
    reasons.push("below-plat");
  }

  // Gate 6: Goal (coaching is for people who want to improve)
  if (s.goal === "Just have fun, no specific goal") {
    reasons.push("not-goal-driven");
  }

  // Gate 7: Improvement intent (explicit opt-out from improving)
  if (
    s.improvementIntent ===
    "No — I'm not interested in improving faster. I play for enjoyment."
  ) {
    reasons.push("not-trying-to-improve");
  }

  // Gate 8: Forward budget — under $100 = below VIP monthly floor of $199
  if (s.budget === "$0" || s.budget === "$10-$99") {
    reasons.push("budget-below-floor");
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
    "employment",
    "rank",
    "platform",
    "hours",
    "goal",
    "budget",
    "howFoundUs",
    "improvementIntent",
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
  return { ok: true, data: body as OnboardingSubmission };
}
