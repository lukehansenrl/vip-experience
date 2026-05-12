"use client";

const CLUBHOUSE_URL =
  "https://discord.com/channels/1217265351658573895/1499077397604204706";

// TODO (Sarah): Replace with the real Loom once the 10-min server walkthrough
// is recorded. Leave empty string to hide the video block.
const ONBOARDING_LOOM_URL = "";

export default function WelcomePage() {
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
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--green)]">
            You&apos;re in
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Welcome to the Clubhouse.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
            We&apos;re setting up your Discord access right now. Hop in and
            watch the full server-tour video at the top of the channel. It&apos;s
            an 8-minute walkthrough showing you where everything is and what
            to focus on first.
          </p>
        </div>
      </section>

      {/* CLUBHOUSE ACCESS */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href={CLUBHOUSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Enter the Clubhouse →
          </a>
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
            Your first week
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
