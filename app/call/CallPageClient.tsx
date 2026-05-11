"use client";

import { useEffect } from "react";
import {
  Gamepad2,
  Video,
  ClipboardList,
  PhoneCall,
  Trophy,
  Star,
} from "lucide-react";

import { StickyNav } from "../components/StickyNav";
import { IncludeCard } from "../components/IncludeCard";
import { BenefitCard } from "../components/BenefitCard";
import { RatingBar } from "../components/RatingBar";
import { PricingCard } from "../components/PricingCard";
import { ScrollingTestimonials } from "../components/ScrollingTestimonials";
import { VIDEO_TESTIMONIALS, TEXT_REVIEWS } from "../data/testimonials";

const WHOP_URL = "https://whop.com/rlclubhouse/rlc-pro-vip-membership/";

// Total cap. Only changes if the business actually raises the cap.
const SPOTS_TOTAL = 60;

const HERO_IMG = "/graphics/spookyluke-hero.jpg";

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
                Rank up in 90 days. Or we coach you free until you do.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-xl text-white/80 md:mx-0 md:text-2xl">
                1-on-1 with a pro coach, a personalized 90-day plan, and a
                guarantee most coaches won&apos;t make.
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

      {/* ── PROOF (moved up: social proof early) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Real Results
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            The Most Experienced Coaching Team In Rocket League.
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-white/70 md:text-xl">
            Our team includes an RLCS Season 7 World Champion, two former pro
            players, and the largest Rocket League coaching channel on
            YouTube. We&apos;ve been coaching paid members since 2020.
          </p>

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
                <p className="mt-1 text-sm text-white/50">98 ratings</p>
              </div>
              <div className="flex-1 space-y-2 w-full">
                <RatingBar stars={5} percent={95} count={93} />
                <RatingBar stars={4} percent={5} count={5} />
                <RatingBar stars={3} percent={0} count={0} />
                <RatingBar stars={2} percent={0} count={0} />
                <RatingBar stars={1} percent={0} count={0} />
              </div>
            </div>
          </div>

        </div>

        {/* Scrolling testimonial marquee — auto-scrolls left, pauses on hover */}
        <div className="mt-10">
          <ScrollingTestimonials
            videoTestimonials={VIDEO_TESTIMONIALS}
            textReviews={TEXT_REVIEWS}
          />
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
            Pro coaches, a personalized plan, and accountability — built
            around your rank, your weaknesses, and your schedule.
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
            Four bonuses stacked on top of the core program. Three unlock the
            moment you sign up. One you earn by sticking with the program.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {/* Bonus #1 — 2026 Mechanics Tier List */}
            <div className="flex flex-col rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Bonus #1 · Lifetime Access
                </span>
                <span className="rounded-md bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--gold)]">
                  Forever
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                The 2026 Mechanics Tier List.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/75 md:text-lg">
                The only ranked breakdown of which mechanics to learn at YOUR
                rank — with custom drills, training packs, and step-by-step
                guides for each tier. Updated yearly.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--gold)]">
                Yours for life — keep the dashboard and all future updates,
                even if you cancel VIP.
              </p>
              <p className="mt-2 text-sm text-[var(--accent)]/80">
                Launching May 24 for all VIP members.
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Value
                </span>
                <span className="font-display text-xl text-white md:text-2xl">
                  $50
                </span>
              </div>
            </div>

            {/* Bonus #2 — 2026 Pro Settings Vault */}
            <div className="flex flex-col rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Bonus #2 · Lifetime Access
                </span>
                <span className="rounded-md bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--gold)]">
                  Forever
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                The 2026 Pro Settings Vault.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/75 md:text-lg">
                The exact settings every RLCS-level coach on our staff plays
                at — with the reasoning behind each tweak so you can adapt to
                your playstyle. Camera, deadzones, controller layout, all of
                it.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--gold)]">
                Yours for life — keep the vault and all future updates, even
                if you cancel VIP.
              </p>
              <p className="mt-2 text-sm text-[var(--accent)]/80">
                Launching May 24 for all VIP members.
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Value
                </span>
                <span className="font-display text-xl text-white md:text-2xl">
                  $35
                </span>
              </div>
            </div>

            {/* Bonus #3 — VIP Discord Tag */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Bonus #3 · Day 1 Unlock
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

            {/* Bonus #4 — Replay Review With SpookyLuke */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--accent)]/5 p-6 shadow-lg shadow-[var(--accent-glow)] md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--accent)]">
                  Bonus #4 · Week 8 Unlock
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

          </div>

          {/* Bonus value tally */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/10 p-5 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--gold)]">
              Total Bonus Value
            </p>
            <p className="font-display mt-1 text-4xl text-white md:text-5xl">
              $230
            </p>
            <p className="mt-2 text-xs text-white/60 md:text-sm">
              Stacked on top of the 12-week program
            </p>
          </div>
        </div>
      </section>

      {/* ── LOYALTY TRACK (alumni tier — unlocked by ranking up) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Loyalty Track
          </p>
          <h2 className="font-display mt-3 text-center text-4xl tracking-tight md:text-5xl">
            Rank Up. Unlock The Alumni Tier.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
            Hit the rank-up promise and you graduate into our alumni tier.
            Same price. More access. The reward for getting better is
            getting closer to the inner circle.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {/* Signed Controller */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6 shadow-lg shadow-[var(--gold)]/10 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Alumni Reward
                </span>
                <span className="rounded-md bg-[var(--gold)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  One-Time
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                Signed Controller On The House.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                Brand new controller, signed by SpookyLuke himself. Shipped
                on rank-up. The only physical artifact in the entire VIP
                package.
              </p>
            </div>

            {/* Monthly Group Call With Luke */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6 shadow-lg shadow-[var(--gold)]/10 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Alumni Reward
                </span>
                <span className="rounded-md bg-[var(--gold)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  Monthly
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                Monthly Call With SpookyLuke.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                Alumni-only. Luke runs a 60-min group call every month —
                Q&amp;A, replay reviews, what&apos;s working in the meta. Not
                available at any tier below.
              </p>
            </div>

            {/* Alumni Discord Channel */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6 shadow-lg shadow-[var(--gold)]/10 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Alumni Reward
                </span>
                <span className="rounded-md bg-[var(--gold)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  Always On
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                Alumni-Only Discord Channel.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                The inner-circle channel. Direct access to other alumni and
                the coaching team. Coordinate scrims, share insights, build
                with players who&apos;ve actually made it. Stays open as long
                as you&apos;re an active member of the community.
              </p>
            </div>

            {/* Founding Rate Locked */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6 shadow-lg shadow-[var(--gold)]/10 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Alumni Reward
                </span>
                <span className="rounded-md bg-[var(--gold)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  For Life
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                Founding Rate Locked.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                Your $497/quarter rate is locked for as long as you stay. If
                we raise prices later, you keep yours. Forever.
              </p>
            </div>

            {/* Featured in Success Content (full width) */}
            <div className="flex flex-col rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-6 shadow-lg shadow-[var(--gold)]/10 md:col-span-2 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-[var(--gold)]">
                  Alumni Reward
                </span>
                <span className="rounded-md bg-[var(--gold)]/30 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                  On Request
                </span>
              </div>
              <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                Featured In Success Content.
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
                Your rank-up story featured on YouTube and socials. Free
                credibility for your own content channel — and a moment of
                recognition you actually earned.
              </p>
            </div>
          </div>


          <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-white/40">
            Recurring alumni access (Discord channel, monthly call, founding
            rate) requires an active Clubhouse or VIP membership. The signed
            controller and success feature are yours to keep regardless.
          </p>

          <p className="mt-4 text-center text-xs text-white/40">
            <a
              href="/promise"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition"
            >
              Full terms &amp; conditions for alumni rewards
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
