import { Star } from "lucide-react";

type Props = {
  stars: number;
  percent: number;
  count: number;
};

export function RatingBar({ stars, percent, count }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-right text-sm font-semibold text-white/70">
        {stars}
        <Star className="ml-0.5 inline h-3 w-3 fill-yellow-400 text-yellow-400" />
      </span>
      <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-green-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-16 text-right text-xs text-white/40">
        {percent}% ({count})
      </span>
    </div>
  );
}
