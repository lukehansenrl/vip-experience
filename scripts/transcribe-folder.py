"""Transcribe every .wav file in a folder with Whisper base.en.

Usage: python scripts/transcribe-folder.py <audio_dir>
Writes <audio_dir>/transcripts.json keyed by filename.
"""

import json
import sys
from pathlib import Path

import whisper


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: transcribe-folder.py <audio_dir>", file=sys.stderr)
        return 1

    audio_dir = Path(sys.argv[1])
    if not audio_dir.is_dir():
        print(f"not a directory: {audio_dir}", file=sys.stderr)
        return 1

    wavs = sorted(audio_dir.glob("*.wav"))
    if not wavs:
        print(f"no wav files in {audio_dir}", file=sys.stderr)
        return 1

    print(f"loading whisper base.en...", flush=True)
    model = whisper.load_model("base.en")

    out: dict[str, str] = {}
    for i, w in enumerate(wavs, 1):
        print(f"[{i}/{len(wavs)}] {w.name}", flush=True)
        result = model.transcribe(str(w), language="en", fp16=False)
        out[w.name] = result.get("text", "").strip()

    dest = audio_dir / "transcripts.json"
    dest.write_text(json.dumps(out, indent=2))
    print(f"\nwrote {dest}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
