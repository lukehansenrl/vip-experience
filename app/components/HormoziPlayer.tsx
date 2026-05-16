"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hormozi-style locked-down VSL player.
 *
 * Behaviors that mirror acquisition.com's scaling-roadmap thank-you page:
 *  • Autoplays muted on mount (browsers require autoplay to be muted).
 *  • Big "Click to Unmute" overlay until the viewer clicks for the first
 *    time; after that, click toggles play/pause.
 *  • Progress bar tracks actual playback time linearly by default. A
 *    non-linear `progressCurve` prop is available if a page wants the
 *    Hormozi-style "fake progress" trick (sqrt = bar fills fast early so
 *    the video looks almost done), but it's opt-in — the honest default
 *    avoids confusing viewers who see "almost done" but still hit a CTA
 *    gate, and matches the user's stated preference.
 *  • Forward seeking is impossible — there's no draggable scrubber and the
 *    native controls are hidden. The only way back is the explicit 10-second
 *    rewind button.
 *  • Calls `onPlaybackTimeChange` on every timeupdate so the parent page
 *    can gate a CTA on actual watch time (vs wall-clock seconds).
 *
 * Caveat: native browser keyboard shortcuts (arrow keys, J/L, etc.) can
 * still seek if the video has focus. The component does NOT trap key events
 * — the assumption is the viewer is using mouse/tap, not keyboard. If we
 * see analytics evidence of keyboard-skipping, we can add a `seeking` event
 * handler that snaps currentTime back.
 */

type Props = {
  src: string;
  /** Optional poster image shown until first frame loads. */
  poster?: string;
  /** Called on every timeupdate with the current playback time in seconds. */
  onPlaybackTimeChange?: (seconds: number) => void;
  /** Optional non-linear progress curve. 1.0 = linear (default, honest
   *  tracking of playback time). Lower values fill the bar faster early
   *  (0.5 = sqrt, Hormozi-style fake-progress). Opt in per page. */
  progressCurve?: number;
};

export function HormoziPlayer({
  src,
  poster,
  onPlaybackTimeChange,
  progressCurve = 1,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Try to autoplay (muted) on mount.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // Some browsers block autoplay even when muted. Fine — the click
      // overlay will start playback on first interaction.
    });
  }, []);

  // Subscribe to playback events.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onPlaybackTimeChange?.(video.currentTime);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onMeta = () => setDuration(video.duration);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("loadedmetadata", onMeta);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [onPlaybackTimeChange]);

  function handleVideoClick() {
    const video = videoRef.current;
    if (!video) return;
    if (!hasUnmuted) {
      // First click: unmute and ensure playing.
      video.muted = false;
      setHasUnmuted(true);
      if (video.paused) video.play().catch(() => {});
      return;
    }
    // Subsequent clicks: toggle play/pause.
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  function rewindTen() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  }

  // Non-linear progress for the bar display.
  const actualProgress = duration > 0 ? currentTime / duration : 0;
  const displayProgress = Math.pow(actualProgress, progressCurve);
  const barWidthPercent = Math.min(100, Math.max(0, displayProgress * 100));

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-[var(--accent-glow)]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        onClick={handleVideoClick}
        // No `controls` attribute — we render our own.
      />

      {/* "Click to unmute" overlay — only shown before first click. */}
      {!hasUnmuted && (
        <button
          type="button"
          onClick={handleVideoClick}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/45 transition-opacity hover:bg-black/55"
          aria-label="Click to unmute and play"
        >
          <div className="rounded-full bg-white/15 p-6 ring-2 ring-white/30 backdrop-blur-sm">
            {/* Speaker-muted icon */}
            <svg
              className="h-16 w-16 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          </div>
          <p className="text-2xl font-bold tracking-tight text-white">
            Click to Unmute & Play
          </p>
        </button>
      )}

      {/* Pause indicator — small play icon center when paused after unmute. */}
      {hasUnmuted && !playing && (
        <button
          type="button"
          onClick={handleVideoClick}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
          aria-label="Play"
        >
          <div className="rounded-full bg-white/20 p-5 ring-2 ring-white/30 backdrop-blur-sm">
            <svg
              className="h-12 w-12 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Custom controls bar — bottom of the video. */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-4 pb-4">
        {/* Progress bar */}
        <div className="h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-out"
            style={{ width: `${barWidthPercent}%` }}
          />
        </div>
        {/* Controls row */}
        <div className="pointer-events-auto mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={rewindTen}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Rewind 10 seconds"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h10a8 8 0 1 1-7.9 9"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v6h6" />
            </svg>
            10s
          </button>
          {/* (No time display by design — preserves the fake-progress illusion.) */}
        </div>
      </div>
    </div>
  );
}
