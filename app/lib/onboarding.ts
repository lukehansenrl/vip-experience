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

// Age buckets mirror the dropdown options in the CRM Google Sheet so
// submissions map cleanly into the existing pipeline. Kept in sync with
// the rl-clubhouse-onboarding repo (app/lib/onboarding.ts) — update both
// together if the CRM dropdown changes.
export const AGES = [
  "12-15",
  "16-17",
  "18-22",
  "23-29",
  "30-45",
  "45+",
] as const;

// Rank buckets mirror the CRM dropdown. Division-level granularity for
// Diamond / Champ / GC; combined buckets for Bronze-Silver and Plat 1-3.
// Kept in sync with rl-clubhouse-onboarding.
export const RANKS = [
  "Bronze-Silver",
  "Gold",
  "Plat 1-3",
  "Diamond 1",
  "Diamond 2",
  "Diamond 3",
  "Champion 1",
  "Champion 2",
  "Champion 3",
  "Grand Champ 1",
  "Grand Champ 2",
  "Grand Champ 3",
  "Supersonic Legend",
  "2k+ MMR",
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
// Competitive first (qualifying answer) so people who pick the top option
// land on the path we want. Order matches rl-clubhouse-onboarding.
export const PLAYER_TYPE = [
  "I play Rocket League competitively. I care about improving my skill and rank over time.",
  "I play Rocket League casually. I don't particularly care about my rank or skill level.",
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
  "Hong Kong",
  "Taiwan",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Israel",
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

// Allowlist approach — wealthy regions where local buyers can realistically
// commit to a $497 program. Combines traditional Western markets with
// high-income East Asia and the GCC + Israel. The budget gate (Q8) is the
// real income filter; the country gate just screens out regions where
// average purchasing power is below the price floor regardless of stated
// budget.
const ALLOWED_COUNTRIES = new Set<string>([
  // North America
  "United States",
  "Canada",
  // Europe (all countries in our dropdown)
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
  // Oceania
  "Australia",
  "New Zealand",
  // East Asia (high-income)
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "Taiwan",
  // Middle East (high-income GCC + Israel)
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Israel",
]);

export type OnboardingSubmission = {
  discord: string;
  email: string;
  age: (typeof AGES)[number];
  country: (typeof COUNTRIES)[number];
  // Multi-select: a player may queue on multiple regional servers.
  servers: (typeof SERVERS)[number][];
  // Multi-select: people can be student + part-time, or self-employed
  // + employed full-time, etc.
  employment: (typeof EMPLOYMENT)[number][];
  rank: (typeof RANKS)[number];
  platform: (typeof PLATFORMS)[number];
  budget: (typeof BUDGET)[number];
  playerType: (typeof PLAYER_TYPE)[number];
  // Multi-select: most players are blocked by multiple things at once.
  biggestBlockers: (typeof BIGGEST_BLOCKER)[number][];
};

// ── ROUTING LOGIC ──────────────────────────────────────────────────────
//
// Three-way routing into:
//   1. /onboarding/qualified           — full VIP-qualified. Calendly.
//   2. /onboarding/clubhouse-qualified — 18+, competitive, but doesn't
//      meet VIP-specific gates (budget, region, platform, rank).
//      Pitched the $27/mo Clubhouse 30-day free trial.
//   3. /onboarding/unqualified         — under 18 (legal bar) OR explicit
//      casual players. No paid pitch. Routed to the free Discord.
//
// Gates:
//   1. Age (under 18 = legal bar from BOTH VIP and paid Clubhouse)
//   2. Country (VIP only — local purchasing power)
//   3. Employment (VIP only — no income source)
//   4. Platform (VIP only — Console can't run Bakkesmod/training packs)
//   5. Rank (VIP only — built for Plat and above)
//   6. Player type ("casual" = fit DQ from BOTH VIP and paid Clubhouse)
//   7. Budget (VIP only — explicit "I won't spend" signal)

export type RoutingDecision = {
  qualified: boolean;
  // True for 18+ competitive players who don't meet ALL VIP-specific
  // gates but are still a fit for the paid Clubhouse ($27/mo, 30-day
  // free trial). Routed to /onboarding/clubhouse-qualified. Note that
  // VIP-qualified users also have clubhouseQualified=true (superset).
  clubhouseQualified: boolean;
  // Hard bar for under-18 submissions. Distinct from `qualified`: barred
  // users are routed to free academy/training, not the VIP unqualified
  // page. Mirrors the field shape used by the rl-clubhouse-onboarding
  // repo so Apps Script / Zapier downstream can treat submissions from
  // either form identically.
  barred: boolean;
  reasons: string[]; // disqualification reasons if any
};

export function routeSubmission(s: OnboardingSubmission): RoutingDecision {
  const reasons: string[] = [];
  let barred = false;

  // High-budget override: if the prospect reports $501+ annual budget
  // for improvement, they're showing clear discretionary income. That
  // trumps the country gate (which is just a proxy for purchasing
  // power) and the employment gate (which is a proxy for income
  // source). Platform, rank, age, casual-player gates still apply
  // because budget doesn't fix any of those.
  const hasHighBudget =
    s.budget === "$501-$1,000" || s.budget === "$1,000+";

  // Gate 1: Age (legal). Also fully bars from paid Clubhouse / VIP.
  if (s.age === "12-15" || s.age === "16-17") {
    reasons.push("under-18");
    barred = true;
  }

  // Gate 2: Country (local purchasing power). High-budget override
  // applies — someone with $501+ to spend on improvement clearly has
  // the means regardless of where they live.
  if (!ALLOWED_COUNTRIES.has(s.country) && !hasHighBudget) {
    reasons.push("country-not-allowed");
  }

  // Gate 3: Employment (no income source). Multi-select: only DQ if
  // "Unemployed" is the ONLY status checked. Anyone who's also a
  // student, part-time, or otherwise has structure/income passes.
  // High-budget override applies — if they have $501+ to spend, the
  // source of that money is none of our business.
  if (
    s.employment.length === 1 &&
    s.employment[0] === "Unemployed" &&
    !hasHighBudget
  ) {
    reasons.push("unemployed");
  }

  // Gate 4: Platform (Console can't run Bakkesmod or import training packs)
  if (s.platform !== "PC") {
    reasons.push("not-pc");
  }

  // Gate 5: Rank (Plat+ required — community built for high gold to low SSL,
  //   but VIP specifically targets Plat and above)
  if (s.rank === "Bronze-Silver" || s.rank === "Gold") {
    reasons.push("below-plat");
  }

  // Gate 6: Player type (explicit "I play casually" = not our buyer)
  if (
    s.playerType ===
    "I play Rocket League casually. I don't particularly care about my rank or skill level."
  ) {
    reasons.push("casual-player");
  }

  // Gate 7: Forward budget — under $301 annual = can't realistically commit
  // to the $497 VIP 6-week program. Floor matches the price-frame on Q8.
  if (
    s.budget === "$0" ||
    s.budget === "$10-$99" ||
    s.budget === "$100-$300"
  ) {
    reasons.push("budget-below-floor");
  }

  // Clubhouse-qualified = not legally barred (under 18) AND not an
  // explicit casual player. Everyone else (VIP-fit OR VIP-fail but
  // still 18+ competitive) is a good Clubhouse fit.
  const isCasual = reasons.includes("casual-player");
  const clubhouseQualified = !barred && !isCasual;

  return {
    qualified: reasons.length === 0,
    clubhouseQualified,
    barred,
    reasons,
  };
}

// ── VALIDATION ─────────────────────────────────────────────────────────

export function validateSubmission(
  body: Partial<OnboardingSubmission>,
): { ok: true; data: OnboardingSubmission } | { ok: false; error: string } {
  const requiredStrings: Array<keyof OnboardingSubmission> = [
    "discord",
    "email",
    "age",
    "country",
    "rank",
    "platform",
    "budget",
    "playerType",
  ];
  for (const k of requiredStrings) {
    if (!body[k]) return { ok: false, error: `Missing field: ${k}` };
  }

  // Multi-select fields: require at least one selection.
  const requiredArrays: Array<keyof OnboardingSubmission> = [
    "servers",
    "employment",
    "biggestBlockers",
  ];
  for (const k of requiredArrays) {
    const v = body[k];
    if (!Array.isArray(v) || v.length === 0) {
      return { ok: false, error: `Missing field: ${k}` };
    }
  }

  if (!body.email || !body.email.includes("@")) {
    return { ok: false, error: "Invalid email" };
  }
  return { ok: true, data: body as OnboardingSubmission };
}
