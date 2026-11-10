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
Live at https://longdev-assets.com/ (the `CNAME` file sets the custom domain; don't delete it).
Push to `main` and the site updates within a minute or two.

DNS for longdev-assets.com: `A` records to 185.199.108.153 / .109 / .110 / .111.153, matching `AAAA` records
2606:50c0:8000::153 to 8003::153, and `www` as a `CNAME` to `driesderidder.github.io`.

The local Claude Code skill folders (`.agents/`, `.claude/`) are git-ignored so they are never published.
