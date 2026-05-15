"""
One-shot pipeline: transcribe a video with faster-whisper, generate
TikTok-style 3-word-chunk captions, and burn them into the video with
ffmpeg. Outputs a web-friendly H.264 MP4 to the target path.

Usage:
    python caption-booked-video.py <input.mp4> <output.mp4>

Designed for the VIP "Call Booked" welcome video on /booked. Captions
are sized + positioned for 1920x1080 horizontal video (lower third).
"""

import json
import subprocess
import sys
from pathlib import Path
from faster_whisper import WhisperModel


def format_time(seconds: float) -> str:
    """Convert seconds -> ASS time format H:MM:SS.CS (centiseconds)."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h}:{m:02d}:{s:05.2f}"


def transcribe(video_path: Path):
    """Run faster-whisper, return list of word dicts with start/end."""
    print(f"[1/3] transcribing {video_path.name} with faster-whisper (base.en model)")
    # base.en is ~150MB and fast on CPU. Upgrade to small/medium for accuracy.
    model = WhisperModel("base.en", device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        str(video_path),
        beam_size=5,
        word_timestamps=True,
        vad_filter=True,
    )
    words = []
    for seg in segments:
        if not seg.words:
            continue
        for w in seg.words:
            words.append({
                "word": w.word,
                "start": w.start,
                "end": w.end,
            })
    print(f"      -> {len(words)} words transcribed")
    return words


def make_ass(words, ass_path: Path):
    """Group words into 3-word chunks, write ASS subtitle file styled
    for 1920x1080 horizontal video. Lower-third position."""
    print(f"[2/3] writing ASS subtitles -> {ass_path.name}")
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

    # 1920x1080 reference frame. Font 64pt = ~6% of height, comfortable
    # on desktop and still readable on mobile when video scales down.
    # MarginV 120 from bottom = lower-third positioning.
    header = """[Script Info]
Title: Auto captions
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial Black,64,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,4,2,2,80,80,120,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

    events = [
        f"Dialogue: 0,{format_time(s)},{format_time(e)},Default,,0,0,0,,{t}"
        for s, e, t in chunks
    ]

    ass_path.write_text(header + "\n".join(events) + "\n", encoding="utf-8")
    print(f"      -> {len(chunks)} caption chunks")


def burn_captions(input_video: Path, ass_path: Path, output_video: Path):
    """Use ffmpeg to burn ASS subtitles into the video. Re-encodes H.264
    at a web-friendly bitrate so the output sits under Vercel's 100MB
    file limit even for 3-min 1080p clips."""
    print(f"[3/3] burning captions -> {output_video.name}")
    # ffmpeg's subtitles filter on Windows needs path with forward slashes
    # and the drive-letter colon escaped.
    ass_for_filter = str(ass_path.absolute()).replace("\\", "/").replace(":", "\\:")
    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(input_video),
        "-vf", f"subtitles='{ass_for_filter}'",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        str(output_video),
    ]
    print(f"      cmd: {' '.join(cmd)}")
    subprocess.run(cmd, check=True)
    size_mb = output_video.stat().st_size / (1024 * 1024)
    print(f"      -> {output_video.name} ({size_mb:.1f} MB)")


def main():
    if len(sys.argv) != 3:
        print("usage: caption-booked-video.py <input.mp4> <output.mp4>")
        sys.exit(1)

    input_video = Path(sys.argv[1])
    output_video = Path(sys.argv[2])

    if not input_video.exists():
        print(f"error: {input_video} not found")
        sys.exit(1)

    # Intermediate ASS file lives alongside the output so we can inspect
    # if anything looks off.
    ass_path = output_video.with_suffix(".ass")

    words = transcribe(input_video)
    if not words:
        print("error: transcription returned zero words. Aborting.")
        sys.exit(1)
    make_ass(words, ass_path)
    burn_captions(input_video, ass_path, output_video)

    print("\ndone.")


if __name__ == "__main__":
    main()
