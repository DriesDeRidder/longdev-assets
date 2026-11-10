# LongDev site

Static site: `index.html`, `styles.css`, `main.js`, and all content in `data.js`. No build step.

## Edit content

Everything is in `data.js`:

- **Add an asset**: add an entry to `assets`, drop a 3:2 image at `img/<slug>.jpg` (840x560 works well; downscale the
  1950x1300 store cover). No image yet? The card falls back to the stacked-bar placeholder.
- **Release an asset**: set `status: "live"` and fill in `url` with the Asset Store page.
- **Roadmap**: entries are listed in priority order; the first three also appear in the hero. `stage` is an index into
  `stages` (0 Planned, 1 Building, 2 Testing, 3 Store review, 4 Live).
- **Links**: fill `links.store` with your publisher page and the hero gets an Asset Store button.

## Preview

Open `index.html` in a browser, or `python -m http.server` in this folder.

## Deploy

Hosted with GitHub Pages from the `main` branch, root folder (`.nojekyll` skips the Jekyll build).
Push to `main` and the site updates within a minute or two at https://driesderidder.com/LongDevSite/ (your user site's custom domain applies to project sites too).

The local Claude Code skill folders (`.agents/`, `.claude/`) are git-ignored so they are never published.
