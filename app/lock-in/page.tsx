"use client";

import { useEffect } from "react";
import { Check, X, Star, Video, Users, Lightbulb } from "lucide-react";

/* ── LOCK-IN PAGE (VIP-only, DM-shared) ── */

export default function LockInPage() {
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
      {/* ── MINIMAL NAV ── */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pb-12 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Just For Current VIPs
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Your Rate Is Locked.
            <br />
            Here&apos;s Something Extra.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            Your $179 rate is safe no matter what. This page is about something I haven&apos;t offered coaching students in 5 years.
          </p>
        </div>
      </section>

      {/* ── LUKE VIDEO ── */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-[320px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
          <video
            className="block w-full"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            src="/video/luke-lockin-intro.mp4"
          />
        </div>
      </section>

      {/* ── MONTHLY vs PREPAY COMPARISON ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The Difference
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Monthly vs Prepay
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            {/* header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/10 bg-white/[0.04]">
              <div className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-white/40 sm:px-6">
                &nbsp;
              </div>
              <div className="border-l border-white/10 px-3 py-4 text-center text-xs font-bold uppercase tracking-wider text-white/50 sm:px-6">
                Monthly
              </div>
              <div className="border-l border-white/10 bg-[var(--accent)]/10 px-3 py-4 text-center text-xs font-bold uppercase tracking-wider text-[var(--accent)] sm:px-6">
                Prepay
              </div>
            </div>

            <ComparisonRow label="$179 rate locked" monthly="yes" prepay="yes" />
            <ComparisonRow
              label="Replay reviews from me personally"
              monthly="later-no"
              prepay="yes"
            />
            <ComparisonRow
              label="Direct DM access to me"
              monthly="no"
              prepay="yes"
            />
            <ComparisonRow
              label="1-2 months free"
              monthly="no"
              prepay="yes"
            />
            <ComparisonRow
              label="Future-proof against price changes"
              monthly="partial"
              prepay="yes"
              last
            />
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            &ldquo;Partial&rdquo; on monthly because your rate is grandfathered but benefits can change.
          </p>
        </div>
      </section>

      {/* ── VALUE STACK (HORMOZI) ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            Total Value
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            What You&apos;re Actually Getting
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-white/50">
            Fair market rates from every piece of what VIP includes, times how many months you prepay.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            {/* header */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-white/10 bg-white/[0.04]">
              <div className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/40 sm:px-6">
                What You Get
              </div>
              <div className="border-l border-white/10 px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-white/50 sm:px-6">
                6 Months
              </div>
              <div className="border-l border-white/10 bg-[var(--accent)]/10 px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-[var(--accent)] sm:px-6">
                12 Months
              </div>
            </div>

            <StackRow label="1:1 Pro Coaching Sessions" six="$450" twelve="$900" />
            <StackRow label="Personalized Training Plans" six="$300" twelve="$600" />
            <StackRow label="Accountability Check-ins" six="$450" twelve="$900" />
            <StackRow label="Replay Reviews from Luke" six="$250" twelve="$500" />
            <StackRow label="Clubhouse Access + Live Events" six="$162" twelve="$324" />
            <StackRow
              label="Luke's DMs (bonus)"
              six="$1,200"
              twelve="$2,400"
              highlight
            />
            <StackRow label="Rank-Up Promise + Controller" six="$100" twelve="$100" />
            <StackRow
              label="1-2 Months FREE"
              six="$179"
              twelve="$358"
              highlight
            />

            {/* total */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr] border-t-2 border-white/20 bg-white/[0.03]">
              <div className="px-4 py-4 text-sm font-black uppercase tracking-wider text-white sm:px-6">
                Total Value
              </div>
              <div className="border-l border-white/10 px-3 py-4 text-center text-lg font-black text-white sm:px-6">
                $3,091
              </div>
              <div className="border-l border-white/10 bg-[var(--accent)]/10 px-3 py-4 text-center text-lg font-black text-[var(--accent)] sm:px-6">
                $6,082
              </div>
            </div>

            {/* your price */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr] border-t border-white/10">
              <div className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-white/60 sm:px-6">
                Your Price
              </div>
              <div className="border-l border-white/10 px-3 py-4 text-center text-lg font-black text-white sm:px-6">
                $895
              </div>
              <div className="border-l border-white/10 bg-[var(--accent)]/10 px-3 py-4 text-center text-lg font-black text-white sm:px-6">
                $1,790
              </div>
            </div>

            {/* you save */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr] border-t border-white/10 bg-[var(--green)]/5">
              <div className="px-4 py-4 text-sm font-bold uppercase tracking-wider text-[var(--green)] sm:px-6">
                You Save
              </div>
              <div className="border-l border-white/10 px-3 py-4 text-center text-sm font-black text-[var(--green)] sm:px-6">
                $2,196
                <span className="block text-xs font-normal opacity-70">
                  71% off
                </span>
              </div>
              <div className="border-l border-white/10 px-3 py-4 text-center text-sm font-black text-[var(--green)] sm:px-6">
                $4,292
                <span className="block text-xs font-normal opacity-70">
                  70% off
                </span>
              </div>
            </div>
          </div>

          {/* TIER CTAs */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <a
              href="https://whop.com/c/rlc-pro-vip-membership/6-month"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--accent)]/40 bg-transparent px-6 py-5 text-center transition hover:bg-[var(--accent)]/10"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Prepay 6 Months
              </p>
              <p className="mt-2 text-2xl font-black text-white">
                $895
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--accent)]">
                Lock In →
              </p>
            </a>
            <a
              href="https://whop.com/c/rlc-pro-vip-membership/12-month"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent)]/10 px-6 py-5 text-center shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent)]/20"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Best Value
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                Prepay 12 Months
              </p>
              <p className="mt-2 text-2xl font-black text-white">
                $1,790
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                Lock In →
              </p>
            </a>
          </div>

          {/* deadline */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
            <p className="text-sm text-white/60">
              <strong className="text-white">
                Window closes Friday, April 24 at 11:59pm ET.
              </strong>{" "}
              Your monthly rate stays locked either way.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY I'M DOING THIS (3 CARDS) ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Why I&apos;m Doing This
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Honest Version
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <WhyCard
              icon={<Users className="h-5 w-5 text-[var(--accent)]" />}
              title="Reward serious students"
              body="If you prepay 6 or 12 months, you're not a hobbyist. I want to focus on a small group of students who are actually serious."
            />
            <WhyCard
              icon={<Video className="h-5 w-5 text-[var(--accent)]" />}
              title="Content keeps flowing"
              body="I make my YouTube content out of my coaching sessions. Even when I stop doing replays publicly, I want to keep coaching a few students long-term. That's my content pipeline."
            />
            <WhyCard
              icon={<Lightbulb className="h-5 w-5 text-[var(--accent)]" />}
              title="Stay plugged in"
              body="DMing with serious players keeps me sharp on what the community is actually struggling with. Useful for you. Useful for me."
            />
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-white/70">
            Bottom line. I&apos;d rather focus on 10 serious students than stretch thin across 50 who aren&apos;t putting in the work. If that&apos;s you, this is for you.
          </p>
        </div>
      </section>

      {/* ── QUICK FAQ ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Quick Answers
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            The Natural Questions
          </h2>

          <div className="mt-8 space-y-6">
            <Faq
              q="Do I have to do this?"
              a="No. Your $179 monthly rate is already locked. This is optional."
            />
            <Faq
              q="What if I just stay monthly?"
              a="Totally fine, your rate stays locked. One thing though: when I step back from replay reviews, monthly members will get them from one of my other coaches instead of me. Only prepay members keep my personal reviews guaranteed."
            />
            <Faq
              q="Can I prepay later?"
              a="This window closes Friday night. The monthly rate stays locked after that, but this prepay deal won't be offered again."
            />
          </div>
        </div>
      </section>

      {/* ── SIGN-OFF ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="leading-relaxed text-white/60">
            However you want to do this, you&apos;re set. No pressure. I just wanted to give you the option before the window closes.
          </p>
          <p className="mt-6 text-lg italic text-white/50">- Luke</p>
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

function ComparisonRow({
  label,
  monthly,
  prepay,
  last,
}: {
  label: string;
  monthly: "yes" | "no" | "partial" | "later-no";
  prepay: "yes" | "no" | "partial";
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.4fr_1fr_1fr] ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <div className="px-4 py-4 text-sm text-white/80 sm:px-6">{label}</div>
      <div className="border-l border-white/10 px-3 py-4 text-center sm:px-6">
        <ComparisonCell value={monthly} />
      </div>
      <div className="border-l border-white/10 bg-[var(--accent)]/5 px-3 py-4 text-center sm:px-6">
        <ComparisonCell value={prepay} />
      </div>
    </div>
  );
}

function ComparisonCell({
  value,
}: {
  value: "yes" | "no" | "partial" | "later-no";
}) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--green)]">
        <Check className="h-4 w-4" />
        Yes
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-white/40">
        <X className="h-4 w-4" />
        No
      </span>
    );
  }
  if (value === "later-no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
        <X className="h-3.5 w-3.5" />
        Coach (later)
      </span>
    );
  }
  // partial
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
      <Star className="h-3.5 w-3.5" />
      Partial
    </span>
  );
}

function StackRow({
  label,
  six,
  twelve,
  highlight,
}: {
  label: string;
  six: string;
  twelve: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-white/10">
      <div className="px-4 py-3 text-sm text-white/70 sm:px-6">
        {highlight ? (
          <span className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
            <span className="text-white">{label}</span>
          </span>
        ) : (
          label
        )}
      </div>
      <div className="border-l border-white/10 px-3 py-3 text-center text-sm font-bold text-white/80 sm:px-6">
        {six}
      </div>
      <div className="border-l border-white/10 bg-[var(--accent)]/5 px-3 py-3 text-center text-sm font-bold text-white/80 sm:px-6">
        {twelve}
      </div>
    </div>
  );
}

function WhyCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30">
        {icon}
      </div>
      <h3 className="mt-4 font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-bold text-white">{q}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{a}</p>
    </div>
  );
}
