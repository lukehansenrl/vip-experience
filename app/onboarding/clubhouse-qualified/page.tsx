"use client";

import { VipBrandNav } from "../../components/VipBrandNav";

// Tracked free-trial signup link for the Rocket League Clubhouse,
// scoped to vip-experience traffic so Whop can attribute conversions
// from this funnel separately from other Clubhouse signup sources.
const CLUBHOUSE_URL = "https://whop.com/c/gcbcommunity/vip-experience";

// TODO (Sarah): Replace with the real Loom once the 10-min server walkthrough
// is recorded. Leave empty string to hide the video block.
const ONBOARDING_LOOM_URL = "";

export default function ClubhouseQualifiedPage() {
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
      <VipBrandNav />

      {/* HERO */}
      <section className="px-6 pt-16 pb-8 text-center md:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            VIP isn&apos;t the right call. The Clubhouse is.
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Improve faster with the mature 18+ community.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/70">
            Based on your application, the 6-week VIP isn&apos;t the right
            fit right now. But you&apos;re a great fit for our Clubhouse:
            an 18+ improvement community with me, RLCS-level pros, and
            players who actually want to get better.
          </p>
        </div>
      </section>

      {/* WHY NOT VIP — the bar, stated plainly (one page, all reasons) */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            What VIP requires
          </p>
          <p className="mt-2 text-sm text-white/60">
            VIP 1-on-1 coaching is for players who meet all of these. If
            any one isn&apos;t you yet, the Clubhouse below is the move.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>A budget of at least $300 to $500 for improvement</li>
            <li>18 years or older</li>
            <li>Playing on PC</li>
            <li>Ranked Platinum or higher</li>
          </ul>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base text-white/75">
            15+ live events a month with pros and me. Replay reviews.
            Weekly classes. A community of players who actually want to
            rank up.
          </p>
          <p className="mt-4 text-base font-semibold text-white">
            $27 a month. 30-day free trial. Cancel anytime.
          </p>

          <div className="mt-10">
            <a
              href={CLUBHOUSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Start your 30-day free trial →
            </a>
            <p className="mt-3 text-sm text-white/50">
              Try the community for 30 days. See if it&apos;s a fit.
            </p>
          </div>
        </div>
      </section>

      {/* ONBOARDING VIDEO */}
      {ONBOARDING_LOOM_URL && (
        <section className="border-t border-white/10 px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Get started in 10 minutes
            </p>
            <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
              Watch this first.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-white/60">
              A quick walkthrough of the server: where everything is, what to
              focus on first, and how to get the most out of your membership.
            </p>

            <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                src={ONBOARDING_LOOM_URL}
                width="100%"
                height="100%"
                allowFullScreen
                title="Clubhouse onboarding"
                className="border-0"
              />
            </div>
          </div>
        </section>
      )}

      {/* ACTION ITEMS */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Your first week in the Clubhouse
          </p>
          <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight md:text-3xl">
            Three things to do.
          </h2>

          <ol className="mx-auto mt-10 max-w-lg space-y-5">
            <ActionItem
              number={1}
              label="Post your introduction"
              detail="In #introductions. Use the template. Reply to a few others. This is how you find teammates."
            />
            <ActionItem
              number={2}
              label="RSVP to a live event this week"
              detail="Check the events channel near the top of the server. Pick one improvement event and one community event."
            />
            <ActionItem
              number={3}
              label="Hop into a voice channel"
              detail="No one's gonna be weird if you join. We're all introverted gamers trying to get better at car soccer."
            />
          </ol>

          <p className="mt-10 text-center text-sm text-white/40">
            Questions? Open a support ticket in the server.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

function ActionItem({
  number,
  label,
  detail,
}: {
  number: number;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex gap-5">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-sm font-bold text-[var(--accent)]">
        {number}
      </span>
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm text-white/60">{detail}</p>
      </div>
    </li>
  );
}
