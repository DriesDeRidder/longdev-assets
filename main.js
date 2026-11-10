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
  if (S.links.store) heroLinks.append(el("a", { className: "btn primary", href: S.links.store, textContent: "Visit the Asset Store page" }));
  heroLinks.append(el("a", { className: "btn" + (S.links.store ? "" : " primary"), href: "#assets", textContent: "Browse the assets" }));
  heroLinks.append(el("a", { className: "btn", href: "#roadmap", textContent: "See what's next" }));

  for (const item of S.roadmap.slice(0, 3)) {
    $("now-bars").append(
      el("li", {}, [
        el("div", { className: "row" }, [el("span", { textContent: item.name }), hiddenText(S.stages[item.stage])]),
        stageBar(item.stage),
      ])
    );
  }

  // ---------- assets ----------
  const placeholder = (shot) => {
    shot.classList.add("blank");
    shot.replaceChildren(line(62), line(100, true), line(28));
  };

  const grid = $("asset-grid");
  for (const a of S.assets) {
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

    const card = el("li", { className: "asset" }, [
      shot,
      el("div", { className: "asset-body" }, [
      el("h3", {}, [a.name, el("span", { className: `status ${a.category === "free" ? "free" : a.status}`, textContent: a.category === "free" ? "Free" : STATUS[a.status] })]),
      el("p", { textContent: a.summary }),
      el("ul", { className: "facts" }, a.facts.map((f) => el("li", { textContent: f }))),
      a.url
        ? el("a", {
            className: "go",
            href: a.url,
            target: "_blank",
            rel: "noopener",
            textContent: a.url.includes("github.com") ? "View on GitHub" : "View on the Asset Store",
          })
        : null,
      ]),
    ]);
    card.dataset.category = a.category;
    if (a.image !== false) card.style.setProperty("--art", `url("${a.image || `img/${a.slug}.jpg`}")`);
    grid.append(card);
  }

  const filters = $("filters");
  const used = new Set(S.assets.map((a) => a.category));
  for (const [key, label] of FILTERS) {
    if (key !== "all" && !used.has(key)) continue;
    const b = el("button", { type: "button", textContent: label });
    b.setAttribute("aria-pressed", key === "all");
    b.addEventListener("click", () => {
      for (const x of filters.children) x.setAttribute("aria-pressed", x === b);
      for (const c of grid.children) c.hidden = key !== "all" && c.dataset.category !== key;
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
  $("foot-text").textContent = `${S.brand}, made by ${S.name} in Belgium.`;
  const fl = $("foot-links");
  const add = (href, text) => href && fl.append(el("a", { href, textContent: text }));
  add(S.links.store, "Asset Store");
  add(S.links.github, "GitHub");
  add(S.links.discord, "Discord");
  add(S.links.email && `mailto:${S.links.email}`, "Email for support");
})();
