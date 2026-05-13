import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | RL Clubhouse",
};

// TODO: replace the placeholder phrasing below with the finalized refund
// policy from counsel. The summary points (30-day money-back, 90-day
// rank-up guarantee) match what's described on /call and /checkout, so
// nothing here invents new commitments. It's just restated for the
// dedicated policy page so the link from the checkout doesn't 404.
export default function RefundPolicyPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0b0e17" }}
    >
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      <section className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Refund Policy
          </h1>

          <h2 className="mt-8 text-xl font-extrabold">
            30-Day Money-Back Guarantee
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            If you join the 12-week VIP Pro experience and decide it
            isn&apos;t for you within the first 30 days, contact support
            in Discord for a full refund. No questions asked.
          </p>

          <h2 className="mt-8 text-xl font-extrabold">
            90-Day Rank-Up Guarantee
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            If you complete the program in good faith (show up to your
            sessions, follow your coach&apos;s plan) and don&apos;t rank
            up within your first 90 days, we keep coaching you for free
            until you do.
          </p>

          <h2 className="mt-8 text-xl font-extrabold">
            How to Request a Refund
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            Open a support ticket in our Discord server. We&apos;ll
            confirm eligibility and process refunds within a reasonable
            number of business days.
          </p>

          <p className="mt-10 text-sm text-white/40">
            Full legal terms forthcoming. Questions? Contact us in Discord
            or email support.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
