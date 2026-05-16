/**
 * POST /api/calendly-webhook
 *
 * Receives Calendly webhook events. We act on `invitee.created` (someone
 * just booked a call) and fire Meta's `Schedule` event via CAPI.
 *
 * This is the second-most-important conversion event after Purchase. Many
 * high-ticket coaching funnels optimize Meta directly on Schedule, since
 * Purchase volume is too low for the algorithm to learn from.
 *
 * Setup (Luke does this in Calendly dashboard):
 *   1. Calendly → Integrations → Webhooks → Create webhook
 *   2. URL: https://vip-experience.vercel.app/api/calendly-webhook
 *   3. Events: at minimum `invitee.created`
 *      (also `invitee.canceled` if we want to track no-shows later)
 *   4. Calendly will display a signing key — paste into Vercel env vars
 *      as CALENDLY_WEBHOOK_SECRET
 *
 * Security: Calendly signs every webhook with HMAC-SHA256 in the
 * `Calendly-Webhook-Signature` header. Format: `t=<timestamp>,v1=<sig>`.
 * We compute HMAC over `<timestamp>.<rawBody>` with the signing secret
 * and constant-time compare against the v1 value.
 */

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { sendCapiEvent } from "../../lib/meta-capi";

// Tolerate clock drift up to 5 minutes between Calendly's servers and
// ours. Anything older is rejected as a replay-attack guard.
const REPLAY_WINDOW_SECONDS = 5 * 60;

type CalendlyInvitee = {
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  // The URL of the event the invitee is attending — useful for
  // distinguishing the VIP booking event from any other Calendly events
  // we might run in the future.
  event?: string;
};

type CalendlyPayload = {
  event?: string; // e.g. "invitee.created"
  // Calendly v2 webhook payloads put the invitee data under `payload`.
  payload?: CalendlyInvitee;
};

/**
 * Calendly's signature header looks like:
 *   t=1737037200,v1=abcdef0123...
 *
 * We split on commas, then on `=`, build a map, then HMAC over
 * `<t>.<rawBody>` and compare against `v1`. Constant-time equality.
 */
function verifyCalendlySignature(
  rawBody: string,
  header: string,
  secret: string,
): boolean {
  const parts: Record<string, string> = {};
  for (const piece of header.split(",")) {
    const [k, v] = piece.split("=", 2);
    if (k && v) parts[k.trim()] = v.trim();
  }
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;

  // Replay-attack guard. Calendly's `t` is a unix-seconds timestamp.
  const ts = Number(t);
  if (!Number.isFinite(ts)) return false;
  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - ts);
  if (ageSeconds > REPLAY_WINDOW_SECONDS) {
    console.warn("[calendly-webhook] timestamp outside replay window", { ageSeconds });
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${rawBody}`)
    .digest("hex");

  if (expected.length !== v1.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(v1, "utf8"),
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[calendly-webhook] missing CALENDLY_WEBHOOK_SECRET env var");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const rawBody = await req.text();
  const sigHeader = req.headers.get("calendly-webhook-signature");
  if (!sigHeader) {
    console.warn("[calendly-webhook] missing signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  if (!verifyCalendlySignature(rawBody, sigHeader, secret)) {
    console.warn("[calendly-webhook] bad signature — rejecting");
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  let payload: CalendlyPayload;
  try {
    payload = JSON.parse(rawBody) as CalendlyPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // We act on invitee.created only. Cancellations could fire a separate
  // event later (e.g., to subtract from custom audiences) but for now
  // we just want the booking signal.
  if (payload.event !== "invitee.created" || !payload.payload) {
    return NextResponse.json({ ok: true, ignored: payload.event ?? "no-event" });
  }

  const invitee = payload.payload;
  // Calendly may give us either `name` (full) or `first_name`/`last_name`.
  // Pass both up — meta-capi.ts hashes whichever are present.
  const firstName =
    invitee.first_name ?? invitee.name?.split(/\s+/)[0];
  const lastName =
    invitee.last_name ?? invitee.name?.split(/\s+/).slice(1).join(" ") || undefined;

  // Use the Calendly event URL as the dedup key when present. This is
  // a per-booking unique URI; Calendly retries will repeat it and Meta
  // de-dupes by event_id within ~7 days.
  const eventId = invitee.event
    ? `calendly_${invitee.event.split("/").pop()}`
    : `calendly_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;

  void sendCapiEvent({
    event_name: "Schedule",
    event_id: eventId,
    event_source_url: "https://vip-experience.vercel.app/vip",
    action_source: "website",
    user_data: {
      email: invitee.email,
      firstName,
      lastName,
    },
    custom_data: {
      content_name: "VIP application call booked",
      content_category: "high-ticket-coaching",
      calendly_event_uri: invitee.event,
    },
  });

  console.log("[calendly-webhook] fired Schedule", {
    event_id: eventId,
    has_email: !!invitee.email,
  });
  return NextResponse.json({ ok: true });
}
