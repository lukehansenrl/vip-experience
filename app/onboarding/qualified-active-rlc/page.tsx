import { redirect } from "next/navigation";

// Legacy route. Was a separate qualified-flow variant for users
// already inside the paid Clubhouse, with different framing than the
// main /onboarding/qualified page. Luke deprecated the split: one
// qualified page for everyone regardless of whether they're already
// a Clubhouse member. This redirect keeps the old URL working in
// case the rl-clubhouse-onboarding form or any other surface still
// points here.
//
// To fully decommission: update the rl-clubhouse-onboarding repo's
// form redirect to point at /onboarding/qualified directly, then
// this file can be deleted.
export default function QualifiedActiveRlcPage() {
  redirect("/onboarding/qualified");
}
