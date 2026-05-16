"use client";

import { HormoziPlayer } from "../../components/HormoziPlayer";

// Direct-to-checkout link for VIP-funnel Clubhouse-qualified prospects.
// Skips the product card and lands them straight on Whop checkout. Scoped
// so attribution from this funnel stays separate from other Clubhouse
// signup sources. Plan stock is set to 85 on the Whop side (= 500 product
// cap minus 415 current active members at the time of launch). If the
// page shows "out of stock", check that plan's stock counter, not the
// product's.
const CLUBHOUSE_URL = "https://whop.com/c/gcbcommunity/vipclubhousequalified";

// Self-hosted VSL. Re-encoded from D:\Mega Cloud Sync\...\Clubhouse Launch
// V3 30 Day Free Tiral August 6th\FINAL v5 [300mb].mp4 down to 720p30 /
// ~1 Mbps / 85 MB with +faststart. Stays under GitHub's 100 MB per-file
// limit. Same self-hosted pattern as /vip, /onboarding/qualified, /booked.
const VSL_SRC = "/clubhouse-vsl.mp4";

export default function ClubhouseQualifiedPage() {
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
      {/* Clubhouse-only nav (no VIP wordmark — this page reads as a
          standalone Clubhouse pitch, not a VIP-funnel continuation) */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2.5 px-6 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rlc-vip-logo.png"
            alt="RL Clubhouse logo"
            className="h-10 w-10"
          />
          <span className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-16 pb-8 text-center md:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Congratulations, you qualify
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Get coached by pros and improve faster in Rocket League,
            free for 30 days, without grinding more hours.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/70">
            Over 4,000 players coached. Watch the 8-minute breakdown below.
          </p>
        </div>
      </section>

      {/* VSL VIDEO — minimal-UI player (see HormoziPlayer below). */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-3xl">
          <HormoziPlayer src={VSL_SRC} />
        </div>
      </section>

      {/* PRIMARY CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href={CLUBHOUSE_URL}
            className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Start my 30-day free trial →
          </a>
          <p className="mt-3 text-sm text-white/50">
            $27 a month after trial. 18+ only. Cancel anytime.
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF + WHAT'S INSIDE */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            4.9 stars · 99 reviews · 4,000+ players coached
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            What you get inside.
          </h2>

          <ul className="mx-auto mt-10 max-w-lg space-y-4 text-white/85">
            <li>15+ live training events monthly to help you improve and rank up fast.</li>
            <li>Learn RL with 500+ players in a positive, improvement-first community.</li>
            <li>Review replays, compete, and train with pro coaches who know what works.</li>
            <li>Join weekly review calls with SpookyLuke to get direct feedback on your play.</li>
            <li>Built by the #1 RL teacher and pro team with 40,000+ hours of combined experience.</li>
          </ul>

          <div className="mt-12 text-center">
            <a
              href={CLUBHOUSE_URL}
              className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Start my 30-day free trial →
            </a>
            <p className="mt-3 text-sm text-white/50">
              30-day free trial. 18+ only. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
