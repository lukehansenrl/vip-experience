"use client";

import { useRef, useState } from "react";
import { HormoziPlayer } from "../components/HormoziPlayer";

// Placeholder — swap when Jacob ships Calendly "Event B" (direct push,
// full qualification questions: rank, age, country, budget, blocker).
const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-application";

// Direct-buy bypass for high-intent prospects who don't want to talk first.
// Keeps the /call page in the funnel as the secondary path.
const CALL_PAGE_URL = "/call";

// VSL file lives in /public — same asset used on /onboarding/qualified.
const VSL_SRC = "/vsl.mp4";

// CTA stays locked until the viewer has watched this many seconds of the
// VSL (real playback time — pausing pauses the gate). Matches the
// /onboarding/qualified gate so the audiences experience the same pacing.
const VSL_LOCK_SECONDS = 15;

// TODO: wire this to the Whop helper (fetchActiveMemberCount) once the
// new $497 product ID is set in WHOP_PRODUCT_ID. For now, hardcoded to
// match what /call shows (server-rendered there).
const FOUNDING_SPOTS_TOTAL = 60;
const FOUNDING_SPOTS_FILLED = 47;
const FOUNDING_SPOTS_LEFT = FOUNDING_SPOTS_TOTAL - FOUNDING_SPOTS_FILLED;

export default function VipPage() {
  const [playbackTime, setPlaybackTime] = useState(0);
  const schedulerRef = useRef<HTMLDivElement>(null);

  const unlocked = playbackTime >= VSL_LOCK_SECONDS;
  const secondsLeft = Math.max(0, Math.ceil(VSL_LOCK_SECONDS - playbackTime));

  function scrollToScheduler() {
    schedulerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span> ·{" "}
            <span className="text-white/70">VIP</span>
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: SPOTS CHIP + HERO + VSL ──────────────────────────── */}
      <section className="px-6 pt-10 pb-14 text-center md:pt-14">
        <div className="mx-auto max-w-3xl">
          {/* Live spots chip — same data shape as /call so the two pages
              read consistently if a prospect cross-checks. */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 px-5 py-2 ring-1 ring-[var(--accent)]/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-white/90">
              {FOUNDING_SPOTS_FILLED} of {FOUNDING_SPOTS_TOTAL} founding
              spots filled · {FOUNDING_SPOTS_LEFT} left
            </p>
          </div>

          {/* Headline — verbatim from /call so email-clickers see the same
              promise they were sold on. */}
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            Rank up in 90 days.
            <br />
            Or we coach you free until you do.
          </h1>

          {/* Subheadline — same line from /call. */}
          <p className="mx-auto mt-5 max-w-xl text-base text-white/65 md:text-lg">
            1-on-1 with a pro coach, a personalized 90-day plan, and a
            guarantee most coaches won&apos;t make.
          </p>

          {/* Capacity scarcity — always-on, real (60-client team cap) */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/50 md:text-base">
            Our team can only work with 60 private clients at any given
            time. Watch this video if you want to be one.
          </p>

          {/* Down chevron — scroll cue to the video */}
          <div
            className="mx-auto mt-6 text-[var(--accent)]"
            aria-hidden="true"
          >
            <svg
              className="mx-auto h-8 w-8 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── VSL BLOCK ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-4xl">
          <HormoziPlayer
            src={VSL_SRC}
            onPlaybackTimeChange={setPlaybackTime}
          />

          {/* Primary + secondary CTAs under the video */}
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3">
            <button
              type="button"
              onClick={scrollToScheduler}
              disabled={!unlocked}
              className="w-full rounded-full bg-[var(--accent)] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 disabled:shadow-none sm:w-auto"
            >
              {unlocked
                ? "Apply for a Call →"
                : `Apply for a Call in ${secondsLeft}s`}
            </button>
            <a
              href={CALL_PAGE_URL}
              className="text-sm text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Already know? Lock your founding-member spot →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: BOOKING WIDGET — hidden until VSL gate releases ─── */}
      {unlocked ? (
        <section
          ref={schedulerRef}
          className="border-t border-white/10 bg-white/[0.02] px-6 py-16"
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Step 2 — pick a time
            </p>
            <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl leading-tight tracking-tight md:text-4xl">
              Book a 45-minute call with our team.
            </h2>

            {/* Reassurance note — match the /onboarding/qualified pattern */}
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center text-base text-white/75">
              <span className="font-semibold text-white">
                Even if VIP isn&apos;t a fit
              </span>{" "}
              — you&apos;ll leave the call with clear direction on exactly
              what to work on next. No pressure, no hard sell.
            </div>

            {/* Inline Calendly embed */}
            <div className="mx-auto mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="780"
                frameBorder={0}
                title="Book a VIP application call"
                className="block"
              />
            </div>

            {/* Bottom direct-buy bypass — for prospects who decided during the video */}
            <div className="mt-10 text-center">
              <a
                href={CALL_PAGE_URL}
                className="inline-block rounded-full border border-white/20 bg-transparent px-10 py-4 text-base font-bold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Skip the call — lock your founding-member spot →
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
