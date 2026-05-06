export type ValueStackRow = {
  item: string;
  value: string;
  note?: string;
};

export const VALUE_STACK: ValueStackRow[] = [
  {
    item: "1x 1:1 Pro Coaching Call (60 min, live)",
    value: "$75 to $125",
    note: "Market rate for one live session with a pro coach",
  },
  {
    item: "1x Async Replay Review (30 min)",
    value: "$50 to $75",
    note: "Send your replays. Coach returns timestamps and corrections",
  },
  {
    item: "Personalized 30-Day Training Routine",
    value: "$25 to $50",
    note: "Custom routine built around your schedule and rank",
  },
  {
    item: "Accountability Check-ins",
    value: "$50 to $100",
    note: "Regular calls to keep you on track and adjust your training",
  },
  {
    item: "Full RL Clubhouse Membership",
    value: "$27",
    note: "15+ live events monthly, weekly classes, community access",
  },
];
