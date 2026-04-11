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
            Important Update
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            An Update To The VIP Experience
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            Here's what's changing, why it's changing, and what it means for you.
          </p>
        </div>
      </section>

      {/* ── WHAT YOU TOLD US ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Your Words
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            You Told Us Why You're Here
          </h2>
          <p className="mt-4 text-white/50">
            We ran a poll asking the community their single biggest reason for
            being part of the Clubhouse. Here's what you said:
          </p>

          <div className="mt-8 space-y-3">
            <PollResult rank={1} text="Improve my overall Rocket League skill" votes={46} highlight />
            <PollResult rank={2} text="Get better at mechanics (aerials, dribbling, shooting)" votes={18} />
            <PollResult rank={3} text="Rank up and gain MMR" votes={15} />
            <PollResult rank={4} text="Improve my game sense and positioning" votes={13} />
          </div>

          <p className="mt-6 text-sm text-white/40">
            The VIP Experience was built for exactly this: real coaching,
            feedback, and routines so you actually get better every month.
          </p>
        </div>
      </section>

      {/* ── WHAT'S CHANGING ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The Change
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            VIP Is Now $249 / Month For New Members
          </h2>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                Previous Price
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
                New Price
              </p>
              <p className="mt-2 text-3xl font-black text-[var(--accent)]">
                $249
              </p>
              <p className="mt-1 text-xs text-white/50">/ month</p>
            </div>
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
            Why The Price Went Up
          </h2>

          <p className="mt-6 leading-relaxed text-white/60">
            Just do the math on what you actually get every month:
          </p>

          {/* Mini value stack */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-sm text-white/60">SpookyLuke replay review (30 min)</span>
              <span className="text-sm font-bold">$125</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-sm text-white/60">1:1 coaching session with a pro (60 min)</span>
              <span className="text-sm font-bold">$30 - $50</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-sm text-white/60">Training routine + accountability + membership</span>
              <span className="text-sm font-bold">$100+</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4 bg-white/[0.03]">
              <span className="font-bold text-white/70">Total value per month</span>
              <span className="font-black">$255 - $275+</span>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-white/60">
            At <strong className="text-white">$179</strong>, we were literally
            losing money on every VIP member. SpookyLuke&apos;s Metafy rate
            alone for a 30-minute session is $125. Add a full hour with a pro
            coach on top of that, plus everything else, and the math
            doesn&apos;t work at $179.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            We&apos;re nearly at{" "}
            <strong className="text-white">50 members</strong>, sessions run
            every week, and time is the one thing we can&apos;t scale. To keep
            giving every student the attention they deserve, we need to be
            intentional about growth.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            At <strong className="text-white">$249</strong>, VIP is still
            priced below what the individual pieces cost. The difference is now
            we can actually sustain it.
          </p>
        </div>
      </section>

      {/* ── WHAT WE'RE INVESTING IN ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Where It Goes
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            What We're Investing In
          </h2>

          <p className="mt-6 mb-6 text-white/60">
            We're raising price only after increasing value, not the other way
            around. Here's where the investment goes:
          </p>

          <div className="space-y-4">
            <InvestCard
              title="More coaching capacity"
              description="So sessions and reviews don't bottleneck. You should never have to wait weeks for your 1:1."
            />
            <InvestCard
              title="Tighter experience"
              description="Focusing on serious, improvement-minded players who get the most out of the coaching."
            />
            <InvestCard
              title="Better events, curriculum, and support"
              description="More live sessions, better training resources, and a stronger support system for every member."
            />
          </div>
        </div>
      </section>

      {/* ── GRANDFATHER CARD ── */}
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
            <p className="mt-4 text-white/60">
              You believed in this early. That matters. Here's how we're
              honoring it:
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--gold)]" />
                <span>
                  <strong className="text-white">Current VIPs:</strong> Keep your
                  existing price as long as you stay active. Nothing changes for
                  you.
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--gold)]" />
                <span>
                  <strong className="text-white">
                    If you cancel and return later:
                  </strong>{" "}
                  You'll rejoin at the current public price ($249 / mo).
                </span>
              </li>
            </ul>

            <p className="mt-6 text-sm text-white/40">
              This is founders-price logic: reward early adopters, raise for new
              people once the experience is better.
            </p>
          </div>
        </div>
      </section>

      {/* ── RANK-UP PROMISE TEASER ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              New
            </p>
            <h3 className="mt-2 text-xl font-extrabold">
              Introducing: The Rank-Up Promise
            </h3>
            <p className="mt-3 text-sm text-white/60">
              Achieve a full rank up within 90 days, hold it for a full season
              across back-to-back seasons, and we'll send you a brand new
              controller. Our way of backing your improvement and keeping you
              going.
            </p>
            <a
              href="/"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              See the full details on the VIP page
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT'S NEXT / CTA ── */}
      <section className="px-6 py-16 text-center md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">
            If You've Been Thinking About Going Deeper
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            The VIP Experience was built for players who want real coaching, real
            feedback, and real improvement. If that's you, let's talk.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="mt-8 rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Book Your VIP Onboarding Call →
          </button>
          <p className="mt-6 text-sm text-white/30">
            Questions? Drop them in #pricing-questions or DM me.
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

function ProofItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-white/60">
      <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--green)]" />
      {text}
    </li>
  );
}

function InvestCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm text-white/50">{description}</p>
    </div>
  );
}
