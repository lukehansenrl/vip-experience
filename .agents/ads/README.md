# `.agents/ads/` — Meta Ads Agent Assets

This folder is the read-only knowledge base for the Meta ads automation agent. Inspired by the AI-with-Remy pattern, but **adapted for high-ticket coaching with our own thumbnail library instead of AI image generation**.

The agent reads these files before every action — creative selection, copy generation, campaign launch, kill-rule evaluation. If a file goes stale, the agent drifts. Keep them current.

---

## Files

| File | Purpose | Update frequency |
|---|---|---|
| [product-brief.md](product-brief.md) | One-pager on the offer, promise, proof, objections. Includes the **price-secrecy rule** (never publish $497 in any ad creative). | When offer/promise/guarantee changes |
| [branding.json](branding.json) | Colors, fonts, voice, CTA language, image guidelines | When /vip visual design changes |
| [icp.md](icp.md) | Buyer profile, qualification gates, frustration narrative | When form routing logic changes (sync with `app/lib/onboarding.ts`) |
| [ad-angles.md](ad-angles.md) | The 7 starting test angles with hook variants and visual-pairing ideas. Hero = rank-specific frustration (Stuck in Plat / Diamond / Champ). | Weekly — kill what doesn't work, double down on winners |
| [thumbnails-library.md](thumbnails-library.md) | **The visual source-of-truth.** Curated picks from the SpookLuke thumbnails library, grouped by angle. Replaces all AI image generation. | Quarterly re-curation as new thumbs are added |
| [existing-assets.md](existing-assets.md) | Inventory of pre-shot video content with VIP-readiness audit | After each asset audit pass |
| [generated/](generated/) | Output folder for cut creative, copy briefs, launch specs | Auto-populated by the agent |

---

## Key differences from Remy's playbook

Remy's system is built for e-com brands launching new product visuals. Ours is built for high-ticket coaching with an existing visual library:

| Remy's e-com workflow | Our VIP workflow |
|---|---|
| Higgsfield MCP + GPT image 2 generates new statics | **No AI image gen.** Use the SpookLuke thumbnail library (see [thumbnails-library.md](thumbnails-library.md)) |
| Scrape direct competitors in Meta Ads Library | Scrape **adjacent high-ticket coaching categories** (BetterHelp, italki, Preply, chess coaching, golf swing AI) for hook structure — not direct competitors (there are basically none in RL coaching) |
| Lifestyle product shots, broad demographics | Rank-emblem visuals with chains/locks/glows, narrow PC-Plat-to-Champ ICP |
| Optimize for Purchase from day one | Optimize for Lead (form submit), watch Schedule (Calendly booking) and Purchase (close) downstream |
| Price-in-ad sometimes works (low-ticket gummies) | **Never publish the $497 price in any ad creative.** [Hard rule.](product-brief.md#price-secrecy-rule) |
| 20-50 AI-generated images per batch | 10-20 thumbnail picks + copy variants per batch |

---

## The workflow

```
Weekly trigger (Monday)
  └─→ new-ad-batch skill orchestrator (to-be-built in .claude/skills/)
        ├─→ competitive-research skill (Meta Ads Library — adjacent categories)
        ├─→ pick N thumbnails from thumbnails-library.md (rotated per week)
        ├─→ burn-in 2-5 word copy per thumb (style guide in thumbnails-library.md)
        ├─→ re-export to 1:1 + 9:16 placements
        ├─→ primary-text-writing skill for headlines + body
        ├─→ campaign-setup skill: ad sets grouped by angle
        └─→ launch into Meta on PAUSE via Meta Ads MCP
              ↓
              Human review + go live
              ↓
Daily trigger
  └─→ kill-underperforming-ads skill
        ├─→ pull ad-set + ad performance via Meta Ads MCP
        ├─→ apply CPL / CTR / frequency thresholds
        └─→ pause failing ads, flag scalers for review

Weekly trigger (Friday)
  └─→ ads-report skill
        ├─→ pull week's data via Meta Ads MCP
        ├─→ summarize spend, CPL, qualified-lead rate, closed-sale rate
        └─→ recommend next-week angle bets
```

---

## Prerequisites (user-side, one-time setup)

1. **Meta Ads MCP** in Claude: profile → Customize → Connectors → Add custom connector → URL `https://mcp.facebook.com/ads`
2. **Meta Business Manager** with an ad account, RL Clubhouse Page connected, and payment method
3. **Meta Pixel + CAPI** firing on /vip — events: `ViewContent`, `Lead`, `Schedule`, `Purchase`
4. (Optional, for video cuts) **ffmpeg** installed locally — needed for the agent to slice the existing video assets into 15s/30s/60s versions with burned-in captions

**Note:** We do *not* need Higgsfield MCP. The thumbnails library replaces it entirely.

---

## The single-prompt MVP (bootleg version, no skills yet)

Once the prerequisites are met, you can launch by pasting this in Claude:

```
My brand is RL Clubhouse VIP — high-ticket Rocket League coaching.
@.agents/ads/product-brief.md
@.agents/ads/icp.md
@.agents/ads/branding.json
@.agents/ads/ad-angles.md
@.agents/ads/thumbnails-library.md

Pick the top 12 thumbnails from thumbnails-library.md covering Angle 1
(rank-specific frustration: Plat, Diamond, Champ, GC) and Angle 2
(You + rank + timeline). For each, spec the copy burn-in per the
style guide, and re-export to 1:1 (1080×1080) and 9:16 (1080×1920).
Drop outputs in .agents/ads/generated/YYYY-MM-DD/.
```

Then:

```
Now write primary text + headline pairs for each of those 12 ads.
Apply the price-secrecy rule (no $497, no price proxies). Use the voice
spec in @.agents/ads/branding.json. Pre-empt the objections in
@.agents/ads/product-brief.md.
```

Then:

```
Set up a Meta Ads campaign with these 12 ads. Structure per ad-angles.md:
one CBO campaign, ad sets grouped by angle (Angle 1 = Rank Frustration,
Angle 2 = You+Rank+Timeline). Optimize for Lead event.
Geo: Tier 1 from @.agents/ads/icp.md (US, CA, UK, AU, NZ).
Daily budget: $75/day total CBO. Launch PAUSED so I can review.
```

This works the moment Luke connects the Meta Ads MCP. No skills needed for the first launch — promote what works into skills after we see the bootleg version's gaps.

---

## What's next

1. Confirm asset accuracy (Luke reviews thumbnail picks + ad angles)
2. Audit Meta Pixel + CAPI on /vip
3. Luke connects Meta Ads MCP in Claude
4. First $75/day test launch via the bootleg prompt
5. After 1-2 weeks of data, promote winning patterns into `.claude/skills/` (new-ad-batch orchestrator + sub-skills)
