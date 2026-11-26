# commit-garden

**Grow a garden from your git history. Every commit is a plant.**

commit-garden reads a repository's commit history and plants it in a visual garden:

- `fix:` commits bloom into flowers
- `feat:` commits grow leafy trees
- `docs:` commits unfurl ferns
- `test:` commits sprout mushrooms
- `chore:`/`build:` commits become mossy rocks
- merge commits grow into oaks
- each author gets a signature flower color
- bigger diffs grow bigger plants

Click any plant to inspect the commit. Fully client-side, zero dependencies — just Node's built-in `http` server plus the GitHub REST API.

![commit-garden](docs/screenshot.png)

## Run it

```bash
node server.js
# open http://localhost:3737
```

No `npm install` needed — there are no dependencies.

## Grow your own repo

Type `owner/repo` (e.g. `torvalds/linux`) into the box and hit **Plant**. The garden grows from the 100 most recent commits on the default branch. Works for any public GitHub repo — no token required.

Or hit **plant a sample garden** to see a fictional project's history bloom.

## How it works

```
public/
  index.html      page shell
  styles.css      sky, soil, and panel styling
  plants.js       deterministic SVG plant generator (seeded by commit SHA)
  app.js          GitHub API fetch, layout, commit inspector
  sample-data.js* (sample history lives inside app.js for now)
server.js         dependency-free static file server
```

Plant shape is derived deterministically from the commit SHA, so the same repo always grows the same garden. Position is the commit's date; size is its diff size.

## Ideas for v0.2

- season/weather based on day of week or commit frequency
- animated butterflies visiting flowers
- "garden health" score: fix commits vs feat commits ratio
- render gardens as shareable SVG/PNG exports
- support for non-GitHub forges (GitLab, Codeberg) via pluggable adapters

## License

MIT
