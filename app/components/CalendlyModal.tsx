"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  subtitle?: string;
};

export function CalendlyModal({
  open,
  onClose,
  url,
  title = "VIP Onboarding Call",
  subtitle = "Walk through the VIP Experience and get your questions answered",
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl border border-[var(--accent)]/30 bg-[#0b0e17] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              {title}
            </p>
            <p className="text-sm text-white/50">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white transition text-lg leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="h-[80vh] max-h-[720px] overflow-hidden bg-white">
          <iframe
            src={url}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a VIP onboarding call"
          />
        </div>
      </div>
    </div>
  );
}
