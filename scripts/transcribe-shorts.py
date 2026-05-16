"""Batch-transcribe hook+outro WAVs from the shorts audit pipeline.

Loads Whisper base.en once, processes every .wav in /tmp/shorts-audit,
writes the result to /tmp/shorts-audit/transcripts.json keyed by filename.
"""

import json
import sys
from pathlib import Path

import whisper

import os

AUDIO_DIR = Path(os.environ.get("SHORTS_AUDIT_DIR", r"C:\Users\lucas\AppData\Local\Temp\shorts-audit"))
OUT_PATH = AUDIO_DIR / "transcripts.json"


def main() -> int:
    wavs = sorted(AUDIO_DIR.glob("*.wav"))
    if not wavs:
        print(f"no wav files found in {AUDIO_DIR}", file=sys.stderr)
        return 1

    print(f"loading whisper base.en model...", flush=True)
    model = whisper.load_model("base.en")

    results: dict[str, str] = {}
    for i, wav in enumerate(wavs, 1):
        print(f"[{i}/{len(wavs)}] {wav.name}", flush=True)
        out = model.transcribe(str(wav), language="en", fp16=False)
        text = out.get("text", "").strip()
        results[wav.name] = text

    OUT_PATH.write_text(json.dumps(results, indent=2))
    print(f"\nwrote {len(results)} transcripts to {OUT_PATH}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
