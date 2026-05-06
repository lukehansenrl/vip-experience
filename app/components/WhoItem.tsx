type Props = {
  text: string;
};

export function WhoItem({ text }: Props) {
  return (
    <li className="flex items-start gap-4 text-lg">
      <span className="mt-1.5 h-4 w-4 flex-shrink-0 rounded border-2 border-[var(--accent)]" />
      {text}
    </li>
  );
}
