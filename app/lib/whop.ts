/**
 * Whop API helpers. Server-only — never import this from a client component
 * because it reads WHOP_API_KEY from process.env.
 */

const WHOP_BASE = "https://api.whop.com/api/v1";

/**
 * Fallback used if the Whop API call fails or env vars are missing. Update
 * this number occasionally so a degraded page doesn't show a wildly stale
 * count during a sales call.
 */
// Temporarily 1 to verify the live Whop API is firing on prod (will revert
// to 53 in the next commit once verified).
const FALLBACK_ACTIVE_MEMBERS = 1;

type WhopMember = {
  id: string;
  status: string;
};

type WhopMembersResponse = {
  data?: WhopMember[];
  page_info?: {
    has_next_page?: boolean;
  };
};

/**
 * Fetch the count of active ("joined") members for the configured VIP
 * product. Cached at the Next.js fetch layer for 1 hour via ISR.
 *
 * Returns the active count, or `FALLBACK_ACTIVE_MEMBERS` if the API call
 * fails for any reason. Never throws.
 */
export async function fetchActiveMemberCount(): Promise<number> {
  const apiKey = process.env.WHOP_API_KEY;
  const productId = process.env.WHOP_PRODUCT_ID;

  if (!apiKey || !productId) {
    return FALLBACK_ACTIVE_MEMBERS;
  }

  try {
    const url = new URL(`${WHOP_BASE}/members`);
    url.searchParams.set("product_ids", productId);
    url.searchParams.set("statuses", "joined");
    url.searchParams.set("first", "100");

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("[whop] member fetch failed", res.status, res.statusText);
      return FALLBACK_ACTIVE_MEMBERS;
    }

    const json = (await res.json()) as WhopMembersResponse;
    const items = Array.isArray(json.data) ? json.data : [];

    // 60-cap product fits in one 100-item page; if the cap is ever raised
    // above 100, paginate via page_info.has_next_page + after= cursor.
    return items.length;
  } catch (err) {
    console.error("[whop] member fetch error", err);
    return FALLBACK_ACTIVE_MEMBERS;
  }
}
