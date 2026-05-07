"use client";

import { useEffect } from "react";
import {
  Gamepad2,
  Video,
  ClipboardList,
  PhoneCall,
  Trophy,
  Star,
  Play,
  Crosshair,
  Layers,
  Clock,
} from "lucide-react";

import { StickyNav } from "../components/StickyNav";
import { IncludeCard } from "../components/IncludeCard";
import { BenefitCard } from "../components/BenefitCard";
import { RatingBar } from "../components/RatingBar";
import { PricingCard } from "../components/PricingCard";
import { VIDEO_TESTIMONIALS } from "../data/testimonials";
import { VALUE_STACK } from "../data/value-stack";

const WHOP_URL = "https://whop.com/rlclubhouse/rlc-pro-vip-membership/";

const FEATURED_TESTIMONIALS = ["Xeneson", "Dami", "deadshot8885"];

// Total cap. Only changes if the business actually raises the cap.
const SPOTS_TOTAL = 60;

// Local pro shots from the July 2025 photo shoot.
const HERO_IMG = "/graphics/spookyluke-hero.jpg";
const CREATOR_IMG = "/graphics/spookyluke-creator.jpg";

type Props = {
  /** Active member count fetched server-side from the Whop API. */
  spotsFilled: number;
};

export function CallPageClient({ spotsFilled }: Props) {
  const spotsOpen = Math.max(0, SPOTS_TOTAL - spotsFilled);
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

  const featured = VIDEO_TESTIMONIALS.filter((t) =>
    FEATURED_TESTIMONIALS.includes(t.name)
  );

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: "#0b0e17",
        backgroundImage: `
          radial-gradient(ellipse 90% 60% at 50% 0%, rgba(108,99,255,0.35) 0%, transparent 70%),
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(80,60,200,0.15) 0%, transparent 70%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <StickyNav />

      {/* ── HERO ── */}
      <section className="relative px-6 pb-16 pt-24 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center md:justify-start">
            <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--green)]/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-[var(--green)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]" />
                </span>
                Live
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--gold)] md:text-base">
                {spotsFilled} of {SPOTS_TOTAL} Spots Filled · {spotsOpen} Left
              </span>
            </span>
          </div>
          <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14">
            {/* Copy */}
            <div className="text-center md:text-left">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                The VIP Experience
              </p>
              <h1 className="font-display text-5xl leading-[1] tracking-tight md:text-6xl lg:text-7xl">
                Improve Faster With One-on-One Coaching.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-xl text-white/80 md:mx-0 md:text-2xl">
                Stop guessing what to focus on. Three pro coaches, twelve
                weeks, and a plan built for your rank.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-[var(--green)] md:mx-0 md:text-xl">
                Rank up one full rank in 90 days. Or your money back.
              </p>
            </div>
            {/* Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-[var(--accent)]/20 blur-3xl" />
                <img
                  src={HERO_IMG}
                  alt="SpookyLuke at his Rocket League setup"
                  className="relative w-full max-w-md rounded-2xl border border-white/10 object-cover shadow-2xl shadow-[var(--accent-glow)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM-AWARE SECTION (meet them where they are) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Sound Familiar?
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            You Could Be A Higher Rank. You Just Don&apos;t Know What To
            Focus On.
          </h2>

          {/* Three problem quote cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-display text-3xl leading-none text-[var(--accent)]/50">
                &ldquo;
              </span>
              <p className="mt-2 text-lg italic leading-relaxed text-white/90 md:text-xl">
                I feel inconsistent in my games. Some days I&apos;m sharp, some
                days I&apos;m awful.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-display text-3xl leading-none text-[var(--accent)]/50">
                &ldquo;
              </span>
              <p className="mt-2 text-lg italic leading-relaxed text-white/90 md:text-xl">
                I know what I should be doing. I just can&apos;t do it
                consistently.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-display text-3xl leading-none text-[var(--accent)]/50">
                &ldquo;
              </span>
              <p className="mt-2 text-lg italic leading-relaxed text-white/90 md:text-xl">
                I could be a higher rank if I just knew what to focus on.
              </p>
            </div>
          </div>

          {/* Insight + reframe */}
          <div className="mt-10 rounded-2xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/5 p-6 shadow-xl shadow-[var(--accent-glow)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              It&apos;s not a talent problem
            </p>
            <h3 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">
              It&apos;s a focus problem.
            </h3>
            <p className="mt-4 text-lg text-white/85 md:text-xl">
              There are a million things you could be practicing. The real
              question is what you actually need at YOUR rank. Focus on the
              wrong things and you&apos;ll play more without improving.
            </p>
            <p className="mt-4 text-base text-white/75 md:text-lg">
              A coach doesn&apos;t make you improve. You do. But a coach takes
              your speed of improvement from where it is now to where it could
              be. You stop guessing what to work on. You know exactly what to
              focus on to improve the fastest.
            </p>
          </div>
        </div>
      </section>

      {/* ── 12-WEEK ROADMAP (RL-tracker-styled progression visual) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Your 12-Week Roadmap
          </p>
          <h2 className="font-display mt-3 text-center text-4xl tracking-tight md:text-5xl">
            What Happens Day 1 To Day 90.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
            Three months. Three coaches. Two guarantees. One full rank.
          </p>

          {/* RL-Tracker-styled card */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a1530] via-[#0a1124] to-[#0b0e17]">
            {/* Header strip mimicking RL Tracker player profile */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0a1530]/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--accent)]/30 text-[10px] font-black text-white">
                  YOU
                </span>
                <span className="font-display text-sm tracking-wide text-white">
                  Your Rating Progression
                </span>
              </div>
              <span className="rounded-md bg-[var(--accent)]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
                Example
              </span>
            </div>

            {/* Chart area */}
            <div className="relative px-3 py-4 pl-12 md:px-8 md:py-8 md:pl-20">
              <div className="relative aspect-[2/1]">
                {/* Y-axis labels (rank tiers) */}
                <div className="absolute -left-9 top-0 flex h-full flex-col justify-between text-right text-[8px] font-bold uppercase tracking-widest text-white/40 md:-left-14 md:text-[10px]">
                  <span className="text-[var(--green)]">Champ III</span>
                  <span></span>
                  <span>Champ II</span>
                  <span>Champ I</span>
                </div>

                {/* Rank-up label floating top right */}
                <div className="absolute right-0 top-0 z-10 rounded-full border border-[var(--green)]/50 bg-[var(--green)]/20 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[var(--green)] md:px-3 md:text-[10px]">
                  Rank Up
                </div>

                {/* SVG chart */}
                <svg
                  viewBox="0 0 800 400"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient
                      id="rankProgressLine"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient
                      id="rankProgressFill"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#fb923c"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="#34d399"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Tier divider lines */}
                  <line
                    x1="0"
                    y1="60"
                    x2="800"
                    y2="60"
                    stroke="rgba(52, 211, 153, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  <line
                    x1="0"
                    y1="200"
                    x2="800"
                    y2="200"
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="340"
                    x2="800"
                    y2="340"
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="4 4"
                  />

                  {/* Area under curve (subtle gradient fill) */}
                  <path
                    d="M 60,340 Q 140,330 240,290 Q 320,275 420,210 Q 500,180 600,130 Q 670,95 740,60 L 740,400 L 60,400 Z"
                    fill="url(#rankProgressFill)"
                  />

                  {/* Progression curve */}
                  <path
                    d="M 60,340 Q 140,330 240,290 Q 320,275 420,210 Q 500,180 600,130 Q 670,95 740,60"
                    stroke="url(#rankProgressLine)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Milestone dots */}
                  <circle cx="60" cy="340" r="6" fill="#fb923c" />
                  <circle
                    cx="240"
                    cy="290"
                    r="6"
                    fill="#fff"
                    stroke="#6c63ff"
                    strokeWidth="3"
                  />
                  <circle
                    cx="420"
                    cy="210"
                    r="6"
                    fill="#fff"
                    stroke="#6c63ff"
                    strokeWidth="3"
                  />
                  <circle
                    cx="740"
                    cy="60"
                    r="9"
                    fill="#34d399"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </svg>

                {/* Coach photos overlaid at milestones */}
                {/* Day 1 — YOU starting point */}
                <div
                  className="absolute z-20"
                  style={{
                    left: "7.5%",
                    top: "85%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fb923c] bg-[#0a1530] text-[9px] font-black text-[#fb923c] md:h-11 md:w-11 md:text-xs">
                      YOU
                    </span>
                    <span className="rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white md:text-[10px]">
                      Day 1
                    </span>
                  </div>
                </div>

                {/* Month 1 — Torment */}
                <div
                  className="absolute z-20"
                  style={{
                    left: "30%",
                    top: "72.5%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src="/graphics/torment.jpg"
                      alt="Torment"
                      className="h-9 w-9 rounded-full border-2 border-[var(--accent)] object-cover object-top md:h-12 md:w-12"
                    />
                    <span className="rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white md:text-[10px]">
                      M1: Torment
                    </span>
                  </div>
                </div>

                {/* Month 2 — Freakii */}
                <div
                  className="absolute z-20"
                  style={{
                    left: "52.5%",
                    top: "52.5%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src="/graphics/freakii-lp.jpg"
                      alt="Freakii"
                      className="h-9 w-9 rounded-full border-2 border-[var(--accent)] object-cover object-top md:h-12 md:w-12"
                    />
                    <span className="rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white md:text-[10px]">
                      M2: Freakii
                    </span>
                  </div>
                </div>

                {/* Month 3 — SpookyLuke (rank up!) */}
                <div
                  className="absolute z-20"
                  style={{
                    left: "92.5%",
                    top: "15%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src="/graphics/spookyluke-creator.jpg"
                      alt="SpookyLuke"
                      className="h-10 w-10 rounded-full border-2 border-[var(--green)] object-cover object-top md:h-14 md:w-14"
                    />
                    <span className="rounded bg-[var(--green)]/40 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white md:text-[10px]">
                      M3: Luke
                    </span>
                  </div>
                </div>
              </div>

              {/* X axis labels */}
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase tracking-widest text-white/50 md:text-xs">
                <span>Day 1</span>
                <span>Month 1</span>
                <span>Month 2</span>
                <span>Month 3</span>
              </div>
            </div>

            {/* Guarantee zones */}
            <div className="space-y-2 border-t border-white/10 px-4 py-4 md:px-8">
              <div className="relative h-7 overflow-hidden rounded-full bg-white/5 md:h-8">
                <div className="absolute left-0 top-0 flex h-full w-1/3 items-center justify-center rounded-full border border-[var(--green)]/40 bg-[var(--green)]/15 px-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--green)] md:text-[11px]">
                    30-Day Money-Back
                  </span>
                </div>
              </div>
              <div className="relative h-7 overflow-hidden rounded-full bg-white/5 md:h-8">
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)] md:text-[11px]">
                    90-Day Keep Coaching You Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-white/40 md:text-sm">
            Example progression based on a real ranked trajectory (Zen, GC2 →
            SSL). Individual results vary.
          </p>

          {/* 3 coach month cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-3">
                <img
                  src="/graphics/torment.jpg"
                  alt="Torment"
                  className="h-12 w-12 rounded-full border-2 border-white/10 object-cover object-top"
                />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
                    Month 1
                  </p>
                  <p className="font-display text-lg">Torment</p>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed text-white/75 md:text-lg">
                RLCS S7 World Champion. Live 1:1 + replay review focused on
                rotations and decision-making.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-3">
                <img
                  src="/graphics/freakii-lp.jpg"
                  alt="Freakii"
                  className="h-12 w-12 rounded-full border-2 border-white/10 object-cover object-top"
                />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
                    Month 2
                  </p>
                  <p className="font-display text-lg">Freakii</p>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed text-white/75 md:text-lg">
                Former Renault Vitality pro, head coach at PWR. EU mechanics +
                technical consistency to sharpen your foundation.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/5 p-5 shadow-lg shadow-[var(--accent-glow)]">
              <div className="flex items-center gap-3">
                <img
                  src="/graphics/spookyluke-creator.jpg"
                  alt="SpookyLuke"
                  className="h-12 w-12 rounded-full border-2 border-[var(--accent)] object-cover object-top"
                />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--green)]">
                    Month 3 + Bonus
                  </p>
                  <p className="font-display text-lg">SpookyLuke</p>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed text-white md:text-lg">
                Week 8 unlock: your final replay review comes from Luke
                himself. The push to rank up.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── CREATED BY SPOOKYLUKE (authority anchor + mission) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[var(--accent)]/30 blur-3xl" />
                <img
                  src={CREATOR_IMG}
                  alt="SpookyLuke holding the YouTube silver play button"
                  className="relative h-48 w-48 rounded-full border-4 border-[var(--accent)]/40 object-cover object-top md:h-60 md:w-60"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                From SpookyLuke
              </p>
              <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
                Built By The #1 Rocket League Coach In The World.
              </h2>
              <p className="mt-5 text-lg text-white/80 md:text-xl">
                I built VIP to give the average player what&apos;s usually
                reserved for the top 1%: pro one-on-one coaching, a
                personalized plan, accountability while you grind, guaranteed
                to work, and a reward when you rank up.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-bold text-[var(--accent)]">
                  530K+ YouTube Subscribers
                </span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-bold text-[var(--accent)]">
                  268M+ Views
                </span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-bold text-[var(--accent)]">
                  GC3 Peak
                </span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-bold text-[var(--accent)]">
                  100K+ Discord
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF (moved up: social proof early) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Real Results
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Real Players. Real Progress.
          </h2>

          {/* Rating summary */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
              <div className="text-center">
                <p className="text-6xl font-black">5.0</p>
                <div className="mt-2 flex gap-0.5 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-white/50">95 ratings</p>
              </div>
              <div className="flex-1 space-y-2 w-full">
                <RatingBar stars={5} percent={95} count={90} />
                <RatingBar stars={4} percent={5} count={5} />
                <RatingBar stars={3} percent={0} count={0} />
                <RatingBar stars={2} percent={0} count={0} />
                <RatingBar stars={1} percent={0} count={0} />
              </div>
            </div>
          </div>

          {/* Featured testimonials */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--accent)]/40"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-sm font-bold text-white`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs font-semibold text-[var(--accent)]">
                      {t.rank}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="flex-1 text-base leading-relaxed text-white/80 md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {t.coachNotes && (
                  <p className="mt-3 text-xs text-white/30">
                    Coached on: {t.coachNotes}
                  </p>
                )}

                <a
                  href={t.vodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/70 transition hover:border-[var(--accent)]/40 hover:text-white"
                >
                  <Play className="h-4 w-4 text-[var(--accent)]" />
                  Watch the coaching session
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHAT'S INCLUDED — VIP introduction + 5 features ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Today&apos;s Offer
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Here&apos;s Everything You Get.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/70 md:text-xl">
            Coaching. Plan. Same caliber of coaches as Bootcamp, without the
            all-in commitment.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <IncludeCard
              icon={<Gamepad2 className="h-5 w-5 text-[var(--accent)]" />}
              title="One 60-Minute Live 1:1 Coaching Call With A Pro"
              description="Once a month. Your coach watches your replays before the call, then walks through exactly what&apos;s holding you back and how to fix it on a live screenshare."
            />
            <IncludeCard
              icon={<Video className="h-5 w-5 text-[var(--accent)]" />}
              title="30-Minute Personalized Replay Review"
              description="Send your replays. Your coach sends back specific timestamps, clear corrections, and exactly what to focus on next."
            />
            <IncludeCard
              icon={<ClipboardList className="h-5 w-5 text-[var(--accent)]" />}
              title="Personalized 30-Day Training Routine"
              description="Built around your schedule and rank so you always know what to practice."
            />
            <IncludeCard
              icon={<PhoneCall className="h-5 w-5 text-[var(--accent)]" />}
              title="Monthly Accountability Check-In With Your Guide"
              description="One call a month with your member guide (separate from your coach) to keep you on track, work through whatever&apos;s blocking you, and adjust the plan as you go."
            />
            <IncludeCard
              icon={<Trophy className="h-5 w-5 text-[var(--accent)]" />}
              title="Full RL Clubhouse Membership"
              description="15+ live events monthly, weekly classes, replay reviews, recordings, community."
            />
          </div>
        </div>
      </section>

      {/* ── WAYS TO IMPROVE — HORIZONTAL TIER LIST ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Ways To Improve · Tier List
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Not All Practice Is Equal.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/70 md:text-xl">
            You&apos;ve been queueing ranked, watching YouTube, hopping into
            the Discord. If that was going to get you there, it would have by
            now.
          </p>

          <div className="mt-12 space-y-3">
            {/* S TIER — 1:1 Coaching */}
            <div className="rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--accent)]/10 p-4 shadow-xl shadow-[var(--accent-glow)] md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
                <div className="flex items-center gap-3 md:w-60 md:flex-shrink-0">
                  <span className="font-display flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-lg text-white shadow-lg shadow-[var(--accent-glow)] md:h-12 md:w-12 md:text-xl">
                    S
                  </span>
                  <span className="font-display text-xl text-white md:text-2xl">
                    1:1 Coaching
                  </span>
                </div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10 md:h-4">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--green)]"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-sm text-white/85 md:w-56 md:flex-shrink-0 md:text-base">
                  A pro shows you what to fix in YOUR replays
                </div>
              </div>
            </div>

            {/* A TIER — Community + Group Classes */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
                <div className="flex items-center gap-3 md:w-60 md:flex-shrink-0">
                  <span className="font-display flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg text-white/80 md:h-12 md:w-12 md:text-xl">
                    A
                  </span>
                  <span className="font-display text-xl text-white/85 md:text-2xl">
                    Community + Group Classes
                  </span>
                </div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10 md:h-4">
                  <div
                    className="h-full rounded-full bg-white/45"
                    style={{ width: "55%" }}
                  />
                </div>
                <div className="text-sm text-white/55 md:w-56 md:flex-shrink-0 md:text-base">
                  Generic for the room, not for you
                </div>
              </div>
            </div>

            {/* B TIER — YouTube */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
                <div className="flex items-center gap-3 md:w-60 md:flex-shrink-0">
                  <span className="font-display flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg text-white/70 md:h-12 md:w-12 md:text-xl">
                    B
                  </span>
                  <span className="font-display text-xl text-white/80 md:text-2xl">
                    YouTube Tutorials
                  </span>
                </div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10 md:h-4">
                  <div
                    className="h-full rounded-full bg-white/30"
                    style={{ width: "30%" }}
                  />
                </div>
                <div className="text-sm text-white/55 md:w-56 md:flex-shrink-0 md:text-base">
                  Concepts, not your habits
                </div>
              </div>
            </div>

            {/* C TIER — Grinding Solo */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
                <div className="flex items-center gap-3 md:w-60 md:flex-shrink-0">
                  <span className="font-display flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg text-white/60 md:h-12 md:w-12 md:text-xl">
                    C
                  </span>
                  <span className="font-display text-xl text-white/75 md:text-2xl">
                    Grinding Solo
                  </span>
                </div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10 md:h-4">
                  <div
                    className="h-full rounded-full bg-white/20"
                    style={{ width: "15%" }}
                  />
                </div>
                <div className="text-sm text-white/55 md:w-56 md:flex-shrink-0 md:text-base">
                  Practicing your mistakes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY A COACH ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            On 1:1 Coaching
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Why A Coach Beats A Class.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/70 md:text-xl">
            If you&apos;ve never done 1:1 before, here&apos;s what changes.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <BenefitCard
              icon={<Crosshair className="h-6 w-6 text-[var(--accent)]" />}
              title="It's your gameplay."
              description="Group classes teach concepts. A coach watches your replays and tells you what you do wrong."
            />
            <BenefitCard
              icon={<Layers className="h-6 w-6 text-[var(--accent)]" />}
              title="It's built around your rank."
              description="Plat, Champ, GC. Coaching adapts to your rank. The drills, the focus areas, and the plan all move with you."
            />
            <BenefitCard
              icon={<Clock className="h-6 w-6 text-[var(--accent)]" />}
              title="Two pros on your team."
              description="Three touchpoints every month: two with your coach (a live call and a replay review) plus one with your member guide (an accountability check-in). You&apos;re never grinding alone."
            />
          </div>

          <p className="mt-8 text-center text-sm italic text-white/40">
            You don&apos;t have to love coaching. You just have to want to get
            better.
          </p>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Meet The Coaches
          </p>
          <h2 className="font-display mb-4 text-center text-4xl tracking-tight md:text-5xl">
            The People Behind Your Improvement.
          </h2>
          <p className="mb-12 text-center text-lg text-white/70 max-w-xl mx-auto md:text-xl">
            RLCS-level pros. Each has their own style. You get matched to
            whoever fits your goals.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5">
              <img
                src="/graphics/torment.jpg"
                alt="Torment"
                className="mx-auto h-20 w-20 rounded-full object-cover object-top border-2 border-white/10 mb-4"
              />
              <div className="font-extrabold text-xl">Torment</div>
              <div className="text-xs text-[var(--accent)] font-bold mt-1 uppercase tracking-wide">
                World Champion S7
              </div>
              <div className="text-xs text-white/50 mt-3 leading-relaxed">
                RLCS Season 7 World Champion. Specializes in rotations,
                positioning, and high-level decision-making.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5">
              <img
                src="/graphics/freakii-lp.jpg"
                alt="Freakii"
                className="mx-auto h-20 w-20 rounded-full object-cover object-top border-2 border-white/10 mb-4"
              />
              <div className="font-extrabold text-xl">Freakii</div>
              <div className="text-xs text-[var(--accent)] font-bold mt-1 uppercase tracking-wide">
                Former EU Pro &middot; Head Coach at PWR
              </div>
              <div className="text-xs text-white/50 mt-3 leading-relaxed">
                Former Renault Vitality pro, now head coach at PWR. EU
                perspective on mechanics and technical consistency.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5">
              <img
                src="/graphics/shock-lp.jpg"
                alt="Shock"
                className="mx-auto h-20 w-20 rounded-full object-cover object-top border-2 border-white/10 mb-4"
              />
              <div className="font-extrabold text-xl">Shock</div>
              <div className="text-xs text-[var(--accent)] font-bold mt-1 uppercase tracking-wide">
                Former NA Pro &middot; RLCS S9 MVP
              </div>
              <div className="text-xs text-white/50 mt-3 leading-relaxed">
                Former Soniqs and Ghost Gaming pro. RLCS Season 9 NA Regular
                Season MVP. Known for controlled aggression and high IQ plays.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BONUS STACK (4 bonuses, Hormozi-style) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Stacked Bonuses
          </p>
          <h2 className="font-display mt-3 text-center text-4xl tracking-tight md:text-5xl">
            Plus, You Also Get...
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
            Four bonuses stacked on top of the core program. Two unlock the
            moment you sign up. Two you earn by sticking with the program.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {/* Bonus #1 — Training Pack Vault */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Bonus #1 · Day 1 Unlock
                </span>
                <span className="rounded-md bg-[var(--green)]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--green)]">
                  Instant
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                The Training Pack Vault.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/75 md:text-lg">
                Our hand-picked list of training packs we&apos;ve assigned to
                every VIP member. Drills mapped to what each rank actually
                needs. Unlocked the moment you join.
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Value
                </span>
                <span className="font-display text-xl text-white md:text-2xl">
                  $25
                </span>
              </div>
            </div>

            {/* Bonus #2 — VIP Discord Tag */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Bonus #2 · Day 1 Unlock
                </span>
                <span className="rounded-md bg-[var(--green)]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--green)]">
                  Instant
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                VIP Tag In The Discord.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/75 md:text-lg">
                A purple VIP tag pins you at the top of the Discord member
                list. Coaches, the guide, and the community can find you fast.
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Value
                </span>
                <span className="font-display text-xl text-white md:text-2xl">
                  $20
                </span>
              </div>
            </div>

            {/* Bonus #3 — Replay Review With SpookyLuke */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--accent)]/5 p-6 shadow-lg shadow-[var(--accent-glow)] md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--accent)]">
                  Bonus #3 · Week 8 Unlock
                </span>
                <span className="rounded-md bg-[var(--accent)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  Earned
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                30-Min Replay Review With SpookyLuke.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                Stick with the program through week 8 and your third replay
                review comes from Luke himself. Not a rotating pro. The exact
                thing he charges $125 for on Metafy.
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Value
                </span>
                <span className="font-display text-xl text-white md:text-2xl">
                  $125
                </span>
              </div>
            </div>

            {/* Bonus #4 — Signed Controller */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--green)]/40 bg-[var(--green)]/5 p-6 shadow-lg shadow-[var(--green)]/10 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--green)]">
                  Bonus #4 · Rank-Up Reward
                </span>
                <span className="rounded-md bg-[var(--green)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  Earned
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                Signed Controller On The House.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                Rank up one full rank. Hold it for two consecutive seasons.
                Stay active in the community throughout. We ship you a brand
                new controller, signed by the team.
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Value
                </span>
                <span className="font-display text-xl text-white md:text-2xl">
                  $150
                </span>
              </div>
            </div>
          </div>

          {/* Bonus value tally */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/10 p-5 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--gold)]">
              Total Bonus Value
            </p>
            <p className="font-display mt-1 text-4xl text-white md:text-5xl">
              $320
            </p>
            <p className="mt-2 text-xs text-white/60 md:text-sm">
              Stacked on top of the 12-week program
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            <a
              href="/promise"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition"
            >
              Full terms &amp; conditions for the controller bonus
            </a>
          </p>
        </div>
      </section>

      {/* ── DOUBLE GUARANTEE (30-day money-back + 90-day Keep Coaching You) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            Double Guarantee
          </p>
          <h2 className="font-display mt-3 text-center text-4xl tracking-tight md:text-5xl">
            We Take The Risk.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
            Most coaches are incentivized to drag things out. We&apos;re
            incentivized to actually get you results.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
            {/* 30-Day Money-Back */}
            <div className="rounded-2xl border border-[var(--green)]/30 bg-[var(--green)]/5 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--green)]">
                Guarantee #1
              </p>
              <h3 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">
                30-Day Money Back.
              </h3>
              <p className="mt-4 text-lg text-white/85 md:text-xl">
                Don&apos;t love it? Full refund, no questions asked. Don&apos;t
                try to make it work for 30 days. If you don&apos;t immediately
                see the value, get your money back.
              </p>
            </div>

            {/* 90-Day Keep Coaching You */}
            <div className="rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--accent)]/10 p-6 shadow-xl shadow-[var(--accent-glow)] md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                Guarantee #2
              </p>
              <h3 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">
                90-Day Keep Coaching You.
              </h3>
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                Show up to your monthly coaching session and replay review.
                Don&apos;t rank up in 90 days? We keep coaching you for free,
                every month, until you do. Most coaches drag things out. We
                don&apos;t get to stop until you rank up.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-white/50 md:text-base">
            Rank-up promise applies to one full rank (~100 MMR). Examples:
            Plat 2 → Plat 3, Diamond 3 → Champ 1, Champ 1 → Champ 2.
          </p>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The Value
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            What This Would Cost Separately.
          </h2>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {VALUE_STACK.map((row, i) => (
              <div
                key={row.item}
                className={`flex items-center justify-between gap-4 px-6 py-4 ${
                  i < VALUE_STACK.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div>
                  <span className="text-sm text-white/70">{row.item}</span>
                  {row.note && (
                    <p className="text-xs text-white/30 mt-0.5">{row.note}</p>
                  )}
                </div>
                <span className="text-sm font-bold whitespace-nowrap">
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-white/[0.03] px-6 py-5 border-t border-white/10">
              <span className="font-bold text-white/70">
                Total value over 12 weeks
              </span>
              <span className="text-lg font-black text-white">
                $866 to $1,226
              </span>
            </div>
            <a
              href="#investment"
              className="flex flex-wrap items-center justify-between gap-3 bg-[var(--accent)]/10 px-6 py-5 transition hover:bg-[var(--accent)]/15"
            >
              <span className="font-bold">
                VIP bundles all of the above for less than you would pay
                individually.
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-black uppercase tracking-widest text-[var(--accent)]">
                Pricing below ↓
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT (PRICE REVEAL) ── */}
      <section
        id="investment"
        className="border-t border-white/10 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--green)]/20 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-[var(--green)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]" />
                </span>
                Live
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--gold)] md:text-base">
                {spotsFilled} of {SPOTS_TOTAL} Spots Filled · {spotsOpen} Left
              </span>
            </span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The Investment
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            The 12-Week Program. One Price.
          </h2>

          <PricingCard
            variant="call"
            price={497}
            cadence="/ 12 weeks"
            cadenceNote="Paid upfront for 12 weeks. Optional monthly continuation after if you want to keep going."
            action={{
              type: "link",
              label: "Lock In Your Spot",
              href: WHOP_URL,
            }}
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
