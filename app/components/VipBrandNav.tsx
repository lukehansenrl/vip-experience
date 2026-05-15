/**
 * Shared top-of-page nav for VIP-funnel routes: /vip, /call, /checkout,
 * /checkout/success, /booked, /onboarding/qualified,
 * /onboarding/qualified-active-rlc, /onboarding/unqualified.
 *
 * Logo asset lives in /public/rlc-vip-logo.png (sourced from
 * C:\Game Launch\Marketing\Assets\RL ABC Assets\RLC VIP.png).
 *
 * Don't import this in /terms or pages that should read as RL Clubhouse
 * core (not VIP-branded). Those have their own nav blocks.
 */
export function VipBrandNav() {
  return (
    <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-2.5 px-6 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rlc-vip-logo.png"
          alt="RL Clubhouse VIP logo"
          className="h-10 w-10"
        />
        <span className="text-lg font-extrabold tracking-tight">
          RL <span className="text-[var(--accent)]">Clubhouse</span> ·{" "}
          <span className="text-white/70">VIP</span>
        </span>
      </div>
    </nav>
  );
}
