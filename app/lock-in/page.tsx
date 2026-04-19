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
            Lock In My Replay Reviews. Plus DM Access.
          </h2>

          <p className="mt-5 leading-relaxed text-white/60">
            First and most important. Your monthly rate is locked at $179. You don&apos;t have to do anything on this page. That&apos;s not changing no matter what you decide.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            Here&apos;s what I wanted to be straight with you about though. At some point in the next 6 to 12 months, I&apos;m going to be pulling myself out of replay reviews. I don&apos;t have a firm date on it yet. When it happens, for anyone still on monthly, those replay reviews will shift to one of my other coaches instead of coming from me personally. That includes current VIPs.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            The only way to guarantee my own replay reviews going forward is to prepay. If you lock in 6 or 12 months right now, I&apos;ll honor MY reviews for the full window no matter what happens with the rest of the program. Monthly members don&apos;t get that guarantee.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            If you&apos;d rather just keep paying monthly, that&apos;s completely fine. Do nothing. Your billing continues. Your rate stays locked. Just know that at some point in the future, your replay reviews may be coming from one of my other coaches instead of me.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            But there&apos;s one more thing I&apos;m doing for prepay members, and I want to be real about what it&apos;s worth.
          </p>
        </div>
      </section>

      {/* ── DM ACCESS (THE BONUS) ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
            The Bonus (Real Talk)
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Me In Your Pocket For The Whole Window
          </h2>

          <p className="mt-5 leading-relaxed text-white/60">
            Let me be specific about what this actually means, because I think people underestimate it.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            Once you prepay, you have my DMs. Things you can do:
          </p>

          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--gold)]" />
              Send me a clip and ask why you lost a play
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--gold)]" />
              Ask what to grind this week based on what you&apos;re struggling with
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--gold)]" />
              Get my real take on training packs, tournaments, pros to watch, mental game stuff
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--gold)]" />
              Stuck at a rank and not sure what to focus on? Ask me. I&apos;ll tell you.
            </li>
          </ul>

          <p className="mt-6 leading-relaxed text-white/60">
            Basically me in your pocket for Rocket League stuff. When I have time, I&apos;ll answer.
          </p>

          <div
            className="mt-10 rounded-2xl border p-6 md:p-8"
            style={{
              borderColor: "rgba(245, 197, 66, 0.3)",
              background:
                "linear-gradient(135deg, var(--gold-glow), transparent)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              What This Is Actually Worth
            </p>
            <p className="mt-3 leading-relaxed text-white/80">
              My hourly coaching rate is just under <strong className="text-white">$200</strong>. I haven&apos;t offered direct DM access like this to any of my coaching students in the last <strong className="text-white">5 years</strong>. This is genuinely a one-time thing.
            </p>
            <p className="mt-3 leading-relaxed text-white/80">
              Do the math on what even a couple DMs a month is worth over 6 or 12 months. Most prepay members will get more value out of this single bonus than the entire prepay costs.
            </p>
          </div>

          <p className="mt-10 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Why I&apos;m Doing This
          </p>
          <h3 className="mt-2 text-xl font-extrabold tracking-tight md:text-2xl">
            Honest Version. Two Reasons.
          </h3>

          <p className="mt-4 leading-relaxed text-white/60">
            <strong className="text-white">One.</strong> I want to reward the VIPs who commit to the long game. If you&apos;re prepaying 6 or 12 months, you&apos;re not a hobbyist, you&apos;re serious. I want to go deep with that group.
          </p>

          <p className="mt-4 leading-relaxed text-white/60">
            <strong className="text-white">Two.</strong> Selfishly, DMing with a handful of serious students keeps me plugged in to what the community is actually struggling with. That feeds my content and keeps me sharp. So yeah, there&apos;s a real reason this is useful to me too.
          </p>

          <p className="mt-6 leading-relaxed text-white/70">
            Bottom line. I&apos;d rather have 10 serious students I can go deep with than 50 monthly ones who aren&apos;t putting in the work. If that sounds like you, this is for you.
          </p>
        </div>
      </section>

      {/* ── THE OFFER ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            The Two Options
          </p>
          <h2 className="mt-3 mb-10 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Pick Your Lock-In
          </h2>
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
                  My personal replay reviews guaranteed for 6 months
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                  <span>
                    <strong className="text-white">Bonus:</strong> My DMs are yours. Clips, questions, anything.
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
                  My personal replay reviews guaranteed for 12 months
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--gold)]" />
                  <span>
                    <strong className="text-white">Bonus:</strong> My DMs are yours. Clips, questions, anything.
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
                Totally fine. Do nothing, your billing continues, your rate stays locked. One thing to know though: when I eventually step back from replay reviews, monthly members will get those reviews from one of my other coaches instead of me. Only prepay members are guaranteed my personal reviews going forward.
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
