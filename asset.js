// Detail page for one asset: asset.html?a=<slug>. Everything comes from data.js (asset.detail).
(() => {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const el = (tag, props = {}, children = []) => {
    const n = document.createElement(tag);
    Object.assign(n, props);
    for (const c of [].concat(children)) if (c != null) n.append(c);
    return n;
  };
  const STATUS = { live: "On the store", review: "In review", soon: "Coming soon", building: "In progress" };

  const slug = new URLSearchParams(location.search).get("a");
  const a = S.assets.find((x) => x.slug === slug);
  const main = $("detail");

  if (!a) {
    document.title = `Asset not found | ${S.brand}`;
    main.append(
      el("section", { className: "block" }, [
        el("h1", { className: "detail-title", textContent: "Asset not found" }),
        el("p", { className: "lede", textContent: "That link doesn't match any LongDev asset." }),
        el("p", {}, el("a", { className: "btn primary", href: "./#assets", textContent: "See all assets" })),
      ])
    );
  } else {
    const d = a.detail || {};
    const image = a.image === false ? null : a.image || `img/${a.slug}.jpg`;
    document.title = `${a.name} | ${S.brand}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = a.summary;

    // ---------- head: art left, name, status, summary, facts and the actions right ----------
    const shot = el("div", { className: "shot detail-shot" });
    if (image) {
      const img = new Image();
      img.alt = `${a.name} cover image`;
      img.src = image;
      img.onerror = () => shot.remove();
      shot.append(img);
    }

    const status = a.category === "free" ? "Free" : STATUS[a.status];
    const actions = el("div", { className: "hero-links" });
    if (a.url) {
      actions.append(
        el("a", {
          className: "btn primary",
          href: a.url,
          target: "_blank",
          rel: "noopener",
          textContent: a.url.includes("github.com") ? "View on GitHub" : "View on the Asset Store",
        })
      );
    }
    if (S.links.email) {
      actions.append(
        el("a", {
          className: "btn" + (a.url ? "" : " primary"),
          href: `mailto:${S.links.email}?subject=${encodeURIComponent(a.name)}`,
          textContent: a.url ? "Ask a question" : "Ask about it",
        })
      );
    }

    main.append(
      el("section", { className: "block detail-head" }, [
        el("a", { className: "back", href: "./#assets", textContent: "← All assets" }),
        el("div", { className: "detail-grid" }, [
          shot,
          el("div", { className: "detail-intro" }, [
            el("h1", { className: "detail-title", textContent: a.name }),
            el("span", { className: `status ${a.category === "free" ? "free" : a.status}`, textContent: status }),
            el("p", { className: "lede", textContent: d.tagline || a.summary }),
            el("ul", { className: "facts" }, a.facts.map((f) => el("li", { textContent: f }))),
            actions,
          ]),
        ]),
      ])
    );

    // ---------- the three questions, each a numbered glass panel; empty ones are left out ----------
    const story = [
      ["solves", "What it solves"],
      ["why", "Why I made it"],
      ["trust", "Why you can rely on it"],
    ].filter(([key]) => d[key] && d[key].length);

    if (story.length) {
      const list = el("ol", { className: "story" });
      story.forEach(([key, title], i) => {
        const body = [].concat(d[key]);
        const content =
          key === "trust"
            ? el("ul", { className: "proof" }, body.map((t) => el("li", { textContent: t })))
            : body.map((t) => el("p", { textContent: t }));
        list.append(
          el("li", { className: "panel story-item" }, [
            el("span", { className: "story-num", textContent: String(i + 1).padStart(2, "0") }),
            el("div", {}, [el("h2", { textContent: title })].concat(content)),
          ])
        );
      });
      main.append(el("section", { className: "block story-block", ariaLabel: `About ${a.name}` }, list));
    }

    // ---------- features ----------
    if (d.features && d.features.length) {
      main.append(
        el("section", { className: "block" }, [
          el("div", { className: "block-head" }, el("h2", { textContent: "What's in it" })),
          el("ul", { className: "feature-list" }, d.features.map((f) => el("li", { className: "panel", textContent: f }))),
        ])
      );
    }

    // ---------- other assets ----------
    const others = S.assets.filter((x) => x !== a);
    if (others.length) {
      main.append(
        el("section", { className: "block" }, [
          el("div", { className: "block-head" }, el("h2", { textContent: "More from LongDev" })),
          el(
            "ul",
            { className: "others" },
            others.map((o) =>
              el("li", {}, el("a", { className: "btn", href: `asset.html?a=${encodeURIComponent(o.slug)}`, textContent: o.name }))
            )
          ),
        ])
      );
    }
  }

  // ---------- footer (same as the homepage) ----------
  $("foot-text").textContent = `${S.brand}, made in Belgium.`;
  const fl = $("foot-links");
  const add = (href, text) => href && fl.append(el("a", { href, textContent: text }));
  add(S.links.store, "Asset Store");
  add(S.links.github, "GitHub");
  add(S.links.discord, "Support on Discord");
  add(S.links.email && `mailto:${S.links.email}`, "Email for support");
})();
