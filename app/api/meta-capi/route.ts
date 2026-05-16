/**
 * POST /api/meta-capi
 *
 * Browser-triggered mirror of a Pixel event to Meta's Conversions API.
 * The browser fires the Pixel event (via window.fbq) AND fires this
 * endpoint with the same `eventId`. Meta de-dupes on event_id within
 * a ~7 day window.
 *
 * Why bother? iOS 14+ and ad-blockers eat ~30-40% of Pixel events.
 * CAPI runs server-to-server so it survives.
 *
 * The endpoint extracts IP and User-Agent from request headers
 * server-side (the client should NOT send these — Meta needs the real
 * server-observed values for match quality). Reads _fbp and _fbc cookies
 * from the request to improve match rate further.
 */

import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { sendCapiEvent, type CapiUserData } from "../../lib/meta-capi";

type RequestBody = {
  event: string;
  eventId: string;
  eventSourceUrl?: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    externalId?: string;
  };
  customData?: Record<string, unknown>;
};

// Allowed Meta standard events — block arbitrary names to avoid
// accidentally polluting Events Manager with junk if a client sends
// garbage.
const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Lead",
  "Schedule",
  "Purchase",
  "CompleteRegistration",
]);

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.event || !body.eventId) {
    return NextResponse.json({ error: "Missing event or eventId" }, { status: 400 });
  }
  if (!ALLOWED_EVENTS.has(body.event)) {
    return NextResponse.json({ error: `Unknown event: ${body.event}` }, { status: 400 });
  }

  // Next 16: cookies() and headers() are now async.
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);

  // Derive client IP from common proxy headers. Vercel sets
  // x-forwarded-for; locally we'll just get nothing, which is fine.
  const forwarded = hdrs.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    undefined;
  const userAgent = hdrs.get("user-agent") ?? undefined;

  const fbp = cookieStore.get("_fbp")?.value;
  const fbc = cookieStore.get("_fbc")?.value;

  const userData: CapiUserData = {
    email: body.userData?.email,
    phone: body.userData?.phone,
    firstName: body.userData?.firstName,
    lastName: body.userData?.lastName,
    externalId: body.userData?.externalId,
    ipAddress,
    userAgent,
    fbp,
    fbc,
  };

  // Fire and forget. Returning 200 immediately keeps client UX snappy
  // even if Meta's API is slow.
  void sendCapiEvent({
    event_name: body.event,
    event_id: body.eventId,
    event_source_url: body.eventSourceUrl,
    user_data: userData,
    custom_data: body.customData,
  });

  return NextResponse.json({ ok: true });
}
