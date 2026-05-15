"use client";

import { VipBrandNav } from "../../components/VipBrandNav";

// Free Rocket League Academy Discord — the entry-level community,
// no payment, no age gate (well, Discord's own 13+ ToS). Routed here
// for users who don't qualify for the paid Clubhouse either: under
// 18 (legal bar) or explicit casual players (not the right audience
// for any improvement offer).
// TODO (Luke): swap if the Academy invite URL changes.
const FREE_DISCORD_URL = "https://discord.gg/rlclubhouse";

export default function UnqualifiedPage() {
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
      <section className="px-6 pt-20 pb-12 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Thanks for applying.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/70">
            Based on your answers, the VIP and the paid Clubhouse
            aren&apos;t the right fit for you right now. No problem.
            You&apos;re welcome to hang out in our free Discord community
            with the rest of the players who are figuring it out.
          </p>

          <div className="mt-10">
            <a
              href={FREE_DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
            >
              Join the free Discord →
            </a>
          </div>

          <p className="mx-auto mt-12 max-w-md text-sm text-white/45">
            If your situation changes (you turn 18, you decide you
            actually want to rank up, etc.) you can apply again anytime
            at /vip.
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
