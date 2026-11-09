# Shubham Sapkota — Portfolio

A single-page personal portfolio built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4. No UI or animation libraries.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
npm run start      # serve the production build
npm run lint
```

## Editing content

All copy and links live in `src/content/`. Components only render it.

| File | What it holds |
|---|---|
| `src/content/site.ts` | Name, email, **LinkedIn / GitHub URLs**, resume path, portrait path, navigation |
| `src/content/about.ts` | Hero headline, intro, quick facts, About text, "How I work" |
| `src/content/projects.ts` | Project case studies, findings, stacks and **project links** |
| `src/content/experience.ts` | Roles and education |
| `src/content/skills.ts` | Skill groups |

### Placeholder project links — replace these

Project links live in `link` on each project in `src/content/projects.ts`:

- Global Inflation Analysis: live app, https://global-inflation-analysis.onrender.com
- LendingClub Default Risk: repository, https://github.com/shubham3207/kdd
- California Wildfire Prediction: still a placeholder (`// PLACEHOLDER`, `https://example.com/california-wildfire-project`)

Swap the placeholder for a repository, write-up or live-app URL and set `isPlaceholder: false`. Until then the site shows "Code on GitHub" linking to the GitHub profile, so visitors never reach a placeholder page.

### Portrait and resume

- Portrait: `public/images/shubham-sapkota.jpg` (1345 × 1170). If you replace it with a different size, update `portrait.width/height` in `site.ts`.
- Resume: `public/Shubham_Sapkota_Resume.pdf`. Replace the file to update it; every "Download resume" button downloads it as `Shubham_Sapkota_Resume.pdf`.

## Project graphics

The project visuals are drawn from real data, not mock screenshots:

- **Wildfire map** (`src/components/graphics/california-fire-map.ts`) is generated from the capstone's `modeling_table.parquet` and `california.geojson`: one dot per 20 km cell, shaded by the share of days followed by a satellite fire detection.
- **Inflation chart** (`inflation-series.ts`) is the trend chart from the project's live Plotly/Dash dashboard (United States, 2014–2024, with its 3-year moving average and the 2022 anomaly it flags), redrawn from the values the dashboard plots.
- **LendingClub chart** uses the default rates reported on the resume.

## Deploy (Render) and CI/CD

The repository is https://github.com/shubham3207/pfolio, deployed on Render as a Node web service.

**One-time setup on Render**

1. In Render, choose **New → Blueprint**, connect the `pfolio` repository and apply `render.yaml`. It creates the `pfolio` web service: `npm ci && npm run build`, then `npm run start`, Node 22 (from `.node-version`), health check on `/`.
2. Optional: once you have a custom domain, add `NEXT_PUBLIC_SITE_URL=https://your-domain.com` under the service's **Environment** so canonical URLs, Open Graph tags and the sitemap use it. Without it, Render's own URL (`RENDER_EXTERNAL_URL`) is used.

**How a change goes live**

1. Push to `main` (or merge a pull request into it).
2. GitHub Actions (`.github/workflows/ci.yml`) installs, lints, builds (which also type-checks) and starts the production server to check the page, resume PDF, icons, Open Graph image, sitemap and robots.txt.
3. Render deploys that commit only after the checks pass (`autoDeployTrigger: checksPass`). It switches traffic to the new version only once its health check succeeds, so a failing change never takes the site down: the previous version keeps serving.

For bigger changes, work on a branch and open a pull request: CI runs on it, and nothing deploys until it is merged. To make this mandatory, protect `main` in GitHub (**Settings → Branches → Add rule**: require a pull request and the **Lint, build and smoke test** check).

Run the same checks locally before pushing: `npm run lint && npm run build`.

## Technology logos

Skills logos live in `public/logos/` and are listed in `public/logos/CREDITS.txt`: Devicon (MIT), Simple Icons (CC0) and Microsoft's Power BI icon (CC BY 4.0, which requires that attribution to stay). XGBoost and SHAP use the core mark cropped from each project's official logo (PNG). SQL and Excel use the vscode-icons file-type icons (MIT); SQL has no official logo of its own. To add one, drop an SVG in `public/logos/` and set `logo` on the tool in `src/content/skills.ts`.

## Favicon and link previews

`src/app/icon.tsx`, `apple-icon.tsx` and `opengraph-image.tsx` generate the tab icon, iOS home-screen icon and 1200×630 link-preview card at build time, using the site's fonts (`src/app/_og/`, SIL Open Font License) and portrait.

## Design notes

- **Palette:** pure white `#FFFFFF` for every section, the navigation and cards; charcoal ink `#202724`; secondary text `#4B5550`; hairline borders `#E5E7E5`; and forest `#2D5143` as the only interface accent (also the Contact band). Sections are separated by spacing, type and borders, not tinted backgrounds; a neutral `#F3F5F4` ("wash") is used only for small fills inside graphics. All colours are tokens in `@theme` in `globals.css`. Ember and ink-blue are reserved for charts, and the chart palette was checked for colour-blind separation.
- **Type:** Instrument Serif for a few display statements (hero headline, About statement, project names, contact headline) and Manrope for everything else. Numbers and the email address are always in Manrope: Instrument Serif's "1" reads like an "l". The clamp() scale lives in `@theme` in `globals.css` (`--text-display`, `--text-statement`, `--text-project`, `--text-headline`, `--text-title`, `--text-lede`, `--text-label`).
- **Motion:** no animation library. A tiny inline script enables motion only when the visitor has not asked for reduced motion; `MotionObserver` reveals `.reveal` elements as they scroll in using the Web Animations API, never by adding attributes or classes (Next.js hydrates in stages, and changing React-rendered HTML before hydration causes mismatches), and `TimelineRail` draws the Experience line with scroll. The first-load hero entrance (~1.3 s: nav, eyebrow, masked headline lines, portrait, intro, CTAs, social links) is pure CSS in `globals.css` under "First-load entrance"; timings are set with `at(ms)` in `hero.tsx`. If scripts fail, the page falls back to fully visible content within 3.5 s. Timings: interactions 150–250 ms, entrances 350–600 ms, travel 8–20 px.
