"use client";

import { Check, Minus, Crosshair, Trophy, ArrowDown } from "lucide-react";

type Tier = {
  name: string;
  /** Price string. Pass null to hide the price entirely (used when the tier's
   *  price is being saved for a reveal section further down the page). */
  price: string | null;
  priceNote?: string;
  positioning: string;
  rows: { value: string; check?: "yes" | "full" | "no" | "custom" }[];
  icon: React.ReactNode;
  highlighted?: boolean;
  ribbon?: string;
};

const ROW_LABELS = [
  "Format",
  "1:1 sessions / month",
  "Personalized plan",
  "Commitment",
  "Best for",
];

const TIERS: Tier[] = [
  {
    name: "VIP",
    price: null,
    positioning: "Coach + plan + community",
    icon: <Crosshair className="h-5 w-5 text-[var(--accent)]" />,
    highlighted: true,
    ribbon: "Where most players start",
    rows: [
      { value: "Coach + plan + community" },
      { value: "1 live + 1 async", check: "yes" },
      { value: "Personalized 30-day", check: "yes" },
      { value: "Month-to-month, cancel anytime", check: "yes" },
      { value: "Improving faster without going all-in" },
    ],
  },
  {
    name: "Bootcamp",
    price: "$300 to $550",
    priceNote: "/ 4 weeks",
    positioning: "1:1 intensive flagship",
    icon: <Trophy className="h-5 w-5 text-white/70" />,
    rows: [
      { value: "1:1 intensive" },
      { value: "Custom", check: "custom" },
      { value: "Custom", check: "custom" },
      { value: "4 to 12 week block, application only", check: "custom" },
      { value: "Going all-in" },
    ],
  },
];

function CheckGlyph({ kind }: { kind?: "yes" | "full" | "no" | "custom" }) {
  if (kind === "no") {
    return <Minus className="h-4 w-4 text-white/25" />;
  }
  if (kind === "full") {
    return <Check className="h-4 w-4 text-[var(--accent)]" />;
  }
  if (kind === "yes") {
    return <Check className="h-4 w-4 text-[var(--green)]" />;
  }
  return null;
}

function TierColumn({ tier }: { tier: Tier }) {
  const baseRing = tier.highlighted
    ? "border-[var(--accent)]/60 bg-[var(--accent)]/5 shadow-xl shadow-[var(--accent-glow)] md:scale-[1.04]"
    : "border-white/10 bg-white/[0.03]";

  return (
    <div
      className={`relative flex flex-col rounded-2xl border ${baseRing} p-6 transition`}
    >
      {tier.ribbon && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-[var(--accent-glow)]">
          {tier.ribbon}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            tier.highlighted ? "bg-[var(--accent)]/15" : "bg-white/5"
          }`}
        >
          {tier.icon}
        </span>
        <span className="text-sm font-black uppercase tracking-widest">
          {tier.name}
        </span>
      </div>

      <div className="mt-5 min-h-[2.75rem] flex items-baseline gap-1">
        {tier.price === null ? (
          <a
            href="#investment"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
          >
            Pricing below <ArrowDown className="h-3.5 w-3.5" />
          </a>
        ) : (
          <>
            <span
              className={`text-3xl font-black md:text-4xl ${
                tier.highlighted ? "text-[var(--accent)]" : "text-white"
              }`}
            >
              {tier.price}
            </span>
            {tier.priceNote && (
              <span className="ml-1 text-sm font-semibold text-white/50">
                {tier.priceNote}
              </span>
            )}
          </>
        )}
      </div>

      <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
        {tier.rows.map((row, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 flex-shrink-0">
              <CheckGlyph kind={row.check} />
            </span>
            <span>
              <span
                className={`block text-[10px] font-bold uppercase tracking-widest ${
                  tier.highlighted ? "text-white/40" : "text-white/30"
                }`}
              >
                {ROW_LABELS[i]}
              </span>
              <span
                className={`${
                  tier.highlighted ? "text-white" : "text-white/75"
                }`}
              >
                {row.value}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductStack() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 md:items-stretch md:gap-6">
      {TIERS.map((tier) => (
        <TierColumn key={tier.name} tier={tier} />
      ))}
    </div>
  );
}
