import { NextResponse } from "next/server";
import {
  routeSubmission,
  validateSubmission,
  type OnboardingSubmission,
} from "../../lib/onboarding";

/**
 * POST /api/onboarding
 *
 * Receives a form submission, computes routing, optionally forwards
 * to a webhook (Zapier → Google Sheet, or Discord, etc), and returns
 * the redirect URL for the client to navigate to.
 *
 * Webhook is configured via env var: ONBOARDING_WEBHOOK_URL
 *   - If set: POST the full submission + routing decision to that URL.
 *   - If unset: just log to server console (fine for v1 / debugging).
 */

export async function POST(req: Request) {
  let body: Partial<OnboardingSubmission>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validateSubmission(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const submission = validated.data;
  const decision = routeSubmission(submission);

  // Log every submission server-side so they show up in Vercel logs.
  // Replace with proper observability later.
  console.log("[onboarding]", {
    discord: submission.discord,
    email: submission.email,
    qualified: decision.qualified,
    clubhouseQualified: decision.clubhouseQualified,
    barred: decision.barred,
    reasons: decision.reasons,
    timestamp: new Date().toISOString(),
  });

  // Forward to webhook if configured.
  const webhookUrl = process.env.ONBOARDING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submission,
          // servers / employment / biggestBlockers are multi-select
          // arrays. The downstream pipeline (Zapier -> Apps Script
          // appendRow) writes a raw array into a cell as a Java object
          // ref ("[Ljava.lang.Object;@..."), so flatten to comma text
          // for the Sheet. Routing already ran on the real arrays above.
          servers: submission.servers?.join(", ") ?? "",
          employment: submission.employment?.join(", ") ?? "",
          biggestBlockers: submission.biggestBlockers?.join(", ") ?? "",
          qualified: decision.qualified,
          clubhouseQualified: decision.clubhouseQualified,
          barred: decision.barred,
          reasons: decision.reasons.join(", "),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      // Don't fail the user's submission if the webhook is down.
      console.error("[onboarding] webhook failed:", err);
    }
  }

  // Three-way routing:
  //   VIP-qualified  → /qualified (Calendly path)
  //   Clubhouse-fit  → /clubhouse-qualified (paid Clubhouse 30-day trial)
  //   Everyone else  → /unqualified (under 18 or casual; free Discord only)
  const redirectUrl = decision.qualified
    ? "/onboarding/qualified"
    : decision.clubhouseQualified
      ? "/onboarding/clubhouse-qualified"
      : "/onboarding/unqualified";

  return NextResponse.json({
    qualified: decision.qualified,
    clubhouseQualified: decision.clubhouseQualified,
    redirectUrl,
  });
}
