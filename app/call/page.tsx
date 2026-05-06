import type { Metadata } from "next";
import { CallPageClient } from "./CallPageClient";

export const metadata: Metadata = {
  title: "VIP — RL Clubhouse",
  robots: { index: false, follow: false },
};

export default function CallPage() {
  return <CallPageClient />;
}
