"use client";

const FREE_DISCORD_URL =
  "https://discord.com/channels/729975157011251241/1404464751819362304";

export default function FreePage() {
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
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-16 pb-8 text-center md:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Thanks for filling that out
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            We&apos;ve got something for you.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            The Clubhouse is built for players 18 and up — a call we made for
            legal and community reasons, not a comment on your skill. But we
            still want to help you get better.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/55">
            We&apos;ve got a free Discord space packed with tutorials, training
            packs, and other players grinding alongside you. Hop in there for
            now — and come back to the Clubhouse when you turn 18.
          </p>
        </div>
      </section>

      {/* FREE DISCORD ACCESS */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href={FREE_DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Open the Free Discord →
          </a>
          <p className="mt-4 text-xs text-white/40">
            Free forever. No signup, no catch.
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
