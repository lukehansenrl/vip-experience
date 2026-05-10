"use client";

import { useState } from "react";
import { CalendlyModal } from "../../components/CalendlyModal";

const CLUBHOUSE_URL = "https://whop.com/rlclubhouse/";
const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

export default function QualifiedPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

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

      {/* HERO */}
      <section className="px-6 pt-16 pb-8 text-center md:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            You&apos;re in
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Welcome to the Clubhouse.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
            Your access is ready below. Dive in whenever you&apos;re ready.
          </p>
        </div>
      </section>

      {/* CLUBHOUSE ACCESS */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href={CLUBHOUSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Enter the Clubhouse →
          </a>
        </div>
      </section>

      {/* VIP UPGRADE — only path that distinguishes qualified from unqualified */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Want to rank up faster?
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            You&apos;re a great fit for VIP.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">
            Based on what you shared, you&apos;re a strong fit for our 1-on-1
            VIP coaching program. Pro coaches, personalized 90-day plan, and
            the rank-up promise — if you don&apos;t rank up in 90 days, we
            keep coaching you free until you do.
          </p>
          <p className="mt-4 text-sm text-white/50">
            If you want to walk through how it works, book a 45-minute call
            with our team. No pressure, no obligation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setCalendlyOpen(true)}
              className="inline-block rounded-full bg-[var(--accent)] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Book a 45-Min Call →
            </button>
            <a
              href="/call"
              className="inline-block rounded-full border border-white/20 bg-transparent px-10 py-4 text-base font-bold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              See What&apos;s in VIP →
            </a>
          </div>
        </div>
      </section>

      {/* ACTION ITEMS */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Your first week
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Three things to do.
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
              detail="No one's gonna be weird if you join — we're all introverted gamers trying to get better at car soccer."
            />
          </ol>

          <p className="mt-10 text-center text-sm text-white/40">
            Questions? Open a support ticket in the server.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>

      <CalendlyModal
        open={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
        url={CALENDLY_URL}
        title="VIP Onboarding Call"
        subtitle="45 minutes — see if VIP is the right fit"
      />
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
