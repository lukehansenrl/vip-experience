// Post-Calendly thank-you page. Both Calendly events (Clubhouse path and
// direct push) redirect here after booking. Single shared homework page,
// the prep is identical for both audiences at this stage.

import { VipBrandNav } from "../components/VipBrandNav";

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
      <VipBrandNav />

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
              title="Be ready 2–5 minutes early"
              body={
                <>
                  PC, quiet room, working mic. Laptop or desktop works best,
                  not your phone.
                  <br />
                  <br />
                  If something comes up and you need to reschedule, use the
                  link in your confirmation email. Please don&apos;t no-show.
                  We lose the slot and you lose your place in the queue.
                </>
              }
            />

            <HomeworkStep
              number={2}
              title="Check your Discord friend request"
              body={
                <>
                  Your call rep will send you a Discord friend request
                  before your scheduled time. Accept it. That&apos;s how
                  we&apos;ll call you when it&apos;s time.
                </>
              }
            />

            <HomeworkStep
              number={3}
              title="Bring notes on what's holding you back"
              body={
                <>
                  What are the 1–2 specific things in your gameplay you
                  can&apos;t figure out? Not &quot;I want to rank up.&quot;
                  Specific.
                  <br />
                  <br />
                  Examples: positioning, rotation, mechanical
                  inconsistency, tilt, double commits, challenge timing.
                  <br />
                  <br />
                  Knowing this upfront helps your rep figure out which of
                  our coaches is the right specialist for what you&apos;re
                  working on.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ── CLOSING — short, warm, no defensive language ─────────────── */}
      {/* TODO (Luke): record a short welcome video and embed it above
          this section. Page is intentionally light on copy so the video
          can carry most of the framing once it's in. */}
      <section className="border-t border-white/10 bg-black/20 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Good luck on your call.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            Your call will take place over Discord DM. We&apos;ll call you
            when it&apos;s time. Go check your Discord friend request now
            if you haven&apos;t already.
          </p>
          <p className="mt-5 text-base text-white/55">
            We&apos;re excited to meet you.
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

