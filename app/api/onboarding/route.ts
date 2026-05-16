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
    utm_source: submission.utms?.utm_source,
    utm_campaign: submission.utms?.utm_campaign,
    timestamp: new Date().toISOString(),
  });

  // Flatten UTM record into individual top-level fields so the live
  // Apps Script can map them to dedicated sheet columns without
  // changing the array-to-string conventions used for other fields.
  // Empty strings are fine — Apps Script writes a blank cell.
  const utms = submission.utms ?? {};

  // Forward to webhook if configured.
  const webhookUrl = process.env.ONBOARDING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submission,
          // Multi-select fields are arrays. Send them flattened to comma
          // text so Apps Script appendRow doesn't write a Java array ref
          // ("[Ljava.lang.Object;@..."). Also send the legacy singular
          // keys (server / biggestBlocker): the live Apps Script reads
          // those, and without them those columns write blank.
          servers: submission.servers?.join(", ") ?? "",
          server: submission.servers?.join(", ") ?? "",
          employment: submission.employment?.join(", ") ?? "",
          biggestBlockers: submission.biggestBlockers?.join(", ") ?? "",
          biggestBlocker: submission.biggestBlockers?.join(", ") ?? "",
          qualified: decision.qualified,
          clubhouseQualified: decision.clubhouseQualified,
          barred: decision.barred,
          // Keep reasons as an ARRAY: the live Apps Script joins it via
          // Array.isArray(...) ? join : "". A string here writes blank.
          reasons: decision.reasons,
          // Attribution — flat top-level fields for sheet columns.
          utm_source: utms.utm_source ?? "",
          utm_medium: utms.utm_medium ?? "",
          utm_campaign: utms.utm_campaign ?? "",
          utm_content: utms.utm_content ?? "",
          utm_term: utms.utm_term ?? "",
          fbclid: utms.fbclid ?? "",
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
