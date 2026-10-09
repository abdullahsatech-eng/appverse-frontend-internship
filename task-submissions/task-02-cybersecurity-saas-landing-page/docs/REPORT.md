# ReadySignal — Cybersecurity SaaS Landing Page

**Name:** Abdullah Khan  
**Registration Number:** OCT26-FE06-08  
**Assignment:** Task 2 — Cybersecurity SaaS Landing Page  
**Organisation:** Appverse Technologies (Frontend Developer Internship, Phase 1)  
**Submission date:** 9 October 2026

## 1. Overview and objectives

ReadySignal is a fictional SaaS concept that would help small businesses understand their cybersecurity readiness. The assignment was to build a complete, responsive landing page using only HTML5 and CSS3 with zero JavaScript. Mandatory requirements: custom-property tokens, fluid `clamp()` typography, Grid and Flexbox, a checkbox-hack mobile menu, smooth scrolling, CSS load-in animations, a print stylesheet, and a target above 95 for Lighthouse Accessibility and Best Practices.

The page is a static concept. It does not scan, monitor or certify anything; all figures are illustrative.

## 2. Page sections

Header and navigation; hero with readiness preview; trust and credibility (principles only, no invented customers); six proposed features; dashboard-style product preview; three-step "how it would work"; four use cases; three illustrative pricing tiers; FAQ; final call to action; footer with placeholders.

## 3. CSS architecture and design tokens

Eight stylesheets split by responsibility: `tokens`, `reset`, `base`, `layout`, `components`, `responsive`, `animations`, `print`. All colours, fluid type sizes, spacing, radii, borders, shadows, durations, z-index layers and layout widths are custom properties. Components follow BEM naming and single-class selectors; `!important` is not used. Print re-maps the same tokens to a paper palette.

## 4. Responsive design and mobile navigation

Mobile-first from 320px with three content-driven breakpoints (30rem, 48rem, 62rem). Grids use `auto-fit` with `minmax(min(100%, …), 1fr)`. Container queries let the dashboard and feature cards adapt to the space they are given. The mobile menu is a visually hidden but focusable checkbox, a styled `<label>` and a panel revealed with `:checked ~ .site-nav`; closed links are hidden with `visibility` so they leave the tab order.

## 5. Accessibility

Skip link, landmarks, ordered headings, labelled navigation, visible focus ring, 44px tap targets, decorative graphics hidden from assistive technology, text labels alongside every colour-coded status, external-link warning, and `prefers-reduced-motion` support. Calculated contrast ratios range from 7.68:1 to 17.45:1.

## 6. Animations and print

Load-in animations (staggered hero rise, ring fill) and smooth scrolling exist only inside `prefers-reduced-motion: no-preference`. Keyframes define only the start state, so content is visible if animation is off. The print stylesheet removes backgrounds and shadows, hides navigation and decorative visuals, keeps cards together, shows FAQ answers and prints link addresses.

## 7. Testing results

**Verified (headless Chromium, 9 Oct 2026):** no horizontal overflow at 11 widths from 320 to 1920px; no console errors or failed requests; all anchors valid; zero scripts; keyboard order and checkbox menu operable; reduced-motion behaviour; print rendering (9 A4 pages).

**Lighthouse:** *not measured by the generator.* Run it in Chrome DevTools and enter the real values here:

| Category | Mobile | Desktop |
| --- | --- | --- |
| Performance | ____ | ____ |
| Accessibility | ____ | ____ |
| Best Practices | ____ | ____ |
| SEO | ____ | ____ |

Also still to do manually: Firefox/Safari checks, screen-reader pass, GitHub Pages deployment (see `TESTING-CHECKLIST.md`).

## 8. Screenshots

Real captures from the running page are in `docs/screenshots/`: `01-desktop-hero`, `02-desktop-dashboard`, `03-desktop-features`, `04-desktop-pricing`, `05-mobile-hero`, `06-mobile-menu-open`, `07-mobile-320-dashboard`, `08-keyboard-focus`.

## 9. Conclusion and learning outcomes

The project applies the Task 1 lessons (tokens, BEM, low specificity) to a full, realistic interface and adds fluid type, container queries, a CSS-only menu, motion that respects user preference, and a print stylesheet. Key lessons: how far HTML and CSS alone can go; why visibility (not `display`) keeps a hidden menu out of the tab order while allowing transitions; why animations should start from the "from" state only; and why audit scores must be measured rather than assumed. Limitation: the CSS-only menu cannot close itself after a link is tapped.
