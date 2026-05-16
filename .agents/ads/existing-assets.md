# Existing Ad Assets — Final Inventory

Catalog of pre-recorded Facebook ad footage. **Final decisions locked in 2026-05-16** after auditing all batches.

**Source folder:**
`D:\Mega Cloud Sync\Content Master Folder\SpookLuke Stuff\(6) - Instagram & Facebook Ads\Facebook Ads\`

---

## Asset hierarchy for Phase 1 launch

| Tier | What | Why |
|---|---|---|
| **Primary creative** | Static thumbnails from the [Finished Thumbnails library](thumbnails-library.md) — curated picks in [preview.html](preview.html) | Already designed, proven across years of YouTube performance, instantly recognizable, ship as-is with copy in Meta metadata. Highest leverage for first launch. |
| **Secondary creative** | 3 cut-and-captioned videos (see [video-cut-sheet.md](video-cut-sheet.md)) | Need Kamil to edit (~45 min per video). On-message for VIP without re-VO. Layer in week 2 once static-ad winners are emerging. |
| **Killed** | 16-clip shorts batch + Leila Style + everything else | Clubhouse pitches woven through, or off-brand. Not worth saving. |

---

## ✅ USE — 3 videos for Kamil

See [video-cut-sheet.md](video-cut-sheet.md) for precise cut points and the full transcripts.

### 🟢 Primary: Last 5 Years IMPROVEMENT (July 25th)

| Path | `2025/July 25th, last 5 years, improvement version/Last 5 Years Improvement Ad July 27th 2025.mkv` |
|---|---|
| Source length | 1:48 (108s) |
| Final cut target | ~45s |
| Aspect | Source is widescreen; deliver 9:16 + 16:9 |
| VIP-ready? | ✅ Yes — no Clubhouse mention, no price mention, CTA is "click the ad below" which routes cleanly to /vip |
| Notes | Cleaner take than the July 20th version. Uses "**improve**" keyword (Luke polled his audience and confirmed "improve" beats "rank up" as a hook word). Minor cuts needed for 3 "I've personally" restarts and 1 duplicate "Let me explain." |

### 🟢 Secondary: Last 5 Years RANK UP (July 20th)

| Path | `2025/July 20th Coaching Charlie Morgan 7 Years Style/Last 5 years, helping people rank up in Rocket League..mkv` |
|---|---|
| Source length | 1:44 (104s) |
| Final cut target | ~46s |
| Aspect | Source is widescreen; deliver 9:16 + 16:9 |
| VIP-ready? | ✅ Yes — same caveats as primary. No Clubhouse, no price, clean CTA. |
| Notes | Same script as primary but with "**rank up**" keyword. More restarts mid-take. Use as A/B test against primary to learn which keyword wins. Needs the Video #3 pickup take for the "with by far and large" line. |

### 🟡 Pickup: Coach's correction (12s)

| Path | `2025/July 20th Coaching Charlie Morgan 7 Years Style/Coach's correction..mkv` |
|---|---|
| Source length | 0:12 |
| Use | B-roll pickup for Video #2's bad take at 1:33.92, OR a standalone 12-second mini-ad ("With by far the best success rate of any Rocket League coach. Hear me out.") |

---

## ❌ KILLED — do not use

### June 26 2025 Shorts Batch (16 finished .mp4s)

**Path:** `2025/June 26th 2025 20 Shorts Batch/FINAL/`

Audited transcripts at [shorts-audit.md](shorts-audit.md). Verdict: every clip pitches the **Clubhouse $27/mo community** in the body AND the outro — "non-toxic positive space", "safe haven for learning", "Monday night live class". Re-VOing just the outros doesn't save them; the body content is also off-message. The hooks themselves are commodity recording patterns ("Do you ever feel like..." × 4 topics) that can be re-shot fresh in 20 minutes whenever — not worth the surgery.

| File group | Status |
|---|---|
| `mechanics v1-v4.mp4` | ❌ Killed |
| `overwhelm v1-v4.mp4` | ❌ Killed |
| `positioning v1-v4.mp4` | ❌ Killed |
| `teammates v1-v4.mp4` | ❌ Killed |
| `New 30 Day Free Trial Wording/` (CTA voiceovers) | ❌ Killed |
| `Screenshot 2025-07-08 *.png` (static thumbnails from this batch) | ⚠️ Maybe — review per the no-pros / no-burn-in rules. Probably superseded by the main [Finished Thumbnails library](thumbnails-library.md). |

### Leila Style Ad (July 17th)

**Path:** `2025/July 17th Short Form Ads/Leila Style Ad #1/`

Files: `Leila Style Ad #1 POV 1.mkv`, `Leila Style Ad #1 POV 2.mkv`

**Status:** ❌ Killed per Luke's call ("not worth it"). Not transcribed.

### Other July 17 Short Form Ads

**Path:** `2025/July 17th Short Form Ads/`

Files: `2024-07-17 14-57-01.mkv`, `2024-07-17 14-57-02.mkv`

**Status:** ❌ Killed by default — Luke confirmed only the 2 folders above are usable for Phase 1.

### August 29 Viscous ad addition

**Path:** `2025/August 29th Viscous ad addition/2025-08-29 09-02-25.mkv`

**Status:** ❌ Killed by default. Viscous is another pro — falls afoul of the "no other pros" rule even if the script were VIP-friendly.

### 2024 Relearning Controls (3 lengths)

**Path:** `2024/Relearning COntrols March 19th/`

Files: `V1 ... 2 mins.mkv`, `V2 ... 45secs.mkv`, `V3 ... .mkv`

**Status:** ❌ Killed by default. Not in Luke's "only these two folders work" call.

### 2024 "Outdated ad" reference

**Path:** `2024/Outdated ad, but a good sense of the style that we can go for..mp4`

**Status:** Reference only — self-labeled as outdated. Not an asset.

---

## Workflow summary for Phase 1

**Week 1 (this week):**
1. ✅ Static thumbnail picks → Luke reviews [preview.html](preview.html), confirms top picks
2. ✅ Copy generation → agent writes primary text + headline pairs in Meta-ready format for each pick
3. ✅ Meta Ads MCP connector setup → Luke does this in his Claude.ai account
4. ✅ Pixel + CAPI audit on /vip
5. ✅ First $50-100/day launch with static thumbnails only, all paused, Luke reviews + flips on

**Week 2:**
1. Kamil cuts the 3 videos per [video-cut-sheet.md](video-cut-sheet.md) — ~2-3 hours of his time total
2. Add video ad sets to the running campaign
3. First kill pass on losers from week 1

**Week 3+:**
- Scale winners, retarget /vip viewers who didn't apply, introduce social-proof + scarcity angles

---

## Re-running audits

To audit any new batch of pre-recorded videos in the future:

```bash
# Extract audio (5s hooks + 15s outros, or full clip — your call)
# Then run:
python scripts/transcribe-with-timing.py <audio_dir>
# Outputs <audio_dir>/transcripts-timed.json
```

Whisper `base.en` on CPU runs faster than realtime for clean English speech. Scripts live in [scripts/transcribe-shorts.py](../../scripts/transcribe-shorts.py) (hook+outro segmenter) and [scripts/transcribe-with-timing.py](../../scripts/transcribe-with-timing.py) (full timing).
