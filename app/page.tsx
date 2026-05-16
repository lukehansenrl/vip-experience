"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Gamepad2,
  Video,
  ClipboardList,
  PhoneCall,
  Trophy,
  Target,
  TrendingUp,
  Brain,
  Star,
  ChevronRight,
  ChevronLeft,
  Play,
  Quote,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

/* ── DATA ── */

const VIDEO_TESTIMONIALS = [
  {
    name: "Xeneson",
    rank: "Champ 2 | 1020 → 1136 MMR",
    quote:
      "Went from averaging 1020mmr to 1136 in 2 weeks. The 1on1 sessions helped really well with that. Mods and the community are super friendly and helpful.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://youtu.be/S-4A0eBTnLY",
    coachNotes: "Air dribbles, flip resets, 2nd man positioning",
    initials: "XE",
    color: "bg-orange-500",
  },
  {
    name: "BouncyBaka",
    rank: "GC2",
    quote:
      "It changed the way I view my rocket league gameplay and opened my eyes to all the little mistakes I was making. I started reviewing my replays using the info I learned.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://www.youtube.com/@SpookyLukeCoaching",
    coachNotes: "Control to wall, wheel touches, 2nd man positioning",
    initials: "BB",
    color: "bg-purple-500",
  },
  {
    name: "Fxcz",
    rank: "Plat 1",
    quote:
      "After my 1on1 session with one of the coaches I already saw improvement and things I haven't seen in YouTube videos to do. A lot of great tips.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://youtu.be/xw1ynmYGv38",
    coachNotes: "Wall control, air roll adjustments, shooting",
    initials: "FZ",
    color: "bg-teal-500",
  },
  {
    name: "Dami",
    rank: "GC1 → GC2 div 3",
    quote:
      "After a month of being a member I am now GC2 div 3. The different coaches each have their own way of coaching and finding the right one for you is gonna make you progress really fast.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://youtu.be/kNQINWPFpkU",
    coachNotes: "50/50 control, 2nd man patience, decision-making",
    initials: "DR",
    color: "bg-red-500",
  },
  {
    name: "deadshot8885",
    rank: "Champ 1 → Champ 3 div 3",
    quote:
      "I joined when I was C1. From the reviews from SpookyLuke and the training packs from Torment, I managed to improve a lot. I have reached C3 div 3, almost GC. Really worth all the time and money.",
    vodTitle: "SpookyLuke Coaching Champ 1",
    vodUrl: "https://youtu.be/W_9V9k_k4Cc",
    coachNotes: "Replay reviews, training packs, consistency",
    initials: "DS",
    color: "bg-amber-500",
  },
  {
    name: "Crayons",
    rank: "Diamond 1 → Diamond 2",
    quote:
      "Coaching helped so much went from low D1 to high D2 in just 2 days. The fastest I've ever ranked up.",
    vodTitle: "SpookyLuke Coaching Diamond 3 2v2 | MMR 987",
    vodUrl: "https://www.youtube.com/@SpookyLukeCoaching",
    coachNotes: "Mechanics & decision-making",
    initials: "CR",
    color: "bg-blue-500",
  },
];

const TEXT_REVIEWS = [
  {
    name: "Xeneson",
    handle: "@xenesonn",
    stars: 5,
    text: "Went from averaging 1020mmr to 1136 in 2 weeks. The 1on1 sessions helped really well with that. Mods and the community are super friendly and helpful with improving and solving problems.",
    daysAfter: "21 days after purchase",
    initials: "XE",
  },
  {
    name: "Snizz._",
    handle: "@snizz",
    stars: 5,
    text: "Started at C3. With the help of 1:1 with Torment and joining one of Luke's events I gained super valuable knowledge. I am now GC. The 1:1 with a pro player is literally worth the entire price.",
    daysAfter: "13 days after purchase",
    initials: "SN",
  },
  {
    name: "Kevin",
    handle: "@breffordk",
    stars: 5,
    text: "Being one on one with coaching was amazing, got a chance to see how it's played from a pro perspective. Went from Plat 1 to Plat 2 within like a week.",
    daysAfter: "16 days after purchase",
    initials: "KE",
  },
  {
    name: "rosenberggabriel",
    handle: "@rosenberggabriel",
    stars: 5,
    text: "Absolutely amazing. I have improved so much in a month span. I truly recommend this to all who need the help.",
    daysAfter: "13 days after purchase",
    initials: "RO",
  },
  {
    name: "Swiftdriver010",
    handle: "@swiftdriver",
    stars: 5,
    text: "I was Plat 1 just a couple weeks ago, now I'm up to Diamond 1. The 1on1 coaching helped me a lot. That alone was worth it.",
    daysAfter: "21 days after purchase",
    initials: "SW",
  },
];

const FAQ_ITEMS = [
  {
    q: "What exactly do I get as a VIP member?",
    a: "Over 6 weeks: three 1:1 60-minute coaching sessions with a pro (one every two weeks), three 30-minute personalized replay reviews, three personalized 30-day training plans, bi-weekly accountability check-ins with your guide, and full RL Clubhouse membership for the duration with 15+ live events monthly. At the end of your 6 weeks, you also get a 30-minute replay review from SpookyLuke as a graduation bonus.",
  },
  {
    q: "What rank do I need to be?",
    a: "VIP is built for players from Platinum to Grand Champ. Your coach and training plan are personalized to your rank and goals. Whether you're learning the basics of rotation in Plat or refining mechanics in GC, the coaching adapts to you.",
  },
  {
    q: "How is this different from YouTube tutorials?",
    a: "YouTube teaches general concepts. VIP coaching analyzes YOUR gameplay, finds YOUR specific mistakes, and builds a training plan around YOUR schedule and goals. It's the difference between reading a textbook and having a private tutor.",
  },
  {
    q: "What if I don't have a lot of time to play?",
    a: "That's exactly who this is built for. Your training routine is designed around your available hours so you make the most of every session. Quality practice beats grinding for hours with no direction.",
  },
  {
    q: "What if I don't improve or it's not what I expected?",
    a: "We have 95+ five-star reviews for a reason. But if it's not the right fit after giving it a real shot, reach out and we'll work with you. VIP is built for players who want to put in the work.",
  },
  {
    q: "How do I get started?",
    a: "Book a VIP onboarding call. We'll walk you through what's included, answer your questions, and get you set up with your first coaching session and training plan.",
  },
];

const VALUE_STACK = [
  {
    item: "1:1 Pro Coaching Session (60 min)",
    value: "$50 – $75",
    note: "Market rate for a 60-min session with a pro coach",
  },
  {
    item: "Replay Review from SpookyLuke (30 min)",
    value: "$125",
    note: "SpookyLuke's Metafy rate is $125. Graduation bonus at the end of 6 weeks",
  },
  {
    item: "Personalized 30-Day Training Plan",
    value: "$25 – $50",
    note: "Custom routine built around your schedule and rank",
  },
  {
    item: "Accountability Check-ins",
    value: "$50 – $100",
    note: "Regular calls to keep you on track and adjust your training",
  },
  {
    item: "Full RL Clubhouse Membership",
    value: "$27",
    note: "15+ live events monthly, weekly classes, community access",
  },
];

/* ── COMPONENTS ── */

function StickyNav({ onBook }: { onBook: () => void }) {
  const links = [
    { label: "What You Get", href: "#includes" },
    { label: "Results", href: "#results" },
    { label: "Reviews", href: "#reviews" },
    { label: "Investment", href: "#investment" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="sticky top-0 left-0 right-0 z-40">
      <div className="border-b border-white/10 bg-[#0b0e17]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-sm font-black tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>{" "}
            <span className="text-white/30">&middot;</span>{" "}
            <span className="text-white/50 text-xs font-semibold">VIP</span>
          </span>
          <nav className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={onBook}
            className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Book a Call &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

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

/* ── MAIN PAGE ── */

export default function VIPPage() {
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

  // Smooth scroll for anchor links
  useEffect(() => {
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const smoothScrollTo = (targetY: number, duration = 1000) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        "a"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      smoothScrollTo(
        (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 20,
        1000
      );
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
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
      <StickyNav onBook={openBooking} />
      <CalendlyModal
        open={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />

      {/* ── HERO (centered with video as hero visual below) ── */}
      <section className="relative px-6 pb-20 pt-20 text-center md:pb-28 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The RL Clubhouse VIP Experience
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Improve Your Overall Rocket League Skill Faster.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60 md:text-xl">
            Through 1:1 pro coaching, custom training routines, and real
            accountability so you actually rank up in 6 weeks, not just
            queue more ranked games and hope. 😅
          </p>

          {/* Capacity scarcity — real, always-on (60-client team cap) */}
          <p className="mx-auto mt-5 max-w-xl text-base text-white/50 md:text-lg">
            Our team can only work with 60 private clients at any given
            time.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={openBooking}
              className="rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Book a Call <ChevronRight className="ml-1 inline h-5 w-5" />
            </button>
            <a
              href="#includes"
              className="rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
            >
              See What You Get ↓
            </a>
          </div>
        </div>

        {/* Hero video — centered below as the hero visual */}
        <div className="mx-auto mt-14 flex max-w-[380px] justify-center md:mt-16">
          <div className="w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
            <video
              className="block w-full"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              src="/video/luke-vip-intro.mp4"
            />
          </div>
        </div>
      </section>

      {/* ── POLL-DRIVEN BENEFITS ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            From Your Community Poll
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Built Around What You Actually Want
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            We asked the community their #1 reason for being here. The answer
            was clear:
          </p>

          {/* Top goal */}
          <div className="mt-10 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 md:p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              #1 Goal &middot; 46 Votes
            </p>
            <p className="mt-2 text-2xl font-extrabold md:text-3xl">
              &ldquo;Improve my overall Rocket League skill.&rdquo;
            </p>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center py-6">
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-px bg-[var(--accent)]/40" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                How VIP gets you there
              </p>
              <div className="h-8 w-px bg-[var(--accent)]/40" />
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                className="text-[var(--accent)]"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Three pillars */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[var(--accent)]/40">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <Target className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold">Better Mechanics</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Aerials, dribbling, shooting, recoveries. Your coach breaks
                down exactly where your mechanics fall apart and gives you
                drills that fix it.
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
                Feeds overall skill
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[var(--accent)]/40">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <Brain className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold">Sharper Game Sense</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Replay reviews show you exactly where you were on the field,
                where you should have been, and why. With timestamps and
                corrections you can apply immediately.
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
                Feeds overall skill
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[var(--accent)]/40">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <TrendingUp className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold">Higher Rank</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Rank is the side effect. When your mechanics, positioning, and
                decision-making all level up together, MMR follows naturally
                and stays.
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
                The result
                <span className="h-px flex-1 bg-[var(--accent)]/20" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section id="includes" className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            What You Get
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            What The VIP Experience Includes
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            Over 6 weeks as a VIP, you get everything you need to rank up
            consistently.
          </p>

          <div className="mt-12 flex flex-col gap-5">
            <IncludeCard
              icon={<Gamepad2 className="h-5 w-5 text-[var(--accent)]" />}
              title="A 1:1, 60-Minute Coaching Session with a Pro"
              description="One session every two weeks. Your coach breaks down your mechanics, positioning, decision-making, and habits so you know exactly what's holding you back."
            />
            <IncludeCard
              icon={<Video className="h-5 w-5 text-[var(--accent)]" />}
              title="30-Minute Replay Review from SpookyLuke (Graduation Bonus)"
              description={`At the end of your 6 weeks, you get a personal replay review from SpookyLuke. Specific timestamps, "do this instead" feedback, and clear corrections you can apply immediately.`}
            />
            <IncludeCard
              icon={<ClipboardList className="h-5 w-5 text-[var(--accent)]" />}
              title="Personalized 30-Day Training Plan"
              description="A personalized 30-day training plan, refreshed with your coach every two weeks so you always know what to practice and actually see results."
            />
            <IncludeCard
              icon={<PhoneCall className="h-5 w-5 text-[var(--accent)]" />}
              title="Bi-Weekly Accountability Check-Ins"
              description="Short calls every two weeks to keep you consistent, adjust the plan, and stop you from disappearing when life gets busy."
            />
            <IncludeCard
              icon={<Trophy className="h-5 w-5 text-[var(--accent)]" />}
              title="Full RL Clubhouse Membership"
              description="15+ live events monthly, weekly classes with pros, replay reviews, recordings, and a community of players who actually want to get better."
            />
          </div>
        </div>
      </section>


      {/* ── FEATURE CAROUSEL ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Inside The Clubhouse
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            More Than Just Coaching
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            Click through to see what the VIP Experience looks like from the
            inside.
          </p>
          <FeatureCarousel />
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ── */}
      <section id="results" className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Real Results
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Watch The Coaching Sessions. See The Results.
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            These are real VIP members with real rank improvements. Every session
            is recorded so you can watch the exact coaching that got them there.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--accent)]/40"
              >
                {/* Header */}
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

                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="flex-1 text-sm leading-relaxed text-white/60">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Coach notes */}
                {t.coachNotes && (
                  <p className="mt-3 text-xs text-white/30">
                    Coached on: {t.coachNotes}
                  </p>
                )}

                {/* VOD link */}
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

      {/* ── REVIEWS ── */}
      <section id="reviews" className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Player Reviews
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            95+ Five-Star Reviews
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

          {/* Review cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {TEXT_REVIEWS.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{r.name}</p>
                    <p className="text-xs text-white/40">{r.handle}</p>
                  </div>
                  <p className="ml-auto text-xs text-white/30">{r.daysAfter}</p>
                </div>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The Value
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            What This Would Cost Separately
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
            <div className="flex items-center justify-between bg-white/[0.03] px-6 py-4 border-t border-white/10">
              <span className="font-bold text-white/70">
                What this would cost on its own
              </span>
              <span className="text-lg font-black text-white/40 line-through">
                $352 – $477 / 6 weeks
              </span>
            </div>
            <div className="flex items-center justify-between bg-[var(--accent)]/10 px-6 py-5">
              <span className="font-bold">VIP Experience Price</span>
              <span className="flex items-center gap-3">
                <span className="text-2xl font-black text-[var(--accent)]">
                  $497 / 6 weeks
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ADDITION: SHOCK ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            New Addition To The Coaching Team
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Shock Is Trialing On VIP
          </h2>
          <p className="mt-5 leading-relaxed text-white/70 md:text-lg">
            Former NA MVP and Ghost Gaming pro. He&apos;s starting with a limited number of student spots over the next month. Available by request, first-come basis. If you want him as your coach, that&apos;s how to lock it in.
          </p>
        </div>
      </section>

      {/* ── INVESTMENT ── */}
      <section
        id="investment"
        className="border-t border-white/10 px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Investment
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            One Membership. Everything You Need To Improve.
          </h2>

          <PricingCard openBooking={openBooking} />

        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Is This For You?
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Who The VIP Experience Is For
          </h2>
          <ul className="mt-10 space-y-5">
            <WhoItem text="Players who care more about improving their skill than flexing a rank banner" />
            <WhoItem text="18+ Rocket League players who want a clear, efficient practice plan" />
            <WhoItem text="Platinum to Grand Champ players who are coachable and want better mechanics, game sense, and consistency" />
          </ul>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Meet The Team
          </p>
          <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            The People Behind Your Improvement
          </h2>
          <p className="mb-14 text-center text-white/50 max-w-xl mx-auto">
            Your coaching comes from RLCS-level pros and the #1 Rocket League
            teacher on YouTube. Each coach has their own style. You get matched
            to whoever fits your goals.
          </p>

          {/* HEADLINER: SpookyLuke */}
          <div className="mb-10 rounded-2xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/5 p-8 flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <img
              src="https://i0.wp.com/spookyluke.com/wp-content/uploads/2025/09/cutout-sept.webp?fit=592%2C713&ssl=1"
              alt="SpookyLuke"
              className="h-32 w-32 rounded-full object-cover object-top border-4 border-[var(--accent)]/40 flex-shrink-0 mb-4 sm:mb-0"
            />
            <div>
              <div className="font-extrabold text-3xl">SpookyLuke</div>
              <div className="text-sm text-[var(--accent)] font-bold mt-1 uppercase tracking-wide">
                Founder &middot; Head Coach &middot; Content Creator
              </div>
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold text-[var(--accent)]">
                  528K+ YouTube Subs
                </span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold text-[var(--accent)]">
                  216M+ Views
                </span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold text-[var(--accent)]">
                  GC3 Peak
                </span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold text-[var(--accent)]">
                  60K Discord
                </span>
              </div>
              <div className="text-sm text-white/60 mt-4 leading-relaxed">
                The #1 Rocket League teacher on YouTube. At the end of your
                6 weeks, you get a personal replay review from SpookyLuke as
                a graduation bonus. His Metafy rate for a 30-minute session
                is $125. As a VIP member, it is included. Every session gets
                published to the coaching channel for permanent access.
              </div>
            </div>
          </div>

          {/* COACHES GRID */}
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-white/40">
            Your Pro Coaches
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Torment */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5">
              <img
                src="/graphics/torment.jpg"
                alt="Torment"
                className="mx-auto h-20 w-20 rounded-full object-cover object-top border-2 border-white/10 mb-4"
              />
              <div className="font-extrabold text-xl">Torment</div>
              <div className="text-xs text-[var(--accent)] font-bold mt-1 uppercase tracking-wide">
                World Champion S6
              </div>
              <div className="text-xs text-white/50 mt-3 leading-relaxed">
                RLCS Season 6 World Champion. One of the most accomplished
                players in NA history. Specializes in rotations, positioning,
                and high-level decision-making.
              </div>
            </div>

            {/* Freakii */}
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
                Former Renault Vitality pro. Now head coach at PWR. Brings an EU
                perspective on mechanics, speed, and technical consistency that
                NA players rarely get access to.
              </div>
            </div>

            {/* Shock */}
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
                Season MVP. One of the most decorated NA players of his era.
                Known for controlled aggression, disruption, and high IQ plays.
              </div>
            </div>
          </div>

          {/* Coaches banner image */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <img
              src="/graphics/coaches-banner.png"
              alt="Our Coaches: Freakii, SpookLuke, Shock, Torment"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ── RANK-UP PROMISE ── */}
      <section className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The VIP Promise
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            We Reward Real Effort and Improvement.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/50">
            Join VIP. Put in the work. Rank up. We'll send you a brand new
            controller. Because if you put in the work, you deserve it.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={openBooking}
              className="rounded-full bg-[var(--accent)] px-8 py-3 font-bold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Enroll Now
            </button>
            <a
              href="#promise-steps"
              className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
            >
              How it Works
            </a>
          </div>
        </div>

        {/* 3-step infographic */}
        <div
          id="promise-steps"
          className="mx-auto mt-16 max-w-4xl grid gap-8 md:grid-cols-3"
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--accent)] text-xl font-black text-[var(--accent)]">
              1
            </div>
            <h3 className="mt-5 text-lg font-extrabold">Rank Up</h3>
            <p className="mt-2 text-sm text-white/50">
              Achieve a full rank up by the end of your 6 weeks. Plat &rarr;
              Diamond. Diamond &rarr; Champ. Champ &rarr; GC. A complete rank
              change, not just a division.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--accent)] text-xl font-black text-[var(--accent)]">
              2
            </div>
            <h3 className="mt-5 text-lg font-extrabold">Hold It</h3>
            <p className="mt-2 text-sm text-white/50">
              Maintain your new rank across two consecutive seasons. Complete one
              check-in session with the team. This is real sustained improvement
              No boosting, no shortcuts.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--green)] text-xl font-black text-[var(--green)]">
              ✓
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-[var(--green)]">
              Get a New Controller
            </h3>
            <p className="mt-2 text-sm text-white/50">
              Send us proof. Screenshots of your rank before and after.
              We verify everything and ship you a brand new Xbox or PS
              controller. On us.
            </p>
          </div>
        </div>

        {/* Bottom tagline + terms link */}
        <p className="mx-auto mt-12 max-w-md text-center text-sm text-white/30">
          We reward the grind, not just one good session.
        </p>
        <p className="mt-4 text-center text-sm italic text-white/40">
          Luke
        </p>
        <p className="mt-3 text-center">
          <a
            href="/promise"
            className="text-xs text-white/30 underline hover:text-white/50 transition"
          >
            Full terms &amp; conditions
          </a>
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Common Questions
          </h2>

          <div className="mt-10 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="font-bold">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY BANNER ── */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/graphics/community-banner.png"
            alt="The #1 Rocket League Improvement Community in the World"
            className="w-full"
          />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Ready To Actually Get Better?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            Book a quick onboarding call. We'll answer your questions and get you
            started with your first coaching session and training plan.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className="mt-8 rounded-full bg-[var(--accent)] px-12 py-5 text-xl font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Book Your VIP Onboarding Call →
          </button>
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

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[var(--accent)]/40">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">
        {description}
      </p>
    </div>
  );
}

function IncludeCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--accent)]/40">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
        {icon}
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>
    </div>
  );
}

function RatingBar({
  stars,
  percent,
  count,
}: {
  stars: number;
  percent: number;
  count: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-right text-sm font-semibold text-white/70">
        {stars}
        <Star className="ml-0.5 inline h-3 w-3 fill-yellow-400 text-yellow-400" />
      </span>
      <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-green-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-16 text-right text-xs text-white/40">
        {percent}% ({count})
      </span>
    </div>
  );
}

function WhoItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-4 text-lg">
      <span className="mt-1.5 h-4 w-4 flex-shrink-0 rounded border-2 border-[var(--accent)]" />
      {text}
    </li>
  );
}

const CAROUSEL_SLIDES = [
  {
    src: "/graphics/retro-tv-gameplay.png",
    title: "Live Coaching Sessions",
    description:
      "Watch pros break down real gameplay in real time. Every session is hands-on, personalized, and recorded so you can rewatch anytime.",
  },
  {
    src: "/graphics/discord-call.png",
    title: "1:1 Calls With Your Coach",
    description:
      "Hop on a live call with your coach to go over your gameplay, get direct feedback, and leave with a clear plan for the week.",
  },
  {
    src: "/graphics/retro-computer.png",
    title: "Private Tournaments",
    description:
      "Compete in members-only tournaments with other VIPs. Test what you have been practicing in a real competitive environment.",
  },
  {
    src: "/graphics/phone-discord.png",
    title: "Active Discord Community",
    description:
      "Find teammates, ask questions, share clips, and stay motivated with a community of players who take their game seriously.",
  },
  {
    src: "/graphics/spin-wheel.png",
    title: "Weekly Community Events",
    description:
      "Game nights, giveaways, replay review sessions, and more. There is always something happening in the Clubhouse.",
  },
  {
    src: "/graphics/retro-streamer.png",
    title: "Pro Coaching Streams",
    description:
      "Watch live coaching streams where pros analyze member replays and teach concepts you can apply to your own game.",
  },
  {
    src: "/graphics/handheld-tournament.png",
    title: "Compete With the Best",
    description:
      "Play alongside and against pro players in exclusive Clubhouse events. See how your skills stack up in real matches.",
  },
  {
    src: "/graphics/gameboy-discord.png",
    title: "Always Someone Online",
    description:
      "The Clubhouse is active around the clock. Find someone to queue with, review a replay together, or just hang out.",
  },
];

function PricingCard({ openBooking }: { openBooking: () => void }) {
  return (
    <div className="mt-10 rounded-2xl border border-[var(--accent)]/30 bg-white/[0.03] p-8 md:p-10">
      <p className="text-6xl font-black md:text-7xl">
        <span className="text-[var(--accent)]">$497</span>
        <span className="text-lg font-semibold text-white/50"> / 6 weeks</span>
      </p>
      <p className="mt-4 text-white/50">
        Cancel anytime. No contracts. No hidden fees.
      </p>

      <button
        type="button"
        onClick={openBooking}
        className="mt-8 rounded-full bg-[var(--accent)] px-12 py-5 text-xl font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
      >
        Book Your VIP Onboarding Call &rarr;
      </button>

      <p className="mt-6 text-sm text-white/30">
        Quick call to walk through VIP, answer your questions, and get you
        started.
      </p>

      {/* 14-day guarantee */}
      <div className="mx-auto mt-6 max-w-md rounded-xl border border-[var(--green)]/30 bg-[var(--green)]/5 px-5 py-3">
        <p className="text-sm font-semibold text-[var(--green)]">
          14-Day Money-Back Guarantee
        </p>
        <p className="mt-1 text-xs text-white/50">
          If VIP doesn&apos;t deliver everything we promised in your first 14
          days, we&apos;ll give you your money back. No questions asked.
        </p>
      </div>
    </div>
  );
}

function FeatureCarousel() {
  const [current, setCurrent] = useState(0);
  const total = CAROUSEL_SLIDES.length;
  const slide = CAROUSEL_SLIDES[current];

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <div className="mt-10">
      {/* Image */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <img
          src={slide.src}
          alt={slide.title}
          className="w-full aspect-square object-cover md:aspect-[16/9]"
        />
      </div>

      {/* Controls + text */}
      <div className="mt-6 flex items-start gap-4">
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1">
          <p className="text-sm text-white/30">
            {current + 1} / {total}
          </p>
          <h3 className="mt-1 text-xl font-bold">{slide.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex gap-1.5 ml-24">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current
                ? "w-6 bg-[var(--accent)]"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
