# Testing Checklist — ReadySignal (Task 2)

Date of automated checks: 9 October 2026. Tool: headless Chromium (Playwright) driving `file:///…/index.html`. 

**Legend:** ✅ verified by the generator in the environment · ⬜ NOT yet performed — the student must do this manually. Nothing marked ⬜ should be reported as passed.

## A. Verified automatically (✅)

| # | Check | Result |
| --- | --- | --- |
| 1 | Direct opening via `file://` (no server) | ✅ Page renders, all 8 CSS files load |
| 2 | No JavaScript | ✅ `document.scripts.length === 0`; no `<script>` in HTML |
| 3 | Horizontal overflow at 320, 360, 375, 390, 414, 480, 768, 1024, 1280, 1440, 1920 px | ✅ `scrollWidth === clientWidth` and no element beyond the right edge at every width |
| 4 | Browser console (errors and warnings) and failed requests at all widths | ✅ none reported |
| 5 | Anchor links | ✅ every `href="#…"` resolves to an existing id |
| 6 | Empty links or buttons | ✅ none |
| 7 | Heading hierarchy | ✅ one `h1`, no skipped levels |
| 8 | Keyboard order (mobile) | ✅ Skip link → logo → menu checkbox → (when open) menu links |
| 9 | Checkbox menu operable by Space; closed menu links hidden from tab order | ✅ |
| 10 | Desktop (≥992px) hides the menu button and shows the nav | ✅ |
| 11 | Focus ring visible on the menu control and links | ✅ (screenshots `06`, `08`) |
| 12 | Colour contrast (calculated from tokens) | ✅ text 17.45:1; muted 7.68–8.15:1; accent 10.84:1; button text 12.74:1; warning 9.72:1; danger 7.90:1; info 8.79:1 |
| 13 | Reduced motion: animations off, `scroll-behavior: auto`, anchors still jump correctly | ✅ |
| 14 | Motion enabled: hero fades in, finishes fully visible, `scroll-behavior: smooth` | ✅ |
| 15 | Print render (Chromium, A4) | ✅ 9 pages; hero visible; FAQ answers present; backgrounds removed; menu hidden |
| 16 | Unused CSS classes | ✅ none defined-but-unused (a few hook classes have no rules by design) |

## B. Manual tests still to perform (⬜)

| # | Check | How |
| --- | --- | --- |
| 17 | ⬜ **Lighthouse Accessibility ≥ 95** | DevTools → Lighthouse → Navigation, Mobile and Desktop. Record scores. |
| 18 | ⬜ **Lighthouse Best Practices ≥ 95** | Same run. |
| 19 | ⬜ Lighthouse Performance and SEO observations | Same run; note values, do not claim targets unless met. |
| 20 | ⬜ Firefox, Safari and Edge rendering | Open page, check header, dashboard, pricing, FAQ, print preview. |
| 21 | ⬜ Real phone test | Open on a phone (or via GitHub Pages) and use the menu. |
| 22 | ⬜ Screen-reader pass | NVDA / VoiceOver: skip link, menu checkbox name ("Menu"), headings list, FAQ. |
| 23 | ⬜ Zoom 200% and text-only zoom | No clipped content or lost functionality. |
| 24 | ⬜ Print preview in your browser | Ctrl+P: readable, no menu, no wasted pages. |
| 25 | ⬜ Windows high-contrast / forced-colours | Content still readable. |
| 26 | ⬜ GitHub Pages deployment | Open the expected URL and repeat checks 1, 4, 5 on the live site. |
| 27 | ⬜ Record the demo MP4 | Follow `DEMO-SCRIPT.md`. |

## C. Defects found and fixed during generation

- Hero headline wrapped onto five lines on desktop → widened its measure.
- Four-item trust and use-case grids left a lone orphan card → tuned their minimum column widths.
- Print output initially showed an empty hero (animation start frame) and invisible progress bars → animations disabled in print and `print-color-adjust: exact` added.
- Pricing buttons were not bottom-aligned → plan cards changed to a flex column.

## D. Known limitation

The CSS-only mobile menu remains open after tapping an in-page link (no JavaScript to close it). This is expected and documented.
