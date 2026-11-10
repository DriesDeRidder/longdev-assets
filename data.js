// All site content lives here. Edit this file to add an asset, change a status or move a roadmap item.
//
// asset.status: "live" | "review" | "building"
// asset.category: "tools" | "vr" | "art" | "free"   (filter buttons only appear for categories in use)
// asset.pitch: the one-line benefit on the homepage card (the summary is used on the asset's page).
// asset.facts: compatibility only (version, Unity, pipelines, platforms), shown as chips under the pitch.
// asset.image: defaults to img/<slug>.jpg; set false to show the bar placeholder (no request).
// asset.url: Asset Store (or GitHub) page. Leave "" until the page exists; the card then shows no link.
// asset.detail: the asset's page (asset.html?a=<slug>). tagline (optional, else summary), solves and why (paragraphs),
//   trust (short proof points), features (optional). Leave a part out and its section is hidden.
// roadmap.stage: index into stages below (0 = Planned ... 4 = Live)

window.SITE = {
  brand: "LongDev",
  tagline: "Unity tools for the slow, repetitive parts of the job.",
  intro:
    "I build editor tools and VR utilities for Unity and sell them on the Asset Store as LongDev. Most of them started as something I needed on a real project.",

  links: {
    store: "", // TODO: your Asset Store publisher page, e.g. https://assetstore.unity.com/publishers/12345
    github: "", // leave empty: a personal GitHub link reveals your name
    discord: "https://discord.gg/A6Pguan2es", // support server
    email: "support@longdev-assets.com", // Cloudflare Email Routing forwards this to a private inbox
  },

  about: [
    "I'm a Unity and VR developer from Belgium. My day job is building VR experiences and getting heavy production data, from BIM models to laser scans, running smoothly in Unity.",
    "That work keeps turning up the same chores: re-baking twenty scenes by hand, dragging one material onto fifty renderers, staring at a frozen progress bar. LongDev is where I turn those chores into tools that other developers can buy.",
    "Every tool follows the same rules: it stays out of your build unless it has to ship, uses no native plugins, comes with a manual, and leaves your project the way it found it. Supported Unity versions and render pipelines differ per tool, so each card lists its own.",
  ],

  assets: [
    {
      name: "Batch Lightmap Baker",
      slug: "batch-lightmap-baker",
      pitch: "Bake lightmaps for every scene in one unattended run.",
      category: "tools",
      status: "live",
      summary:
        "Bake lightmaps for every scene in one unattended run. Pre-flight checks, changed-only rebakes, webhooks when it finishes, and headless CI baking.",
      facts: ["v1.3", "Unity 6+", "Built-in, URP, HDRP"],
      url: "https://assetstore.unity.com/packages/tools/utilities/batch-lightmap-baker-381494",
      detail: {
        solves: [
          "Unity bakes lighting one scene at a time. On a project with many scenes that means opening each one, checking its Lighting Settings, pressing Generate, waiting, saving, and doing it all again before every release.",
          "Batch Lightmap Baker turns that into a profile: an ordered list of scenes, each with the Lighting Settings it should bake with. Review checks them first, Bake works through the list on its own, and the next run skips the scenes that haven't changed.",
        ],
        why: [
          "My day job is building VR experiences, and those projects have a lot of scenes. Re-baking twenty of them by hand before a build was the chore that started LongDev.",
        ],
        trust: [
          "On the Asset Store, now at version 1.3.",
          "Works in Built-in, URP and HDRP.",
          "Bakes headless from the command line, so it fits a CI build.",
          "Editor-only: nothing from it ends up in your game.",
          "Comes with a manual and its own tests.",
        ],
      },
    },
    {
      name: "MatSwap",
      slug: "matswap",
      pitch: "Put one material on a whole selection with a single click.",
      category: "tools",
      status: "live",
      summary:
        "Assign and swap materials in place. Arm the slots you want to change, click a material in the palette, and it lands on the whole selection.",
      facts: ["Unity 2022.3+", "Any pipeline"],
      url: "https://assetstore.unity.com/packages/tools/level-design/matswap-381724",
      detail: {
        solves: [
          "Changing materials in Unity means dragging a material onto each renderer, and finding the right slot on objects that have several. Fifty objects is fifty drags.",
          "MatSwap lists the material slots of everything you've selected. Arm the slots you want to change, click a material in the palette, and it lands on the whole selection.",
        ],
        why: [
          "My day job kept asking me to drag one material onto fifty renderers. I built MatSwap so that takes one click.",
        ],
        trust: [
          "On the Asset Store.",
          "Works in Built-in, URP and HDRP, using only Unity's own editor APIs.",
          "No dependencies.",
          "Supports Unity 2022.3 LTS and Unity 6.",
        ],
      },
    },
    {
      name: "Scatterbrush",
      slug: "scatterbrush",
      pitch: "Paint prefabs on any mesh, with zones they stay out of.",
      category: "tools",
      status: "review",
      summary:
        "Paint and scatter prefabs on any mesh, not just Terrain. Exclusion zones filter by layer, so trees stay off the path while grass still grows on it.",
      facts: ["Unity 2022.3+", "Built-in, URP, HDRP"],
      url: "",
      detail: {
        solves: [
          "Most prefab painters assume Unity Terrain, and few let you say where things must not land. Scatterbrush paints, erases and fills prefabs on any surface with a collider.",
          "Exclusion zones can block every layer or only the ones you pick, so trees stay off the path while grass still grows right up to it.",
        ],
        // DRAFT: replace with your own reason for building Scatterbrush.
        why: [
          "Dressing outdoor scenes built from meshes instead of Terrain, I kept moving trees off paths by hand. I wanted a brush that knows where things shouldn't go.",
        ],
        trust: [
          "Stays correct under scaled parents, a long-standing problem in other painters.",
          "Placed objects stay linked prefab instances, and every stroke is one Undo step.",
          "Editor-only: exclusion zones are stripped from builds.",
          "Works in Built-in, URP and HDRP, with a demo scene that uses no third-party art.",
        ],
      },
    },
    {
      name: "Ultimate Editor Progress Bar",
      slug: "progress-bar",
      pitch: "A progress bar that keeps moving while Unity is busy.",
      category: "tools",
      status: "review",
      summary:
        "A progress window that keeps moving while Unity's main thread is frozen. Stacked tasks, ETA, cancel and taskbar progress, as a one-line swap for DisplayProgressBar.",
      facts: ["Unity 2022.3+", "Windows editor"],
      url: "",
      detail: {
        solves: [
          "Unity's progress bar is drawn by the main thread. The moment your import, bake or build does its real work, the bar freezes and Windows marks Unity as Not Responding. It also shows only one task, and Unity's own imports overwrite it.",
          "Ultimate Editor Progress Bar draws in a window with its own thread inside the editor. It keeps moving, shows an ETA and taskbar progress, stacks sub-tasks under their parent, and tells the user in plain words when Unity's main thread is blocked.",
        ],
        why: [
          "Long editor jobs left me staring at a frozen progress bar, unsure whether Unity had crashed. I wanted a bar that keeps telling the truth, and rebuilt it as an in-editor window so it meets the Asset Store rules.",
        ],
        trust: [
          "A one-line swap for EditorUtility.DisplayProgressBar.",
          "Pure C#: no executables, no native plugins, no network access.",
          "Ships with a quick start, a manual and a write-up of why Unity's own bar freezes.",
        ],
      },
    },
    {
      name: "VR Command Console",
      slug: "vr-command-console",
      pitch: "A radial debug menu you use without taking the headset off.",
      category: "vr",
      status: "review",
      summary:
        "A radial debug menu for VR prototypes. Mark a method with [ConsoleCommand] and point, poke or shoot at it in the headset.",
      facts: ["Unity 2022.3+", "OpenXR, XRI 3"],
      url: "",
      detail: {
        solves: [
          "Testing a VR prototype means taking the headset off to press a debug key, or building UI for every switch you need.",
          "VR Command Console turns any method, property or field marked [ConsoleCommand] into a button on a radial menu that you point at, poke or shoot in the headset.",
        ],
        // DRAFT: check this is your reason.
        why: [
          "Building VR experiences is my day job. I wanted to flip debug switches without leaving the headset, and without building a new menu for every prototype.",
        ],
        trust: [
          "Works with any OpenXR headset, with XR Interaction Toolkit 3 interactors, or with your own ray.",
          "Left out of release builds automatically, while your attributes keep compiling.",
          "Full source, with EditMode and PlayMode tests.",
          "Works in URP, HDRP and Built-in with the included shader.",
        ],
      },
    },
    {
      name: "Nubis",
      slug: "nubis",
      pitch: "Stream laser scans of any size under a fixed memory budget.",
      category: "tools",
      status: "building",
      summary:
        "Convert LAS, LAZ, E57, PLY and PCD scans of any size inside Unity, then stream them under a fixed memory budget. 126 million points at over 100 fps on a laptop.",
      facts: ["Unity 6.3+", "URP, HDRP"],
      url: "",
      detail: {
        tagline:
          "Convert laser scans of any size inside Unity, then stream them under a fixed memory budget. Built for desktop and Meta Quest.",
        solves: [
          "Laser scans are huge: a city block or a building site is easily a hundred million points. Loaded whole they don't fit in memory, and the usual workaround is a converter outside Unity plus a viewer you can't tune.",
          "Nubis converts LAS, LAZ, E57, PLY and PCD inside the editor, then streams only the detail the camera needs. Memory is fixed up front, and when the budget is full the far detail drops, not the frame rate.",
        ],
        why: [
          "At my day job I get laser scans and BIM models running smoothly in Unity for VR. The scans were always the hard part, so I built the viewer I wanted for that work.",
        ],
        trust: [
          "Measured on a public 126-million-point scan of downtown San Francisco: the whole view loads in 0.6 s and renders at 116 to 154 fps on a laptop RTX 3080 Ti, in under 600 MB of memory.",
          "Converts a 155-million-point LAS file in 18 seconds.",
          "Built from the public LAS, LAZ and E57 specifications, in plain C# with Burst: no native plugins.",
          "Over 120 automated tests.",
          "The benchmarks use public scans, so anyone can repeat them.",
        ],
        features: [
          "LAS, LAZ, E57, PLY and PCD import",
          "A fixed memory budget, set once",
          "Colour by RGB, intensity, elevation or classification",
          "Eye-dome lighting for scans without colour",
          "Clip boxes and classification filters",
          "Single-pass instanced VR rendering",
        ],
      },
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
