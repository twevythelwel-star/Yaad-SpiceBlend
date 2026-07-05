# Yaad Spice Co. — Component-Based Website

A build-your-own Jamaican jerk blend configurator. Built with **Vite + React** as separate,
reusable components. The user composes a spice blend; price and a live heat meter recompute on
every interaction.

**Live site:** https://twevythelwel-star.github.io/YaadSpiceCo/  ← (update if you rename the repo)

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in /dist
npm run preview    # preview the production build
```

## Standalone version (no npm, no server)

[`standalone/index.html`](standalone/index.html) is a self-contained copy of the same app —
just open it directly in a browser (double-click it). It loads React, ReactDOM, and Babel from
a CDN and compiles the JSX in the browser, so it needs an internet connection the first time but
no local install or dev server. Use this for a quick look; use the npm/Vite project above for
actual development.

## Deploy to GitHub Pages (no local build needed)

1. Create a **public** repo named `YaadSpiceCo` under your account and push this folder to `main`.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push.
4. Your site goes live at `https://<your-username>.github.io/YaadSpiceCo/`.

> If you use a **different repo name**, change `base` in `vite.config.js` to `'/<that-name>/'`,
> or the page loads blank because the asset paths won't match.

---

## Components (Criterion 1)

| File | Component | Role |
|------|-----------|------|
| `src/components/NavBar.jsx` | `NavBar` | Sticky navigation menu |
| `src/components/Hero.jsx` | `Hero` | Landing / thesis section |
| `src/components/SpiceCard.jsx` | `SpiceCard` | **Reusable** card, rendered once per spice via props + event callbacks |
| `src/components/HeatMeter.jsx` | `HeatMeter` | Live ember heat bar (derived state) |
| `src/components/BlendSummary.jsx` | `BlendSummary` | Composes `HeatMeter`, shows live total + order action |
| `src/components/Footer.jsx` | `Footer` | Footer |
| `src/App.jsx` | `App` | Orchestrator; holds lifted blend state |

Architecture: state lives in `App`, flows **down** as props, and child **events flow up** to
handlers — the one-direction data flow that defines a component-based system.

## Graphical interface (Criterion 2)

Custom palette derived from a jerk pan (charred background, bonnet ember gradient, thyme green),
Anton / Outfit / Space Mono type system, responsive grid layout.

## Usability features (Criterion 3) — more than two

1. Sticky navigation menu with smooth-scroll anchors
2. Color-coded heat (per-spice pips + the ember meter)
3. Interactive buttons: add/remove, − / + quantity, order
4. Live feedback — price, heat, and Scoville read-out update instantly
5. Keyboard-accessible controls with a visible focus ring; `aria` labels and `aria-live` summary
6. Responsive down to mobile
7. Empty-state guidance and a disabled order button until a spice is chosen
8. `prefers-reduced-motion` respected
