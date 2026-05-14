import { redirect } from "next/navigation";

// Legacy VIP-side onboarding form. Replaced with a redirect to the
// canonical Rocket League Clubhouse onboarding form on the Clubhouse
// repo so there's only one place to maintain the question schema, the
// qualification gates, and the form UX.
//
// Note: /onboarding/qualified and /onboarding/unqualified stay on this
// repo. They're used by the /vip flow (qualified submissions get the
// VSL gate + Calendly; disqualified submissions hit the unqualified
// page). Only the form route itself redirects.
//
// Future: if we ever want a VIP-Pro-specific onboarding (different
// schema, different gates, different copy than the RLC entry form),
// this is the right place to bring it back. Replace this redirect with
// the new form component. The /onboarding/qualified and
// /onboarding/unqualified routes are ready to receive its submissions.
export default function OnboardingPage() {
  redirect("https://rl-clubhouse.vercel.app/onboarding");
}
