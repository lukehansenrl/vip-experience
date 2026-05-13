import type { Metadata } from "next";

// Discord channel where new VIP members book their first 1:1 session.
const DISCORD_BOOK_URL =
  "https://discord.com/channels/1217265351658573895/1411425483052028026";

export const metadata: Metadata = {
  title: "Welcome to VIP | RL Clubhouse",
  description:
    "Your VIP Pro purchase is complete. Hop into Discord to book your first 1:1 coaching session.",
};

export default function CheckoutSuccessPage() {
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
      {/* NAV */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-20 pb-12 text-center md:pt-28">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            You&apos;re in
          </p>
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">
            Welcome to the VIP
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/65">
            Your purchase is complete. Hop into Discord and book your first
            1:1 coaching session in the channel below.
          </p>
        </div>
      </section>

      {/* DISCORD CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href={DISCORD_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Book Your First Session in Discord →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
