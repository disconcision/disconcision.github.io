// The demo cards, made reorderable with Dragology. The static grid stays in the
// HTML as the no-JS version (and on touch screens, where dragging the grid would
// get in the way of scrolling, and in Safari); this measures it, then redraws the same cards
// inside a draggable, keeping the grid's columns.

import { createRoot } from "react-dom/client";
import { DraggableRenderer, translate } from "./dragology.js";
import { h, isWebKit, move, targetLines } from "./drag-shared.js";

const PAD = 10; // room around the cards for the hover tilt

const grid = document.querySelector(".demos");

// Rendered by React inside a foreignObject, so it keeps the page's CSS. The
// card's HTML (video and caption) is set once and left alone, so its video
// keeps playing through drags.
function Card({ spec, width, dragging }) {
  return h("a", {
    href: spec.href,
    // While dragged, a card wears its hover look whether or not the pointer is over it.
    className: dragging ? "card is-dragged" : "card",
    draggable: false,
    style: { width: `${width}px` },
    // the same object every render: React re-sets innerHTML whenever it gets a
    // new one, which would swap out the video mid-click
    dangerouslySetInnerHTML: spec.inner,
  });
}

// The grid's own columns: four, or two on narrow screens.
function layout(count, width, gaps, captionHeight) {
  const cols = matchMedia("(max-width: 560px)").matches ? 2 : 4;
  const w = (width - (cols - 1) * gaps.col) / cols;
  const hgt = w + captionHeight;
  const at = (i) => ({ x: (i % cols) * (w + gaps.col), y: Math.floor(i / cols) * (hgt + gaps.row) });
  const rows = Math.ceil(count / cols);
  return { cols, rows, w, h: hgt, at, height: rows * hgt + (rows - 1) * gaps.row };
}

function makeDraggable(specs, geo) {
  return ({ state, d, draggedId }) =>
    h(
      "g",
      {},
      ...state.order.map((id, i) => {
        const { x, y } = geo.at(i);
        return h(
          "g",
          {
            id,
            transform: translate(x + PAD, y + PAD),
            dragologyZIndex: draggedId === id ? "/1" : false,
            // An onClick here makes Dragology wait for real movement before
            // starting a drag, so a plain click still opens the demo.
            onClick: () => {},
            dragologyOnDrag: () => {
              const orders = state.order.map((_, j) => ({ order: move(state.order, i, j) }));
              // Far from the grid, the others close up the gap it left; dropped
              // there, the card swings back to where it was.
              const without = { order: state.order.filter((o) => o !== id) };
              return d
                .closest(orders)
                .whenFar(d.fixed(without).onDrop(state), { gap: 140 })
                .withFloating()
                .with(targetLines(orders, {
                  canvas: () => grid.querySelector("svg"),
                  // labels keep off the whole grid, not just the targets' heights
                  band: [0, geo.height + 2 * PAD],
                  // over the cards, so the lines and rings stay visible across them
                  over: true,
                }));
            },
          },
          h(
            "foreignObject",
            { width: geo.w, height: geo.h, style: { overflow: "visible" } },
            h(Card, { spec: specs[id], width: geo.w, dragging: draggedId === id }),
          ),
        );
      }),
    );
}

async function main() {
  // Only with a mouse or trackpad, and not in Safari: elsewhere the grid stays static.
  if (isWebKit || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  await document.fonts.ready;

  const cards = [...grid.querySelectorAll(":scope > a.card")];
  const first = cards[0].getBoundingClientRect();
  const captionHeight = first.height - first.width;
  const style = getComputedStyle(grid);
  const gaps = { col: parseFloat(style.columnGap), row: parseFloat(style.rowGap) };
  const specs = {};
  const ids = cards.map((a, i) => {
    const id = `card-${i}`;
    specs[id] = { href: a.getAttribute("href"), inner: { __html: a.innerHTML } };
    return id;
  });

  let state = { order: ids };
  const host = document.createElement("div");
  host.className = "cards-draggable";
  grid.replaceChildren(host);
  const root = createRoot(host);

  // Only play the clips that are on screen, as the static grid did.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause();
  });
  const watchVideos = () => host.querySelectorAll("video").forEach((v) => io.observe(v));

  const render = () => {
    const width = grid.clientWidth;
    const geo = layout(ids.length, width, gaps, captionHeight);
    root.render(
      h(DraggableRenderer, {
        draggable: makeDraggable(specs, geo),
        state,
        onDropState: (s) => { state = s; render(); },
        width: width + 2 * PAD,
        height: geo.height + 2 * PAD,
      }),
    );
    requestAnimationFrame(watchVideos);
  };
  render();
  new ResizeObserver(render).observe(grid);
}

main();
