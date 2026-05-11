/**
 * Onboarding form data + routing logic.
 *
 * v3 architecture (May 12, 2026):
 *   - Tighter than v2: cut 4 questions (Hours, Goal, Tried, HowFoundUs)
 *     and combined Goal + ImprovementIntent into one casual-vs-competitive
 *     question.
 *   - Form is now 8 questions, ~60 sec.
 *   - Pure "can they pay" filter — 3 financial + 1 technical + 3 fit gates.
 *   - Everything else (rank specifics, hours, what they've tried, etc.)
 *     gathered by the rep on the call.
 *   - How-found-us moves to Calendly thank-you (post-booking attribution).
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

// RL game servers — the 12 official matchmaking regions.
// Used for matchmaking, coach matching, and Discord role auto-assignment.
// Separate from "country" (which is for PPP signal).
export const SERVERS = [
  "US-East (USE)",
  "US-West (USW)",
  "US-Central (USC)",
  "Europe (EU)",
  "Asia-SE Mainland (ASC)",
  "Asia-SE Maritime (ASM)",
  "Asia-East (JPN)",
  "Middle East (ME)",
  "Oceania (OCE)",
  "South Africa (SAF)",
  "South America (SAM)",
  "India (IND)",
] as const;

export const EMPLOYMENT = [
  "Employed full-time",
  "Self-employed / Business owner",
  "Part-time employed",
  "Student",
  "Retired",
  "Unemployed",
] as const;

// Forward-looking budget (replaced past-spending question in v2).
// Captures willingness to invest in improvement (coaching, gear, training
// tools, etc.) over the next 12 months.
export const BUDGET = [
  "$0",
  "$10-$99",
  "$100-$300",
  "$301-$500",
  "$501-$1,000",
  "$1,000+",
] as const;

// Combined replacement for the old Goal + Improvement-Intent questions.
// Identity-based framing ("I play X way") reads more honestly than
// action-based ("Will you invest in...") and captures the same gate
// signal: are they trying to improve, or just here for vibes?
export const PLAYER_TYPE = [
  "I play Rocket League casually. I don't particularly care about my rank or skill level.",
  "I play Rocket League competitively. I care about improving my skill and rank over time.",
] as const;

// Self-diagnosed primary blocker. Signal-only — NOT a gate. The rep uses
// this on the call to tie the VIP pitch to whatever the prospect thinks
// their problem is. Priestley-style "what do you think is wrong?"
// question without the full Score model overhead.
export const BIGGEST_BLOCKER = [
  "My mechanics aren't consistent",
  "My game sense / decision-making",
  "I tilt / mental game",
  "I don't have time to practice",
  "I don't have a structured plan",
  "I can't get past a specific rank wall",
  "Something else",
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
// barrier for nearly all buyers.
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
  server: (typeof SERVERS)[number];
  employment: (typeof EMPLOYMENT)[number];
  rank: (typeof RANKS)[number];
  platform: (typeof PLATFORMS)[number];
  budget: (typeof BUDGET)[number];
  playerType: (typeof PLAYER_TYPE)[number];
  biggestBlocker: (typeof BIGGEST_BLOCKER)[number];
};

// ── ROUTING LOGIC ──────────────────────────────────────────────────────
//
// Seven hard gates. Anyone tripping one is unqualified for the call.
// Three financial, one technical, three fit-related.
//
// Financial:
//   1. Age (legal — can't make purchase decisions under 18)
//   2. Country (local purchasing power)
//   3. Employment (no income source)
//   7. Forward budget (explicit "I won't spend" signal)
//
// Technical:
//   4. Platform (Console makes most drills/training impossible)
//
// Fit:
//   5. Rank (community is built for Plat and above)
//   6. Player type (explicit "I play casually" = not our buyer)

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

  // Gate 5: Rank (Plat+ required — community built for high gold to low SSL,
  //   but VIP specifically targets Plat and above)
  if (s.rank === "Bronze" || s.rank === "Silver" || s.rank === "Gold") {
    reasons.push("below-plat");
  }

  // Gate 6: Player type (explicit "I play casually" = not our buyer)
  if (
    s.playerType ===
    "I play Rocket League casually. I don't particularly care about my rank or skill level."
  ) {
    reasons.push("casual-player");
  }

  // Gate 7: Forward budget — under $100 = below VIP monthly floor of $199
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
    "server",
    "employment",
    "rank",
    "platform",
    "budget",
    "playerType",
    "biggestBlocker",
  ];
  for (const k of required) {
    if (!body[k]) return { ok: false, error: `Missing field: ${k}` };
  }
  if (!body.email || !body.email.includes("@")) {
    return { ok: false, error: "Invalid email" };
  }
  return { ok: true, data: body as OnboardingSubmission };
}
