"use client";

import { useRef, useState } from "react";
import { HormoziPlayer } from "../../components/HormoziPlayer";

// TODO (Jacob/Luke): Update this to the canonical Whop "Join the Community" /
// Discord-claim URL for the Clubhouse product. Find it in your Whop admin:
// Products → Rocket League Clubhouse → "Join the Community" page → copy URL.
// Should look like: https://whop.com/joined/rlclubhouse/3-join-the-community-XXX/app/
const CLUBHOUSE_URL = "https://whop.com/rlclubhouse/";

const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

// VSL file lives in /public — served directly from the Vercel CDN. Swap to
// a Vimeo / Cloudflare Stream URL later if bandwidth becomes a concern.
const VSL_SRC = "/vsl.mp4";

// CTA stays locked until the viewer has watched this many seconds of the
// VSL (real playback time — pausing pauses the gate). Mirrors Hormozi's
// "Book Your Call in 12s" countdown which only counts while the video plays.
const VSL_LOCK_SECONDS = 15;

export default function QualifiedPage() {
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
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: CONFIRMATION + HERO + VSL ────────────────────────── */}
      <section className="px-6 pt-10 pb-14 text-center md:pt-14">
        <div className="mx-auto max-w-3xl">
          {/* Confirmation pill — Hormozi pattern */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 px-5 py-2 ring-1 ring-[var(--accent)]/40">
            <span className="text-base">✅</span>
            <p className="text-sm font-semibold text-white">
              Confirmed: Your Discord roles are on the way
            </p>
          </div>

          {/* Headline — Hormozi "IMPORTANT - Before You Check Your Email" */}
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            IMPORTANT: Before You Check Your Discord Roles,
            <br />
            Watch This Improvement Video.
          </h1>

          {/* Subheadline — scarcity + selectivity (capacity-based, always-on) */}
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/65 md:text-lg">
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
                ? "See If I'm a Fit for VIP →"
                : `See If I'm a Fit for VIP in ${secondsLeft}s`}
            </button>
            <a
              href={CLUBHOUSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--accent)] underline-offset-4 hover:underline"
            >
              No thanks. Just take me to the Clubhouse.
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: BOOKING WIDGET — hidden until the VSL timer expires
          (Hormozi-style commitment gate; viewers must watch or wait first) */}
      {unlocked ? (
        <section
          ref={schedulerRef}
          className="border-t border-white/10 bg-white/[0.02] px-6 py-16"
        >
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            While you&apos;re waiting for your Discord roles&hellip;
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl leading-tight tracking-tight md:text-4xl">
            Want to learn how to improve and rank up faster with our team of pros?
          </h2>

          {/* Reassurance note — Hormozi "this call is NOT required" pattern */}
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center text-base text-white/75">
            <span className="font-semibold text-white">Note:</span> This call
            is <strong>NOT</strong> required to access the Clubhouse. Only
            schedule if you want to see if VIP is the right fit for your
            game.
          </div>

          {/* Inline Calendly embed */}
          <div className="mx-auto mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            <iframe
              src={CALENDLY_URL}
              width="100%"
              height="780"
              frameBorder={0}
              title="Book a VIP onboarding call"
              className="block"
            />
          </div>

          {/* Bottom "no thanks" — same pattern Hormozi uses */}
          <div className="mt-10 text-center">
            <a
              href={CLUBHOUSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-white/20 bg-transparent px-10 py-4 text-base font-bold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              No thanks, take me to the Clubhouse
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
