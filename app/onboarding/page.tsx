"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { RatingBar } from "../components/RatingBar";
import { ScrollingTestimonials } from "../components/ScrollingTestimonials";
import { VIDEO_TESTIMONIALS, TEXT_REVIEWS } from "../data/testimonials";
import {
  AGES,
  COUNTRIES,
  EMPLOYMENT,
  RANKS,
  PLATFORMS,
  BUDGET,
  PLAYER_TYPE,
  BIGGEST_BLOCKER,
  type OnboardingSubmission,
} from "../lib/onboarding";

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen"
          style={{ backgroundColor: "#0b0e17" }}
        />
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}

function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Pre-fill from query params if Whop redirects with them.
  const initialEmail = searchParams.get("email") ?? "";
  const initialDiscord = searchParams.get("discord") ?? "";

  const [form, setForm] = useState<Partial<OnboardingSubmission>>({
    discord: initialDiscord,
    email: initialEmail,
  });

  const isComplete =
    !!form.discord &&
    !!form.email &&
    !!form.age &&
    !!form.country &&
    !!form.employment &&
    !!form.rank &&
    !!form.platform &&
    !!form.budget &&
    !!form.playerType &&
    !!form.biggestBlocker;

  function update<K extends keyof OnboardingSubmission>(
    key: K,
    value: OnboardingSubmission[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isComplete) {
      setError("Please answer every question before submitting.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Something went wrong. Please try again.");
          return;
        }
        const data = (await res.json()) as { redirectUrl: string };
        router.push(data.redirectUrl);
      } catch {
        setError("Network error. Please try again.");
      }
    });
  }

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

      {/* HERO — tightened, Hormozi-style "application" framing */}
      <section className="px-6 pt-12 pb-6 text-center md:pt-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Step 1 of 2 — Apply
          </p>
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            VIP Member Application
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">
            Could 1-on-1 coaching with a pro help you rank up faster? Apply
            in 60 seconds — we&apos;ll tell you if VIP is the right fit or
            point you to a better path.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 pb-24">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-12"
        >
          {/* Identity */}
          <FormBlock
            number={1}
            label="What's your Discord username and email?"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                value={form.discord ?? ""}
                onChange={(e) => update("discord", e.target.value)}
                placeholder="Discord username"
                className={inputClass}
                required
              />
              <input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Email"
                className={inputClass}
                required
              />
            </div>
          </FormBlock>

          {/* Age */}
          <FormBlock number={2} label="How old are you?">
            <RadioGroup
              name="age"
              options={[...AGES]}
              value={form.age}
              onChange={(v) => update("age", v as OnboardingSubmission["age"])}
            />
          </FormBlock>

          {/* Country */}
          <FormBlock number={3} label="Where are you based?">
            <select
              value={form.country ?? ""}
              onChange={(e) =>
                update(
                  "country",
                  e.target.value as OnboardingSubmission["country"],
                )
              }
              className={selectClass}
              required
            >
              <option value="" disabled>
                Select your country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormBlock>

          {/* Employment */}
          <FormBlock number={4} label="What's your current employment status?">
            <RadioGroup
              name="employment"
              options={[...EMPLOYMENT]}
              value={form.employment}
              onChange={(v) =>
                update("employment", v as OnboardingSubmission["employment"])
              }
              columns={2}
            />
          </FormBlock>

          {/* Rank */}
          <FormBlock number={5} label="What's your current rank?">
            <RadioGroup
              name="rank"
              options={[...RANKS]}
              value={form.rank}
              onChange={(v) =>
                update("rank", v as OnboardingSubmission["rank"])
              }
              columns={4}
            />
          </FormBlock>

          {/* Platform */}
          <FormBlock number={6} label="What platform do you play on?">
            <RadioGroup
              name="platform"
              options={[...PLATFORMS]}
              value={form.platform}
              onChange={(v) =>
                update("platform", v as OnboardingSubmission["platform"])
              }
              columns={4}
            />
          </FormBlock>

          {/* Budget — forward-looking, the financial gate */}
          <FormBlock
            number={7}
            label="If we recommended a path to improve fast — coaching, better gear, training tools — what's your budget for the next 12 months?"
          >
            <RadioGroup
              name="budget"
              options={[...BUDGET]}
              value={form.budget}
              onChange={(v) =>
                update("budget", v as OnboardingSubmission["budget"])
              }
              columns={3}
            />
          </FormBlock>

          {/* Player type — identity-based, replaces old Goal + Improvement Intent */}
          <FormBlock
            number={8}
            label="Which of these matches you better?"
          >
            <RadioGroup
              name="playerType"
              options={[...PLAYER_TYPE]}
              value={form.playerType}
              onChange={(v) =>
                update("playerType", v as OnboardingSubmission["playerType"])
              }
            />
          </FormBlock>

          {/* Biggest blocker — signal only, used by rep on the call */}
          <FormBlock
            number={9}
            label="What do you think is the SINGLE biggest thing holding you back right now?"
          >
            <RadioGroup
              name="biggestBlocker"
              options={[...BIGGEST_BLOCKER]}
              value={form.biggestBlocker}
              onChange={(v) =>
                update(
                  "biggestBlocker",
                  v as OnboardingSubmission["biggestBlocker"],
                )
              }
              columns={2}
            />
          </FormBlock>

          {/* Error + Submit */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={!isComplete || isPending}
              className="rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 disabled:shadow-none"
            >
              {isPending ? "Submitting..." : "Submit Application →"}
            </button>
            <p className="mt-3 text-xs text-white/40">
              Takes about 60 seconds. We&apos;ll tell you the right path
              instantly.
            </p>
          </div>
        </form>
      </section>

      {/* RESULTS STACK — Hormozi pattern: application above, social proof below */}
      <section className="border-t border-white/10 bg-black/20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Real members. Real rank-ups.
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight md:text-4xl">
              The most experienced coaching team in Rocket League.
            </h2>
          </div>

          {/* Rating summary — same component used on /call */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
              <div className="text-center">
                <p className="text-6xl font-black">5.0</p>
                <div className="mt-2 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-white/50">98 ratings</p>
              </div>
              <div className="w-full flex-1 space-y-2">
                <RatingBar stars={5} percent={95} count={93} />
                <RatingBar stars={4} percent={5} count={5} />
                <RatingBar stars={3} percent={0} count={0} />
                <RatingBar stars={2} percent={0} count={0} />
                <RatingBar stars={1} percent={0} count={0} />
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling testimonial marquee — same component used on /call */}
        <div className="mt-10">
          <ScrollingTestimonials
            videoTestimonials={VIDEO_TESTIMONIALS}
            textReviews={TEXT_REVIEWS}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

// ── FORM PRIMITIVES ─────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 transition focus:border-[var(--accent)] focus:outline-none";

const selectClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white transition focus:border-[var(--accent)] focus:outline-none appearance-none cursor-pointer";

function FormBlock({
  number,
  label,
  children,
}: {
  number: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-base font-semibold text-white">
        <span className="mr-2 text-[var(--accent)]">{number}.</span>
        <span>{label}</span>
      </p>
      {children}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  columns = 1,
}: {
  name: string;
  options: string[];
  value: string | undefined;
  onChange: (v: string) => void;
  columns?: number;
}) {
  const gridClass =
    columns === 5
      ? "grid gap-2 md:grid-cols-5"
      : columns === 4
        ? "grid gap-2 md:grid-cols-4"
        : columns === 3
          ? "grid gap-2 md:grid-cols-3"
          : columns === 2
            ? "grid gap-2 md:grid-cols-2"
            : "grid gap-2";
  return (
    <div className={gridClass}>
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <label key={opt} className={radioLabelClass(selected)}>
            <input
              type="radio"
              name={name}
              checked={selected}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            <span>{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function radioLabelClass(selected: boolean) {
  return [
    "cursor-pointer rounded-xl border px-4 py-3 text-sm transition select-none",
    selected
      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
      : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white",
  ].join(" ");
}

