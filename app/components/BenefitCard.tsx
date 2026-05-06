type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function BenefitCard({ icon, title, description }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[var(--accent)]/40">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
    </div>
  );
}
