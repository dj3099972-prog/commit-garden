import { plantSVG } from './plants.js';

const sampleCommits = [
  { sha: 'a1b2c3d4e5f6', message: 'feat: initial project scaffold', author: 'ada', date: '2025-01-05T10:00:00Z', parents: 1, additions: 120, deletions: 0 },
  { sha: 'b2c3d4e5f6a1', message: 'docs: add README with usage', author: 'grace', date: '2025-01-08T11:00:00Z', parents: 1, additions: 40, deletions: 2 },
  { sha: 'c3d4e5f6a1b2', message: 'feat: implement parser', author: 'ada', date: '2025-01-12T09:30:00Z', parents: 1, additions: 310, deletions: 10 },
  { sha: 'd4e5f6a1b2c3', message: 'fix: off-by-one in tokenizer', author: 'linus', date: '2025-01-15T14:00:00Z', parents: 1, additions: 8, deletions: 8 },
  { sha: 'e5f6a1b2c3d4', message: 'chore: bump deps', author: 'grace', date: '2025-01-20T08:00:00Z', parents: 1, additions: 12, deletions: 12 },
  { sha: 'f6a1b2c3d4e5', message: 'feat: add caching layer', author: 'ada', date: '2025-01-28T16:00:00Z', parents: 1, additions: 180, deletions: 25 },
  { sha: 'a7b8c9d0e1f2', message: 'merge: feature/parser into main', author: 'linus', date: '2025-02-02T10:00:00Z', parents: 2, additions: 500, deletions: 15 },
  { sha: 'b8c9d0e1f2a3', message: 'test: cover tokenizer edge cases', author: 'grace', date: '2025-02-06T13:00:00Z', parents: 1, additions: 220, deletions: 0 },
  { sha: 'c9d0e1f2a3b4', message: 'fix: memory leak in cache', author: 'linus', date: '2025-02-11T09:00:00Z', parents: 1, additions: 15, deletions: 30 },
  { sha: 'd0e1f2a3b4c5', message: 'feat: websocket updates', author: 'ada', date: '2025-02-18T17:00:00Z', parents: 1, additions: 260, deletions: 5 },
  { sha: 'e1f2a3b4c5d6', message: 'refactor: simplify render loop', author: 'grace', date: '2025-02-22T11:00:00Z', parents: 1, additions: 90, deletions: 140 },
  { sha: 'f2a3b4c5d6e7', message: 'docs: architecture notes', author: 'ada', date: '2025-03-01T10:00:00Z', parents: 1, additions: 75, deletions: 0 },
  { sha: 'a3b4c5d6e7f8', message: 'fix: race condition in ws handler', author: 'linus', date: '2025-03-05T15:00:00Z', parents: 1, additions: 22, deletions: 18 },
  { sha: 'b4c5d6e7f8a9', message: 'feat: export to SVG', author: 'ada', date: '2025-03-12T12:00:00Z', parents: 1, additions: 340, deletions: 10 },
  { sha: 'c5d6e7f8a9b0', message: 'chore: lint config', author: 'grace', date: '2025-03-18T09:00:00Z', parents: 1, additions: 30, deletions: 20 },
  { sha: 'd6e7f8a9b0c1', message: 'feat: dark mode garden', author: 'linus', date: '2025-03-25T18:00:00Z', parents: 1, additions: 150, deletions: 60 },
  { sha: 'e7f8a9b0c1d2', message: 'test: visual regression suite', author: 'grace', date: '2025-04-02T10:30:00Z', parents: 1, additions: 400, deletions: 0 },
  { sha: 'f8a9b0c1d2e3', message: 'fix: flaky timezone test', author: 'ada', date: '2025-04-08T14:00:00Z', parents: 1, additions: 12, deletions: 6 },
  { sha: 'a9b0c1d2e3f4', message: 'merge: release/1.0 into main', author: 'linus', date: '2025-04-15T11:00:00Z', parents: 2, additions: 800, deletions: 45 },
  { sha: 'b0c1d2e3f4a5', message: 'feat: plugin API', author: 'ada', date: '2025-04-22T16:30:00Z', parents: 1, additions: 290, deletions: 12 },
  { sha: 'c1d2e3f4a5b6', message: 'docs: plugin author guide', author: 'grace', date: '2025-04-29T09:00:00Z', parents: 1, additions: 110, deletions: 0 },
  { sha: 'd2e3f4a5b6c7', message: 'fix: plugin sandbox escape', author: 'linus', date: '2025-05-06T13:00:00Z', parents: 1, additions: 45, deletions: 20 },
  { sha: 'e3f4a5b6c7d8', message: 'feat: seasonal themes', author: 'ada', date: '2025-05-14T10:00:00Z', parents: 1, additions: 210, deletions: 8 },
  { sha: 'f4a5b6c7d8e9', message: 'chore: upgrade to es2024', author: 'grace', date: '2025-05-20T08:00:00Z', parents: 1, additions: 60, deletions: 70 },
  { sha: 'a5b6c7d8e9f0', message: 'test: theme snapshot tests', author: 'linus', date: '2025-05-27T15:00:00Z', parents: 1, additions: 180, deletions: 5 },
  { sha: 'b6c7d8e9f0a1', message: 'feat: sound garden ambience', author: 'ada', date: '2025-06-03T19:00:00Z', parents: 1, additions: 320, deletions: 15 },
  { sha: 'c7d8e9f0a1b2', message: 'fix: audio context leak', author: 'linus', date: '2025-06-09T11:00:00Z', parents: 1, additions: 18, deletions: 24 },
  { sha: 'd8e9f0a1b2c3', message: 'docs: performance tuning', author: 'grace', date: '2025-06-15T10:00:00Z', parents: 1, additions: 95, deletions: 0 },
  { sha: 'e9f0a1b2c3d4', message: 'feat: share gardens as URL', author: 'ada', date: '2025-06-22T14:00:00Z', parents: 1, additions: 140, deletions: 5 },
  { sha: 'f0a1b2c3d4e5', message: 'fix: URL encoding of long repos', author: 'linus', date: '2025-06-28T09:00:00Z', parents: 1, additions: 10, deletions: 4 },
];

const SKY_TONES = ['#bfe3f2', '#cdeedd', '#f6e3c9', '#e8d5f0'];

const sky = document.getElementById('sky');
const wrap = document.getElementById('garden-wrap');
const panel = document.getElementById('panel');
const panelContent = document.getElementById('panel-content');
const statusEl = document.createElement('div');
statusEl.id = 'status';

function setStatus(msg) {
  statusEl.textContent = msg;
  if (!statusEl.isConnected) wrap.appendChild(statusEl);
}
function clearStatus() { statusEl.remove(); }

// Normalize commits from any source into { sha, message, author, date, parents, additions, deletions }.
function normalizeGitHubCommit(c) {
  return {
    sha: c.sha,
    message: c.commit.message.split('\n')[0],
    author: c.commit.author.name,
    date: c.commit.author.date,
    parents: c.parents.length,
    additions: c.stats?.additions ?? null,
    deletions: c.stats?.deletions ?? null,
    url: c.html_url,
  };
}

async function fetchGitHubRepo(repo) {
  setStatus(`Fetching commits for ${repo}…`);
  const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=100`);
  if (!res.ok) throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data) || !data.length) throw new Error('No commits found (private repo?).');
  return data.map(normalizeGitHubCommit).reverse(); // oldest → newest
}

function renderGarden(commits) {
  wrap.querySelectorAll('.plant, .plant-label').forEach((el) => el.remove());
  document.getElementById('panel').hidden = true;

  const n = commits.length;
  const oldest = new Date(commits[0].date).getTime();
  const newest = new Date(commits[n - 1].date).getTime();
  const span = Math.max(newest - oldest, 1);

  commits.forEach((c, i) => {
    const t = (new Date(c.date).getTime() - oldest) / span; // 0..1
    const sizeHint = c.additions != null && c.deletions != null
      ? Math.min(1, (c.additions + c.deletions) / 800)
      : 0.5;
    const enriched = { ...c, size: sizeHint };

    const el = document.createElement('div');
    el.className = 'plant';
    el.style.left = `${4 + t * 92}%`;
    el.style.zIndex = String(Math.round(t * 10));
    // Slight vertical jitter so plants don't overlap into a flat line.
    const jitter = ((hashJitter(c.sha) % 100) / 100 - 0.5) * 46;
    el.style.bottom = `${84 + Math.max(0, jitter)}px`;
    el.innerHTML = plantSVG(enriched);

    const label = document.createElement('div');
    label.className = 'plant-label';
    label.textContent = c.message.length > 34 ? c.message.slice(0, 34) + '…' : c.message;
    el.appendChild(label);

    el.addEventListener('click', () => showCommit(c));
    wrap.appendChild(el);
  });
}

function hashJitter(sha) {
  let h = 0;
  for (const ch of sha) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

function showCommit(c) {
  panel.hidden = false;
  const kind = c.parents > 1 ? 'merge commit' : '';
  panelContent.innerHTML = `
    <button id="panel-close" aria-label="close">×</button>
    <h2>${escapeHtml(c.message)}</h2>
    <div class="sha">${c.sha.slice(0, 12)}</div>
    <div class="meta">
      <div><b>Author:</b> ${escapeHtml(c.author)}</div>
      <div><b>Date:</b> ${new Date(c.date).toLocaleString()}</div>
      ${c.additions != null ? `<div><b>Diff:</b> +${c.additions} / −${c.deletions}</div>` : '<div><b>Diff:</b> <i>click plant again later for stats (not fetched)</i></div>'}
      ${kind ? `<div><b>Type:</b> ${kind}</div>` : ''}
      ${c.url ? `<div><a href="${c.url}" target="_blank" rel="noopener">View on GitHub ↗</a></div>` : ''}
    </div>`;
  document.getElementById('panel-close').addEventListener('click', () => { panel.hidden = true; });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

document.getElementById('repo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const repo = document.getElementById('repo-input').value.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');
  if (!repo.includes('/')) { setStatus('Enter a repo as owner/name'); return; }
  try {
    const commits = await fetchGitHubRepo(repo);
    document.body.style.setProperty('--sky-top', SKY_TONES[commits.length % SKY_TONES.length]);
    renderGarden(commits);
    clearStatus();
  } catch (err) {
    setStatus(err.message);
  }
});

document.getElementById('sample-btn').addEventListener('click', () => {
  renderGarden(sampleCommits);
  clearStatus();
});

// Plant the sample garden by default so the page is never empty.
renderGarden(sampleCommits);
