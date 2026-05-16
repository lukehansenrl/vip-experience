# RL Clubhouse VIP — ICP

The exact buyer profile. Source-of-truth for the form's qualification logic lives in [app/lib/onboarding.ts](../../app/lib/onboarding.ts) — this doc mirrors it in marketing-readable form. If routing rules change there, update here.

---

## The buyer in one sentence

A **PC** Rocket League player, **age 18+**, ranked **Plat or higher**, who **identifies as competitive** (not casual), lives in a **high-PPP country** (or has $501+/yr to spend that proves it doesn't matter), has **income** (or, again, $501+ budget that overrides it), and is **willing to invest at least $301/yr** in improving — but realistically can put down $497 on a sales call.

## The "true VIP" profile (sweet spot)

This is who lights up our calendar and closes at the highest rate:

- **Age 23-45** (the 23-29 + 30-45 buckets are where the closes happen)
- **Employed full-time** or self-employed/business owner
- **Rank Diamond 1 to Champ 3** (Plat-1-3 and GC also work, but Diamond-Champ is the meat)
- **PC** on US-East, US-West, US-Central, or EU servers
- **Budget $501-$1,000 or $1,000+**
- **Lives in:** US, Canada, UK, Germany, Netherlands, Australia, GCC (Saudi/UAE)
- **Identifies as:** "I play competitively. I care about improving my skill and rank over time."
- **Has been stuck** at their current rank for 3+ months and is frustrated

## Hard gates (auto-disqualified on the form)

If an ad attracts these people, we lose the cost of the click AND the time of any sales rep who gets a bad call. **The ad copy and creative need to filter them out, not just rely on the form to.**

| Gate | Disqualifier | What this means for ads |
|---|---|---|
| Age | 17 or under | Speak to adults. Mention "23+", "professionals", "people with jobs". Don't show teenager imagery. |
| Platform | PlayStation / Xbox / Switch | Say "PC" somewhere in the funnel-leading copy when possible. Or filter on page. |
| Rank | Bronze / Silver / Gold | Lead with "Plat to Champ", "Diamond stuck players", specific MMR ranges. Bronze players self-select out when they see the language. |
| Player type | "I play casually" | Use words like "serious", "actually want to rank up", "willing to invest" — these repel casuals. |
| Budget | Under $301/yr | Don't hide the price-vibe. "Real investment", "$500 program", "high-ticket coaching" — price-anchoring in the ad does free filtering. |
| Country | Outside the 27-country allowlist | Geo-target in Meta to the allowlist countries only. Easiest filter. |
| Employment | Sole status = Unemployed (and budget under $501) | Implicit — handled by the budget gate in most cases. |

## High-budget override

The form has a **$501+/yr budget override** that bypasses the country and employment gates. Marketing implication: if a high-net-worth player from outside our allowlist (e.g., a 25-year-old Brazilian software engineer) sees the ad and applies with the right budget, they qualify. **Don't over-restrict geo if a cheap-traffic country tests well**, but always require budget honesty.

## Secondary funnel — Clubhouse ($27/mo)

Anyone who is **18+ and competitive but VIP-disqualified** gets routed to [/onboarding/clubhouse-qualified](../../app/onboarding/clubhouse-qualified) for a $27/mo Clubhouse offer (30-day free trial). This means our ad spend has a backstop:

- VIP-qualified prospect → $497 close attempt
- Clubhouse-qualified prospect → $27/mo trial
- Truly unqualified (under 18 or casual) → no monetization, lost click

For ad math: a "wasted" click on a Diamond-ranked-but-broke 19-year-old still has a chance of becoming a $27/mo subscriber. Build the LTV model with both products in mind, not just VIP closes.

## How the ICP talks (language to mine for ad copy)

Direct from the form's `BIGGEST_BLOCKER` choices — the language *they* use to describe their pain:

- "My mechanics aren't consistent"
- "My game sense / decision-making"
- "I tilt / mental game"
- "I don't have time to practice"
- "I don't have a structured plan"
- "I can't get past a specific rank wall"

Ad hooks should mirror this exact language. **"Can't get past Champ 1?"** outperforms **"Break through your skill ceiling"** every time.

## The frustration narrative

What's going on in their head when they see our ad — write copy that meets them here:

1. They've been playing for 2+ years.
2. They've watched 100s of hours of YouTube (Squishy, Sunless, JZR, etc.).
3. They've maybe paid a Fiverr coach once or twice — got tips, didn't stick.
4. They've plateaued at the same rank for months.
5. They're starting to think *maybe this is just my ceiling.*
6. They're an adult with a job and they're starting to feel weird about how seriously they take this — but they also know they're not done.

**The ad's job:** validate that frustration, name it specifically, then offer the credible path out.

## Geo-targeting starting point

Tier 1 (start here, highest match rate):
- United States, Canada, United Kingdom, Australia, New Zealand

Tier 2 (add after Tier 1 has data):
- Germany, Netherlands, Sweden, Norway, Denmark, Ireland, Switzerland

Tier 3 (test separately, different language nuance):
- Saudi Arabia, UAE, Qatar (English-speakers, high disposable income)

Avoid initially: France, Spain, Italy, Brazil, Japan, Korea — these need localized copy and creative we don't have yet.

## What we still don't know (worth learning from data)

- Which rank bucket actually buys most often (suspected: Champ 1-2)
- Average age of closed buyers (suspected: 26-32)
- Whether discretionary-income employed-full-time outperforms self-employed/business-owner
- Which `BIGGEST_BLOCKER` selection correlates with highest close rate

The first 30 days of ad spend should generate this. Track it in the CRM, feed it back into this file.
