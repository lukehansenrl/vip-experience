"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, ChevronRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

/* ── Calendly Modal (same as main page) ── */

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

/* ── ANNOUNCE PAGE ── */

export default function AnnouncePage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const openBooking = useCallback(() => setCalendlyOpen(true), []);

  // Scroll-reveal animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    );
    sections.forEach((s, idx) => {
      if (idx === 0) return;
      s.style.opacity = "0";
      s.style.transform = "translateY(40px)";
      s.style.transition =
        "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";
      s.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    sections.forEach((s, idx) => {
      if (idx === 0) return;
      io.observe(s);
    });

    return () => io.disconnect();
  }, []);

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
      <CalendlyModal
        open={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />

      {/* ── NAV ── */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
          <button
            type="button"
            onClick={openBooking}
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Book VIP Onboarding
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pb-16 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            VIP Update
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Good news: the VIP price is going up&hellip; but not yet.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            On <strong className="text-white">April 25</strong>, the VIP
            Experience price for new members increases. Until then, you can lock
            in the current rate.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="mt-8 rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Lock In Your VIP Spot →
          </button>
        </div>
      </section>

      {/* ── WHAT YOU TOLD US ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Your Words
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            You Told Us Why You&apos;re Here
          </h2>
          <p className="mt-4 text-white/50">
            When we asked the community your single biggest reason for being in
            the Clubhouse, you said:
          </p>

          <div className="mt-8 space-y-3">
            <PollResult rank={1} text="Improve my overall Rocket League skill" votes={46} highlight />
            <PollResult rank={2} text="Get better at mechanics (aerials, dribbling, shooting)" votes={18} />
            <PollResult rank={3} text="Rank up and gain MMR" votes={15} />
            <PollResult rank={4} text="Improve my game sense and positioning" votes={13} />
          </div>

          <p className="mt-6 text-sm text-white/40">
            The VIP Experience exists for exactly this: real coaching, feedback,
            and routines so you actually get better every month, not just queue
            ranked and hope.
          </p>
        </div>
      </section>

      {/* ── WHAT'S CHANGING ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            What&apos;s Changing
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            VIP Is Moving To $249 / Month For New Members
          </h2>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                Current Price
              </p>
              <p className="mt-2 text-3xl font-black text-white/30 line-through">
                $179
              </p>
              <p className="mt-1 text-xs text-white/30">/ month</p>
            </div>
            <div className="flex items-center justify-center text-white/20">
              <ChevronRight className="h-6 w-6" />
            </div>
            <div className="flex-1 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                New Price (April 25)
              </p>
              <p className="mt-2 text-3xl font-black text-[var(--accent)]">
                $249
              </p>
              <p className="mt-1 text-xs text-white/50">/ month</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <p className="text-sm text-white/60">
              <strong className="text-white">Until April 25:</strong> Current
              VIPs keep their price as long as they stay active. New members who
              join before the deadline lock in the current rate.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Why
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Why The Price Is Going Up
          </h2>

          <p className="mt-6 leading-relaxed text-white/60">
            VIP is not a role in Discord. It&apos;s real people blocking real
            hours to help you improve:
          </p>

          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              A 1:1, 60-minute session with a pro coach
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              A 30-minute replay review from SpookyLuke (his Metafy rate is $125 for this alone)
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              Your coach recording, reviewing, and writing up a custom training plan
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              An accountability guide spending time checking in with you
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              Full Clubhouse membership with 15+ live events monthly
            </li>
          </ul>

          <p className="mt-6 leading-relaxed text-white/60">
            As VIP grew, we hit the hard limit:{" "}
            <strong className="text-white">time.</strong> At the current price,
            we were stretching those hours thinner and thinner.
            That&apos;s the opposite of what you joined for.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            Raising the price for new members lets us:
          </p>

          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--green)]" />
              Keep sessions thorough instead of rushed
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--green)]" />
              Protect coach time so you&apos;re not waiting weeks for your 1:1
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--green)]" />
              Keep hiring and training great coaches instead of burning them out
            </li>
          </ul>

          <p className="mt-6 leading-relaxed text-white/60">
            The VIP is not the cheapest coaching experience. It&apos;s the most
            hands-on. The price reflects that so you don&apos;t have to worry
            about anything but improving.
          </p>
        </div>
      </section>

      {/* ── EARLY ADOPTER REWARD ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-2xl border p-8"
            style={{
              borderColor: "rgba(245, 197, 66, 0.3)",
              background:
                "linear-gradient(135deg, var(--gold-glow), transparent)",
            }}
          >
            <h3 className="flex items-center gap-2 text-xl font-extrabold text-[var(--gold)]">
              <Star className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
              Early Adopter Reward
            </h3>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--gold)]" />
                <span>
                  <strong className="text-white">Already VIP?</strong> Your
                  price stays the same as long as you stay active. Nothing
                  changes for you.
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--gold)]" />
                <span>
                  <strong className="text-white">Been on the fence?</strong> You
                  have until <strong className="text-white">April 25</strong> to
                  join at the current rate and keep it as long as you stay.
                </span>
              </li>
            </ul>

            <p className="mt-6 text-sm text-white/40">
              You got in early. We don&apos;t forget that.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE RANK-UP PROMISE ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            New
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-4xl">
            The Rank-Up Promise
          </h2>
          <p className="mt-4 text-white/50">
            We can&apos;t play the game for you, but we can stand behind the
            work we do together.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3 text-left">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--accent)] text-sm font-black text-[var(--accent)]">
                1
              </div>
              <h3 className="mt-4 font-bold">Rank Up</h3>
              <p className="mt-2 text-sm text-white/50">
                Achieve a full rank up within 90 days. Plat to Diamond, Diamond
                to Champ, Champ to GC. A full tier, not just a division.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--accent)] text-sm font-black text-[var(--accent)]">
                2
              </div>
              <h3 className="mt-4 font-bold">Hold It</h3>
              <p className="mt-2 text-sm text-white/50">
                Maintain your new rank across two consecutive seasons. Send us
                proof. No boosting, no shortcuts.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--green)] text-sm font-black text-[var(--green)]">
                ✓
              </div>
              <h3 className="mt-4 font-bold text-[var(--green)]">
                Get a New Controller
              </h3>
              <p className="mt-2 text-sm text-white/50">
                We verify your rank and ship you a brand new Xbox or PS
                controller. Because if you put in the work, you deserve it.
              </p>
            </div>
          </div>

          <a
            href="/promise"
            className="mt-6 inline-block text-xs text-white/30 underline hover:text-white/50 transition"
          >
            Full terms and conditions
          </a>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-16 text-center md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">
            You Still Have Time
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            The new pricing takes effect{" "}
            <strong className="text-white">April 25</strong>. If you want to
            lock in the current rate, book a call before then and we will get
            you set up.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="mt-8 rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Lock In Your VIP Spot →
          </button>
          <p className="mt-4">
            <a
              href="/"
              className="text-sm font-semibold text-[var(--accent)] hover:underline transition"
            >
              See everything included in the VIP Experience →
            </a>
          </p>
          <p className="mt-6 text-sm text-white/30">
            Questions?{" "}
            <a
              href="https://discord.com/channels/1217265351658573895/1222927647126851604"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white/50 hover:text-white transition"
            >
              Open a support ticket
            </a>{" "}
            in the Clubhouse.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

/* ── SUB-COMPONENTS ── */

function PollResult({
  rank,
  text,
  votes,
  highlight = false,
}: {
  rank: number;
  text: string;
  votes: number;
  highlight?: boolean;
}) {
  const maxVotes = 46;
  const percent = Math.round((votes / maxVotes) * 100);

  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
              highlight
                ? "bg-[var(--accent)] text-white"
                : "bg-white/10 text-white/60"
            }`}
          >
            {rank}
          </span>
          <span
            className={`text-sm font-semibold ${
              highlight ? "text-white" : "text-white/70"
            }`}
          >
            {text}
          </span>
        </div>
        <span className="text-sm font-bold text-white/40">{votes}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            highlight ? "bg-[var(--accent)]" : "bg-white/20"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

