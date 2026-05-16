"""Transcribe wav files in a folder with Whisper, preserving segment-level timing.

Output: <audio_dir>/transcripts-timed.json — array of {file, segments:[{start, end, text}]}
"""

import json
import sys
from pathlib import Path

import whisper


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: transcribe-with-timing.py <audio_dir>", file=sys.stderr)
        return 1

    audio_dir = Path(sys.argv[1])
    wavs = sorted(audio_dir.glob("*.wav"))
    if not wavs:
        print(f"no wavs in {audio_dir}", file=sys.stderr)
        return 1

    print("loading whisper base.en...", flush=True)
    model = whisper.load_model("base.en")

    out = []
    for i, w in enumerate(wavs, 1):
        print(f"[{i}/{len(wavs)}] {w.name}", flush=True)
        result = model.transcribe(str(w), language="en", fp16=False, verbose=False)
        segments = [
            {"start": round(s["start"], 2), "end": round(s["end"], 2), "text": s["text"].strip()}
            for s in result.get("segments", [])
        ]
        out.append({"file": w.name, "duration_s": round(segments[-1]["end"], 2) if segments else 0, "segments": segments})

    dest = audio_dir / "transcripts-timed.json"
    dest.write_text(json.dumps(out, indent=2))
    print(f"\nwrote {dest}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
