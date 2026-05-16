/**
 * Meta Conversions API — server-side helper.
 *
 * Posts events to Meta's CAPI endpoint with the same `eventId` the
 * browser used so Meta de-dupes. Hashes PII (email, phone) per Meta's
 * SHA-256 requirement before sending.
 *
 * Server-only. Never import from a client component — it reads
 * META_CAPI_ACCESS_TOKEN from process.env.
 *
 * No-op if the access token or pixel ID env vars are missing — useful
 * for local dev and preview branches.
 */

import crypto from "node:crypto";

const META_CAPI_VERSION = "v23.0";

export type CapiUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
  // Server-derived (don't take from client).
  ipAddress?: string;
  userAgent?: string;
  // Meta cookies set by the Pixel — improve match rate by ~10-20%.
  fbp?: string; // _fbp cookie
  fbc?: string; // _fbc cookie (only set if user arrived via fbclid URL)
};

export type CapiEvent = {
  event_name: string;
  event_time?: number; // unix seconds, defaults to now
  event_id: string;
  event_source_url?: string;
  action_source?: "website" | "email" | "phone_call" | "chat" | "physical_store" | "system_generated" | "other";
  user_data: CapiUserData;
  custom_data?: Record<string, unknown>;
};

/**
 * SHA-256 hash, lowercased per Meta's hashing rules. Email/phone must be
 * trimmed and lowercased BEFORE hashing.
 *
 * Returns undefined for empty input so we don't waste a hash slot in the
 * payload (Meta drops blank user_data fields anyway).
 */
function sha256(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const cleaned = input.trim().toLowerCase();
  if (!cleaned) return undefined;
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

/**
 * Normalize phone for hashing: keep digits only.
 * E.164 without the leading "+" is what Meta wants.
 */
function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  return digits || undefined;
}

/**
 * Send one event to Meta's Conversions API. Fire-and-forget pattern —
 * caller doesn't await. Errors are logged but never thrown.
 *
 * If env vars are missing, logs the event payload (useful for dev) and
 * returns without making a network call.
 */
export async function sendCapiEvent(event: CapiEvent): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.log("[meta-capi] (no-op, missing env vars)", {
      event_name: event.event_name,
      event_id: event.event_id,
    });
    return;
  }

  // Hash PII server-side. The browser Pixel hashes its own, but for CAPI
  // we receive raw values (email from the form, phone if collected) and
  // hash before sending.
  const u = event.user_data;
  const userDataPayload: Record<string, string | string[] | undefined> = {
    em: sha256(u.email) ? [sha256(u.email)!] : undefined,
    ph: sha256(normalizePhone(u.phone)) ? [sha256(normalizePhone(u.phone))!] : undefined,
    fn: sha256(u.firstName) ? [sha256(u.firstName)!] : undefined,
    ln: sha256(u.lastName) ? [sha256(u.lastName)!] : undefined,
    external_id: u.externalId ? [sha256(u.externalId)!] : undefined,
    client_ip_address: u.ipAddress,
    client_user_agent: u.userAgent,
    fbp: u.fbp,
    fbc: u.fbc,
  };

  // Drop undefined keys — Meta tolerates them but a clean payload is
  // easier to debug in Events Manager's Test Events view.
  const cleanUserData = Object.fromEntries(
    Object.entries(userDataPayload).filter(([, v]) => v !== undefined),
  );

  const body = {
    data: [
      {
        event_name: event.event_name,
        event_time: event.event_time ?? Math.floor(Date.now() / 1000),
        event_id: event.event_id,
        event_source_url: event.event_source_url,
        action_source: event.action_source ?? "website",
        user_data: cleanUserData,
        custom_data: event.custom_data ?? {},
      },
    ],
  };

  const url = `https://graph.facebook.com/${META_CAPI_VERSION}/${pixelId}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "<no body>");
      console.error("[meta-capi] non-200", res.status, text.slice(0, 500));
      return;
    }
    // Optional: log the events_received count for sanity-checking.
    const json = (await res.json().catch(() => ({}))) as { events_received?: number };
    if (json.events_received !== 1) {
      console.warn("[meta-capi] events_received unexpected:", json);
    }
  } catch (err) {
    console.error("[meta-capi] fetch threw", err);
  }
}
