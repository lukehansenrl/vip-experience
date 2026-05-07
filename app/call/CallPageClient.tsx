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
  Check,
  Monitor,
  Users,
  ArrowDown,
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
                Get a pro&apos;s eyes on your gameplay to pinpoint your bad
                habits and exactly what to do to improve the fastest.
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

      {/* ── BOOTCAMP + VIP CARDS (spookyluke.com-style 2-up, right after hero) ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-4xl tracking-tight md:text-5xl lg:text-6xl">
            Want To Improve Faster? Learn From Pros.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
            {/* RL BOOTCAMP — pink/red theme */}
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(190, 18, 60, 0.45) 0%, rgba(83, 17, 47, 0.55) 30%, rgba(15, 8, 14, 0.95) 75%)",
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-3xl tracking-tight text-white md:text-4xl">
                  RL Bootcamp
                </span>
                <span className="font-display whitespace-nowrap text-lg text-white md:text-xl">
                  $300 to $550 / mo
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-pink-300 md:text-base">
                4 to 12 Week 1:1 Coaching Experience With A Pro
              </p>

              <h3 className="font-display mt-7 text-xl text-white md:text-2xl">
                Improve So Fast Your Friends Think You&apos;re Boosted.
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-200 md:text-sm">
                  <Monitor className="h-3.5 w-3.5" /> PC Required
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-200 md:text-sm">
                  <Star className="h-3.5 w-3.5" /> Plat+
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-200 md:text-sm">
                  <Users className="h-3.5 w-3.5" /> Application Only
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-base text-white/85 md:text-lg">
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-pink-400" />
                  1:1 coaching and accountability
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-pink-400" />
                  Personalized feedback, training plans, and reviews
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-pink-400" />
                  2 to 10 sessions per month
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-pink-400" />
                  100% coach satisfaction guarantee
                </li>
              </ul>
            </div>

            {/* RL VIP — accent purple theme, NO price */}
            <div
              className="relative overflow-hidden rounded-2xl border-2 border-[var(--accent)]/50 p-6 shadow-xl shadow-[var(--accent-glow)] md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(108, 99, 255, 0.45) 0%, rgba(50, 30, 130, 0.55) 30%, rgba(15, 8, 14, 0.95) 75%)",
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-3xl tracking-tight text-white md:text-4xl">
                  12-Week VIP Program
                </span>
                <a
                  href="#investment"
                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[var(--accent)]/60 bg-[var(--accent)]/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-[var(--accent)]/30 md:text-xs"
                >
                  Pricing Below <ArrowDown className="h-3 w-3" />
                </a>
              </div>
              <p className="mt-2 text-sm font-bold text-[var(--accent)] md:text-base">
                Rank Up One Full Rank In 90 Days, Guaranteed
              </p>

              <h3 className="font-display mt-7 text-xl text-white md:text-2xl">
                Two Pros On Your Team. A Plan, A Coach, And Accountability.
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-bold text-[var(--accent)] md:text-sm">
                  <Star className="h-3.5 w-3.5" /> Plat to GC
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-bold text-[var(--accent)] md:text-sm">
                  <Users className="h-3.5 w-3.5" /> Max. {SPOTS_TOTAL} Members
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--green)]/20 px-3 py-1 text-xs font-black uppercase tracking-widest text-[var(--green)] md:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]" />
                  </span>
                  {spotsOpen} Spots Open
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-base text-white/90 md:text-lg">
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  60-min live 1:1 coaching call (every month)
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  30-min personalized replay review (every month)
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  Accountability check-in with your guide (every month)
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  Personalized training plan + full Clubhouse access
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  30-day money-back + 90-day Keep Coaching You guarantee
                </li>
              </ul>
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

      {/* ── RANK-UP PROMISE ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The VIP Promise
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Rank Up. We Send You A New Controller.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 md:text-xl">
            Put in the work. Hit a full rank up. Hold it. We&apos;ll ship you a
            brand new controller.
          </p>
        </div>

        {/* 3-step */}
        <div className="mx-auto mt-12 max-w-4xl grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent)] text-lg font-black text-[var(--accent)]">
              1
            </div>
            <h3 className="mt-4 text-xl font-extrabold md:text-2xl">Rank Up</h3>
            <p className="mt-3 text-base text-white/75 md:text-lg">
              Full rank up within 90 days. Plat → Diamond. Diamond → Champ.
              Champ → GC.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent)] text-lg font-black text-[var(--accent)]">
              2
            </div>
            <h3 className="mt-4 text-xl font-extrabold md:text-2xl">Hold It</h3>
            <p className="mt-3 text-base text-white/75 md:text-lg">
              Maintain your new rank across two consecutive seasons. One
              check-in session with the team.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--green)] text-lg font-black text-[var(--green)]">
              ✓
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-[var(--green)] md:text-2xl">
              New Controller
            </h3>
            <p className="mt-3 text-base text-white/75 md:text-lg">
              Send proof. We verify everything and ship you a brand new
              controller. On us.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center">
          <a
            href="/promise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 underline hover:text-white/50 transition"
          >
            Full terms &amp; conditions
          </a>
        </p>
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
                $546 to $906
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
