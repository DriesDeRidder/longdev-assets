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
  const FILTERS = [
    ["all", "All"],
    ["tools", "Editor tools"],
    ["vr", "VR"],
    ["art", "Art"],
    ["free", "Free"],
  ];
  const LAST = S.stages.length - 1;

  // Roadmap stage as a segmented bar: one segment per stage, filled up to the current one.
  // It reads as "stage 3 of 5", not as a percentage, and carries its own label for screen readers.
  const stageBar = (stage) => {
    const live = stage >= LAST;
    const n = el("div", { className: "seg" + (live ? " done" : "") });
    n.style.setProperty("--stages", S.stages.length);
    n.setAttribute("role", "img");
    n.setAttribute("aria-label", `Stage ${stage + 1} of ${S.stages.length}: ${S.stages[stage]}`);
    S.stages.forEach((_, i) => {
      const s = el("i", { className: i < stage ? "on" : i === stage ? "on current" : "" });
      s.style.setProperty("--i", i);
      n.append(s);
    });
    return n;
  };

  // Continuous decorative bar, only used for placeholder art.
  const line = (pct, done = false) =>
    el("div", { className: "track" }, [
      Object.assign(el("div", { className: "fill" + (done ? " done" : "") }), { style: `--p:${pct}%` }),
    ]);

  const hiddenText = (text) => {
    const s = el("span", { textContent: text });
    s.setAttribute("aria-hidden", "true"); // the bar's aria-label already says it
    return s;
  };

  // ---------- hero ----------
  $("tagline").textContent = S.tagline;
  $("intro").textContent = S.intro;

  const heroLinks = $("hero-links");
  heroLinks.append(el("a", { className: "btn primary", href: "#assets", textContent: "Browse the assets" }));
  if (S.links.store) heroLinks.append(el("a", { className: "btn", href: S.links.store, target: "_blank", rel: "noopener", textContent: "Unity Asset Store \u2197" }));

  // Development status is a one-line link here; the full roadmap lives further down.
  const now = S.roadmap[0];
  if (now && $("hero-status")) {
    $("hero-status").append(
      el("span", { className: "pulse" }),
      el("span", { textContent: `Now building: ${now.name}` }),
      el("a", { href: "#roadmap", textContent: "See the roadmap" })
    );
  }

  // The demo loops on its own, except for visitors who asked for less motion: they get the poster and the controls.
  const video = $("demo-video");
  if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
    video.controls = true;
  }

  // ---------- assets ----------
  const placeholder = (shot) => {
    shot.classList.add("blank");
    shot.replaceChildren(line(62), line(100, true), line(28));
  };

  // Released assets first, so visitors see what they can use today; the rest sit under "Coming soon".
  // A browser can pair this script with a cached older index.html (Pages caches for 10 min): fall back to its single grid.
  const single = $("asset-grid");
  const grids = { live: $("grid-live") || single, soon: $("grid-soon") || single };
  for (const a of S.assets) {
    const released = a.status === "live";
    const shot = el("div", { className: "shot" });
    if (a.image === false) {
      placeholder(shot);
    } else {
      const img = new Image();
      img.alt = "";
      img.loading = "lazy";
      img.src = a.image || `img/${a.slug}.jpg`;
      img.onerror = () => placeholder(shot);
      shot.append(img);
    }

    // Every card reads the same way: title, status, one-line benefit, compatibility, actions on the bottom edge.
    // The name's link also stretches over the whole card (styles.css); the buttons sit above that overlay.
    const page = `asset.html?a=${encodeURIComponent(a.slug)}`;
    const actions = el("div", { className: "card-actions" }, [
      el("a", { className: "btn small" + (released ? " primary" : ""), href: page, textContent: released ? "View asset" : "Preview" }),
    ]);
    if (a.url) {
      actions.append(
        el("a", {
          className: "btn small",
          href: a.url,
          target: "_blank",
          rel: "noopener",
          textContent: a.url.includes("github.com") ? "GitHub \u2197" : "Unity Asset Store \u2197",
        })
      );
    } else if (!released && S.links.email) {
      actions.append(
        el("a", {
          className: "btn small",
          href: `mailto:${S.links.email}?subject=${encodeURIComponent(`Notify me: ${a.name}`)}&body=${encodeURIComponent(`Please email me when ${a.name} is on the Asset Store.`)}`,
          textContent: "Notify me",
        })
      );
    }
    for (const b of actions.children) b.setAttribute("aria-label", `${b.textContent.replace(" \u2197", "")}: ${a.name}`);

    const card = el("li", { className: "asset" }, [
      shot,
      el("div", { className: "asset-body" }, [
        el("h3", {}, el("a", { className: "card-link", href: page, textContent: a.name })),
        el("span", { className: `status ${a.category === "free" ? "free" : a.status}`, textContent: a.category === "free" ? "Free" : STATUS[a.status] }),
        el("p", { textContent: a.pitch || a.summary }),
        el("ul", { className: "facts", ariaLabel: "Compatibility" }, a.facts.map((f) => el("li", { textContent: f }))),
        actions,
      ]),
    ]);
    card.dataset.category = a.category;
    if (a.image !== false) card.style.setProperty("--art", `url("${a.image || `img/${a.slug}.jpg`}")`);
    grids[released ? "live" : "soon"].append(card);
  }
  // A group with nothing in it (nothing released yet, or filtered away) disappears with its heading.
  const syncGroups = () => {
    for (const key of ["live", "soon"]) {
      const g = $(`group-${key}`);
      if (g) g.hidden = ![...grids[key].children].some((c) => !c.hidden);
    }
  };
  syncGroups();

  const filters = $("filters");
  const used = new Set(S.assets.map((a) => a.category));
  for (const [key, label] of FILTERS) {
    if (key !== "all" && !used.has(key)) continue;
    const b = el("button", { type: "button", textContent: label });
    b.setAttribute("aria-pressed", key === "all");
    b.addEventListener("click", () => {
      for (const x of filters.children) x.setAttribute("aria-pressed", x === b);
      for (const g of new Set(Object.values(grids))) for (const c of g.children) c.hidden = key !== "all" && c.dataset.category !== key;
      syncGroups();
    });
    filters.append(b);
  }

  // ---------- roadmap ----------
  const scale = $("stage-scale");
  scale.style.setProperty("--stages", S.stages.length);
  for (const s of S.stages) scale.append(el("li", { textContent: s }));

  for (const r of S.roadmap) {
    $("roadmap-list").append(
      el("li", {}, [
        el("div", {}, [el("h3", { textContent: r.name }), el("p", { textContent: r.note })]),
        el("div", {}, [Object.assign(hiddenText(S.stages[r.stage]), { className: "stage-label" }), stageBar(r.stage)]),
      ])
    );
  }

  // ---------- about ----------
  for (const p of S.about) $("about-body").append(el("p", { textContent: p }));

  // ---------- footer ----------
  $("foot-text").textContent = S.brand;
  const fl = $("foot-links");
  const add = (href, text) => href && fl.append(el("a", { href, textContent: text }));
  add(S.links.store, "Asset Store");
  add(S.links.github, "GitHub");
  add(S.links.discord, "Support on Discord");
  add(S.links.email && `mailto:${S.links.email}`, "Email for support");
})();
