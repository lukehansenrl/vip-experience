"use client";

export type NavLink = { label: string; href: string };

type CTA =
  | { label: string; onClick: () => void }
  | { label: string; href: string; external?: boolean };

type Props = {
  links?: NavLink[];
  cta?: CTA | null;
};

export function StickyNav({ links, cta }: Props) {
  const navLinks = links ?? [];

  const ctaClasses =
    "rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-[var(--accent-glow)]/40 transition hover:bg-[var(--accent-hover)]";

  return (
    <div className="sticky top-0 left-0 right-0 z-40">
      <div className="border-b border-white/10 bg-[#0b0e17]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-sm font-black tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>{" "}
            <span className="text-white/30">&middot;</span>{" "}
            <span className="text-white/50 text-xs font-semibold">VIP</span>
          </span>
          {navLinks.length > 0 && (
            <nav className="hidden items-center gap-1 sm:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          )}
          {cta &&
            ("onClick" in cta ? (
              <button
                type="button"
                onClick={cta.onClick}
                className={ctaClasses}
              >
                {cta.label} &rarr;
              </button>
            ) : (
              <a
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className={ctaClasses}
              >
                {cta.label} &rarr;
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
