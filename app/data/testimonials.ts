export type VideoTestimonial = {
  name: string;
  rank: string;
  quote: string;
  vodTitle: string;
  vodUrl: string;
  coachNotes: string;
  initials: string;
  color: string;
};

export type TextReview = {
  name: string;
  handle: string;
  stars: number;
  text: string;
  daysAfter: string;
  initials: string;
};

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Xeneson",
    rank: "Champ 2 | 1020 → 1136 MMR",
    quote:
      "Went from averaging 1020mmr to 1136 in 2 weeks. The 1on1 sessions helped really well with that. Mods and the community are super friendly and helpful.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://youtu.be/S-4A0eBTnLY",
    coachNotes: "Air dribbles, flip resets, 2nd man positioning",
    initials: "XE",
    color: "bg-orange-500",
  },
  {
    name: "BouncyBaka",
    rank: "GC2",
    quote:
      "It changed the way I view my rocket league gameplay and opened my eyes to all the little mistakes I was making. I started reviewing my replays using the info I learned.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://www.youtube.com/@SpookyLukeCoaching",
    coachNotes: "Control to wall, wheel touches, 2nd man positioning",
    initials: "BB",
    color: "bg-purple-500",
  },
  {
    name: "Fxcz",
    rank: "Plat 1",
    quote:
      "After my 1on1 session with one of the coaches I already saw improvement and things I haven't seen in YouTube videos to do. A lot of great tips.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://youtu.be/xw1ynmYGv38",
    coachNotes: "Wall control, air roll adjustments, shooting",
    initials: "FZ",
    color: "bg-teal-500",
  },
  {
    name: "Dami",
    rank: "GC1 → GC2 div 3",
    quote:
      "After a month of being a member I am now GC2 div 3. The different coaches each have their own way of coaching and finding the right one for you is gonna make you progress really fast.",
    vodTitle: "1:1 Coaching Session with Torment",
    vodUrl: "https://youtu.be/kNQINWPFpkU",
    coachNotes: "50/50 control, 2nd man patience, decision-making",
    initials: "DR",
    color: "bg-red-500",
  },
  {
    name: "deadshot8885",
    rank: "Champ 1 → Champ 3 div 3",
    quote:
      "I joined when I was C1. From the reviews from SpookyLuke and the training packs from Torment, I managed to improve a lot. I have reached C3 div 3, almost GC. Really worth all the time and money.",
    vodTitle: "SpookyLuke Coaching Champ 1",
    vodUrl: "https://youtu.be/W_9V9k_k4Cc",
    coachNotes: "Replay reviews, training packs, consistency",
    initials: "DS",
    color: "bg-amber-500",
  },
  {
    name: "Crayons",
    rank: "Diamond 1 → Diamond 2",
    quote:
      "Coaching helped so much went from low D1 to high D2 in just 2 days. The fastest I've ever ranked up.",
    vodTitle: "SpookyLuke Coaching Diamond 3 2v2 | MMR 987",
    vodUrl: "https://www.youtube.com/@SpookyLukeCoaching",
    coachNotes: "Mechanics & decision-making",
    initials: "CR",
    color: "bg-blue-500",
  },
];

export const TEXT_REVIEWS: TextReview[] = [
  {
    name: "Xeneson",
    handle: "@xenesonn",
    stars: 5,
    text: "Went from averaging 1020mmr to 1136 in 2 weeks. The 1on1 sessions helped really well with that. Mods and the community are super friendly and helpful with improving and solving problems.",
    daysAfter: "21 days after purchase",
    initials: "XE",
  },
  {
    name: "Snizz._",
    handle: "@snizz",
    stars: 5,
    text: "Started at C3. With the help of 1:1 with Torment and joining one of Luke's events I gained super valuable knowledge. I am now GC. The 1:1 with a pro player is literally worth the entire price.",
    daysAfter: "13 days after purchase",
    initials: "SN",
  },
  {
    name: "Kevin",
    handle: "@breffordk",
    stars: 5,
    text: "Being one on one with coaching was amazing, got a chance to see how it's played from a pro perspective. Went from Plat 1 to Plat 2 within like a week.",
    daysAfter: "16 days after purchase",
    initials: "KE",
  },
  {
    name: "rosenberggabriel",
    handle: "@rosenberggabriel",
    stars: 5,
    text: "Absolutely amazing. I have improved so much in a month span. I truly recommend this to all who need the help.",
    daysAfter: "13 days after purchase",
    initials: "RO",
  },
  {
    name: "Swiftdriver010",
    handle: "@swiftdriver",
    stars: 5,
    text: "I was Plat 1 just a couple weeks ago, now I'm up to Diamond 1. The 1on1 coaching helped me a lot. That alone was worth it.",
    daysAfter: "21 days after purchase",
    initials: "SW",
  },
];
