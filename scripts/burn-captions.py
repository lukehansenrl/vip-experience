"""
Convert Whisper word-level JSON into ASS subtitle with 3-word chunks (TikTok style).
Usage: python burn-captions.py <input.json> <output.ass>
"""
import json
import sys


def format_time(seconds: float) -> str:
    """Convert seconds -> ASS time format H:MM:SS.CS (centiseconds)."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h}:{m:02d}:{s:05.2f}"


def main(json_path: str, ass_path: str) -> None:
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    words = []
    for seg in data.get("segments", []):
        for w in seg.get("words", []):
            words.append(w)

    chunks = []
    i = 0
    while i < len(words):
        group = words[i : i + 3]
        if not group:
            break
        start = group[0]["start"]
        end = group[-1]["end"]
        text = " ".join(w["word"].strip() for w in group).strip().upper()
        chunks.append((start, end, text))
        i += 3

    # ASS styling: large bold white text with thick black outline,
    # positioned in the lower third (MarginV 300 for 1280px tall video).
    header = """[Script Info]
Title: Auto captions
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial Black,72,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,5,2,2,40,40,300,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

    events = [
        f"Dialogue: 0,{format_time(s)},{format_time(e)},Default,,0,0,0,,{t}"
        for s, e, t in chunks
    ]

    with open(ass_path, "w", encoding="utf-8") as f:
        f.write(header)
        f.write("\n".join(events))
        f.write("\n")

    print(f"wrote {len(chunks)} 3-word chunks -> {ass_path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
