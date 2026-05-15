"use client";

import { useState } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { VipBrandNav } from "../components/VipBrandNav";

// Plan ID for the 45-day VIP Pro experience on Whop.
// $497 today, then $199 every 4 weeks after the first 45 days.
const PLAN_ID = "plan_NzvzBslipuXV3";

// Where Whop sends the customer after a successful purchase. Hosted on
// this same Vercel project.
const RETURN_URL = "https://vip-experience.vercel.app/checkout/success";

export default function CheckoutPage() {
  const [agreed, setAgreed] = useState(false);

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

      {/* HERO STRIP */}
      <section className="px-6 pt-12 pb-6 text-center md:pt-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Step 1 of 2 / Checkout
          </p>
          <h1 className="font-display text-3xl tracking-tight md:text-4xl">
            Almost there. Here&apos;s what you&apos;re buying.
          </h1>
        </div>
      </section>

      {/* ORDER SUMMARY */}
      <section className="px-6 pt-4 pb-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--accent)]/30 bg-white/[0.03] p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Order summary
          </p>
          <h2 className="mt-2 text-xl font-extrabold md:text-2xl">
            45-Day VIP Pro Experience
          </h2>
          <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="text-base text-white/65">Today</span>
            <span className="text-2xl font-black text-white">$497</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-base text-white/65">After 84 days</span>
            <span className="text-base font-semibold text-white/75">
              $199 / 4 weeks
            </span>
          </div>
          <div className="mt-5 rounded-xl border border-[var(--green)]/30 bg-[var(--green)]/5 px-4 py-3">
            <p className="text-sm font-semibold text-[var(--green)]">
              30-Day Money-Back + 90-Day Keep Coaching You
            </p>
            <p className="mt-1 text-xs text-white/55">
              Cancel anytime. Don&apos;t love it in 30 days, full refund.
              Don&apos;t rank up in 90 days (and you showed up), we keep
              coaching you free until you do.
            </p>
          </div>
        </div>
      </section>

      {/* PURCHASE TERMS */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Purchase terms
          </p>
          <h2 className="mt-2 text-xl font-extrabold">
            Read and agree to continue
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            You are paying for your first 45 days today. Your membership
            renews every 4 weeks after the first 84 days unless canceled
            before renewal.
          </p>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/[0.02] p-4 transition hover:border-white/30">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 flex-shrink-0 cursor-pointer accent-[var(--accent)]"
              required
            />
            <span className="text-sm leading-relaxed text-white/80">
              I understand I am purchasing the 45-day VIP Pro experience
              for $497 today. After 84 days, my membership renews at $199
              every 4 weeks plus applicable taxes unless I cancel before
              renewal. I agree to the{" "}
              <a
                href="/terms"
                className="text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Rocket League Clubhouse terms
              </a>
              ,{" "}
              <a
                href="/terms#refund-policy"
                className="text-[var(--accent)] underline-offset-2 hover:underline"
              >
                refund policy
              </a>
              , and{" "}
              <a
                href="https://whop.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Whop&apos;s terms
              </a>
              .
            </span>
          </label>

          {!agreed && (
            <p className="mt-4 text-center text-xs text-white/40">
              Check the box above to unlock the secure checkout form.
            </p>
          )}
        </div>
      </section>

      {/* WHOP EMBED (only renders after agreement) */}
      {agreed && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-2 md:p-4">
            <WhopCheckoutEmbed
              planId={PLAN_ID}
              returnUrl={RETURN_URL}
              theme="dark"
              hideTermsAndConditions={true}
            />
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
