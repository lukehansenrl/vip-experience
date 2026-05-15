"use client";

import { HormoziPlayer } from "../../components/HormoziPlayer";

// This page is for visitors who just submitted the RLC onboarding form
// and qualified for VIP. They're already inside the Clubhouse (or just
// started the free trial), so we don't gate the CTA on watching the VSL
// or show "buy Clubhouse" CTAs. The VSL plays as informational context
// to explain why VIP is a fit; the Calendly is always visible.
//
// /onboarding/qualified stays as-is for non-RLC-member audiences (and
// for Luke's existing reference). That page keeps the VSL gate because
// cold leads benefit from the friction filter. Warm leads don't.

// Discord channel where new Clubhouse members land for the server tour
// and orientation.
const SERVER_TOUR_DISCORD_URL =
  "https://discord.com/channels/1217265351658573895/1499077397604204706";

// Support ticket channel for questions during onboarding.
const SUPPORT_TICKET_URL =
  "https://discord.com/channels/1217265351658573895/1222927647126851604";

const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

// VSL file lives in /public, same asset used on /vip and
// /onboarding/qualified.
const VSL_SRC = "/vsl.mp4";

export default function QualifiedActiveRlcPage() {
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

      {/* ── SECTION 1: CONFIRMATION + HERO ─────────────────────────────── */}
      <section className="px-6 pt-12 pb-10 text-center md:pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 px-5 py-2 ring-1 ring-[var(--accent)]/40">
            <span className="text-base">✅</span>
            <p className="text-sm font-semibold text-white">
              Confirmed: Your Discord roles are on the way
            </p>
          </div>

          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            You&apos;re a great fit for VIP.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-white/65 md:text-lg">
            Based on what you shared, you&apos;re a strong fit for 1-on-1
            VIP coaching with our pros. Personalized 90-day plan and the
            rank-up promise: don&apos;t rank up in 90 days, we keep
            coaching you free for up to another year until you do.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">
            Watch the video below to see how VIP works, then book a
            45-minute call if you want to talk it through.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: VSL (informational, no gate) ────────────────────
          Sells the offer for members who haven't seen it before. CTA
          stays unlocked the whole time; watching is optional. */}
      <section className="border-t border-white/10 px-6 pt-12 pb-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Why VIP is a fit for you
          </p>
          <h2 className="font-display mt-3 text-center text-3xl tracking-tight md:text-4xl">
            What VIP coaching actually looks like.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-white/65">
            Quick walkthrough of the program: who it&apos;s for, what
            you get, and what changes in your gameplay over 12 weeks.
          </p>

          <div className="mt-10">
            <HormoziPlayer src={VSL_SRC} />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: BOOKING WIDGET ────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Pick a time
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl leading-tight tracking-tight md:text-4xl">
            Book your VIP onboarding call.
          </h2>

          {/* Reassurance note */}
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center text-base text-white/75">
            <span className="font-semibold text-white">Note:</span> This
            call is <strong>NOT</strong> required to access the Clubhouse.
            Only schedule if you want a personalized walkthrough of how
            VIP works.
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
        </div>
      </section>

      {/* ── SECTION 3: CLUBHOUSE WELCOME ─────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            You&apos;re in
          </p>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Welcome to the Clubhouse
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
            Your Discord access is being set up right now. Hop in and
            watch the full server-tour video at the top of the channel.
            It&apos;s an 8-minute walkthrough showing you where everything
            is and what to focus on first.
          </p>

          <div className="mt-10">
            <a
              href={SERVER_TOUR_DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Enter the Clubhouse →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FIRST-WEEK TASKS ──────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Your first week
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Three things to do
          </h2>

          <ol className="mx-auto mt-10 max-w-lg space-y-5">
            <ActionItem
              number={1}
              label="Post your introduction"
              detail="In #introductions. Use the template. Reply to a few others. This is how you find teammates."
            />
            <ActionItem
              number={2}
              label="RSVP to a live event this week"
              detail="Check the events channel near the top of the server. Pick one improvement event and one community event."
            />
            <ActionItem
              number={3}
              label="Hop into a voice channel"
              detail="No one's gonna be weird if you join. We're all introverted gamers trying to get better at car soccer."
            />
          </ol>

          <p className="mt-10 text-center text-sm text-white/40">
            Questions?{" "}
            <a
              href={SUPPORT_TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline-offset-2 transition hover:text-white hover:underline"
            >
              Open a support ticket in the server.
            </a>
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights
        reserved.
      </footer>
    </div>
  );
}

function ActionItem({
  number,
  label,
  detail,
}: {
  number: number;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex gap-5">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-sm font-bold text-[var(--accent)]">
        {number}
      </span>
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm text-white/60">{detail}</p>
      </div>
    </li>
  );
}
