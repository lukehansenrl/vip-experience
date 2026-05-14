// Post-Calendly thank-you page. Both Calendly events (Clubhouse path and
// direct push) redirect here after booking. Single shared homework page —
// the prep is identical for both audiences at this stage.

export default function BookedPage() {
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
            RL <span className="text-[var(--accent)]">Clubhouse</span> ·{" "}
            <span className="text-white/70">VIP</span>
          </div>
        </div>
      </nav>

      {/* ── CONFIRMATION HERO ───────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(108,99,255,0.15)",
              border: "1px solid rgba(108,99,255,0.4)",
            }}
          >
            <svg
              className="h-8 w-8 text-[var(--accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            You&apos;re booked
          </p>
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            See you on the call.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">
            Check your email for the calendar invite and meeting link.
            We&apos;ll also send reminders 24 hours and 2 hours before.
          </p>
        </div>
      </section>

      {/* ── HOMEWORK ──────────────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Before our call
            </p>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Do these 3 things.
            </h2>
            <p className="mt-3 text-white/60">
              Takes about 10 minutes. Makes the call 10x more useful for you.
            </p>
          </div>

          <div className="space-y-4">
            <HomeworkStep
              number={1}
              title="Pick a recent 2s replay you want to look at"
              body={
                <>
                  Open Rocket League → Replays → find a recent ranked 2s
                  match where you felt particularly stuck or frustrated.
                  Bonus points if it&apos;s a loss against an opponent you
                  felt like you should have beaten.
                  <br />
                  <br />
                  Have it ready to share screen on the call. Your coach will
                  want to watch a clip with you and point out exactly
                  what&apos;s costing you the game.
                </>
              }
            />

            <HomeworkStep
              number={2}
              title="Get clear on ONE specific frustration"
              body={
                <>
                  What&apos;s the single biggest thing in your gameplay that
                  you can&apos;t figure out? Not &quot;I want to rank
                  up&quot; — something specific.
                  <br />
                  <br />
                  Examples: &quot;I get backposted every other game,&quot;
                  &quot;I can&apos;t commit and challenge,&quot; &quot;My
                  double commits are killing me,&quot; &quot;I tilt after
                  one bad goal.&quot;
                  <br />
                  <br />
                  Bring one. The coach will dig into it on the call.
                </>
              }
            />

            <HomeworkStep
              number={3}
              title="Be on a computer with audio and video"
              body={
                <>
                  We&apos;ll be screen-sharing, so the call works best on a
                  laptop or desktop — not your phone. Test your mic and
                  camera 5 minutes before. Quiet room if you can.
                  <br />
                  <br />
                  If something comes up and you need to reschedule, use the
                  link in your confirmation email. Please don&apos;t no-show
                  — we lose the slot and you lose your spot in the queue.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ───────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-black/20 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            What to expect
          </p>
          <h2 className="text-center font-display text-3xl tracking-tight md:text-4xl">
            45 minutes. No pressure.
          </h2>

          <div className="mt-8 space-y-3">
            <ExpectLine
              when="First 10 min"
              what="We get to know you — your rank, your goals, what you've tried, what's been frustrating."
            />
            <ExpectLine
              when="Next 15–20 min"
              what="We watch your replay together. Your coach diagnoses what's actually costing you games — not generic advice."
            />
            <ExpectLine
              when="Final 10–15 min"
              what="We walk you through whether VIP is the right fit and answer any questions. Either way, you leave with specific direction on what to work on next."
            />
          </div>

          <p className="mt-8 text-center text-sm text-white/50">
            Even if VIP isn&apos;t the right fit for you, you&apos;ll leave
            the call with a clearer picture of what to focus on.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/40">
        <p>
          Need to reschedule? Use the link in your confirmation email.
          Questions? DM us in the Clubhouse Discord.
        </p>
        <p className="mt-2 text-xs text-white/30">
          &copy; {new Date().getFullYear()} RL Clubhouse. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

function HomeworkStep({
  number,
  title,
  body,
}: {
  number: number;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
          style={{
            backgroundColor: "rgba(108,99,255,0.15)",
            border: "1px solid rgba(108,99,255,0.4)",
            color: "var(--accent)",
          }}
        >
          {number}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
            {title}
          </h3>
          <div className="text-sm leading-relaxed text-white/70 md:text-base">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpectLine({ when, what }: { when: string; what: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:gap-6">
      <span className="text-sm font-semibold text-[var(--accent)] md:w-32 md:flex-shrink-0">
        {when}
      </span>
      <span className="text-sm leading-relaxed text-white/75 md:text-base">
        {what}
      </span>
    </div>
  );
}
