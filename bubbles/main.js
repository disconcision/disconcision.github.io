// bubbles — an infinite canvas for exploring word-embedding space.
// Click to spawn a circle around a word; its nearest neighbors ring the
// periphery, angularly clustered by a 2-PC projection of their vectors.

const TAU = Math.PI * 2;

// ---------- tuning ----------
const DEFAULT_R = 170;
const MIN_R = 70, MAX_R = 620;
const ARC_PER_WORD = 95;        // world px of circumference per periphery slot
const POOL_SIZE = 350;          // neighbor candidates kept per bubble
const STOP_RANK = 150;          // skip this many top-frequency words as suggestions
const LENS_MIN = 0.285;         // adjusted min-cos-to-both for circles to intersect
const HUB_W = 2.0;              // hub penalty weight in lens scoring
const FAM_W = 0.85;             // weight of inflected-form probes vs the base word
const NONDICT_PEN = 0.07;       // lens demotion for words with no dictionary stem
const GAP_FILL_MIN = 0.26;      // min score for an in-between word
const FONT = '"Comic Sans MS","Chalkboard SE","Comic Neue",cursive';

const COL = {
  circle: '#4a5fd0',
  center: '#c95fde',
  label: '#e4e6ee',
  arrow: '#d99a3d',
  sim: '#e8b84b',
  lens: '#b678e8',
  purple: '#a24bdf',
  purpleDim: 'rgba(162,75,223,0.08)',
  bad: '#e04747',
};

// ---------- embeddings ----------
let WORDS = [], VECS = null, DIM = 100, N = 0;
let HUB = null;   // hubness: avg cosine to the common vocab; generic words score high
let RARE = null;  // graded penalty for deep-vocabulary words (name fragments, junk)
let DICT = null;  // 1 if the word (or a stem) is in the system dictionary
const INDEX = new Map();

async function loadEmbeddings(onProgress) {
  const meta = await (await fetch('data/meta.json')).json();
  DIM = meta.dim; N = meta.n;
  WORDS = await (await fetch('data/words.json')).json();
  const res = await fetch('data/vectors.i8');
  const total = +res.headers.get('content-length') || N * DIM;
  const reader = res.body.getReader();
  const buf = new Uint8Array(N * DIM);
  let off = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf.set(value, off); off += value.length;
    onProgress(off / total);
  }
  // int8 rows hold only directions; renormalizing recovers the unit vectors
  const q = new Int8Array(buf.buffer);
  VECS = new Float32Array(N * DIM);
  for (let i = 0; i < N; i++) {
    let s = 0;
    const o = i * DIM;
    for (let d = 0; d < DIM; d++) s += q[o + d] * q[o + d];
    const inv = s > 0 ? 1 / Math.sqrt(s) : 0;
    for (let d = 0; d < DIM; d++) VECS[o + d] = q[o + d] * inv;
  }
  WORDS.forEach((w, i) => INDEX.set(w, i));
  DICT = new Uint8Array(await (await fetch('data/dict.bin')).arrayBuffer());

  // all vectors are unit length, so mean-vector dot = average cosine. Use the
  // common (top-30k) words as the reference: that's what "generic" means.
  const nRef = Math.min(30000, N);
  const mean = new Float64Array(DIM);
  for (let i = 0; i < nRef; i++) {
    const v = vecOf(i);
    for (let d = 0; d < DIM; d++) mean[d] += v[d];
  }
  for (let d = 0; d < DIM; d++) mean[d] /= nRef;
  HUB = new Float32Array(N);
  RARE = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const v = vecOf(i);
    let s = 0;
    for (let d = 0; d < DIM; d++) s += v[d] * mean[d];
    HUB[i] = s;
    RARE[i] = 0.05 * Math.max(0, Math.log2(Math.max(i, 1) / 25000));
  }
}

const vecOf = i => VECS.subarray(i * DIM, (i + 1) * DIM);

function dot(a, b) {
  let s = 0;
  for (let d = 0; d < DIM; d++) s += a[d] * b[d];
  return s;
}

// ---------- morphology: keep "banks"/"banking" off the ring around "bank" ----------
function stems(w) {
  const out = new Set([w]);
  if (w.endsWith('ies') && w.length > 4) out.add(w.slice(0, -3) + 'y');
  for (const suf of ['ings', 'ing', 'ical', 'ics', 'edly', 'ers', 'ity', 'ed',
                     'es', 'ic', 'ly', 'er', 'al', 's', 'y']) {
    if (w.endsWith(suf) && w.length - suf.length >= 4) {
      const base = w.slice(0, -suf.length);
      out.add(base);
      if (base.length > 3 && base[base.length - 1] === base[base.length - 2]) {
        out.add(base.slice(0, -1));
      }
    }
  }
  return out;
}

function family(a, b) {
  if (a === b) return true;
  const sa = stems(a);
  for (const s of stems(b)) if (sa.has(s)) return true;
  return false;
}

// inflected forms present in the vocab — probes that carry a word's minority
// senses ("banked" knows the flight maneuver that "bank" has forgotten)
function familyForms(w) {
  const cands = [w, w + 's', w + 'es', w + 'ed', w + 'ing', w + 'd'];
  if (w.endsWith('e')) cands.push(w.slice(0, -1) + 'ing');
  if (w.endsWith('y')) cands.push(w.slice(0, -1) + 'ies', w.slice(0, -1) + 'ied');
  const last = w[w.length - 1];
  cands.push(w + last + 'ed', w + last + 'ing');
  const out = [];
  for (const f of cands) {
    if (INDEX.has(f) && !out.includes(f)) out.push(f);
    if (out.length >= 6) break;
  }
  return out;
}

// max over family probes of cosine, inflections discounted by FAM_W
function familySim(word) {
  const sims = new Float32Array(N);
  for (const f of familyForms(word)) {
    const w = f === word ? 1 : FAM_W;
    const fv = vecOf(INDEX.get(f));
    for (let i = 0; i < N; i++) {
      const s = w * dot(fv, vecOf(i));
      if (s > sims[i]) sims[i] = s;
    }
  }
  return sims;
}

// ---------- PCA (top 2 components, power iteration) ----------
function topPCs(vecs) {
  const n = vecs.length;
  const mean = new Float64Array(DIM);
  for (const v of vecs) for (let d = 0; d < DIM; d++) mean[d] += v[d];
  for (let d = 0; d < DIM; d++) mean[d] /= n;

  function iterate(prev) {
    let v = new Float64Array(DIM);
    for (let d = 0; d < DIM; d++) v[d] = Math.random() - 0.5;
    for (let it = 0; it < 30; it++) {
      const nv = new Float64Array(DIM);
      for (const x of vecs) {
        let c = 0;
        for (let d = 0; d < DIM; d++) c += (x[d] - mean[d]) * v[d];
        for (let d = 0; d < DIM; d++) nv[d] += c * (x[d] - mean[d]);
      }
      if (prev) {
        let p = 0;
        for (let d = 0; d < DIM; d++) p += nv[d] * prev[d];
        for (let d = 0; d < DIM; d++) nv[d] -= p * prev[d];
      }
      let len = Math.sqrt(nv.reduce((s, x) => s + x * x, 0)) || 1;
      for (let d = 0; d < DIM; d++) v[d] = nv[d] / len;
    }
    return v;
  }
  const pc1 = iterate(null);
  const pc2 = iterate(pc1);
  return { mean, pc1, pc2 };
}

// ---------- state ----------
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const measureCtx = document.createElement('canvas').getContext('2d');
let W = 0, H = 0, DPR = 1;

const cam = { x: 0, y: 0, scale: 1 };
const bubbles = [];
const pairs = new Map();      // "idA|idB" -> {key, a, b, words:[{i,word,score}]}
const graph = {               // the purple planar cluster
  nodes: new Map(),           // word -> {word, cell:[x,y]}
  grid: new Map(),            // "x,y" -> word
  edges: new Set(),           // "a|b" (sorted)
};
let nextId = 1;
let hits = [];                // clickable rects recorded during render (screen space)
let hover = null;
let pendingSpawn = null;      // {x, y} world point awaiting a typed word
const toasts = [];
const toastCooldown = new Map();
let gridFlash = 0;

const angNorm = a => { a %= TAU; return a < 0 ? a + TAU : a; };
function lerpAng(a, b, k) {
  let d = angNorm(b - a);
  if (d > Math.PI) d -= TAU;
  return angNorm(a + d * k);
}

const w2s = (x, y) => [(x - cam.x) * cam.scale + W / 2, (y - cam.y) * cam.scale + H / 2];
const s2w = (x, y) => [(x - W / 2) / cam.scale + cam.x, (y - H / 2) / cam.scale + cam.y];

function measure(word) {
  measureCtx.font = `13px ${FONT}`;
  return measureCtx.measureText(word).width;
}

// ---------- bubbles ----------
const targetK = r => Math.max(3, Math.min(48, Math.floor(TAU * r / ARC_PER_WORD)));

const mkItem = p => ({
  word: p.word, i: p.i, sim: p.sim, base: p.base,
  t: p.base, a: p.base, pinned: false, inserted: false, labelW: measure(p.word),
});

function createBubble(word, x, y, r = DEFAULT_R, savedItems = null) {
  const idx = INDEX.get(word);
  if (idx == null) return null;
  const famSim = familySim(word);
  const scored = [];
  for (let i = 0; i < N; i++) {
    if (i === idx || i < STOP_RANK) continue;
    const s = famSim[i] - 0.5 * RARE[i];
    if (s > 0.15) scored.push([s, i]);
  }
  scored.sort((a, b) => b[0] - a[0]);
  const pool = [];
  for (const [, i] of scored) {
    if (pool.length >= POOL_SIZE) break;
    if (family(word, WORDS[i])) continue;
    pool.push({ i, word: WORDS[i], sim: famSim[i] });
  }
  const { mean, pc1, pc2 } = topPCs(pool.map(p => vecOf(p.i)));
  for (const p of pool) {
    const v = vecOf(p.i);
    let d1 = 0, d2 = 0;
    for (let d = 0; d < DIM; d++) {
      d1 += (v[d] - mean[d]) * pc1[d];
      d2 += (v[d] - mean[d]) * pc2[d];
    }
    p.base = Math.atan2(d2, d1);
  }
  const b = {
    id: nextId++, word, idx, x, y, r, pool, items: [], famSim,
    simTop: pool[0] ? pool[0].sim : 1, born: performance.now(),
  };
  if (savedItems) {
    const byWord = new Map(pool.map(p => [p.word, p]));
    for (const si of savedItems) {
      const p = byWord.get(si.word);
      if (!p) continue;
      const it = mkItem(p);
      it.t = it.a = si.t;
      it.pinned = !!si.pinned;
      it.inserted = !!si.inserted;
      b.items.push(it);
    }
  } else {
    chooseVisible(b);
  }
  bubbles.push(b);
  return b;
}

function chooseVisible(b) {
  const K = targetK(b.r);
  const keep = new Map(b.items.map(it => [it.word, it]));
  const chosen = [];
  const clash = w => chosen.some(c => family(c.word, w));
  for (const p of b.pool) {
    if (chosen.length >= K) break;
    if (clash(p.word)) continue;
    chosen.push(keep.get(p.word) || mkItem(p));
  }
  for (const it of b.items) {
    if ((it.pinned || it.inserted) && !chosen.includes(it) && !clash(it.word)) chosen.push(it);
  }
  b.items = chosen;
  relaxAngles(b);
}

// angular footprint of a label box along the ring tangent at angle theta
function extentOf(it, theta) {
  const w = it.labelW + 18, h = 22;
  return (w * Math.abs(Math.sin(theta)) + h * Math.abs(Math.cos(theta))) / 2;
}
const minGap = (b, i, j) => (extentOf(i, i.t) + extentOf(j, j.t)) / b.r + 0.04;

function relaxAngles(b) {
  const items = b.items;
  if (items.length <= 1) return;

  // shed lowest-value words if the ring physically can't fit them
  const needTotal = () => {
    const arr = [...items].sort((p, q) => angNorm(p.t) - angNorm(q.t));
    let s = 0;
    for (let k = 0; k < arr.length; k++) s += minGap(b, arr[k], arr[(k + 1) % arr.length]);
    return s;
  };
  while (items.length > 3 && needTotal() > TAU * 0.92) {
    let victim = null;
    for (const it of items) {
      if (it.pinned) continue;
      if (!victim || (it.inserted && !victim.inserted) ||
          (it.inserted === victim.inserted && it.sim < victim.sim)) victim = it;
    }
    if (!victim) break;
    items.splice(items.indexOf(victim), 1);
  }

  for (let iter = 0; iter < 140; iter++) {
    const arr = [...items].sort((p, q) => angNorm(p.t) - angNorm(q.t));
    let moved = false;
    for (let k = 0; k < arr.length; k++) {
      const A = arr[k], B = arr[(k + 1) % arr.length];
      let gap = angNorm(B.t) - angNorm(A.t);
      if (k === arr.length - 1) gap += TAU;
      const need = minGap(b, A, B);
      if (gap < need - 1e-4) {
        const push = need - gap;
        if (A.pinned && B.pinned) continue;
        if (A.pinned) B.t = angNorm(B.t + push);
        else if (B.pinned) A.t = angNorm(A.t - push);
        else { A.t = angNorm(A.t - push / 2); B.t = angNorm(B.t + push / 2); }
        moved = true;
      }
    }
    if (!moved) break;
  }
}

// pulled a word away? fill the opened arc with words close to BOTH flanks
function fillGaps(b) {
  if (b.items.length < 2) return;
  const slot = ARC_PER_WORD / b.r;
  const arr = [...b.items].sort((p, q) => angNorm(p.t) - angNorm(q.t));
  const visible = new Set(b.items.map(i => i.word));
  let added = false;
  for (let k = 0; k < arr.length; k++) {
    const A = arr[k], B = arr[(k + 1) % arr.length];
    let gap = angNorm(B.t) - angNorm(A.t);
    if (k === arr.length - 1) gap += TAU;
    const need = minGap(b, A, B);
    const cap = Math.min(3, Math.floor((gap - need) / slot));
    if (cap < 1 || gap < 1.7 * slot) continue;
    const va = vecOf(A.i), vb = vecOf(B.i);
    const cands = [];
    for (const p of b.pool) {
      if (visible.has(p.word)) continue;
      if (b.items.some(c => family(c.word, p.word))) continue;
      const v = vecOf(p.i);
      const s = Math.min(dot(v, va), dot(v, vb)) - 0.5 * HUB[p.i] - 0.5 * RARE[p.i];
      if (s >= GAP_FILL_MIN) cands.push([s, p]);
    }
    cands.sort((x, y) => y[0] - x[0]);
    const take = cands.slice(0, cap);
    take.forEach(([, p], j) => {
      const it = mkItem(p);
      it.inserted = true;
      it.t = it.a = angNorm(angNorm(A.t) + gap * (j + 1) / (take.length + 1));
      b.items.push(it);
      visible.add(p.word);
      added = true;
    });
  }
  if (added) relaxAngles(b);
}

function deleteBubble(b) {
  const i = bubbles.indexOf(b);
  if (i >= 0) bubbles.splice(i, 1);
  for (const key of [...pairs.keys()]) {
    const [x, y] = key.split('|').map(Number);
    if (x === b.id || y === b.id) pairs.delete(key);
  }
  scheduleSave();
}

// ---------- circle intersection (lens) ----------
function getPair(a, b) {
  const key = a.id < b.id ? `${a.id}|${b.id}` : `${b.id}|${a.id}`;
  let p = pairs.get(key);
  if (p) return p;
  // min over the two bubbles of the max-over-inflections similarity, demoting
  // generic hub words, deep-vocab junk, and non-dictionary name fragments
  const scored = [];
  for (let i = 0; i < N; i++) {
    if (i < STOP_RANK || i === a.idx || i === b.idx) continue;
    const s = Math.min(a.famSim[i], b.famSim[i])
      - HUB_W * HUB[i] - RARE[i] - (DICT[i] ? 0 : NONDICT_PEN);
    if (s > LENS_MIN - 0.1) scored.push([s, i]);
  }
  scored.sort((x, y) => y[0] - x[0]);
  const words = [];
  if (scored.length && scored[0][0] >= LENS_MIN) {
    const top = scored[0][0];
    for (const [s, i] of scored) {
      if (s < Math.max(LENS_MIN - 0.03, top - 0.1)) break;
      const w = WORDS[i];
      if (family(w, a.word) || family(w, b.word)) continue;
      if (words.some(x => family(x.word, w))) continue;
      words.push({ i, word: w, score: Math.min(a.famSim[i], b.famSim[i]) });
      if (words.length >= 6) break;
    }
  }
  p = { key, a, b, words };
  pairs.set(key, p);
  return p;
}

function lensLayout(p) {
  const { a, b } = p;
  const dx = b.x - a.x, dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  if (d < 1e-6 || d >= a.r + b.r) return null;
  const ux = dx / d, uy = dy / d;
  let mx, my;
  if (d <= Math.abs(a.r - b.r) + 4) {
    mx = (a.x + b.x) / 2; my = (a.y + b.y) / 2;
  } else {
    const da = (d * d + a.r * a.r - b.r * b.r) / (2 * d);
    mx = a.x + ux * da; my = a.y + uy * da;
  }
  const px = -uy, py = ux;
  // vesica half-height: only show as many words as fit inside the overlap
  const t = Math.hypot(mx - a.x, my - a.y);
  const half = Math.sqrt(Math.max(0, a.r * a.r - t * t));
  const m = Math.max(1, Math.min(p.words.length, Math.floor((half * 2 - 20) / 27)));
  return p.words.slice(0, m).map((w, k) => ({
    ...w,
    x: mx + px * ((k - (m - 1) / 2) * 27),
    y: my + py * ((k - (m - 1) / 2) * 27),
  }));
}

// dragged (or newly spawned) circles may not overlap unless they share words
function resolveOverlaps(moving, hard) {
  for (let iter = 0; iter < 3; iter++) {
    for (const other of bubbles) {
      if (other === moving) continue;
      const dx = moving.x - other.x, dy = moving.y - other.y;
      let d = Math.hypot(dx, dy);
      const minD = moving.r + other.r;
      if (d >= minD - 0.5) continue;
      const p = getPair(moving, other);
      if (p.words.length > 0) continue;
      if (d < 1e-3) d = 1e-3;
      const ux = dx / d, uy = dy / d;
      const k = hard ? 1 : 0.25;
      moving.x += ux * (minD - d) * k;
      moving.y += uy * (minD - d) * k;
      if (hard) toastOnce(p.key, (moving.x + other.x) / 2, (moving.y + other.y) / 2,
        'no words close to both');
    }
  }
}

function toastOnce(key, x, y, text) {
  const now = performance.now();
  if ((toastCooldown.get(key) || 0) > now - 1600) return;
  toastCooldown.set(key, now);
  toasts.push({ x, y, text, until: now + 1500, color: COL.bad });
}

// ---------- the purple planar graph ----------
const cellKey = c => `${c[0]},${c[1]}`;
const edgeKey = (a, b) => a < b ? `${a}|${b}` : `${b}|${a}`;

// words semantically adjacent to this clicked instance
function semNeighbors(hit) {
  if (hit.type === 'periph') return [hit.bubble.word];
  if (hit.type === 'lens') return [hit.pair.a.word, hit.pair.b.word];
  if (hit.type === 'center') {
    const out = hit.bubble.items.map(it => it.word);
    for (const p of pairs.values()) {
      if (p.a === hit.bubble || p.b === hit.bubble) {
        const d = Math.hypot(p.a.x - p.b.x, p.a.y - p.b.y);
        if (d < p.a.r + p.b.r) out.push(...p.words.map(w => w.word));
      }
    }
    return out;
  }
  return [];
}

function toggleWord(hit) {
  const w = hit.word;
  if (graph.nodes.has(w)) {
    const node = graph.nodes.get(w);
    graph.nodes.delete(w);
    graph.grid.delete(cellKey(node.cell));
    for (const e of [...graph.edges]) {
      const [x, y] = e.split('|');
      if (x === w || y === w) graph.edges.delete(e);
    }
    scheduleSave();
    return;
  }
  const sems = [...new Set(semNeighbors(hit))].filter(s => graph.nodes.has(s));
  let cell = null;
  if (graph.nodes.size === 0) {
    cell = [0, 0];
  } else if (sems.length === 0) {
    let maxX = -Infinity;
    for (const n of graph.nodes.values()) maxX = Math.max(maxX, n.cell[0]);
    cell = [maxX + 2, 0];
  } else {
    let best = null, bestScore = -1;
    for (const s of sems) {
      const [ax, ay] = graph.nodes.get(s).cell;
      for (const [dx, dy] of [[1, 0], [0, 1], [0, -1], [-1, 0]]) {
        const c = [ax + dx, ay + dy];
        if (graph.grid.has(cellKey(c))) continue;
        let score = 0;
        for (const s2 of sems) {
          const [bx, by] = graph.nodes.get(s2).cell;
          if (Math.abs(bx - c[0]) + Math.abs(by - c[1]) === 1) score++;
        }
        if (score > bestScore) { best = c; bestScore = score; }
      }
    }
    if (!best) { gridFlash = performance.now() + 900; return; }  // planar limit
    cell = best;
  }
  graph.nodes.set(w, { word: w, cell });
  graph.grid.set(cellKey(cell), w);
  for (const s of sems) graph.edges.add(edgeKey(w, s));
  scheduleSave();
}

// ---------- persistence ----------
let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const state = {
      cam,
      bubbles: bubbles.map(b => ({
        word: b.word, x: b.x, y: b.y, r: b.r,
        items: b.items.map(it => ({
          word: it.word, t: it.t, pinned: it.pinned, inserted: it.inserted,
        })),
      })),
      graph: {
        nodes: [...graph.nodes.values()].map(n => [n.word, n.cell]),
        edges: [...graph.edges],
      },
    };
    try { localStorage.setItem('bubbles-v1', JSON.stringify(state)); } catch {}
  }, 600);
}

function loadState() {
  let s;
  try { s = JSON.parse(localStorage.getItem('bubbles-v1')); } catch {}
  if (!s || !s.bubbles) return false;
  Object.assign(cam, s.cam);
  for (const sb of s.bubbles) createBubble(sb.word, sb.x, sb.y, sb.r, sb.items);
  for (const [w, cell] of s.graph?.nodes || []) {
    graph.nodes.set(w, { word: w, cell });
    graph.grid.set(cellKey(cell), w);
  }
  for (const e of s.graph?.edges || []) graph.edges.add(e);
  return s.bubbles.length > 0 || graph.nodes.size > 0;
}

function clearAll() {
  bubbles.length = 0;
  pairs.clear();
  graph.nodes.clear(); graph.grid.clear(); graph.edges.clear();
  cam.x = cam.y = 0; cam.scale = 1;
  try { localStorage.removeItem('bubbles-v1'); } catch {}
}

// ---------- spawn input overlay ----------
const input = document.getElementById('wordInput');

function openInput(wx, wy) {
  pendingSpawn = { x: wx, y: wy };
  positionInput();
  input.style.display = 'block';
  input.value = '';
  input.classList.remove('bad');
  input.placeholder = 'type a word…';
  input.focus();
}

function positionInput() {
  if (!pendingSpawn) return;
  const [sx, sy] = w2s(pendingSpawn.x, pendingSpawn.y);
  input.style.left = `${sx - 85}px`;
  input.style.top = `${sy - 18}px`;
}

function closeInput() {
  pendingSpawn = null;
  input.style.display = 'none';
}

input.addEventListener('keydown', e => {
  e.stopPropagation();
  if (e.key === 'Escape') { closeInput(); return; }
  if (e.key !== 'Enter' || !pendingSpawn) return;
  const w = input.value.trim().toLowerCase();
  if (!w) { closeInput(); return; }
  if (!INDEX.has(w)) {
    input.classList.remove('bad');
    void input.offsetWidth;                 // restart the shake animation
    input.classList.add('bad');
    input.value = '';
    input.placeholder = `“${w}” not in vocabulary`;
    return;
  }
  const b = createBubble(w, pendingSpawn.x, pendingSpawn.y);
  resolveOverlaps(b, true);
  closeInput();
  scheduleSave();
});

function spawnFrom(hit) {
  if (INDEX.get(hit.word) == null) return;
  let x, y;
  if (hit.type === 'periph') {
    const b = hit.bubble, a = hit.item.a;
    x = b.x + Math.cos(a) * (b.r + DEFAULT_R * 0.75);
    y = b.y + Math.sin(a) * (b.r + DEFAULT_R * 0.75);
  } else if (hit.type === 'lens') {
    const { a, b } = hit.pair;
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    let dx = hit.wx - mx, dy = hit.wy - my;
    const d = Math.hypot(dx, dy);
    if (d < 1e-3) { dx = 0; dy = -1; } else { dx /= d; dy /= d; }
    x = hit.wx + dx * DEFAULT_R * 0.9;
    y = hit.wy + dy * DEFAULT_R * 0.9;
  } else {
    return;
  }
  const nb = createBubble(hit.word, x, y);
  resolveOverlaps(nb, true);
  scheduleSave();
}

// ---------- hit testing ----------
function hitTest(sx, sy) {
  for (let k = hits.length - 1; k >= 0; k--) {
    const h = hits[k], r = h.rect;
    if (sx >= r[0] && sx <= r[0] + r[2] && sy >= r[1] && sy <= r[1] + r[3]) return h;
  }
  const [wx, wy] = s2w(sx, sy);
  for (let k = bubbles.length - 1; k >= 0; k--) {
    const b = bubbles[k];
    const d = Math.hypot(wx - b.x, wy - b.y);
    const tol = Math.max(10 / cam.scale, 6);
    if (Math.abs(d - b.r) <= tol) return { type: 'ring', bubble: b };
    if (d < b.r) return { type: 'bubble', bubble: b };
  }
  return { type: 'empty' };
}

// ---------- pointer interaction ----------
const ptr = {
  down: false, sx: 0, sy: 0, moved: false, mode: null,
  hit: null, shift: false, lastFill: 0, lastChoose: 0,
};

canvas.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  canvas.setPointerCapture(e.pointerId);
  ptr.down = true; ptr.moved = false; ptr.mode = null;
  ptr.sx = e.clientX; ptr.sy = e.clientY;
  ptr.shift = e.shiftKey;
  ptr.hit = hitTest(e.clientX, e.clientY);
  const b = ptr.hit.bubble;
  if (b && ptr.hit.type !== 'lens') {         // raise the touched bubble
    const i = bubbles.indexOf(b);
    if (i >= 0) { bubbles.splice(i, 1); bubbles.push(b); }
  }
});

canvas.addEventListener('pointermove', e => {
  if (!ptr.down) {
    hover = hitTest(e.clientX, e.clientY);
    canvas.style.cursor =
      hover.type === 'periph' || hover.type === 'lens' || hover.type === 'center' ? 'pointer' :
      hover.type === 'ring' ? 'crosshair' :
      hover.type === 'bubble' ? 'move' : 'default';
    return;
  }
  const dx = e.clientX - ptr.sx, dy = e.clientY - ptr.sy;
  if (!ptr.moved && Math.hypot(dx, dy) > 4) {
    ptr.moved = true;
    const t = ptr.hit.type;
    ptr.mode = t === 'periph' ? 'word'
      : t === 'center' || t === 'bubble' ? 'bubble'
      : t === 'ring' ? 'ring' : 'pan';
    if (ptr.mode === 'word') ptr.hit.item.pinned = true;
  }
  if (!ptr.moved) return;
  const now = performance.now();

  if (ptr.mode === 'pan') {
    cam.x -= (e.clientX - ptr.sx) / cam.scale;
    cam.y -= (e.clientY - ptr.sy) / cam.scale;
    positionInput();
  } else if (ptr.mode === 'bubble') {
    const b = ptr.hit.bubble;
    b.x += (e.clientX - ptr.sx) / cam.scale;
    b.y += (e.clientY - ptr.sy) / cam.scale;
    resolveOverlaps(b, true);
  } else if (ptr.mode === 'ring') {
    const b = ptr.hit.bubble;
    const [wx, wy] = s2w(e.clientX, e.clientY);
    b.r = Math.max(MIN_R, Math.min(MAX_R, Math.hypot(wx - b.x, wy - b.y)));
    if (now - ptr.lastChoose > 90) { chooseVisible(b); ptr.lastChoose = now; }
  } else if (ptr.mode === 'word') {
    const b = ptr.hit.bubble, it = ptr.hit.item;
    const [wx, wy] = s2w(e.clientX, e.clientY);
    it.t = it.a = Math.atan2(wy - b.y, wx - b.x);
    relaxAngles(b);
    if (now - ptr.lastFill > 160) { fillGaps(b); ptr.lastFill = now; }
  }
  ptr.sx = e.clientX; ptr.sy = e.clientY;
});

canvas.addEventListener('pointerup', e => {
  if (!ptr.down) return;
  ptr.down = false;
  if (ptr.moved) {
    if (ptr.mode === 'ring') { chooseVisible(ptr.hit.bubble); fillGaps(ptr.hit.bubble); }
    if (ptr.mode === 'word') fillGaps(ptr.hit.bubble);
    scheduleSave();
    return;
  }
  const h = ptr.hit;
  if (h.type === 'periph' || h.type === 'lens' || h.type === 'center') {
    if (ptr.shift && h.type !== 'center') spawnFrom(h);
    else toggleWord(h);
  } else if (h.type === 'empty') {
    const [wx, wy] = s2w(e.clientX, e.clientY);
    openInput(wx, wy);
  } else if (pendingSpawn) {
    closeInput();
  }
});

canvas.addEventListener('dblclick', e => {
  const h = hitTest(e.clientX, e.clientY);
  if (h.type === 'periph' || h.type === 'lens') spawnFrom(h);
});

canvas.addEventListener('contextmenu', e => {
  e.preventDefault();
  const h = hitTest(e.clientX, e.clientY);
  if (h.bubble) deleteBubble(h.bubble);
});

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  if (e.ctrlKey || e.metaKey) {
    const k = Math.exp(-e.deltaY * 0.01);
    const ns = Math.max(0.12, Math.min(5, cam.scale * k));
    const [wx, wy] = s2w(e.clientX, e.clientY);
    cam.x = wx - (e.clientX - W / 2) / ns;
    cam.y = wy - (e.clientY - H / 2) / ns;
    cam.scale = ns;
  } else {
    cam.x += e.deltaX / cam.scale;
    cam.y += e.deltaY / cam.scale;
  }
  positionInput();
  scheduleSave();
}, { passive: false });

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeInput();
    document.getElementById('help').classList.remove('show');
  }
});

document.getElementById('helpBtn').addEventListener('click', () =>
  document.getElementById('help').classList.toggle('show'));
document.getElementById('clearBtn').addEventListener('click', () => { clearAll(); });

// ---------- rendering ----------
function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function drawArrow(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hl = 6 / cam.scale;
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45));
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45));
  ctx.stroke();
}

function render() {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, H);
  hits = [];
  const now = performance.now();

  // world transform
  ctx.setTransform(DPR * cam.scale, 0, 0, DPR * cam.scale,
    DPR * (W / 2 - cam.x * cam.scale), DPR * (H / 2 - cam.y * cam.scale));

  // ghost circle while typing
  if (pendingSpawn) {
    ctx.strokeStyle = COL.circle;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5 / cam.scale;
    ctx.setLineDash([8 / cam.scale, 8 / cam.scale]);
    ctx.beginPath();
    ctx.arc(pendingSpawn.x, pendingSpawn.y, DEFAULT_R, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  for (const b of bubbles) {
    const grow = Math.min(1, (now - b.born) / 350);
    const ease = 1 - (1 - grow) * (1 - grow);
    ctx.globalAlpha = 0.25 + 0.75 * ease;

    // ring
    const ringHover = hover && (hover.type === 'ring') && hover.bubble === b;
    ctx.strokeStyle = COL.circle;
    ctx.lineWidth = (ringHover ? 2.6 : 1.6) / cam.scale;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * ease, 0, TAU);
    ctx.stroke();

    // center word
    const cf = Math.max(15, Math.min(34, b.r * 0.16));
    ctx.font = `${cf}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COL.center;
    ctx.fillText(b.word, b.x, b.y);
    const cw = ctx.measureText(b.word).width;
    {
      const [sx, sy] = w2s(b.x, b.y);
      const sw = (cw + 20) * cam.scale, sh = (cf + 14) * cam.scale;
      hits.push({ type: 'center', word: b.word, bubble: b,
        rect: [sx - sw / 2, sy - sh / 2, sw, sh], wx: b.x, wy: b.y });
    }

    // periphery words
    for (const it of b.items) {
      it.a = lerpAng(it.a, it.t, 0.22);
      const isHover = hover && hover.type === 'periph' && hover.item === it;
      const dirx = Math.cos(it.a), diry = Math.sin(it.a);
      const dotX = b.x + dirx * b.r * ease, dotY = b.y + diry * b.r * ease;
      const nsim = Math.max(0, Math.min(1, (it.sim - 0.3) / Math.max(0.05, b.simTop - 0.3)));

      // arrow from just outside the center label to the dot
      const exitX = (cw / 2 + 12) / Math.max(Math.abs(dirx), 1e-4);
      const exitY = (cf / 2 + 12) / Math.max(Math.abs(diry), 1e-4);
      const exit = Math.min(exitX, exitY, b.r * 0.8);
      ctx.strokeStyle = COL.arrow;
      ctx.globalAlpha = (isHover ? 0.95 : 0.28) * (0.25 + 0.75 * ease);
      ctx.lineWidth = 1.1 / cam.scale;
      drawArrow(b.x + dirx * exit, b.y + diry * exit,
        dotX - dirx * 7, dotY - diry * 7);

      if (isHover) {
        ctx.fillStyle = COL.sim;
        ctx.font = `11px ${FONT}`;
        ctx.textAlign = 'center';
        const midX = b.x + dirx * b.r * 0.55, midY = b.y + diry * b.r * 0.55;
        ctx.fillText(it.sim.toFixed(2), midX, midY - 9);
      }

      // dot on the circumference
      ctx.globalAlpha = (0.5 + 0.5 * nsim) * (0.25 + 0.75 * ease);
      ctx.fillStyle = isHover ? '#fff' : COL.label;
      ctx.beginPath();
      ctx.arc(dotX, dotY, (2.2 + 2 * nsim) / Math.sqrt(cam.scale), 0, TAU);
      ctx.fill();

      // label just outside the ring
      const lx = b.x + dirx * (b.r * ease + 13);
      const ly = b.y + diry * (b.r * ease + 13);
      ctx.font = `13px ${FONT}`;
      ctx.textBaseline = 'middle';
      let align, tx = lx;
      if (dirx > 0.35) align = 'left';
      else if (dirx < -0.35) align = 'right';
      else { align = 'center'; tx = lx + dirx * (it.labelW / 2); }
      ctx.textAlign = align;
      const ty = ly + diry * 6;
      ctx.fillStyle = isHover ? '#fff' : COL.label;
      ctx.globalAlpha = (0.45 + 0.55 * nsim) * (0.25 + 0.75 * ease);
      ctx.fillText(it.word, tx, ty);

      // screen-space hit rect covering label + dot
      const x0 = align === 'left' ? tx : align === 'right' ? tx - it.labelW : tx - it.labelW / 2;
      const [sx, sy] = w2s(x0, ty);
      const rect = [sx - 4 * cam.scale, sy - 9 * cam.scale,
        (it.labelW + 8) * cam.scale, 18 * cam.scale];
      const [dsx, dsy] = w2s(dotX, dotY);
      const rx0 = Math.min(rect[0], dsx - 5), ry0 = Math.min(rect[1], dsy - 5);
      hits.push({ type: 'periph', word: it.word, bubble: b, item: it,
        rect: [rx0, ry0,
          Math.max(rect[0] + rect[2], dsx + 5) - rx0,
          Math.max(rect[1] + rect[3], dsy + 5) - ry0],
        wx: lx, wy: ly });
    }
    ctx.globalAlpha = 1;
  }

  // lens words where circles intersect
  for (const p of pairs.values()) {
    if (!bubbles.includes(p.a) || !bubbles.includes(p.b)) continue;
    if (!p.words.length) continue;
    const placed = lensLayout(p);
    if (!placed) continue;
    for (const lw of placed) {
      const isHover = hover && hover.type === 'lens' && hover.word === lw.word &&
        hover.pair === p;
      ctx.font = `14px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isHover ? '#e0c0f8' : COL.lens;
      ctx.fillText(lw.word, lw.x, lw.y);
      if (isHover) {
        ctx.fillStyle = COL.sim;
        ctx.font = `10px ${FONT}`;
        ctx.fillText(lw.score.toFixed(2), lw.x, lw.y - 14);
      }
      const lwW = measure(lw.word) * 14 / 13;
      const [sx, sy] = w2s(lw.x, lw.y);
      hits.push({ type: 'lens', word: lw.word, pair: p,
        rect: [sx - (lwW / 2 + 5) * cam.scale, sy - 10 * cam.scale,
          (lwW + 10) * cam.scale, 20 * cam.scale],
        wx: lw.x, wy: lw.y });
    }
  }

  // ---------- screen-space overlays ----------
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  // purple outlines on selected words + links between semantically-adjacent picks
  const selInstances = new Map();  // word -> [ [cx,cy] ]
  for (const h of hits) {
    if (!graph.nodes.has(h.word)) continue;
    const r = h.rect;
    ctx.strokeStyle = COL.purple;
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.9;
    roundRect(ctx, r[0] - 3, r[1] - 2, r[2] + 6, r[3] + 4, 7);
    ctx.stroke();
    ctx.globalAlpha = 1;
    (selInstances.get(h.word) || selInstances.set(h.word, []).get(h.word))
      .push([r[0] + r[2] / 2, r[1] + r[3] / 2, r]);
  }
  ctx.strokeStyle = COL.purple;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1.3;
  for (const e of graph.edges) {
    const [wa, wb] = e.split('|');
    const as = selInstances.get(wa), bs = selInstances.get(wb);
    if (!as || !bs) continue;
    let best = null, bd = Infinity;
    for (const pa of as) for (const pb of bs) {
      const d = Math.hypot(pa[0] - pb[0], pa[1] - pb[1]);
      if (d < bd) { bd = d; best = [pa, pb]; }
    }
    if (best) {
      ctx.beginPath();
      ctx.moveTo(best[0][0], best[0][1]);
      ctx.lineTo(best[1][0], best[1][1]);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  drawGridPanel(now);
  drawToasts(now);
}

// polyomino view of the purple graph, bottom-left
function drawGridPanel(now) {
  const nodes = [...graph.nodes.values()];
  if (!nodes.length) return;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const n of nodes) {
    minX = Math.min(minX, n.cell[0]); maxX = Math.max(maxX, n.cell[0]);
    minY = Math.min(minY, n.cell[1]); maxY = Math.max(maxY, n.cell[1]);
  }
  const cw = 66, chh = 44;
  const gw = (maxX - minX + 1) * cw, gh = (maxY - minY + 1) * chh;
  const s = Math.min(1, (W * 0.35) / gw, (H * 0.35) / gh);
  const ox = 18, oy = H - 18 - gh * s;

  const cellPos = c => [ox + (c[0] - minX) * cw * s, oy + (c[1] - minY) * chh * s];

  // links between connected-but-not-adjacent cells
  ctx.strokeStyle = COL.purple;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  for (const e of graph.edges) {
    const [wa, wb] = e.split('|');
    const na = graph.nodes.get(wa), nb = graph.nodes.get(wb);
    if (!na || !nb) continue;
    if (Math.abs(na.cell[0] - nb.cell[0]) + Math.abs(na.cell[1] - nb.cell[1]) === 1) continue;
    const [ax, ay] = cellPos(na.cell), [bx, by] = cellPos(nb.cell);
    ctx.beginPath();
    ctx.moveTo(ax + cw * s / 2, ay + chh * s / 2);
    ctx.lineTo(bx + cw * s / 2, by + chh * s / 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const flashing = gridFlash > now;
  for (const n of nodes) {
    const [x, y] = cellPos(n.cell);
    ctx.fillStyle = COL.purpleDim;
    ctx.strokeStyle = flashing ? COL.bad : COL.purple;
    ctx.lineWidth = 1.5;
    roundRect(ctx, x + 2, y + 2, cw * s - 4, chh * s - 4, 8 * s);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ddd';
    let fs = 11.5 * s;
    measureCtx.font = `${fs}px ${FONT}`;
    const tw = measureCtx.measureText(n.word).width;
    if (tw > cw * s - 12) fs *= (cw * s - 12) / tw;
    ctx.font = `${fs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n.word, x + cw * s / 2, y + chh * s / 2);
  }
}

function drawToasts(now) {
  for (let i = toasts.length - 1; i >= 0; i--) {
    const t = toasts[i];
    if (t.until < now) { toasts.splice(i, 1); continue; }
    const [sx, sy] = w2s(t.x, t.y);
    ctx.globalAlpha = Math.min(1, (t.until - now) / 500);
    ctx.fillStyle = t.color;
    ctx.font = `13px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.text, sx, sy);
    ctx.globalAlpha = 1;
  }
}

// ---------- frame loop ----------
function frame() {
  // gently separate incompatible overlaps that arise indirectly
  const dragging = ptr.down && ptr.mode === 'bubble' ? ptr.hit.bubble : null;
  for (const b of bubbles) {
    if (b === dragging) continue;
    resolveOverlaps(b, false);
  }
  render();
  requestAnimationFrame(frame);
}

// ---------- boot ----------
function resize() {
  DPR = window.devicePixelRatio || 1;
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
}
window.addEventListener('resize', resize);
resize();

(async () => {
  const fill = document.getElementById('loadFill');
  await loadEmbeddings(p => { fill.style.width = `${Math.round(p * 100)}%`; });
  document.getElementById('loading').remove();
  if (!loadState()) document.getElementById('help').classList.add('show');

  // debug hooks for tuning thresholds from the console
  window.bubblesDebug = {
    nearest(word, k = 15) {
      const i = INDEX.get(word);
      if (i == null) return null;
      const v = vecOf(i), out = [];
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        out.push([dot(v, vecOf(j)), WORDS[j]]);
      }
      return out.sort((a, b) => b[0] - a[0]).slice(0, k)
        .map(([s, w]) => `${w} ${s.toFixed(3)}`);
    },
    between(wa, wb, k = 10) {
      const ia = INDEX.get(wa), ib = INDEX.get(wb);
      if (ia == null || ib == null) return null;
      const fa = familySim(wa), fb = familySim(wb), out = [];
      for (let j = 0; j < N; j++) {
        if (j === ia || j === ib) continue;
        out.push([Math.min(fa[j], fb[j]) - HUB_W * HUB[j] - RARE[j]
          - (DICT[j] ? 0 : NONDICT_PEN), WORDS[j]]);
      }
      return out.sort((a, b) => b[0] - a[0]).slice(0, k)
        .map(([s, w]) => `${w} ${s.toFixed(3)}`);
    },
    hub(w) { const i = INDEX.get(w); return i == null ? null : HUB[i]; },
    forms: familyForms,
    hits: () => hits.map(h => ({ type: h.type, word: h.word, rect: h.rect })),
  };
  requestAnimationFrame(frame);
})();
