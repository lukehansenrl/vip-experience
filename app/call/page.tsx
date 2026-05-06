import type { Metadata } from "next";
import { CallPageClient } from "./CallPageClient";
import { fetchActiveMemberCount } from "../lib/whop";

export const metadata: Metadata = {
  title: "VIP | RL Clubhouse",
  robots: { index: false, follow: false },
};

// Revalidate the page hourly so the live Whop member count stays current
// without paying an API call on every request.
export const revalidate = 3600;

export default async function CallPage() {
  const spotsFilled = await fetchActiveMemberCount();
  return <CallPageClient spotsFilled={spotsFilled} />;
}
