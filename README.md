# Yaad Spice Co. — Component-Based Website (Vue.js via CDN)

A build-your-own Jamaican jerk blend configurator. Built as separate, reusable components using **Vue.js loaded via a CDN (ES Modules)**, eliminating `node_modules` completely. The user composes a spice blend; price and a live heat meter recompute on every interaction.

**Live site:** https://twevythelwel-star.github.io/yaad-spice/

---

## Run locally

Since the codebase uses modern ES6 modules natively in the browser, opening the file directly (via `file://` protocol) will trigger browser CORS restrictions. To run locally, serve the directory using any static web server:

**Using Python:**
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

**Using Node (npx):**
```bash
npx http-server -p 8000
```

*Or use editor extensions like VS Code's "Live Server".*

---

## Deploy to GitHub Pages

1. Create a **public** repository named `yaad-spice` under your GitHub account and push this folder to the `main` branch.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) deploys the static files directly on every push.
4. Your site goes live at `https://<your-username>.github.io/yaad-spice/`.

---

## Components (Criterion 1)

| File | Component | Role |
|------|-----------|------|
| [index.html](index.html) | Root Document | Main structure (Sticky NavBar, Hero section, and Footer) with the `#app` mount target |
| [src/app.js](src/app.js) | Main Orchestrator | Imports Vue from CDN, manages the reactive blend state, and mounts the application |
| [src/components/SpiceCard.js](src/components/SpiceCard.js) | `SpiceCard` | **Reusable** card, rendered once per spice via props + emits custom state events |
| [src/components/HeatMeter.js](src/components/HeatMeter.js) | `HeatMeter` | Live ember heat bar (presentational component, accepts score and label props) |
| [src/components/BlendSummary.js](src/components/BlendSummary.js) | `BlendSummary` | Composes `HeatMeter`, shows dynamic total, and handles checkout form validation |
| [src/data/spices.js](src/data/spices.js) | Data Module | Shared ES6 module housing the product catalogue, heat calculations, and personality naming |

Architecture: State lives in the central Vue app instance, flows **down** as props to custom components, and child **events flow up** via `emits` to state handlers—forming a standard one-direction data flow.

---

## Graphical interface (Criterion 2)

Custom palette derived from the Jamaican flag (charred background, gold accents for CTAs, green accents for borders/hovers), Anton / Outfit / Space Mono typography, and responsive grids.

---

## Usability features (Criterion 3) — more than two

1. **Sticky Navigation Menu** with smooth-scroll anchors
2. **Color-Coded Heat Meter** (per-spice pips + dynamic ember progression bar)
3. **Interactive Control Bench** (reusable add/remove buttons, quantity − / + controls)
4. **Instant Live Feedback** (price, Scoville heat level, and custom blend personality update dynamically)
5. **Form Validation** (real-time validations for checkout name, phone, and email fields)
6. **Accessibility Compliance** (visible focus rings for keyboard users, semantic HTML5 elements, and `aria-live` summary)
7. **Responsive Design** (fluid down to mobile layouts)
8. **Empty-State Support** (guiding message and disabled order button until spices are chosen)
