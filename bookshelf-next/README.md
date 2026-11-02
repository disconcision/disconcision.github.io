# Bookshelf

The root homepage uses the accepted two-row shelf, repaired transparent images, and audited book destinations. This directory contains its styles, interaction code, image derivatives, and editable source records. Local review pages and image-editing intermediates are excluded from version control.

Open `index-two-rows.html` or `index-one-row.html` through the site's existing local server. `bookshelf-two-rows.html` and `bookshelf-one-row.html` are standalone downloads with embedded images, styles, scripts and fonts. `image-comparisons.html` is also self-contained, including its transparent PNG downloads. `outline-review.html` shows the traced book faces and evidence for the new destinations.

The default shelf has four complete columns, centered within sixteen crates. The two-row version initially shows these eight:

| Top row | | | |
|---|---|---|---|
| Information Design Source Book (`bs3`) | Type One / Euclid (`bs4`) | Feynman lectures (`bs5`) | Sparse design/reference crate (`bs7`) |
| Architecture / mapping (`bs6`) | Macintosh / Excel boxes (`IMG_5023`) | Maxis / MacWrite boxes (`IMG_5026`) | Types / semantics (`IMG_5029`) |

Four more crates are to the left and four to the right. A compact, single-line hover hint says “↓ Drag down to unlock books”, with keyboard-specific wording on focus. It disappears during dragging and after enlargement. No persistent controls were added. Drag sideways to browse, drag down/up to enlarge/reduce (out to all eight columns, in to a single crate filling the width), then hover or focus a book to open its destination. On release, zoom eases to a whole number of columns and scrolling to a whole crate, carrying on in the drag's direction once it is 30% of the way to the next one. The shelf can receive keyboard focus: `+` / `-` step one column, `0` returns to the default four, and left/right arrows browse. Image-to-image spacing is unchanged.

## Images and duplicates

Source exports come from the user's repaired flattened PSDs in `bookshelf-review/bookshelf-photoshop/`. The original PSDs and lossless PNG exports are preserved. WebP images are high-quality display derivatives with transparency. The two black-crate green alternatives are separate review proposals, not used by the main previews. Their PNG book interiors retain exact original pixels; donor-crate backgrounds are conventionally composited. Scripts, masks and limitations are in `work/green-crates/` and `work/knuth-cleanup/`.

IMG_5027, IMG_5028 and IMG_5030 repeat bs6, bs9 and bs8 respectively. They add no identified titles; the first two also omit titles present in the retained versions. This leaves sixteen crates without a parity-only drop. See `data/redundancy.json` for the visual comparison inventory. A few isolated repeated books remain in otherwise distinct crates.

## Outlines and destinations

There are 211 linked faces: 147 existing and 64 newly added. Original outlines were mapped to the repaired image geometry, refined against visible edges, and retraced where generation changed the shapes. New outlines were manually traced with multiple vertices, including sloped and occluded boundaries, and checked with numbered overlays at native image coordinates. All coordinates are bounded and polygons have nonzero area.

All 211 destinations were audited after the user reported incorrect legacy Goodreads IDs. The audit opened every original destination and checked the final page's actual title and author, using a rendered browser where a JavaScript-only author site required it. It replaced 86 destinations, including 62 of the 65 Goodreads links. The three remaining Goodreads pages were readable and had matching title/author text. Replacements include dedicated author/publisher pages and clearly identified catalogue/book-preview fallbacks for out-of-print or inaccessible titles. A successful fetch or a title-looking URL slug alone was not accepted as verification.

The audit fixes all six reported failures: God & Golem, CCRU, Anatomy of Lisp, How Things Work in Your Home, The Way Life Works, and Handbook of Pictorial Symbols. It also corrects volume/edition mismatches and generic redirects discovered elsewhere. Talisnam uses the author homepage, freshly rendered and checked to contain the book link; the downstream Amazon listing is not represented as checked. `data/link-audit.json` records the old/new destination, disposition, and title/author evidence for every face. `work/link-audit/summary.json` contains totals. Audit overrides are applied only to exact crate/index/title matches, independently of polygon geometry.

## Rebuild

Run `python3 bookshelf-next/build.py` from the repository root to rebuild local previews. Add `--draft` to skip portable downloads and review pages. Add `--install` to update the root homepage with the accepted two-row shelf; it preserves all non-bookshelf content and behavior, including analytics. The build uses only Python's standard library and the checked-in source records and WebP assets. Image comparisons are optional and require the local editing intermediates.

Change `LAYOUT` in `build.py` to rearrange crates; it lists the top row followed by the bottom row. Source records are in `data/`; image coordinates use 1440×1440 for old crates and 2880×2880 for new crates. `crate-labels.json` supplies accessible crate descriptions. Rebuilding and installing do not publish the site.
