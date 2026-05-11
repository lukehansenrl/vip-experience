"use client";

/**
 * Auto-scrolling testimonial marquee, Healthy Gamer GG style.
 *
 * Merges video testimonials + text reviews into a single continuous scroll.
 * CSS-only animation, pauses on hover so users can actually read.
 * Respects prefers-reduced-motion via the .animate-scroll-x class in globals.css.
 */

import { Play, Star } from "lucide-react";
import { DiscordIcon } from "./DiscordIcon";
import type { VideoTestimonial, TextReview } from "../data/testimonials";

type Props = {
  videoTestimonials: VideoTestimonial[];
  textReviews: TextReview[];
};

// Color palette for text reviews (which don't carry a color field).
// Deterministic per-name so the same person always gets the same color.
const TEXT_REVIEW_COLORS = [
  "bg-violet-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-fuchsia-500",
  "bg-sky-500",
];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return TEXT_REVIEW_COLORS[Math.abs(hash) % TEXT_REVIEW_COLORS.length];
}

type UnifiedItem =
  | { kind: "video"; data: VideoTestimonial }
  | { kind: "text"; data: TextReview };

export function ScrollingTestimonials({
  videoTestimonials,
  textReviews,
}: Props) {
  const items: UnifiedItem[] = [
    ...videoTestimonials.map((d) => ({ kind: "video" as const, data: d })),
    ...textReviews.map((d) => ({ kind: "text" as const, data: d })),
  ];

  // Duplicate the items so the marquee can loop seamlessly without a visible
  // "jump" when one set finishes scrolling.
  const duplicated = [...items, ...items];

  return (
    <div className="relative overflow-hidden" aria-label="Member testimonials">
      {/* Gradient masks on both edges so cards fade in/out instead of clipping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b0e17] to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b0e17] to-transparent md:w-32" />

      <div className="animate-scroll-x flex gap-5 py-2 hover:[animation-play-state:paused]">
        {duplicated.map((item, idx) => (
          <TestimonialCard
            key={`${item.data.name}-${idx}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: UnifiedItem }) {
  const isVideo = item.kind === "video";
  const data = item.data;
  const color = isVideo
    ? (data as VideoTestimonial).color
    : colorForName(data.name);

  const quote = isVideo
    ? (data as VideoTestimonial).quote
    : (data as TextReview).text;

  // Cap card width so the marquee feels uniform and quotes don't overflow
  return (
    <div className="flex w-[320px] flex-shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--accent)]/40 md:w-[360px]">
      {/* Header — avatar + name + rank/handle */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${color} text-sm font-bold text-white`}
        >
          {data.initials}
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 truncate font-bold text-white">
            <DiscordIcon className="h-3.5 w-3.5 flex-shrink-0 text-[#5865F2]" />
            <span className="truncate">{data.name}</span>
          </p>
          <p className="truncate text-xs font-semibold text-[var(--accent)]">
            {isVideo
              ? (data as VideoTestimonial).rank
              : (data as TextReview).daysAfter}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="flex-1 text-base leading-relaxed text-white/80">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Footer — coach notes (video only) or watch link */}
      {isVideo && (data as VideoTestimonial).coachNotes && (
        <p className="mt-3 text-xs text-white/30">
          Coached on: {(data as VideoTestimonial).coachNotes}
        </p>
      )}

      {isVideo && (
        <a
          href={(data as VideoTestimonial).vodUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/70 transition hover:border-[var(--accent)]/40 hover:text-white"
        >
          <Play className="h-4 w-4 text-[var(--accent)]" />
          Watch the coaching session
        </a>
      )}
    </div>
  );
}
