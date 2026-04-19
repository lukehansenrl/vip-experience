"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

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
            Your Rate Is Locked. Here&apos;s Something Extra.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            Whether you do anything or not, your $179 rate is safe for as long as your membership stays active and continuous. This page exists in case you want to go one step further.
          </p>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Why I&apos;m Offering This
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Lock In My Coaching. Plus Some DM Time.
          </h2>

          <p className="mt-5 leading-relaxed text-white/60">
            First and most important. Your monthly rate is locked at $179. You don&apos;t have to do anything on this page. That&apos;s not changing no matter what you decide.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            Here&apos;s what I wanted to be straight with you about though. At some point in the next 6 to 12 months, I&apos;m going to be pulling myself out of replay reviews. I don&apos;t have a firm date yet. When it happens, those reviews will shift to my other coaches instead of me personally.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            If you prepay right now, I&apos;ll honor my own replay reviews for the full 6 or 12 months you lock in. Even if I step back for new members during that window, your reviews still come from me. So if getting MY eyes on your gameplay is the thing you want, prepaying is the way to guarantee it.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            And as a thank you for prepaying, I&apos;m throwing in a bonus. Direct DM access to me. If you want to send over a clip, ask me a question, or get my take on something in between your coaching sessions, just DM me. I&apos;ll answer. This isn&apos;t something I&apos;m offering to monthly members. Only people who prepay.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            If you&apos;d rather just keep paying monthly, that&apos;s completely fine. Do nothing. Your billing continues. Your rate stays locked.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            If you want to lock in my coaching for the next 6 or 12 months and get the DM bonus, here are the two options.
          </p>
        </div>
      </section>

      {/* ── THE OFFER ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 6-month */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                6 Months
              </p>
              <p className="mt-4 text-5xl font-black">$960</p>
              <p className="mt-1 text-xs text-white/40">one-time payment</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  6 full months of VIP at your grandfather rate
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  Save $114 vs paying monthly
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  My replay reviews honored for the full 6 months
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                  <span>
                    <strong className="text-white">Bonus:</strong> Direct DM access to me
                  </span>
                </li>
              </ul>
              <a
                href="https://whop.com/c/rlc-pro-vip-membership/6-month"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full rounded-full border border-[var(--accent)]/40 bg-transparent px-6 py-3 text-center text-sm font-bold text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
              >
                Prepay 6 Months →
              </a>
            </div>

            {/* 12-month — highlighted */}
            <div className="relative rounded-2xl border-2 border-[var(--accent)]/50 bg-[var(--accent)]/5 p-8">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Best Value
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                12 Months
              </p>
              <p className="mt-4 text-5xl font-black">$1,790</p>
              <p className="mt-1 text-xs text-white/40">one-time payment</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  12 full months of VIP at your grandfather rate
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  Save $358. That&apos;s two months free.
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  My replay reviews honored for the full 12 months
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                  <span>
                    <strong className="text-white">Bonus:</strong> Direct DM access to me
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]" />
                  Locked in regardless of any future price changes
                </li>
              </ul>
              <a
                href="https://whop.com/c/rlc-pro-vip-membership/12-month"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full rounded-full bg-[var(--accent)] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
              >
                Prepay 12 Months →
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
            <p className="text-sm text-white/60">
              <strong className="text-white">
                This window closes Friday, April 24 at 11:59pm ET.
              </strong>{" "}
              After that, this specific option is gone. Your monthly rate stays locked either way.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWERS ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Quick Answers
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            The Natural Questions
          </h2>

          <div className="mt-8 space-y-6">
            <div>
              <p className="font-bold text-white">Do I have to do this?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                No. Your $179 monthly rate is already locked as long as you stay active and continuous. This is purely optional.
              </p>
            </div>
            <div>
              <p className="font-bold text-white">
                What if I want to just keep paying monthly?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Perfect. Do nothing. You&apos;re already grandfathered and your billing continues as normal.
              </p>
            </div>
            <div>
              <p className="font-bold text-white">
                Can I prepay later if I decide I want to?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                This specific window closes Friday night. After that your monthly rate stays locked, but this prepay deal won&apos;t be offered again.
              </p>
            </div>
            <div>
              <p className="font-bold text-white">
                What if something comes up and I need to cancel partway through?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                DM me directly. We&apos;ll figure it out the same way we would with any member. I&apos;m not going to leave someone hanging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGN-OFF ── */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="leading-relaxed text-white/60">
            However you want to do this, you&apos;re set. No pressure. No tricks. I just wanted to give you the option before the window closes.
          </p>
          <p className="mt-6 text-lg italic text-white/50">- Luke</p>
          <p className="mt-10 text-sm text-white/40">
            Questions? DM me directly or open a{" "}
            <a
              href="https://discord.com/channels/1217265351658573895/1222927647126851604"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white/60 transition hover:text-white"
            >
              support ticket
            </a>
            .
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
