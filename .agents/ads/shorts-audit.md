# Shorts Audit — June 26 2025 Batch (FINAL/)

Audit of the 16 finished short-form .mp4 ads in:
`D:\Mega Cloud Sync\Content Master Folder\SpookLuke Stuff\(6) - Instagram & Facebook Ads\Facebook Ads\2025\June 26th 2025 20 Shorts Batch\FINAL\`

**Method:** ffmpeg extracted the first 5 seconds (hook) and the last 15 seconds (outro/CTA) of each clip, Whisper `base.en` transcribed all 32 segments. Full transcripts saved at `C:\Users\lucas\AppData\Local\Temp\shorts-audit\transcripts.json` (re-runnable via [scripts/transcribe-shorts.py](../../scripts/transcribe-shorts.py)).

---

## Top-line findings

| Finding | Status | Action |
|---|---|---|
| Price mentioned in any clip? | ❌ No — all 32 segments are price-clean | ✅ Safe per price-secrecy rule |
| Offer pitched in outros? | **Clubhouse community** (non-toxic learning space, live classes, NA+EU members) | ❌ Outros do NOT fit VIP — must be cut or re-VO'd |
| Hooks usable for VIP? | ✅ Yes — all 16 name pain in our ICP's `BIGGEST_BLOCKER` language | Re-purpose hooks as-is |
| Aspect ratio | 1080×1920 (9:16 vertical) — already Reels/Stories spec | ✅ No re-export needed |
| Duration | 44-70s (longer than Meta's 15-30s sweet spot for ads) | Cut to ~15-18s for paid use |

## The recommended play: Hook + new CTA card

Don't re-VO the outros. For each clip:

1. Cut to **just the hook** (first 5-8 seconds — exact cut point varies by clip; see the per-clip table)
2. Append a **fresh 7-10s VIP CTA card** — static visual (a thumbnail from `thumbnails-library.md`) with text overlay + simple voiceover or burned-in text
3. Result: ~15-18s vertical ad, on-message for VIP, no recording session required

Why this beats re-VOing or shipping as-is:
- Avoids the entire Clubhouse-era pitch (about 30-50s of misaligned content per clip)
- Hits Meta's ideal Reels/Stories length (15-30s)
- Each clip becomes a hook-test → if the hook engages, the new CTA card converts
- We can A/B different CTA cards against the same hook to isolate which element is working

**Suggested CTA card script** (10s, voiceover or text-only):
> "Sound familiar? Our pro coaches will build you a personalized 6-week plan and we guarantee you'll rank up — or we coach you free until you do. Tap to apply. 13 founding spots left."

Visual: a `Champ Hardstuck` or `Diamond in 30 Days` thumbnail with "13 FOUNDING SPOTS LEFT" burn-in.

## The 4 problems map perfectly to your form

Funnel cohesion bonus: each problem topic in this batch lines up with a `BIGGEST_BLOCKER` checkbox on the `/vip` form:

| Ad topic | Form's BIGGEST_BLOCKER option | Cohesion |
|---|---|---|
| mechanics | "My mechanics aren't consistent" | ⭐ exact match |
| overwhelm | "I don't have a structured plan" + "My game sense / decision-making" | ⭐ strong |
| positioning | "I can't get past a specific rank wall" | strong (positioning *is* the rank wall) |
| teammates | "I tilt / mental game" | strong (teammate frustration = tilt source) |

Future enhancement: deep-link each ad to `/vip?blocker={topic}` and pre-check the matching blocker on the form so the prospect sees their stated problem mirrored back. Worth ~5 min of work in `app/vip/page.tsx` once the ads are running.

---

## Per-clip audit

For each clip: the actual transcribed hook (first 5s), the outro pitch, the recommended cut point, and a hook-quality grade.

### Mechanics group — "My mechanics aren't consistent" angle

| Clip | Duration | Hook (first 5s) | Hook grade | Cut at | Recommendation |
|---|---|---|---|---|---|
| `mechanics v1.mp4` | 50.6s | "Most Rocket League players think they're not mechanical enough, but the real problem is you're focusing…" | B+ — strong setup but vague payoff in 5s window | ~7-8s (let the "real problem is…" land) | ✅ Cut + new CTA card |
| `mechanics v2.mp4` | 44.9s | "This is the worst feeling. Watching everyone else hit crazy mechanics while you can b-" | B — pattern interrupt is good but cut mid-word | ~6s after the "can barely…" lands | ✅ Cut + new CTA card |
| `mechanics v3.mp4` | 55.0s | "Rocket League players, do you ever feel like everyone is way more mechanical than you? I remember…" | A- — direct question, audience-first | ~5s after "than you?" | ✅ Cut + new CTA card |
| `mechanics v4.mp4` | 49.1s | "Do you ever feel like you're just not mechanical enough for your rank? You watch replays of…" | **A — pure ICP language ("for your rank"), direct second-person** | ~6s after "for your rank?" | ⭐ **Best in group** — ship first |

**Outro for all 4:** "...no more guessing what's going wrong. It's a non-toxic, positive learning environment, with players all focused on improvement. So if you're tired of feeling slow and you finally want to get ahead and get mechanical in 2025, click the link on screen and see if you qualify to join." — Clubhouse pitch. Cut.

### Overwhelm group — "Don't know what to improve" angle

| Clip | Duration | Hook (first 5s) | Hook grade | Cut at | Recommendation |
|---|---|---|---|---|---|
| `overwhelm v1.mp4` | 47.9s | "Most Rocket League players are stuck because they don't know what to improve. You practice a-" | B+ — clean problem statement | ~6s | ✅ Cut + new CTA card |
| `overwhelm v2.mp4` | 54.9s | "This is the worst feeling in Rocket League. Coming back to the game and knowing your fall…" | B — emotional but cut mid-thought | ~6-7s after "your fall…" lands | ✅ Cut + new CTA card |
| `overwhelm v3.mp4` | 53.9s | "Rocket League players, are you overwhelmed by all the things you need to learn in **2018**?" | C — **⚠️ "2018" — either Whisper misheard "today" / "2025" OR this clip is years old.** Needs 10-sec spot-check | TBD pending verification | ⚠️ Verify before use |
| `overwhelm v4.mp4` | 48.8s | "Do you ever feel like there's too much to learn in Rocket League and you don't even know where to start?" | **A — broad, relatable, no dated language** | ~7s after "where to start?" | ⭐ **Best in group** — ship first |

**Outro for all 4:** "It's a non-toxic positive space focused purely on improvement and getting better in Rocket League. We've got players from all over NA and EU, so if you're tired of spinning your wheels and you want clear direction on what to work on, check out the link below and see if you qualify to join. I'll see you on the other side." — Clubhouse pitch. Cut.

### Positioning group — "Rank wall" angle

| Clip | Duration | Hook (first 5s) | Hook grade | Cut at | Recommendation |
|---|---|---|---|---|---|
| `positioning v1.mp4` | 69.7s | "Most Rocket League players have no idea where they should be on the field. And I get it." | B+ — clean statement + empathy | ~6s after "I get it" | ✅ Cut + new CTA card |
| `positioning v2.mp4` | 59.8s | "This is the worst part about ranking up. You know positioning matters, but nobody explains." | A- — names "ranking up" + agitates | ~6s after "nobody explains" | ✅ Cut + new CTA card |
| `positioning v3.mp4` | 59.9s | "Rocket League players, are you confused about where you should be positioned on the field? You probably know…" | A — direct question | ~6s after "on the field?" | ⭐ **Best in group** — ship first |
| `positioning v4.mp4` | 61.6s | "If you ever feel like you're always in the wrong position in Rocket League, one moment you're too close to the play." | A- — relatable specific scenario | ~7s after "to the play" | ✅ Cut + new CTA card |

**Outro for all 4:** "...based focused on improvement, and we've got players from all over NA and EU. So if you're tired of feeling lost on the field and you want to understand proper positioning, check out the link below and see if you qualify to join. **If you join this week, I'll analyze your gameplay next Monday night in my live class.**" — Clubhouse pitch, with a time-bound bonus that's also out-of-date. Cut.

### Teammates group — "Tilt / mental game" angle

| Clip | Duration | Hook (first 5s) | Hook grade | Cut at | Recommendation |
|---|---|---|---|---|---|
| `teammates v1.mp4` | 46.7s | "Most players solo queue because they think it's the only way. You have no choice, so you…" | B — broad, philosophical opener | ~7s after "the only way" | ✅ Cut + new CTA card |
| `teammates v2.mp4` | 54.1s | "This is the worst part of ranked 2v2. No, I'm not talking about your opponents, I'm talking about your-" | A- — pattern interrupt + payoff (teammates) | ~6-7s after the "talking about your teammates" lands | ✅ Cut + new CTA card |
| `teammates v3.mp4` | 46.4s | "Rocket League players, do you ever feel like all your teammates suck? I know I do." | **A — emotionally resonant, self-deprecating, viral-feel** | ~5s after "I know I do" | ⭐ **Best in group** — ship first |
| `teammates v4.mp4` | 48.6s | "You ever feel like your teammates are holding you back from ranking up? If you get a good teammate…" | A — direct + names "ranking up" | ~7s after "ranking up?" | ✅ Cut + new CTA card |

**Outro for all 4:** "I'm trying to make a safe haven for learning and playing Rocket League. So whether you want to rank up or you just want to enjoy the game more when you hop on, click the link below. If you're sick of solo queuing and the rampant toxicity in Rocket League, check out the video on the next page and see if you qualify to join." — Clubhouse pitch ("safe haven", community framing). Cut.

---

## "Ship first" priority queue

If we're launching just 4 ads to start (1 per angle), use the strongest hook in each group:

1. **mechanics v4** — "Do you ever feel like you're just not mechanical enough for your rank?"
2. **overwhelm v4** — "Do you ever feel like there's too much to learn in Rocket League and you don't even know where to start?"
3. **positioning v3** — "Rocket League players, are you confused about where you should be positioned on the field?"
4. **teammates v3** — "Rocket League players, do you ever feel like all your teammates suck? I know I do."

Pair each with the same CTA card initially, so we isolate the hook performance. Once we know which hook wins, A/B different CTA cards against it.

## Production checklist (per clip)

For each "ship first" clip:

- [ ] Run ffmpeg cut: extract `[0 → cut_at]` seconds from the source .mp4
- [ ] Burn captions on the hook (Whisper-generated .srt; tool exists, see [scripts/transcribe-shorts.py](../../scripts/transcribe-shorts.py) — extend it to write .srt)
- [ ] Generate CTA card: thumbnail from library + text burn-in + optional voiceover
- [ ] Concatenate: hook.mp4 + cta-card.mp4 → final-ad.mp4
- [ ] QC: watch end-to-end, confirm no Clubhouse language leaked through
- [ ] Drop in `.agents/ads/generated/YYYY-MM-DD_hook-{topic}_v{n}.mp4`

Once we know the exact cut points (after Luke spot-checks the hook timings), the agent can run this pipeline in a single ffmpeg invocation per clip.

## Open questions for Luke

1. **`overwhelm v3` says "2018"** — Whisper hallucination or real? Spot-check the actual audio at ~3s in.
2. **Cut timing** — my cut-at estimates above are based on transcription; you'll want to eyeball the actual 5-8s mark of each top-pick to confirm the hook lands cleanly before the Clubhouse content starts.
3. **CTA card voiceover** — record once + reuse, or text-only burn-in for v1? (Text-only is faster to ship; VO is higher quality.)
4. **Music** — the originals presumably have background music. Does the cut need new music behind the CTA card, or silence + text is fine?
