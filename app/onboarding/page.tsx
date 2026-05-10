"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AGES,
  RANKS,
  HOURS,
  GOALS,
  TRIED_OPTIONS,
  SPENT,
  INTEREST,
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
    tried: [],
  });

  const isComplete =
    !!form.discord &&
    !!form.email &&
    !!form.age &&
    !!form.rank &&
    !!form.hours &&
    !!form.goal &&
    !!form.spent &&
    !!form.interest;

  function update<K extends keyof OnboardingSubmission>(
    key: K,
    value: OnboardingSubmission[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleTried(option: string) {
    setForm((f) => {
      const current = f.tried ?? [];
      return {
        ...f,
        tried: current.includes(option)
          ? current.filter((x) => x !== option)
          : [...current, option],
      };
    });
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

      {/* HERO */}
      <section className="px-6 pt-16 pb-8 text-center md:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Welcome to the Clubhouse
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Tell us a bit about you.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
            Quick 90-second survey so we can route you to the right onboarding.
            We&apos;ll get you into the server right after.
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

          {/* Rank */}
          <FormBlock number={3} label="What's your current rank?">
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

          {/* Hours */}
          <FormBlock
            number={4}
            label="How many hours per week do you typically play?"
          >
            <RadioGroup
              name="hours"
              options={[...HOURS]}
              value={form.hours}
              onChange={(v) =>
                update("hours", v as OnboardingSubmission["hours"])
              }
              columns={4}
            />
          </FormBlock>

          {/* Goal */}
          <FormBlock number={5} label="What's your goal for the next 90 days?">
            <RadioGroup
              name="goal"
              options={[...GOALS]}
              value={form.goal}
              onChange={(v) =>
                update("goal", v as OnboardingSubmission["goal"])
              }
            />
          </FormBlock>

          {/* Tried */}
          <FormBlock
            number={6}
            label="What have you already tried? (select all that apply)"
          >
            <div className="grid gap-2 md:grid-cols-2">
              {TRIED_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={checkboxLabelClass(form.tried?.includes(opt))}
                >
                  <input
                    type="checkbox"
                    checked={form.tried?.includes(opt) ?? false}
                    onChange={() => toggleTried(opt)}
                    className="sr-only"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </FormBlock>

          {/* Spent */}
          <FormBlock
            number={7}
            label="What's the most you've spent on a single online course, coaching service, or training program in the past year?"
          >
            <RadioGroup
              name="spent"
              options={[...SPENT]}
              value={form.spent}
              onChange={(v) =>
                update("spent", v as OnboardingSubmission["spent"])
              }
              columns={5}
            />
          </FormBlock>

          {/* Interest */}
          <FormBlock
            number={8}
            label="Are you open to hearing about 1-on-1 coaching options today?"
          >
            <RadioGroup
              name="interest"
              options={[...INTEREST]}
              value={form.interest}
              onChange={(v) =>
                update("interest", v as OnboardingSubmission["interest"])
              }
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
              {isPending ? "Submitting..." : "Continue →"}
            </button>
            <p className="mt-3 text-xs text-white/40">
              Takes about 90 seconds. Your access is unlocked right after.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

// ── FORM PRIMITIVES ─────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 transition focus:border-[var(--accent)] focus:outline-none";

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

function checkboxLabelClass(selected: boolean | undefined) {
  return [
    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition select-none",
    selected
      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
      : "border-white/15 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white",
  ].join(" ");
}
