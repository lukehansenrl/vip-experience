"use client";

/* ── LOCK-IN PAGE — Window closed ── */

export default function LockInPage() {
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
        <div className="mx-auto max-w-6xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pb-16 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
            Window Closed
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            The Prepay Window Has Closed
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
            Thanks to everyone who locked in. The 6 and 12-month prepay offer ended Friday at 11:59pm CT.
          </p>
        </div>
      </section>

      {/* ── WHAT'S STILL AVAILABLE ── */}
      <section className="border-t border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Still Available
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
            Until Sunday 11:59pm CT
          </h2>
          <p className="mt-5 leading-relaxed text-white/70">
            The Original VIP package is still available at <strong className="text-white">$179/month</strong> through Sunday — with my replay reviews included, locked in for as long as you stay active.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            After Sunday, the package changes to $199/month with coach replays only.
          </p>
          <a
            href="/announce"
            className="mt-8 inline-block rounded-full bg-[var(--accent)] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            See Current Options →
          </a>
        </div>
      </section>

      {/* ── SIGN-OFF ── */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="leading-relaxed text-white/60">
            Appreciate everyone who hopped in this week. More to come.
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
