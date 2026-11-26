// Deterministic pseudo-random generator seeded by commit SHA.
function hashSeed(sha) {
  let h = 2166136261;
  for (let i = 0; i < sha.length; i++) {
    h ^= sha.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Classify a commit message into a plant archetype.
export function classify(message, parents = 1) {
  if (parents > 1) return 'oak';
  const m = message.toLowerCase();
  if (/^fix|^bug|hotfix|revert/.test(m)) return 'flower';
  if (/^feat|^add/.test(m)) return 'tree';
  if (/^doc|^readme|^comment/.test(m)) return 'fern';
  if (/^test|^spec/.test(m)) return 'mushroom';
  if (/^chore|^build|^ci|^refactor|^style/.test(m)) return 'rock';
  return 'moss';
}

// Stable palette per author name.
const PALETTES = [
  ['#e26d8c', '#f4a7bb'], // rose
  ['#f2b134', '#ffd98a'], // sunflower
  ['#8e6fd8', '#c3aef0'], // lavender
  ['#4fae62', '#9adcb0'], // leaf
  ['#e2703a', '#ffb07c'], // coral
  ['#3aa7a3', '#93d8d4'], // teal
  ['#d94f4f', '#ff9d9d'], // poppy
  ['#7d8a3c', '#c9cf8e'], // olive
];

function authorPalette(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const p = PALETTES[h % PALETTES.length];
  return { main: p[0], light: p[1] };
}

function leaf(rng, x, y, len, angle, color) {
  const tx = x + Math.cos(angle) * len;
  const ty = y - Math.sin(angle) * len;
  const w = len * 0.45;
  const px = Math.cos(angle + Math.PI / 2) * w;
  const py = Math.sin(angle + Math.PI / 2) * w;
  return `<path d="M${x},${y} Q${(x + tx) / 2 + px},${(y + ty) / 2 + py} ${tx},${ty} Q${(x + tx) / 2 - px},${(y + ty) / 2 - py} ${x},${y} Z" fill="${color}"/>`;
}

function flower(rng, x, y, petalColor, centerColor, size = 1) {
  const petals = 6;
  let svg = '';
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2 + rng() * 0.3;
    svg += `<ellipse cx="${x + Math.cos(a) * 7 * size}" cy="${y + Math.sin(a) * 7 * size}" rx="${4.5 * size}" ry="${7 * size}" fill="${petalColor}" transform="rotate(${(a * 180) / Math.PI + 90} ${x + Math.cos(a) * 7 * size} ${y + Math.sin(a) * 7 * size})"/>`;
  }
  svg += `<circle cx="${x}" cy="${y}" r="${4.5 * size}" fill="${centerColor}"/>`;
  return svg;
}

// Generate an SVG plant. opts: { sha, message, author, parents, size (0..1 recency/size hint) }
export function plantSVG(commit) {
  const rng = mulberry32(hashSeed(commit.sha));
  const kind = classify(commit.message, commit.parents);
  const { main, light } = authorPalette(commit.author);
  const s = 0.55 + (commit.size ?? 0.5) * 0.9; // scale
  const stemColor = '#3f7a3a';
  const stemW = 2.2 * s;
  const H = Math.round(60 * s);
  const W = Math.round(70 * s);

  let body = '';
  const cx = W / 2;

  switch (kind) {
    case 'oak': // merge commit — big tree
      body = `
        <rect x="${cx - 5 * s}" y="${H - 14 * s}" width="${10 * s}" height="${14 * s}" rx="2" fill="#7a5a3a"/>
        <line x1="${cx}" y1="${H - 14 * s}" x2="${cx}" y2="${H * 0.45}" stroke="${stemColor}" stroke-width="${4 * s}"/>
        <circle cx="${cx}" cy="${H * 0.35}" r="${16 * s}" fill="#2f6b33"/>
        <circle cx="${cx - 12 * s}" cy="${H * 0.48}" r="${11 * s}" fill="#3a7d3e"/>
        <circle cx="${cx + 12 * s}" cy="${H * 0.48}" r="${11 * s}" fill="#3a7d3e"/>
        <circle cx="${cx}" cy="${H * 0.28}" r="${7 * s}" fill="${light}" opacity="0.7"/>`;
      break;

    case 'tree': // feat — leafy tree with fruit
      body = `
        <rect x="${cx - 3.5 * s}" y="${H - 12 * s}" width="${7 * s}" height="${12 * s}" rx="2" fill="#8a6238"/>
        <line x1="${cx}" y1="${H - 12 * s}" x2="${cx}" y2="${H * 0.5}" stroke="${stemColor}" stroke-width="${3 * s}"/>
        <circle cx="${cx}" cy="${H * 0.38}" r="${13 * s}" fill="#3d8b40"/>
        <circle cx="${cx - 9 * s}" cy="${H * 0.5}" r="${9 * s}" fill="#4da34f"/>
        <circle cx="${cx + 9 * s}" cy="${H * 0.5}" r="${9 * s}" fill="#4da34f"/>
        ${flower(rng, cx - 6 * s, H * 0.34, main, '#fff7cc', 0.7 * s)}
        ${flower(rng, cx + 7 * s, H * 0.44, light, '#fff7cc', 0.55 * s)}`;
      break;

    case 'flower': // fix — flower on a stem
      body = `
        <line x1="${cx}" y1="${H}" x2="${cx}" y2="${H * 0.35}" stroke="${stemColor}" stroke-width="${stemW}"/>
        ${leaf(rng, cx, H * 0.7, 10 * s, 0.6, '#4da34f')}
        ${leaf(rng, cx, H * 0.55, 9 * s, Math.PI - 0.6, '#4da34f')}
        ${flower(rng, cx, H * 0.28, main, '#fff7cc', s)}`;
      break;

    case 'fern': // docs — feathery fronds
      body = Array.from({ length: 5 }, (_, i) => {
        const y = H - 6 * s - i * (10 * s);
        const spread = (i - 2) * 8 * s;
        return `<line x1="${cx}" y1="${H}" x2="${cx + spread}" y2="${y}" stroke="${stemColor}" stroke-width="${1.8 * s}"/>
                <ellipse cx="${cx + spread * 0.7}" cy="${y + 4 * s}" rx="${5 * s}" ry="${2.5 * s}" fill="#57a05a" transform="rotate(${spread > 0 ? 30 : -30} ${cx + spread * 0.7} ${y + 4 * s})"/>`;
      }).join('');
      break;

    case 'mushroom': // test — mushroom cluster
      body = `
        ${[0, 1, 2].map((i) => {
          const mx = cx + (i - 1) * 12 * s + (rng() - 0.5) * 6 * s;
          const mh = (14 + rng() * 10) * s;
          const mw = mh * 0.9;
          return `
            <rect x="${mx - 2 * s}" y="${H - mh}" width="${4 * s}" height="${mh}" rx="2" fill="#efe3c8"/>
            <path d="M${mx - mw / 2},${H - mh} A${mw / 2},${mh * 0.55} 0 0 1 ${mx + mw / 2},${H - mh} Z" fill="${i === 1 ? main : light}"/>`;
        }).join('')}`;
      break;

    case 'rock': // chore/build — stone with moss
      body = `
        <path d="M${cx - 14 * s},${H} Q${cx - 16 * s},${H - 16 * s} ${cx - 4 * s},${H - 20 * s} Q${cx + 8 * s},${H - 24 * s} ${cx + 15 * s},${H - 12 * s} Q${cx + 17 * s},${H} ${cx - 14 * s},${H} Z" fill="#9a9a92"/>
        <ellipse cx="${cx - 4 * s}" cy="${H - 18 * s}" rx="${8 * s}" ry="${4 * s}" fill="#6faf5c"/>
        <circle cx="${cx + 5 * s}" cy="${H - 8 * s}" r="${1.6 * s}" fill="#7c7c74"/>
        <circle cx="${cx - 8 * s}" cy="${H - 6 * s}" r="${1.3 * s}" fill="#7c7c74"/>`;
      break;

    default: // moss — low green blobs
      body = `
        <ellipse cx="${cx}" cy="${H - 6 * s}" rx="${16 * s}" ry="${7 * s}" fill="#5da75f"/>
        <ellipse cx="${cx - 10 * s}" cy="${H - 4 * s}" rx="${9 * s}" ry="${5 * s}" fill="#6fbf70"/>
        <ellipse cx="${cx + 11 * s}" cy="${H - 4.5 * s}" rx="${8 * s}" ry="${4.5 * s}" fill="#4c9450"/>
        ${flower(rng, cx + (rng() - 0.5) * 14 * s, H - 12 * s, light, '#fff7cc', 0.4 * s)}`;
      break;
  }

  return `<svg width="${W}" height="${H + 6}" viewBox="0 0 ${W} ${H + 6}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}
