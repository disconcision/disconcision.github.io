#!/usr/bin/env python3
"""Distill GloVe vectors into a compact vocab + normalized float32 matrix.

Usage: python3 tools/prepare_data.py <glove.gz> [n_words]

Input is the gensim-data glove-wiki-gigaword-* .gz (word2vec text format,
frequency-sorted). Keeps the first N purely-alphabetic lowercase words and
writes to data/:
  words.json   vocabulary, frequency-ordered
  vectors.i8   int8-quantized vector directions, row-major; each row is scaled
               to fill the int8 range and renormalized on load, so no scale
               factors are needed and cosine drift is ~1e-3
  dict.bin     one byte per word: 1 if the word (or a stem) is in the system
               dictionary — used to demote name-fragments in lens scoring
  meta.json    {dim, n}

Words with raw norm < 3.0 are dropped: degenerate GloVe vectors normalize to
noise directions that sit spuriously close to everything.
"""
import gzip
import json
import math
import re
import struct
import sys
from pathlib import Path

WORD_RE = re.compile(r"^[a-z]{2,18}$")
MIN_RAW_NORM = 3.0
DICT_PATH = "/usr/share/dict/words"

SUFFIXES = ["ings", "ing", "ical", "ics", "edly", "ers", "ity", "ed",
            "es", "ic", "ly", "er", "al", "s", "y"]


def stems(w):
    out = {w}
    if w.endswith("ies") and len(w) > 4:
        out.add(w[:-3] + "y")
    for suf in SUFFIXES:
        if w.endswith(suf) and len(w) - len(suf) >= 4:
            base = w[: -len(suf)]
            out.add(base)
            out.add(base + "e")
            if len(base) > 3 and base[-1] == base[-2]:
                out.add(base[:-1])
    return out


def main():
    src = Path(sys.argv[1])
    n_target = int(sys.argv[2]) if len(sys.argv) > 2 else 100000
    out_dir = Path(__file__).resolve().parent.parent / "data"
    out_dir.mkdir(exist_ok=True)

    try:
        dictionary = {w.strip().lower() for w in open(DICT_PATH, encoding="utf-8")}
    except OSError:
        dictionary = None
        print(f"warning: {DICT_PATH} not found; marking every word as dictionary-backed")

    words, rows, dropped = [], [], 0
    dim = None
    with gzip.open(src, "rt", encoding="utf-8", errors="ignore") as f:
        for line in f:
            parts = line.rstrip("\n").split(" ")
            if dim is None and len(parts) == 2:
                continue  # word2vec header line
            w = parts[0]
            if dim is None:
                dim = len(parts) - 1
            if not WORD_RE.match(w):
                continue
            vec = [float(x) for x in parts[1 : dim + 1]]
            n = math.sqrt(sum(v * v for v in vec))
            if n < MIN_RAW_NORM:
                dropped += 1
                continue
            rows.append([v / n for v in vec])
            words.append(w)
            if len(words) >= n_target:
                break

    with open(out_dir / "words.json", "w") as f:
        json.dump(words, f)
    with open(out_dir / "vectors.i8", "wb") as f:
        for row in rows:
            m = max(abs(v) for v in row) or 1.0
            f.write(struct.pack(f"{dim}b",
                                *(round(v / m * 127) for v in row)))
    with open(out_dir / "dict.bin", "wb") as f:
        f.write(bytes(
            1 if dictionary is None or (stems(w) & dictionary) else 0
            for w in words))
    with open(out_dir / "meta.json", "w") as f:
        json.dump({"dim": dim, "n": len(words)}, f)
    print(f"wrote {len(words)} words, dim={dim}, dropped {dropped} low-norm, "
          f"{(out_dir / 'vectors.i8').stat().st_size / 1e6:.1f} MB vectors")


if __name__ == "__main__":
    main()
