"use client";

type Action =
  | { type: "button"; label: string; onClick: () => void }
  | { type: "link"; label: string; href: string };

type Props = {
  variant?: "default" | "call";
  action: Action;
  /** Caption rendered under the CTA. */
  caption?: string;
  /** Numeric price (no $ or cadence). Defaults to 279 for the default variant
   *  and 199 for the call variant. */
  price?: number;
  /** Strikethrough price shown above the headline. Only rendered in the
   *  default variant. Defaults to 329. */
  strikethroughPrice?: number;
  /** Cadence label rendered next to the price, e.g. "/ month" or
   *  "/ 4 weeks". Defaults to "/ month" for both variants. */
  cadence?: string;
  /** Optional secondary line under the cadence (e.g. quarterly discount). */
  cadenceNote?: string;
};

/**
 * Both variants render a strikethrough + savings badge to anchor against the
 * prior price.
 *
 * `default` — $329 → $279, "Save $50". Used on the announce-cohort page.
 * `call` — $329 → $199, "Save $130". Used on /call.
 */
export function PricingCard({
  variant = "default",
  action,
  caption,
  price,
  strikethroughPrice = 329,
  cadence,
  cadenceNote,
}: Props) {
  const resolvedPrice = price ?? (variant === "call" ? 199 : 279);
  const resolvedCadence = cadence ?? "/ month";
  const savings = strikethroughPrice - resolvedPrice;
  const showStrikethrough = savings > 0;

  const cta =
    action.type === "button" ? (
      <button
        type="button"
        onClick={action.onClick}
        className="mt-8 rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
      >
        {action.label} &rarr;
      </button>
    ) : (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-full bg-[var(--accent)] px-12 py-5 text-xl font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
      >
        {action.label} &rarr;
      </a>
    );

  return (
    <div className="mt-10 rounded-2xl border border-[var(--accent)]/30 bg-white/[0.03] p-8 text-center md:p-10">
      {showStrikethrough && (
        <p className="text-lg font-bold text-white/30 line-through">
          ${strikethroughPrice} / month
        </p>
      )}
      <p
        className={`${
          showStrikethrough ? "mt-2" : ""
        } text-6xl font-black md:text-7xl`}
      >
        <span className="text-[var(--accent)]">${resolvedPrice}</span>
        <span className="text-lg font-semibold text-white/50">
          {" "}
          {resolvedCadence}
        </span>
      </p>
      {cadenceNote && (
        <p className="mt-2 text-sm text-white/50">{cadenceNote}</p>
      )}
      {showStrikethrough && (
        <p className="mt-2 inline-block rounded-full bg-[var(--green)]/10 px-4 py-1 text-sm font-bold text-[var(--green)]">
          Save ${savings} / month
        </p>
      )}
      <p className="mt-4 text-white/50">
        {variant === "call"
          ? "Risk is on us. Two-guarantee stack covers the entire 6 weeks."
          : "Cancel anytime. No contracts. No hidden fees."}
      </p>

      <div className="text-center">{cta}</div>

      {caption && (
        <p className="mt-6 text-center text-sm text-white/30">{caption}</p>
      )}

      {/* Guarantee callout */}
      <div className="mx-auto mt-6 max-w-md rounded-xl border border-[var(--green)]/30 bg-[var(--green)]/5 px-5 py-3">
        <p className="text-sm font-semibold text-[var(--green)]">
          {variant === "call"
            ? "14-Day Money-Back + Rank-Up Guarantee"
            : "14-Day Money-Back Guarantee"}
        </p>
        <p className="mt-1 text-xs text-white/50">
          {variant === "call"
            ? "Don't love it in 14 days, full refund. Don't rank up by the end of your 6 weeks (and you showed up), we keep coaching you free until you do."
            : "If VIP doesn't deliver everything we promised in your first 14 days, we'll give you your money back. No questions asked."}
        </p>
      </div>
    </div>
  );
}
