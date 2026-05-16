# Meta Pixel + CAPI Setup — what's installed, what you do next

Installed in this branch (`claude/laughing-tu-30a366`):

| File | What it does |
|---|---|
| [app/components/MetaPixel.tsx](../../app/components/MetaPixel.tsx) | Renders Meta's official Pixel bootstrap script + fires `PageView`. Mounted once in the root layout. |
| [app/lib/meta-pixel.ts](../../app/lib/meta-pixel.ts) | Browser-side helpers: `trackPixel()` (Pixel only), `trackBoth()` (Pixel + CAPI mirror with shared eventId for dedup) |
| [app/lib/meta-capi.ts](../../app/lib/meta-capi.ts) | Server-side CAPI sender. Hashes PII (email, phone) per Meta's SHA-256 spec before sending. |
| [app/api/meta-capi/route.ts](../../app/api/meta-capi/route.ts) | POST endpoint the browser hits to mirror events server-side. Extracts IP + UA from request headers and `_fbp`/`_fbc` cookies for match quality. |
| [app/layout.tsx](../../app/layout.tsx) | Mounts `<MetaPixel />` once for every page |
| [app/vip/page.tsx](../../app/vip/page.tsx) | Fires `ViewContent` on mount; fires `Lead` (with hashed email) on form submit; captures UTM params from URL on first visit and persists them through to the onboarding webhook |
| [app/api/onboarding/route.ts](../../app/api/onboarding/route.ts) | Forwards UTMs as flat columns to Zapier so they land in the CRM sheet |
| [app/lib/onboarding.ts](../../app/lib/onboarding.ts) | Adds optional `utms` field to `OnboardingSubmission` type |

## What fires when

| Event | When | Browser Pixel? | Server CAPI? | Notes |
|---|---|---|---|---|
| `PageView` | Every page load | ✅ Auto (Pixel init) | ❌ (auto-captured by Pixel only — CAPI mirror not worth it for pure pageviews) | |
| `ViewContent` | /vip mount | ✅ | ✅ | `content_name: "VIP landing page"`, `content_category: "funnel-top"` |
| `Lead` | /vip form submit | ✅ | ✅ | Includes hashed email for higher match quality. `content_name` distinguishes qualified vs disqualified |
| `Schedule` | Calendly booking confirmed | ❌ Not yet (waiting on Calendly webhook) | ❌ Not yet | See "Calendly webhook" below |
| `Purchase` | $497 collected | ❌ Not yet (waiting on Whop webhook) | ❌ Not yet | See "Whop webhook" below |

## What YOU do next (outside the repo)

### 1. Use your existing Pixel — don't create a new one

In your screenshot: **`RL Clubhouse Pixel July 8t...`**, dataset ID **`2165593953868798`**. Use it. Reasons:

- New pixels need 7-14 days to warm up before Meta's optimizer works well
- Pooling all RL Clubhouse traffic in one pixel gives Meta more data → better Lookalikes
- VIP vs Clubhouse attribution stays clean via the `content_name` parameter we send on each event

### 2. Get the CAPI access token

Events Manager → **`RL Clubhouse Pixel July 8t...`** dataset → **Settings** → scroll to **Conversions API** → click **Generate access token**. This is a system-user token, long-lived. Save it — you only see it once.

### 3. Set environment variables

Two env vars need to exist in your hosting (Vercel for production, `.env.local` for local dev):

```bash
# Public — bundled into the browser, fine to expose
NEXT_PUBLIC_META_PIXEL_ID=2165593953868798

# Server-only — treat like a password
META_CAPI_ACCESS_TOKEN=EAAxxxxxxxxxxxxx...
```

In Vercel: project → Settings → Environment Variables → add both for Production (and Preview if you want to test against the real pixel from preview branches; otherwise leave Preview empty so preview deploys don't pollute the real pixel).

In local dev: create `.env.local` in the repo root with both keys.

### 4. Add the Meta Ads MCP connector

Claude.ai → profile → **Customize** → **Connectors** → **+ Add custom connector**:

- Name: `Meta Ads`
- URL: `https://mcp.facebook.com/ads`
- Click Add → Connect → Meta Business OAuth → pick the SpookLuke Main ad account + your Page → choose permission tier (Standard is fine)

Once that's in, I can write campaigns/ad sets/ads directly into your account from chat.

### 5. Test the Pixel before you ship

The Meta Pixel Helper Chrome extension (free) shows every fbq call firing in real-time when you load the page. Install it, navigate to your deployed /vip, watch for:
- 1× `PageView` (auto)
- 1× `ViewContent` (our event)
- 1× `Lead` (when you submit the form)

In parallel, Events Manager → Test Events (top tab) lets you watch CAPI events arrive server-side. Both rails should fire for `ViewContent` and `Lead`, and they should de-dupe by `event_id` (Meta will show "deduplicated" in the Test Events view).

## What's still pending (separate work)

### Calendly webhook → Schedule event

When a prospect books a call on the embedded Calendly, we want to fire `Schedule`. Calendly's `invitee.created` webhook is the trigger. Setup:

1. Calendly account → Integrations → Webhooks → Create webhook
2. URL: `https://vip-experience.vercel.app/api/calendly-webhook` (route doesn't exist yet — I'd build it next)
3. Event: `invitee.created`
4. Save the signing key as env var `CALENDLY_WEBHOOK_SECRET`

Then I scaffold `app/api/calendly-webhook/route.ts` that verifies the signature and fires `Schedule` via CAPI with the invitee's email.

### Whop webhook → Purchase event ✅ BUILT

`app/api/whop-webhook/route.ts` is live in this branch. It:
- Verifies the HMAC-SHA256 signature on every request (rejects bad/missing sigs)
- Filters to VIP product only (Clubhouse $27 sales won't pollute VIP attribution)
- Fires `Purchase` via CAPI with `value`, `currency: USD`, hashed email
- Uses Whop's membership ID as the Meta event_id so Whop retries de-dupe cleanly

**To activate (Luke does this in Whop dashboard):**
1. Whop → Developer → Webhooks → Create new webhook
2. URL: `https://vip-experience.vercel.app/api/whop-webhook`
3. Events: at minimum `membership.went_valid`
4. Copy the signing secret → Vercel env vars as `WHOP_WEBHOOK_SECRET`
5. Optionally also set `WHOP_VIP_PRODUCT_ID` — if missing, falls back to `WHOP_PRODUCT_ID` (already set per [app/lib/whop.ts](../../app/lib/whop.ts))

## Quick sanity checks for the code

- ✅ No-op safety: if `NEXT_PUBLIC_META_PIXEL_ID` is missing, `<MetaPixel />` renders nothing. If `META_CAPI_ACCESS_TOKEN` is missing, `sendCapiEvent()` logs but doesn't crash. The site keeps working without credentials — useful for local dev.
- ✅ Privacy: PII is hashed server-side before sending to Meta (`sha256` per Meta's spec). The browser Pixel hashes its own. Raw emails never leave our server.
- ✅ Dedup: same `eventId` is sent on Pixel + CAPI. Meta de-dupes within a ~7-day window.
- ✅ Next 16 compatibility: route handler uses `await cookies()` and `await headers()` per the v16 async-request-APIs breaking change.
- ✅ Match quality boosters: CAPI route reads `_fbp` and `_fbc` cookies, derives IP from `x-forwarded-for` (Vercel sets this), and reads `user-agent` — these add ~10-20% to Meta's match rate.
