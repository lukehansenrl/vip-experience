/**
 * POST /api/whop-webhook
 *
 * Receives Whop webhook events. We fire Meta's `Purchase` event via
 * CAPI for VIP $497 sales. Whop fires multiple events per purchase
 * (payment_succeeded, membership_activated, invoice_paid). We listen
 * for the two most reliable money-in-the-door signals — payment_succeeded
 * (preferred — carries the dollar amount in `amount`) and
 * membership_activated (fallback — fires for one-time sales and renewals).
 *
 * Setup (Luke does this in Whop dashboard):
 *   1. Whop → developer → webhooks → create new webhook
 *   2. URL: https://vip-experience.vercel.app/api/whop-webhook
 *   3. Events: subscribe to BOTH `payment_succeeded` AND `membership_activated`
 *      (resilience — if one delivery fails, the other still fires)
 *   4. Copy the webhook signing secret into Vercel env vars as
 *      WHOP_WEBHOOK_SECRET
 *
 * Security: every webhook is HMAC-SHA256 signed. We verify the
 * signature header before processing. If env var is missing or
 * signature doesn't match, return 401.
 *
 * Dedup: Meta de-dupes via event_id within ~7 days. We use the
 * payment ID (or membership ID) as the event_id so multiple Whop
 * events for the same VIP purchase de-dupe to ONE Meta Purchase event.
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

// Whop sends two payload shapes depending on the event type. Membership
// events have one structure; payment events have another. We accept
// either via a permissive union — pull whichever fields are present.
type WhopWebhookData = {
  // Common identifiers — usually present on either shape.
  id: string;
  product_id?: string;
  user_id?: string;
  member_id?: string;
  plan_id?: string;
  // Email may come nested or top-level depending on event type.
  email?: string;
  user?: { email?: string };
  // Membership events expose price as `initial_price` (cents-as-string).
  initial_price?: number | string | null;
  // Payment events expose the dollar amount under `amount` (in cents).
  amount?: number | string | null;
  // Currency on payment events.
  currency?: string;
};

type WhopWebhookPayload = {
  action?: string;
  data?: WhopWebhookData;
};

// Events that signal a VIP purchase closed. payment_succeeded is the
// preferred signal (carries amount + currency); membership_activated is
// a fallback. We accept both with-dot and with-underscore separators
// since Whop's UI uses underscores but their docs occasionally use dots.
const PURCHASE_ACTIONS = new Set([
  "payment_succeeded",
  "payment.succeeded",
  "membership_activated",
  "membership.activated",
  // Legacy name — historical Whop API versions used this. Keep for
  // backwards compat in case the user is on an older API.
  "membership.went_valid",
  "membership_went_valid",
]);

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
  const data = payload.data;

  // Ignore everything that isn't one of our recognized purchase signals.
  // 200 the response so Whop doesn't retry — we just don't fire Meta
  // events for unrelated actions.
  if (!PURCHASE_ACTIONS.has(action) || !data) {
    console.log("[whop-webhook] ignoring action", action);
    return NextResponse.json({ ok: true, ignored: action });
  }

  // Product filter: only fire Purchase for the VIP product. Clubhouse
  // ($27/mo) sales should NOT pollute VIP attribution.
  const vipProductId = getVipProductId();
  if (vipProductId && data.product_id && data.product_id !== vipProductId) {
    console.log("[whop-webhook] ignoring non-VIP product", data.product_id);
    return NextResponse.json({ ok: true, ignored: "wrong product" });
  }

  // Price: payment events carry `amount`, membership events carry
  // `initial_price`. Pick whichever is set.
  const value =
    priceCentsToDollars(data.amount) ?? priceCentsToDollars(data.initial_price);
  const currency = data.currency?.toUpperCase() ?? "USD";
  const email = data.email ?? data.user?.email;

  // Dedup key. Whop fires multiple events per purchase (payment_succeeded,
  // membership_activated, invoice_paid) — we want Meta to see ONE Purchase.
  // Use the member_id when present so payment + membership events for the
  // same VIP sale de-dupe via Meta's event_id matching. Fall back to the
  // event's own id if no member_id (rare).
  const dedupKey = data.member_id ?? data.id;
  const eventId = `whop_purchase_${dedupKey}`;

  void sendCapiEvent({
    event_name: "Purchase",
    event_id: eventId,
    event_source_url: "https://vip-experience.vercel.app/vip",
    action_source: "website",
    user_data: { email, externalId: data.user_id },
    custom_data: {
      value,
      currency,
      content_name: "VIP Experience",
      content_category: "high-ticket-coaching",
      content_ids: data.product_id ? [data.product_id] : undefined,
      whop_event_action: action,
      whop_id: data.id,
      whop_member_id: data.member_id,
      whop_plan_id: data.plan_id,
    },
  });

  console.log("[whop-webhook] fired Purchase", {
    action,
    dedup_key: dedupKey,
    value,
    currency,
    has_email: !!email,
  });
  return NextResponse.json({ ok: true });
}
