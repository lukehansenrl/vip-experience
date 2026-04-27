"use client";

import { useEffect, useState, useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

/* ── CALENDLY MODAL ── */

function CalendlyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl border border-[var(--accent)]/30 bg-[#0b0e17] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              VIP Onboarding Call
            </p>
            <p className="text-sm text-white/50">
              Walk through the VIP Experience and get your questions answered
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white transition text-lg leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="h-[80vh] max-h-[720px] overflow-hidden bg-white">
          <iframe
            src={CALENDLY_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a VIP onboarding call"
          />
        </div>
      </div>
    </div>
  );
}

/* ── ANNOUNCE PAGE — Window closed ── */

export default function AnnouncePage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const openBooking = useCallback(() => setCalendlyOpen(true), []);

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
      {/* ── NAV ── */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
          <a
            href="/"
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Learn More About VIP
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pb-16 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
            Window Closed
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            The Original Package Window Has Closed
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            Thanks to everyone who locked in. The Original Package (with my replay reviews included) closed Sunday at 11:59pm CT.
          </p>
        </div>
      </section>

      {/* ── WHAT'S CURRENT ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            What&apos;s Current
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            VIP Is Now $199/Month
          </h2>
          <p className="mt-5 leading-relaxed text-white/70">
            Same coaching from our pro team, plus an extra 30-minute coach check-in each month replacing my quarterly replay reviews. Custom training plans, accountability, full Clubhouse access, all of it.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            <strong className="text-white">Shock</strong> is also trialing on the coaching team with limited spots over the next month. First-come if you want him specifically.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openBooking}
              className="inline-block rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Book a Call →
            </button>
            <a
              href="/"
              className="inline-block rounded-full border border-white/20 bg-transparent px-10 py-4 text-lg font-bold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Learn More About VIP →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIGN-OFF ── */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="leading-relaxed text-white/60">
            Appreciate everyone who hopped in this week. More to come.
          </p>
          <p className="mt-6 text-lg italic text-white/50">- Luke</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>

      {/* ── CALENDLY MODAL ── */}
      <CalendlyModal
        open={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />
    </div>
  );
}
