/**
 * Meta Pixel — browser-side helpers.
 *
 * The Pixel <Script> is injected once in app/layout.tsx via the
 * <MetaPixel /> component. After hydration, `window.fbq` exists.
 * These helpers are typesafe wrappers; they no-op if fbq isn't loaded
 * (so calls from unit tests, missing-env-var deploys, or ad-blocked
 * sessions never throw).
 *
 * Every event we send from the browser is paired with a server-side
 * Conversions API event (see app/lib/meta-capi.ts) using the same
 * `eventId` for deduplication. Meta de-dupes when it sees the same
 * eventId on both rails within ~7 days.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Schedule"
  | "Purchase"
  | "CompleteRegistration";

export type MetaEventPayload = Record<string, unknown>;

/**
 * Generate a UUIDv4 event ID for browser→CAPI dedup. Uses crypto.randomUUID
 * where available (modern browsers + Node 19+), falls back to a non-cryptographic
 * generator for ancient browsers (won't ever hit in our target).
 */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Fire a Pixel event. Safe to call before fbq is loaded — calls are
 * silently dropped. Returns the eventId used so the caller can pass
 * the same one to the CAPI mirror.
 */
export function trackPixel(
  event: MetaStandardEvent,
  payload: MetaEventPayload = {},
  eventId: string = newEventId(),
): string {
  if (typeof window === "undefined" || !window.fbq) {
    return eventId;
  }
  window.fbq("track", event, payload, { eventID: eventId });
  return eventId;
}

/**
 * Fire a Pixel event AND mirror it server-side via the CAPI route, using
 * the same eventId for dedup. Returns the eventId.
 *
 * `userData` and `customData` follow Meta's CAPI schema. `userData` is
 * what we know about the prospect (email, phone — hashed server-side).
 * `customData` is event-specific (value, currency, content_name, etc.).
 *
 * The CAPI POST is fire-and-forget — failures are logged server-side
 * but never block UX.
 */
export async function trackBoth(input: {
  event: MetaStandardEvent;
  pixelPayload?: MetaEventPayload;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    externalId?: string;
  };
  customData?: MetaEventPayload;
  eventId?: string;
}): Promise<string> {
  const eventId = input.eventId ?? newEventId();
  trackPixel(input.event, input.pixelPayload ?? {}, eventId);

  // Fire-and-forget. Don't await the response — we don't want to block
  // a router.push() on the CAPI roundtrip.
  void fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: input.event,
      eventId,
      eventSourceUrl: window.location.href,
      userData: input.userData ?? {},
      customData: input.customData ?? {},
    }),
    keepalive: true, // fires even if navigation happens mid-request
  }).catch((err) => {
    console.error("[meta-pixel] CAPI mirror failed", err);
  });

  return eventId;
}
