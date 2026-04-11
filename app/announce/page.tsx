"use client";

import { useEffect } from "react";
import { Star, ChevronRight } from "lucide-react";

/* ── ANNOUNCE PAGE ── */

export default function AnnouncePage() {
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
      {/* ── NAV ── */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
          <a
            href="/"
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Learn More About VIP
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pb-16 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            VIP Update
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            An Update To The VIP Experience
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            On <strong className="text-white">Wednesday, April 22</strong>, the VIP
            Experience price for new members increases. Until then, you can lock
            in the current rate.
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Learn More About VIP →
          </a>
        </div>
      </section>

      {/* ── HERO BANNER ── */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/graphics/hero-banner.png"
            alt="The RL Clubhouse VIP Experience"
            className="w-full"
          />
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
            VIP Is Moving To $279 / Month For New Members
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
                New Price (Wednesday, April 22)
              </p>
              <p className="mt-2 text-3xl font-black text-[var(--accent)]">
                $279
              </p>
              <p className="mt-1 text-xs text-white/50">/ month</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <p className="text-sm text-white/60">
              <strong className="text-white">Until Wednesday, April 22:</strong> Current
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
              Two 1:1, 60-minute sessions with a pro coach every month
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

      {/* ── COACHES IMAGE ── */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/graphics/coaches-banner.png"
            alt="Our Coaches: Freakii, SpookLuke, Shock, Torment"
            className="w-full"
          />
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
                  have until <strong className="text-white">Wednesday, April 22</strong> to
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

      {/* ── STUDENT REVIEWS ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            From Real VIP Members
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            What Players Are Saying
          </h2>

          <div className="mt-8 space-y-4">
            <ReviewCard
              name="Xeneson"
              initials="XE"
              text="Went from averaging 1020mmr to 1136 in 2 weeks. The 1on1 sessions helped really well with that."
            />
            <ReviewCard
              name="Crayons"
              initials="CR"
              text="Coaching helped so much went from low D1 to high D2 in just 2 days. The fastest I've ever ranked up."
            />
            <ReviewCard
              name="Dami"
              initials="DR"
              text="After a month of being a member I am now GC2 div 3. The different coaches each have their own way of coaching and finding the right one for you is gonna make you progress really fast."
            />
            <ReviewCard
              name="Snizz._"
              initials="SN"
              text="Started at C3. With the help of 1:1 with Torment and joining one of Luke's events I gained super valuable knowledge. I am now GC. The 1:1 with a pro player is literally worth the entire price."
            />
          </div>

          <p className="mt-6 text-center text-sm text-white/30">
            95+ five-star reviews on Whop
          </p>
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
            <strong className="text-white">Wednesday, April 22</strong>. If you want to
            lock in the current rate, book a call before then and we will get
            you set up.
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Learn More About VIP →
          </a>
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

function ReviewCard({
  name,
  initials,
  text,
}: {
  name: string;
  initials: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold">{name}</p>
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white/60">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

