"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { HormoziPlayer } from "../components/HormoziPlayer";
import { VipBrandNav } from "../components/VipBrandNav";
import { ScrollingTestimonials } from "../components/ScrollingTestimonials";
import { VIDEO_TESTIMONIALS, TEXT_REVIEWS } from "../data/testimonials";
import {
  AGES,
  COUNTRIES,
  SERVERS,
  EMPLOYMENT,
  RANKS,
  PLATFORMS,
  BUDGET,
  PLAYER_TYPE,
  BIGGEST_BLOCKER,
  type OnboardingSubmission,
} from "../lib/onboarding";

// Calendly URL for the VIP application booking. The form on this page
// collects all the qualification info BEFORE Calendly opens, and the
// /api/onboarding endpoint forwards the data to the webhook (Zapier)
// before redirecting the user here. Calendly is prefilled with name and
// email via URL params so the prospect doesn't re-enter what they just
// typed into the form. Uses the same Calendly event as /call now that
// the form has eliminated the need for a separate Calendly-side
// qualification flow (previously planned as "Event B").
const CALENDLY_URL = "https://calendly.com/rlclubhouse/vip-onboarding";

// VSL file lives in /public. Same asset used on /onboarding/qualified.
const VSL_SRC = "/vsl.mp4";

// CTA stays locked until the viewer has watched this many seconds of the
// VSL (real playback time, pausing pauses the gate). Matches the
// /onboarding/qualified gate so the audiences experience the same pacing.
const VSL_LOCK_SECONDS = 15;

// TODO: wire this to the Whop helper (fetchActiveMemberCount) once the
// new $497 product ID is set in WHOP_PRODUCT_ID. For now, hardcoded to
// match what /call shows (server-rendered there).
const FOUNDING_SPOTS_TOTAL = 60;
const FOUNDING_SPOTS_FILLED = 47;
const FOUNDING_SPOTS_LEFT = FOUNDING_SPOTS_TOTAL - FOUNDING_SPOTS_FILLED;

export default function VipPage() {
  const router = useRouter();
  const [playbackTime, setPlaybackTime] = useState(0);
  const [form, setForm] = useState<Partial<OnboardingSubmission>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const unlocked = playbackTime >= VSL_LOCK_SECONDS;
  const secondsLeft = Math.max(0, Math.ceil(VSL_LOCK_SECONDS - playbackTime));

  const isComplete =
    !!form.discord &&
    !!form.email &&
    !!form.age &&
    !!form.country &&
    (form.servers?.length ?? 0) > 0 &&
    (form.employment?.length ?? 0) > 0 &&
    !!form.rank &&
    !!form.platform &&
    !!form.budget &&
    !!form.playerType &&
    (form.biggestBlockers?.length ?? 0) > 0;

  function update<K extends keyof OnboardingSubmission>(
    key: K,
    value: OnboardingSubmission[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Toggle a value in/out of a multi-select array field.
  function toggleMulti<K extends "servers" | "employment" | "biggestBlockers">(
    key: K,
    value: OnboardingSubmission[K][number],
  ) {
    setForm((f) => {
      const current = (f[key] ?? []) as OnboardingSubmission[K][number][];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...f, [key]: next as OnboardingSubmission[K] };
    });
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // After a successful qualified submission, the Calendly section
  // mounts. Wait a tick for the DOM, then scroll to it.
  useEffect(() => {
    if (formSubmitted) {
      const t = setTimeout(() => {
        calendlyRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [formSubmitted]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!isComplete) {
      setFormError("Please answer every question before submitting.");
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
          setFormError(
            data.error ?? "Something went wrong. Please try again.",
          );
          return;
        }
        const data = (await res.json()) as {
          qualified: boolean;
          redirectUrl: string;
        };
        if (data.qualified) {
          // Qualified: reveal the inline Calendly section on this page.
          // (Skip the /onboarding/qualified VSL gate since this audience
          // already watched the /vip VSL.)
          setFormSubmitted(true);
        } else {
          // Disqualified: route to the same unqualified page used by the
          // RLC onboarding form.
          router.push(data.redirectUrl);
        }
      } catch {
        setFormError("Network error. Please try again.");
      }
    });
  }

  // Calendly URL prefilled with the name and email captured by the form,
  // so the prospect doesn't have to type them again.
  const calendlySrc = formSubmitted
    ? `${CALENDLY_URL}?name=${encodeURIComponent(form.discord ?? "")}&email=${encodeURIComponent(form.email ?? "")}`
    : CALENDLY_URL;

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

      {/* ── SECTION 1: SPOTS CHIP + HERO + VSL ──────────────────────────── */}
      <section className="px-6 pt-10 pb-14 text-center md:pt-14">
        <div className="mx-auto max-w-3xl">
          {/* Live spots chip. Same data shape as /call so the two pages
              read consistently if a prospect cross-checks. */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/15 px-5 py-2 ring-1 ring-[var(--accent)]/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-white/90">
              {FOUNDING_SPOTS_FILLED} of {FOUNDING_SPOTS_TOTAL} founding
              spots filled · {FOUNDING_SPOTS_LEFT} left
            </p>
          </div>

          {/* Headline. Verbatim from /call so email-clickers see the same
              promise they were sold on. */}
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-5xl">
            Rank up in 6 weeks.
            <br />
            Or we coach you free until you do.
          </h1>

          {/* Subheadline. Same line from /call. */}
          <p className="mx-auto mt-5 max-w-xl text-base text-white/65 md:text-lg">
            1-on-1 with a pro coach, a personalized 6-week plan, and a
            guarantee most coaches won&apos;t make.
          </p>

          {/* Capacity scarcity. Always-on, real (60-client team cap). */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/50 md:text-base">
            Our team can only work with 60 private clients at any given
            time. Watch this video if you want to be one.
          </p>

          {/* Down chevron. Scroll cue to the video. */}
          <div
            className="mx-auto mt-6 text-[var(--accent)]"
            aria-hidden="true"
          >
            <svg
              className="mx-auto h-8 w-8 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── VSL BLOCK ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-4xl">
          <HormoziPlayer
            src={VSL_SRC}
            onPlaybackTimeChange={setPlaybackTime}
          />

          {/* Single CTA. Call-only funnel, no bypass to direct buy.
              Locked until the VSL gate releases. After form submission,
              relabels to "Pick a time" and scrolls to Calendly. */}
          <div className="mx-auto mt-10 flex max-w-xl justify-center">
            <button
              type="button"
              onClick={() =>
                formSubmitted
                  ? calendlyRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  : scrollToForm()
              }
              disabled={!unlocked}
              className="w-full rounded-full bg-[var(--accent)] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 disabled:shadow-none sm:w-auto"
            >
              {!unlocked
                ? `Apply for a Call in ${secondsLeft}s`
                : formSubmitted
                  ? "Pick a time →"
                  : "Apply for a Call →"}
            </button>
          </div>
        </div>

        {/* Scrolling testimonial marquee. Same component used on /call and
            /onboarding form. Sits just below the CTA to reinforce social
            proof while the VSL timer is still counting down or the prospect
            is hesitating before clicking Apply. Always-visible (no gate).
            showVodLink={false} keeps prospects on the page (no outbound
            YouTube clicks) since the goal here is to convert to a call,
            not to drive video watch time. */}
        <div className="mx-auto mt-14 max-w-6xl">
          <ScrollingTestimonials
            videoTestimonials={VIDEO_TESTIMONIALS}
            textReviews={TEXT_REVIEWS}
            showVodLink={false}
          />
        </div>
      </section>

      {/* ── SECTION 2: APPLICATION FORM ─────────────────────────────────
          Hidden until the VSL gate releases. Also hidden after a
          successful qualified submission (Calendly takes its place). */}
      {unlocked && !formSubmitted ? (
        <section
          ref={formRef}
          className="border-t border-white/10 bg-white/[0.02] px-6 py-16"
        >
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Step 1 of 2 · Application
            </p>
            <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl leading-tight tracking-tight md:text-4xl">
              Tell us about you.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-white/65">
              Takes about 60 seconds. Helps your coach prep before the call.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-12">
              <FormBlock number={1} label="What is your Discord username?">
                <input
                  type="text"
                  value={form.discord ?? ""}
                  onChange={(e) => update("discord", e.target.value)}
                  placeholder="example: legend123"
                  className={inputClass}
                  required
                />
                <p className="mt-2 text-xs leading-relaxed text-white/50">
                  Open Discord → click your profile → copy the username under
                  your display name.
                </p>
              </FormBlock>

              <FormBlock number={2} label="What's your email?">
                <input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Email"
                  className={inputClass}
                  required
                />
              </FormBlock>

              <FormBlock number={3} label="How old are you?">
                <RadioGroup
                  name="age"
                  options={[...AGES]}
                  value={form.age}
                  onChange={(v) =>
                    update("age", v as OnboardingSubmission["age"])
                  }
                  columns={3}
                />
              </FormBlock>

              <FormBlock number={4} label="Where are you based?">
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

              <FormBlock
                number={5}
                label="Which Rocket League servers do you play on? (Select all that apply)"
              >
                <CheckboxGroup
                  name="servers"
                  options={[...SERVERS]}
                  value={form.servers ?? []}
                  onToggle={(v) =>
                    toggleMulti(
                      "servers",
                      v as OnboardingSubmission["servers"][number],
                    )
                  }
                  columns={3}
                />
              </FormBlock>

              <FormBlock
                number={6}
                label="What's your current employment status? (Select all that apply)"
              >
                <CheckboxGroup
                  name="employment"
                  options={[...EMPLOYMENT]}
                  value={form.employment ?? []}
                  onToggle={(v) =>
                    toggleMulti(
                      "employment",
                      v as OnboardingSubmission["employment"][number],
                    )
                  }
                  columns={2}
                />
              </FormBlock>

              <FormBlock number={7} label="What's your current rank?">
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

              <FormBlock number={8} label="What platform do you play on?">
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

              <FormBlock
                number={9}
                label="What's your annual budget for improving at Rocket League? (Coaching, gear, training tools, etc.)"
              >
                <p className="mb-3 text-sm leading-relaxed text-white/55">
                  There are levels to coaching. One-off sessions from
                  random players are cheap and easy to find. Full ongoing
                  work with pros (personalized plans, weekly review, the
                  whole experience) is a real investment. Pick the level
                  that&apos;s actually true for you, and we&apos;ll route
                  you accordingly.
                </p>
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

              <FormBlock
                number={10}
                label="Which of these matches you better?"
              >
                <RadioGroup
                  name="playerType"
                  options={[...PLAYER_TYPE]}
                  value={form.playerType}
                  onChange={(v) =>
                    update(
                      "playerType",
                      v as OnboardingSubmission["playerType"],
                    )
                  }
                />
              </FormBlock>

              <FormBlock
                number={11}
                label="What's holding you back right now? (Select all that apply)"
              >
                <CheckboxGroup
                  name="biggestBlockers"
                  options={[...BIGGEST_BLOCKER]}
                  value={form.biggestBlockers ?? []}
                  onToggle={(v) =>
                    toggleMulti(
                      "biggestBlockers",
                      v as OnboardingSubmission["biggestBlockers"][number],
                    )
                  }
                  columns={2}
                />
              </FormBlock>

              {formError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-300">
                  {formError}
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
                  Takes about 60 seconds. We&apos;ll show you the
                  scheduler next.
                </p>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      {/* ── SECTION 3: BOOKING WIDGET ─────────────────────────────────
          Only renders after a successful qualified form submission.
          Disqualified submissions get routed away to
          /onboarding/unqualified before they reach this section. */}
      {formSubmitted ? (
        <section
          ref={calendlyRef}
          className="border-t border-white/10 bg-white/[0.02] px-6 py-16"
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Step 2 · pick a time
            </p>
            <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl leading-tight tracking-tight md:text-4xl">
              Book a 45-minute call with our team.
            </h2>

            {/* Reassurance note. Match the /onboarding/qualified pattern. */}
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center text-base text-white/75">
              <span className="font-semibold text-white">
                Even if VIP isn&apos;t a fit
              </span>
              , you&apos;ll leave the call with clear direction on exactly
              what to work on next.
            </div>

            {/* Inline Calendly embed, prefilled with form name and email. */}
            <div className="mx-auto mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
              <iframe
                src={calendlySrc}
                width="100%"
                height="780"
                frameBorder={0}
                title="Book a VIP application call"
                className="block"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

// ── FORM PRIMITIVES ─────────────────────────────────────────────────────
// Duplicated from app/onboarding/page.tsx. /vip and /onboarding maintain
// separate copies for now; if /onboarding gets a real maintenance pass,
// extract these to app/components/OnboardingFormParts.tsx.

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

// Multi-select counterpart to RadioGroup. Same visual treatment so the
// form reads as one cohesive style; only the toggle behavior differs.
function CheckboxGroup({
  name,
  options,
  value,
  onToggle,
  columns = 1,
}: {
  name: string;
  options: string[];
  value: string[];
  onToggle: (v: string) => void;
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
        const selected = value.includes(opt);
        return (
          <label key={opt} className={radioLabelClass(selected)}>
            <input
              type="checkbox"
              name={name}
              checked={selected}
              onChange={() => onToggle(opt)}
              className="sr-only"
            />
            <span>{opt}</span>
          </label>
        );
      })}
    </div>
  );
}
