/**
 * POST /api/whop-webhook
 *
 * Receives Whop webhook events. The one we care about is
 * `membership.went_valid` — fires when a VIP membership starts being
 * paid for, i.e. a $497 sale closed. We fire Meta's `Purchase` event
 * via CAPI so Meta can attribute the close back to the ad that drove
 * the lead.
 *
 * Setup (Luke does this in Whop dashboard):
 *   1. Whop → developer → webhooks → create new webhook
 *   2. URL: https://vip-experience.vercel.app/api/whop-webhook
 *   3. Events: at minimum `membership.went_valid`
 *      (also subscribe to `membership.cancel_at_period_end_changed`
 *      for future churn tracking — we just no-op those for now)
 *   4. Copy the webhook signing secret into Vercel env vars as
 *      WHOP_WEBHOOK_SECRET
 *
 * Security: every webhook is HMAC-SHA256 signed. We verify the
 * signature header before processing. If env var is missing or
 * signature doesn't match, return 401.
 */

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { sendCapiEvent } from "../../lib/meta-capi";

// Whop's webhook signature header. Sometimes documented as
// `x-whop-signature`, sometimes as `whop-signature`. Check both to be
// resilient to either version.
const SIG_HEADERS = ["x-whop-signature", "whop-signature"];

// Whop product ID for VIP — only fire Purchase events for memberships
// of THIS product. Avoids the Clubhouse $27 product polluting our VIP
// pixel data.
function getVipProductId(): string | undefined {
  // First try a VIP-specific env var (preferred — explicit), fall back
  // to the general WHOP_PRODUCT_ID (which the rest of the app uses).
  return process.env.WHOP_VIP_PRODUCT_ID ?? process.env.WHOP_PRODUCT_ID;
}

type WhopMembership = {
  id: string;
  product_id?: string;
  user_id?: string;
  user?: { email?: string };
  plan_id?: string;
  // Whop's API returns prices in cents and as strings. Be defensive.
  initial_price?: number | string | null;
  // From Whop's webhook payload — present on membership events.
  email?: string;
};

type WhopWebhookPayload = {
  action?: string; // e.g. "membership.went_valid"
  data?: WhopMembership;
};

/**
 * Constant-time signature verification. Whop's signature header is the
 * raw HMAC-SHA256 hex digest of the request body, signed with the
 * webhook secret.
 */
function verifyWhopSignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const provided = signature.trim();
  // timingSafeEqual throws if buffer lengths differ — catch that as a fail
  // rather than a 500.
  if (expected.length !== provided.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(provided, "utf8"),
    );
  } catch {
    return false;
  }
}

/**
 * Coerce Whop's price (cents, possibly string) to dollars as a number.
 * Returns undefined if we can't parse a sensible value — we'd rather
 * skip the value field than send Meta a garbage $0.00 purchase.
 */
function priceCentsToDollars(price: number | string | null | undefined): number | undefined {
  if (price === null || price === undefined) return undefined;
  const cents = typeof price === "string" ? Number(price) : price;
  if (!Number.isFinite(cents) || cents <= 0) return undefined;
  return cents / 100;
}

export async function POST(req: Request) {
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[whop-webhook] missing WHOP_WEBHOOK_SECRET env var");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  // Read the raw body for signature verification BEFORE JSON-parsing.
  // Parsing then re-stringifying changes whitespace and breaks the HMAC.
  const rawBody = await req.text();

  // Find the signature header (Whop has used both names historically).
  let signature: string | undefined;
  for (const name of SIG_HEADERS) {
    const v = req.headers.get(name);
    if (v) {
      signature = v;
      break;
    }
  }
  if (!signature) {
    console.warn("[whop-webhook] no signature header — rejecting");
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  if (!verifyWhopSignature(rawBody, signature, secret)) {
    console.warn("[whop-webhook] bad signature — rejecting");
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  let payload: WhopWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WhopWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const action = payload.action ?? "";
  const membership = payload.data;

  // We only act on `membership.went_valid`. Other actions get a 200 so
  // Whop doesn't retry them — we just don't fire a Purchase for them.
  if (action !== "membership.went_valid" || !membership) {
    console.log("[whop-webhook] ignoring action", action);
    return NextResponse.json({ ok: true, ignored: action });
  }

  // Product filter: only fire Purchase for VIP product memberships.
  // Clubhouse ($27/mo) sales should NOT pollute our VIP attribution.
  const vipProductId = getVipProductId();
  if (vipProductId && membership.product_id && membership.product_id !== vipProductId) {
    console.log("[whop-webhook] ignoring non-VIP product", membership.product_id);
    return NextResponse.json({ ok: true, ignored: "wrong product" });
  }

  const value = priceCentsToDollars(membership.initial_price);
  const email = membership.email ?? membership.user?.email;

  // Use Whop's membership ID as the Meta event_id so retries from Whop
  // (delivery retries on a slow response, network issues, etc.) de-dupe
  // cleanly. Meta de-dupes by event_id within ~7 days.
  const eventId = `whop_purchase_${membership.id}`;

  void sendCapiEvent({
    event_name: "Purchase",
    event_id: eventId,
    event_source_url: "https://vip-experience.vercel.app/vip",
    action_source: "website",
    user_data: { email, externalId: membership.user_id },
    custom_data: {
      value,
      currency: "USD",
      content_name: "VIP Experience",
      content_category: "high-ticket-coaching",
      content_ids: membership.product_id ? [membership.product_id] : undefined,
      whop_membership_id: membership.id,
      whop_plan_id: membership.plan_id,
    },
  });

  console.log("[whop-webhook] fired Purchase", { membership_id: membership.id, value, email: !!email });
  return NextResponse.json({ ok: true });
}
