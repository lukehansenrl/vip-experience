"use client";

import { useEffect, useState } from "react";
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
import { CalendlyModal } from "../components/CalendlyModal";
import { VIDEO_TESTIMONIALS, TEXT_REVIEWS } from "../data/testimonials";

const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";
// Internal route to the dedicated /checkout page (terms-gated Whop embed).
const CHECKOUT_URL = "/checkout";

// Total cap. Only changes if the business actually raises the cap.
const SPOTS_TOTAL = 60;

const HERO_IMG = "/graphics/spookyluke-hero.jpg";

type Props = {
  /** Active member count fetched server-side from the Whop API. */
  spotsFilled: number;
};

export function CallPageClient({ spotsFilled }: Props) {
  const spotsOpen = Math.max(0, SPOTS_TOTAL - spotsFilled);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const openCalendly = () => setCalendlyOpen(true);
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
      <StickyNav
        cta={{
          label: "Get Offer",
          href: CHECKOUT_URL,
          external: true,
        }}
      />

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
            <div className="text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                The VIP Experience
              </p>
              <h1 className="font-display text-5xl leading-[1] tracking-tight md:text-6xl lg:text-7xl">
                Rank up in 90 days. Or we coach you free until you do.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-xl text-white/80 md:text-2xl">
                1-on-1 with a pro coach, a personalized 90-day plan, and a
                guarantee most coaches won&apos;t make.
              </p>

              {/* Capacity scarcity — real, always-on (60-client team cap) */}
              <p className="mx-auto mt-4 max-w-xl text-base text-white/55 md:text-lg">
                Our team can only work with 60 private clients at any given
                time.
              </p>

              {/* CTA row */}
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 md:justify-center">
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
                >
                  Get Offer &rarr;
                </a>
                <a
                  href="#investment"
                  className="text-sm font-semibold text-white/60 underline-offset-4 transition hover:text-white hover:underline"
                >
                  See what&apos;s included &darr;
                </a>
              </div>

              {/* Trust strip */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white/70">
                    5.0 from 98 reviews
                  </span>
                </div>
                <span className="hidden h-1 w-1 rounded-full bg-white/20 md:block" />
                <span className="text-sm font-semibold text-white/70">
                  RLCS World Champion on staff
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-white/20 md:block" />
                <span className="text-sm font-semibold text-white/70">
                  Coaching paid members since 2020
                </span>
              </div>
            </div>
            {/* Photo collage: Luke + 3 coaches mixed together (summit-style) */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md pb-16 md:pb-20">
                <div className="absolute -inset-4 rounded-3xl bg-[var(--accent)]/20 blur-3xl" />
                {/* Luke main photo */}
                <img
                  src={HERO_IMG}
                  alt="SpookyLuke at his Rocket League setup"
                  className="relative w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-[var(--accent-glow)]"
                />
                {/* Coach trio fanned across the bottom edge */}
                <div className="absolute -bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-end gap-2 md:-bottom-4 md:gap-3">
                  <div className="-rotate-[10deg] transform">
                    <img
                      src="/graphics/torment.jpg"
                      alt="Torment"
                      className="h-20 w-20 rounded-2xl border-4 border-[#0b0e17] object-cover object-top shadow-xl md:h-24 md:w-24"
                    />
                    <div className="mt-1 text-center text-[9px] font-black uppercase tracking-widest text-white/80 md:text-[10px]">
                      Torment
                    </div>
                  </div>
                  <div className="-translate-y-3 transform md:-translate-y-4">
                    <img
                      src="/graphics/freakii-lp.jpg"
                      alt="FreaKii"
                      className="h-20 w-20 rounded-2xl border-4 border-[#0b0e17] object-cover object-top shadow-xl md:h-24 md:w-24"
                    />
                    <div className="mt-1 text-center text-[9px] font-black uppercase tracking-widest text-white/80 md:text-[10px]">
                      FreaKii
                    </div>
                  </div>
                  <div className="rotate-[10deg] transform">
                    <img
                      src="/graphics/shock-lp.jpg"
                      alt="Shock"
                      className="h-20 w-20 rounded-2xl border-4 border-[#0b0e17] object-cover object-top shadow-xl md:h-24 md:w-24"
                    />
                    <div className="mt-1 text-center text-[9px] font-black uppercase tracking-widest text-white/80 md:text-[10px]">
                      Shock
                    </div>
                  </div>
                </div>
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
            Our team includes an RLCS Season 6 World Champion, two former pro
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
            Every month you get pro coaching, a personalized plan, and
            accountability, built around your rank, your weaknesses, and
            your schedule.
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
              description="Once a month, send your replays. Your coach sends back specific timestamps, clear corrections, and exactly what to focus on next."
            />
            <IncludeCard
              icon={<ClipboardList className="h-5 w-5 text-[var(--accent)]" />}
              title="Personalized 30-Day Training Routine"
              description="A fresh routine every 30 days, built around what your coach saw in your latest session. Three plans across the 12 weeks, so your training stays in step with where you are."
            />
            <IncludeCard
              icon={<PhoneCall className="h-5 w-5 text-[var(--accent)]" />}
              title="Monthly Accountability Check-In With Your Guide"
              description="One call a month with your member guide (separate from your coach) to keep you on track, work through whatever&apos;s blocking you, and adjust the plan as you go."
            />
            <IncludeCard
              icon={<Trophy className="h-5 w-5 text-[var(--accent)]" />}
              title="Full RL Clubhouse Membership"
              description="Active for the full duration of your VIP: 15+ live events monthly, weekly classes, replay reviews, recordings, community."
            />
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Meet The Coaches
          </p>
          <h2 className="font-display mb-4 text-center text-4xl tracking-tight md:text-5xl">
            The People Behind Your Improvement.
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-white/70 md:text-xl">
            RLCS-level pros. Each has their own style. You get matched to
            whoever fits your goals.
          </p>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              {
                photo: "/graphics/torment.jpg",
                name: "Torment",
                fullName: "Kyle Storer",
                badge: "World Champion · S6 MVP",
                role: "Rotations & Decision-Making",
                bio: "RLCS Season 6 World Champion with Cloud9 (2018) and S6 World Championship MVP. Specializes in rotations, positioning, and high-level decision-making.",
                credit: "FIFAe World Cup / Liquipedia",
              },
              {
                photo: "/graphics/freakii-lp.jpg",
                name: "FreaKii",
                fullName: "Sandro Holzwarth",
                badge: "Head Coach · PWR",
                role: "Mechanics & Consistency",
                bio: "Former Renault Vitality pro. Currently head coach at PWR. RLCS S8 EU \"Savior of the Season,\" known for technical consistency and the EU mechanical edge.",
                credit: "Michal Konkol / Liquipedia",
              },
              {
                photo: "/graphics/shock-lp.jpg",
                name: "Shock",
                fullName: "Nathan Frommelt",
                badge: "RLCS S9 NA MVP",
                role: "High-IQ Aggression",
                bio: "Former Soniqs and Ghost Gaming pro. RLCS Season 9 NA Regular Season MVP. Known for controlled aggression and high IQ plays.",
                credit: "Liquipedia",
              },
            ].map((coach) => (
              <div
                key={coach.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent-glow)]"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={coach.photo}
                    alt={`${coach.name}, ${coach.fullName}`}
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  {/* Bottom gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {/* Achievement badge — top left */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-block rounded-md border border-[var(--gold)]/40 bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--gold)] backdrop-blur">
                      {coach.badge}
                    </span>
                  </div>
                  {/* Photo credit — top right, subtle */}
                  <span className="absolute right-3 top-3 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white/50 backdrop-blur">
                    Photo: {coach.credit}
                  </span>
                  {/* Name overlay — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                      {coach.role}
                    </p>
                    <h3 className="font-display mt-1 text-3xl leading-none tracking-tight text-white md:text-4xl">
                      {coach.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-white/60">
                      {coach.fullName}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm leading-relaxed text-white/70">
                    {coach.bio}
                  </p>
                </div>
              </div>
            ))}
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
                rank, with custom drills, training packs, and step-by-step
                guides for each tier. Updated yearly.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--gold)]">
                Yours for life. Keep the dashboard and all future updates,
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
                at, with the reasoning behind each tweak so you can adapt to
                your playstyle. Camera, deadzones, controller layout, all of
                it.
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--gold)]">
                Yours for life. Keep the vault and all future updates, even
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
        </div>
      </section>

      {/* ── LOYALTY TRACK (alumni tier — unlocked by rank-up OR program completion) ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Loyalty Track
          </p>
          <h2 className="font-display mt-3 text-center text-4xl tracking-tight md:text-5xl">
            Rank Up Or Complete The Program. Unlock The Alumni Tier.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
            Hit the rank-up promise OR finish your 12 weeks. Either way, you
            graduate into our alumni tier. Same price. More access. Closer to
            the inner circle.
          </p>

          {/* Compact 5-up alumni reward grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {[
              {
                tag: "Always On",
                title: "Q&A Channel With Luke",
                desc: "Private alumni channel where you drop questions. Luke answers personally.",
              },
              {
                tag: "Monthly",
                title: "Monthly Call With Luke",
                desc: "Alumni-only 60-min group session with Luke. Q&A, reviews, meta.",
              },
              {
                tag: "Always On",
                title: "Inner Circle Discord",
                desc: "Private channel with alumni, the coaching team, and Luke. Closest access we offer.",
              },
              {
                tag: "Rank-Up Only",
                title: "Signed Controller",
                desc: "Brand new, signed by Luke. Shipped when you rank up.",
              },
              {
                tag: "For Life",
                title: "Founding Rate Locked",
                desc: "Your $497/qtr rate locked forever, even if we raise.",
              },
            ].map((reward) => (
              <div
                key={reward.title}
                className="flex flex-col rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-4 transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10"
              >
                <span className="inline-block self-start rounded-md bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--gold)]">
                  {reward.tag}
                </span>
                <h3 className="font-display mt-3 text-base leading-tight tracking-tight text-white md:text-lg">
                  {reward.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/65 md:text-sm">
                  {reward.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-white/40">
            Recurring access requires active membership. The signed controller
            is a rank-up-only bonus and is yours to keep regardless.{" "}
            <a
              href="/promise"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition hover:text-white/60"
            >
              Full terms
            </a>
            .
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
                Don&apos;t love it? Get a full refund within 30 days. The
                only ask: actually show up to one coaching session or
                accountability call first. Tried it, hated it, money back.
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
                Show up to every coaching session and accountability call,
                and play 60 ranked games across the 12 weeks. Don&apos;t
                rank up? We keep coaching you free for up to another year
                until you do. Most coaches are happy when you keep paying.
                We&apos;re not done until you rank up.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-white/50 md:text-base">
            Rank-up promise applies to one full rank (~100 MMR) for members
            starting at Champion 3 or below. Examples: Plat 2 → Plat 3,
            Diamond 3 → Champ 1, Champ 1 → Champ 2. Members starting at
            Grand Champ or higher can still join VIP, but the rank-up
            guarantee doesn&apos;t apply above Champion 3.
          </p>
        </div>
      </section>

      {/* ── INVESTMENT (compact stack + price reveal in one viewport) ── */}
      <section
        id="investment"
        className="border-t border-white/10 px-6 py-14 md:py-16"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--green)]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--green)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                </span>
                Live
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                {spotsFilled}/{SPOTS_TOTAL} Spots · {spotsOpen} Left
              </span>
            </span>
          </div>

          <h2 className="font-display text-center text-3xl tracking-tight md:text-4xl">
            Total Value vs Your Price.
          </h2>

          {/* Compact value stack — one viewport, no scroll */}
          <div className="mx-auto mt-5 max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-sm md:text-base">
            <div className="bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
              The 12-Week Program
            </div>
            {[
              ["3× 60-min 1:1 Pro Coaching Calls", "$450"],
              ["3× 30-min Personalized Replay Reviews", "$375"],
              ["3× Monthly Accountability Check-Ins", "$150"],
              ["3× Personalized 30-Day Training Routines", "$150"],
              ["12 Weeks Full Clubhouse Access", "$81"],
            ].map(([item, value]) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-2"
              >
                <span className="text-white/90">{item}</span>
                <span className="font-display whitespace-nowrap text-white">
                  {value}
                </span>
              </div>
            ))}

            <div className="border-t border-white/10 bg-[var(--gold)]/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
              Stacked Bonuses
            </div>
            {[
              ["2026 Mechanics Tier List (Lifetime)", "$50"],
              ["2026 Pro Settings Vault (Lifetime)", "$35"],
              ["VIP Discord Tag", "$20"],
              ["Replay Review With SpookyLuke (Week 8)", "$125"],
            ].map(([item, value]) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4 border-t border-white/10 bg-[var(--gold)]/[0.06] px-4 py-2"
              >
                <span className="text-white/90">{item}</span>
                <span className="font-display whitespace-nowrap text-white">
                  {value}
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between gap-4 border-t-2 border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-3">
              <span className="text-xs font-black uppercase tracking-widest text-[var(--gold)] md:text-sm">
                Total Value
              </span>
              <span className="font-display text-2xl text-white md:text-3xl">
                $1,436
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[var(--accent)]/15 px-4 py-3">
              <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] md:text-sm">
                Your Price Today
              </span>
              <span className="font-display text-2xl text-white md:text-3xl">
                $497
              </span>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-center text-base text-white/80 md:text-lg">
            <span className="font-bold text-[var(--green)]">
              You save $939.
            </span>{" "}
            And if you don&apos;t rank up in 90 days, we keep coaching you
            free for up to another year until you do.
          </p>

          <div className="mt-6">
            <PricingCard
              variant="call"
              price={497}
              cadence="/ 12 weeks"
              cadenceNote="Paid upfront for 12 weeks. Optional monthly continuation after if you want to keep going."
              action={{
                type: "link",
                label: "Get Offer",
                href: CHECKOUT_URL,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>

      <CalendlyModal
        open={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
        url={CALENDLY_URL}
        title="VIP Onboarding Call"
        subtitle="45 minutes. See if VIP is the right fit."
      />
    </div>
  );
}
