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
      <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-white/75 md:text-lg">
        {description}
      </p>
    </div>
  );
}
