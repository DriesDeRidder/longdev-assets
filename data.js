// All site content lives here. Edit this file to add an asset, change a status or move a roadmap item.
//
// asset.status: "live" | "review" | "building"
// asset.category: "tools" | "vr" | "art" | "free"   (filter buttons only appear for categories in use)
// asset.image: defaults to img/<slug>.jpg; set false to show the bar placeholder (no request).
// asset.url: Asset Store (or GitHub) page. Leave "" until the page exists; the card then shows no link.
// roadmap.stage: index into stages below (0 = Planned ... 4 = Live)

window.SITE = {
  brand: "LongDev",
  tagline: "Unity tools for the slow, repetitive parts of the job.",
  intro:
    "I build editor tools and VR utilities for Unity and sell them on the Asset Store as LongDev. Most of them started as something I needed on a real project.",

  links: {
    store: "", // TODO: your Asset Store publisher page, e.g. https://assetstore.unity.com/publishers/12345
    github: "", // leave empty: a personal GitHub link reveals your name
    discord: "", // TODO: support Discord invite, if you want it public
    email: "", // TODO: a LongDev address, e.g. support@longdev-assets.com (Cloudflare Email Routing)
  },

  about: [
    "I'm a Unity and VR developer from Belgium. My day job is building VR experiences and getting heavy production data, from BIM models to laser scans, running smoothly in Unity.",
    "That work keeps turning up the same chores: re-baking twenty scenes by hand, dragging one material onto fifty renderers, staring at a frozen progress bar. LongDev is where I turn those chores into tools that other developers can buy.",
    "Every tool follows the same rules. It is editor-only unless it has to ship. It works on Built-in, URP and HDRP. It has no native plugins, comes with a real manual and tests, and leaves your project the way it found it.",
  ],

  assets: [
    {
      name: "Batch Lightmap Baker",
      slug: "batch-lightmap-baker",
      category: "tools",
      status: "live",
      summary:
        "Bake lightmaps for every scene in one unattended run. Pre-flight checks, changed-only rebakes, webhooks when it finishes, and headless CI baking.",
      facts: ["v1.3", "Unity 6+", "Built-in, URP, HDRP"],
      url: "", // TODO: Asset Store page
    },
    {
      name: "MatSwap",
      slug: "matswap",
      category: "tools",
      status: "live",
      summary:
        "Assign and swap materials in place. Arm the slots you want to change, click a material in the palette, and it lands on the whole selection.",
      facts: ["Unity 2022.3+", "Any pipeline"],
      url: "", // TODO: Asset Store page
    },
    {
      name: "Scatterbrush",
      slug: "scatterbrush",
      category: "tools",
      status: "review",
      summary:
        "Paint and scatter prefabs on any mesh, not just Terrain. Exclusion zones filter by layer, so trees stay off the path while grass still grows on it.",
      facts: ["Unity 2022.3+", "Built-in, URP, HDRP"],
      url: "",
    },
    {
      name: "Ultimate Editor Progress Bar",
      slug: "progress-bar",
      category: "tools",
      status: "review",
      summary:
        "A progress window that keeps moving while Unity's main thread is frozen. Stacked tasks, ETA, cancel and taskbar progress, as a one-line swap for DisplayProgressBar.",
      facts: ["Unity 2022.3+", "Windows editor"],
      url: "",
    },
    {
      name: "VR Command Console",
      slug: "vr-command-console",
      category: "vr",
      status: "review",
      summary:
        "A radial debug menu for VR prototypes. Mark a method with [ConsoleCommand] and point, poke or shoot at it in the headset.",
      facts: ["Unity 2022.3+", "OpenXR, XRI 3"],
      url: "",
    },
    {
      name: "Nubis",
      slug: "nubis",
      category: "tools",
      status: "building",
      summary:
        "Convert LAS, LAZ, E57, PLY and PCD scans of any size inside Unity, then stream them under a fixed memory budget. 126 million points at 154 fps.",
      facts: ["Unity 6.3+", "URP, HDRP"],
      url: "",
    },
  ],

  stages: ["Planned", "Building", "Testing", "Store review", "Live"],

  // Ordered: what I'm working on first. The first three also appear at the top of the page.
  roadmap: [
    {
      name: "Nubis 1.0",
      stage: 2,
      note: "Waiting on a Meta Quest on-device run and a macOS player check before launch.",
    },
    {
      name: "Scatterbrush",
      stage: 3,
      note: "Submitted to the Asset Store and being validated by Unity.",
    },
    {
      name: "Ultimate Editor Progress Bar",
      stage: 3,
      note: "Rebuilt as an in-editor window so it meets Asset Store rules. Being validated by Unity.",
    },
    {
      name: "VR Command Console",
      stage: 3,
      note: "Submitted to the Asset Store and in review.",
    },
    {
      name: "Nubis 1.1: scan positions",
      stage: 0,
      note: "Keep each E57 scanner position after conversion, and jump the camera between them.",
    },
    {
      name: "VR Command Console: plain objects",
      stage: 0,
      note: "Register plain C# objects and ScriptableObjects, so services can expose commands too.",
    },
  ],
};
