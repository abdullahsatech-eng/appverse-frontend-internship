# ReadySignal — Cybersecurity SaaS Landing Page

> **Clearer Security. Smarter Decisions.**

ReadySignal is a **concept project**: a complete, responsive landing page for a fictional cybersecurity-readiness SaaS product, built with **only HTML5 and CSS3 and zero JavaScript**.

**ReadySignal does not scan, monitor, certify or protect anything.** There is no backend, no sign-up, no checkout and no real customer data. All dashboard figures, prices and feature descriptions are illustrative.

## 1. Internship context

| Item | Detail |
| --- | --- |
| Organisation | Appverse Technologies |
| Internship | Frontend Developer Internship (six weeks, remote) |
| Phase | Phase 1: Web Foundations and JavaScript Mastery |
| Assignment | Task 2: Cybersecurity SaaS Landing Page |
| Intern | Abdullah Khan |
| Registration number | OCT26-FE06-08 |
| Previous task | Task 1: CSS Architecture and Design Tokens (separate project, untouched) |

## 2. Product concept and audience

ReadySignal imagines a workspace that helps small businesses understand their cybersecurity readiness and organise their next improvements. Intended audience: small and medium-sized businesses, online stores, small software agencies, startups and any team without a dedicated security person.

## 3. Main features of the page

- Sticky header with logo, in-page navigation and a call to action
- **Pure CSS mobile navigation** (checkbox hack), keyboard operable
- Hero with a CSS-built readiness preview
- Honest trust section (no invented logos, statistics or testimonials)
- Six proposed-capability cards
- Full dashboard-style product preview built from HTML and CSS
- Three-step "how it would work" section, use cases, three illustrative pricing tiers
- FAQ using native `<details>` / `<summary>`
- Final call to action and footer with placeholders for contact, privacy and terms

## 4. Technology stack

HTML5, CSS3 (custom properties, `clamp()`, Grid, Flexbox, container queries, `@property`). No JavaScript, frameworks, packages, bundlers or external requests. System fonts only.

## 5. Project structure

```
task-02-cybersecurity-saas-landing-page/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── css/
│   ├── tokens.css       design tokens (custom properties)
│   ├── reset.css        minimal reset
│   ├── base.css         document defaults, typography, focus, helpers
│   ├── layout.css       containers, sections, grids, header and footer scaffolding
│   ├── components.css   BEM components (buttons, nav, cards, dashboard, pricing, FAQ…)
│   ├── responsive.css   mobile-first media-query enhancements
│   ├── animations.css   smooth scrolling and load-in animations
│   └── print.css        print stylesheet (loaded with media="print")
├── assets/
│   └── icons/
│       └── favicon.svg
└── docs/
    ├── report.pdf
    ├── REPORT.md
    ├── DEMO-SCRIPT.md
    ├── TESTING-CHECKLIST.md
    └── screenshots/     real screenshots captured from the running page
```

**About `assets/images/`:** the brief suggested an images folder. This project needs no raster images (the logo, icons and dashboard are inline SVG and CSS), so the folder is intentionally omitted rather than left empty.

## 6. Running locally

No build step or server is required.

1. Open `index.html` directly in a browser (double-click it), **or**
2. Optionally serve it: `python3 -m http.server 8000` inside this folder, then visit `http://localhost:8000`.

## 7. Design token system (`css/tokens.css`)

Every colour, font, size, space, radius, border, shadow, duration, layer and layout width is a CSS custom property on `:root`.

| Group | Examples |
| --- | --- |
| Colour | `--color-bg` `#0B1220`, `--color-bg-alt` `#111D30`, `--color-surface` `#152238`, `--color-accent` `#8BE9A4`, `--color-text` `#F5F7FA`, `--color-text-muted` `#A9B5C7`, `--color-border` `#29384D` |
| Fluid type | `--text-xs` … `--text-3xl`, each a `clamp()` |
| Spacing | `--space-1` … `--space-8`, plus fluid `--space-gutter`, `--space-section`, `--space-gap` |
| Layout | `--container-max`, `--container-narrow`, `--header-height`, `--tap-target` |
| Shape and depth | `--radius-*`, `--border-*`, `--shadow-*` |
| Motion | `--duration-fast/base/slow`, `--ease-out` |
| Layers | `--z-base`, `--z-header`, `--z-skip-link` |

To rebrand, edit `tokens.css` only. `print.css` re-maps the colour tokens to a paper palette, which shows the benefit of the approach.

## 8. CSS architecture

Files are ordered by responsibility and loaded in cascade order: **tokens → reset → base → layout → components → responsive → animations**, with **print** loaded under `media="print"`. Components use BEM (`.plan`, `.plan__name`, `.plan--featured`) and single-class selectors to keep specificity low. `!important` is not used.

Seventeen elements carry an inline `style="--value: …"` or `style="--ring-value: …"`. These are deliberate *data bindings* for the sample dashboard values (a percentage fed to a stylesheet rule), not presentational styling.

## 9. Responsive approach

- Mobile-first: base styles target 320px; media queries only add enhancements (`30rem`, `48rem`, `62rem`).
- Grids use `repeat(auto-fit, minmax(min(100%, Xrem), 1fr))`, so columns appear only when there is room.
- Fluid type and spacing through `clamp()`.
- **Container queries** (`@container`): the dashboard rearranges panels by its own width, and feature cards switch to an icon-beside-text layout when their wrapper is wide enough. In browsers without container-query support the single-column layout remains fully usable.
- Header switches from the checkbox menu to a horizontal nav at 62rem (992px).

## 10. Accessibility measures

Skip link; semantic landmarks (`header`, `nav`, `main`, `section`, `footer`); logical heading order; labelled navigation regions; a real checkbox with an associated label for the menu; visible 3px focus ring on all interactive elements; 44px minimum tap targets; decorative SVG and mock visuals hidden with `aria-hidden`; status never shown by colour alone (words such as "Strong", "Fair", "Needs work", "Done" accompany every colour); external link announces "opens in a new tab"; `prefers-reduced-motion` respected. Computed text contrast ratios are between 7.7:1 and 17.5:1.

## 11. Animations and reduced motion

- Load-in: hero content rises in with short staggered delays and the readiness ring fills once.
- Smooth scrolling is enabled with `scroll-behavior: smooth` **only** inside `@media (prefers-reduced-motion: no-preference)`; anchor links still work without it.
- All animations are declared inside that same query, and the duration tokens collapse to `0s` under `prefers-reduced-motion: reduce`, so a reduced-motion visitor sees a static page.
- Keyframes only describe the *starting* state, so content is fully visible if animation does not run.

## 12. Print stylesheet

`css/print.css` re-maps tokens to black-on-white, removes backgrounds and shadows, hides the menu, decorative hero preview and non-functional buttons, shows external link addresses after the link text, keeps cards and FAQ items from splitting across pages (and shows FAQ answers where the browser supports `::details-content`), and keeps progress bars visible. A print-to-PDF test in headless Chromium produced a 9-page A4 document.

## 13. Browser testing

Open `index.html` in current Chrome, Edge, Firefox and Safari. In DevTools use device mode at 320, 360, 375, 390, 414, 480, 768, 1024, 1280 and 1440px. See `docs/TESTING-CHECKLIST.md` for the full list and the honest status of each check.

## 14. Lighthouse testing

1. Open the page in Chrome (use an Incognito window with extensions disabled).
2. DevTools → **Lighthouse** → select *Navigation*, *Mobile* then *Desktop*, tick all categories.
3. Click **Analyze page load** and record the scores.

> **Status:** Lighthouse was **not** available in the environment where this project was generated, so **no Lighthouse score is claimed**. Run the audit yourself and record the real numbers in `docs/REPORT.md` / the PDF report. The target is above 95 for Accessibility and Best Practices.

## 15. GitHub setup

Existing repository: <https://github.com/abdullahsatech-eng/appverse-frontend-internship>

The ZIP contains the path `task-submissions/task-02-cybersecurity-saas-landing-page/`, so extract it at the **repository root**. Task 1 files are not in the ZIP and will not be touched.

```bash
# 1. Go to your local clone and make sure it is up to date
cd path/to/appverse-frontend-internship
git pull

# 2. Extract the ZIP into the repository root (adjust the path to the ZIP)
unzip ~/Downloads/ReadySignal-Cybersecurity-SaaS-Abdullah-Khan-OCT26-FE06-08.zip -d .

# 3. Verify the destination
ls task-submissions/
ls task-submissions/task-02-cybersecurity-saas-landing-page/

# 4. Check status: only Task 2 files should appear as new
git status

# 5. Stage only Task 2
git add task-submissions/task-02-cybersecurity-saas-landing-page/

# 6. Commit
git commit -m "Add Task 2: ReadySignal cybersecurity SaaS landing page"

# 7. Push to the existing remote
git push origin main
```

If your default branch is not `main`, check with `git branch --show-current` and use that name. On Windows without `unzip`, right-click the ZIP and choose *Extract All…* into the repository folder.

## 16. GitHub Pages deployment

1. On GitHub open the repository → **Settings → Pages**.
2. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save (Task 1 already uses this, so it may be set).
3. Wait for the Pages build to finish (Actions tab).

Expected URL pattern (a destination, **not** a confirmed live link until you open it and check):

`https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-02-cybersecurity-saas-landing-page/`

## 17. Known limitations

- **Mobile menu stays open after choosing a link.** Without JavaScript a CSS-only menu cannot detect an anchor click. Visitors close it with the Menu button again.
- Lighthouse, Firefox, Safari and screen-reader testing have not been performed by the generator (see the testing checklist).
- `::details-content` (print FAQ answers) and container queries need current browsers; older browsers fall back to simpler layouts.
- System fonts mean typography varies slightly between operating systems.
- Everything is a static mock-up; no real security functionality exists.

## 18. Future possibilities

Interactive questionnaire, real scoring logic, authentication, a persistent backend, exports, a validated pricing model and customer discovery interviews. These are out of scope for this assignment and would require JavaScript and a backend.

## 19. Credits and licence

Designed and built by Abdullah Khan for the Appverse Technologies internship. Released under the MIT licence (see `LICENSE`). No third-party code, fonts or images are used.
