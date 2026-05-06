type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function IncludeCard({ icon, title, description }: Props) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[var(--accent)]/40">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold md:text-xl">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-white/70 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
