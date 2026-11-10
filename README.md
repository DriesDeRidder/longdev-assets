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

Any static host works. Cloudflare Pages or GitHub Pages: point it at this folder, no build command, output directory `/`.
