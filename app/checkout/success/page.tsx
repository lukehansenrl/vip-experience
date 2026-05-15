import type { Metadata } from "next";
import { VipBrandNav } from "../../components/VipBrandNav";

// Whop page where new VIP members claim their perks and Discord roles.
const VIP_INSTRUCTIONS_URL =
  "https://whop.com/joined/rlclubhouse/vip-pro-membership-instructions-DMOa1VhnAFmIo0/app/";

// Whop dashboard where members cancel their old Clubhouse membership so they
// aren't paying for both Clubhouse and VIP simultaneously.
const WHOP_ORDERS_URL = "https://whop.com/@me/settings/orders/";

export const metadata: Metadata = {
  title: "Welcome to VIP | RL Clubhouse",
  description:
    "Your VIP Pro purchase is complete. Three quick steps to claim your perks and book your first coaching session.",
};

export default function CheckoutSuccessPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: "#0b0e17",
        backgroundImage: `
          radial-gradient(ellipse 90% 60% at 50% 0%, rgba(108,99,255,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(80,60,200,0.1) 0%, transparent 70%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <VipBrandNav />

      {/* HERO */}
      <section className="px-6 pt-20 pb-8 text-center md:pt-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            You&apos;re in
          </p>
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">
            Welcome to the VIP
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/65">
            Your purchase is complete. Three quick steps to finish setting
            up your access.
          </p>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          <Step
            number={1}
            title="Claim your VIP perks and Discord roles"
            description="Head to your Whop instructions page to unlock VIP-only Discord channels, your access perks, and onboarding details."
            ctaLabel="Open VIP Instructions →"
            ctaUrl={VIP_INSTRUCTIONS_URL}
            primary
          />

          <Step
            number={2}
            title="Cancel your old Clubhouse membership"
            description="So you aren't paying for both your old Clubhouse membership and VIP. Cancel from your Whop orders dashboard."
            ctaLabel="Manage My Orders →"
            ctaUrl={WHOP_ORDERS_URL}
          />

          <Step
            number={3}
            title="Schedule your first coaching session"
            description="From your VIP instructions page (Step 1), follow the link to book your first 1:1 session with your coach."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  ctaLabel,
  ctaUrl,
  primary = false,
}: {
  number: number;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaUrl?: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-7 ${
        primary
          ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.06]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-black ${
            primary
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--accent)]/20 text-[var(--accent)]"
          }`}
        >
          {number}
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
            {title}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-white/70">
            {description}
          </p>
          {ctaLabel && ctaUrl && (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-block rounded-full px-6 py-2.5 text-sm font-bold transition ${
                primary
                  ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent-glow)] hover:bg-[var(--accent-hover)]"
                  : "border border-white/20 text-white/85 hover:border-white/40 hover:text-white"
              }`}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
