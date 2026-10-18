# StockSense: Testing Record

Official assignment: **ES6 Product Data Analyzer** | Student: Abdullah Khan | Registration: OCT26-FE06-08
Tests run on **October 17, 2026**.

## Environment (what was actually used)

| Item | Value |
| --- | --- |
| Node.js | v22.22.2 (unit tests) |
| Browser | Chromium 141.0.7390.37 via Playwright, **headless** (end-to-end tests, screenshots, audits) |
| Hosting for tests | `python3 -m http.server` serving the parent folder, so the app ran under the subpath `/stocksense-inventory-analytics/` (like a GitHub Pages project site), plus direct `file://` opening |
| Not used | Lighthouse, axe, Firefox, Safari, real phones, screen readers |

## Result summary

| Suite | Tests | Passed | Failed |
| --- | --- | --- | --- |
| Unit tests (`tests/unit.js`, Node) | 39 | 39 | 0 |
| Browser end-to-end tests (`tests/e2e.py`, Chromium) | 145 | 145 | 0 |

All results below are copied from the actual test output (`tests/unit.json`, `tests/e2e.json`, `tests/audit.json`). The test scripts are in the `tests/` folder of the project so the run can be repeated (see the end of this file).

## 1. Unit tests (analytics logic)

Expected values were computed independently with plain `for` loops or written by hand, not with the same `reduce()` code under test.

| Test | Result | Detail |
| --- | --- | --- |
| Dataset has at least 20 products | PASS | 24 products |
| Unique IDs and SKUs | PASS |  |
| Summary: active products | PASS | 23 vs 23 |
| Summary: total units | PASS | 605 |
| Summary: cost value | PASS | 367220 |
| Summary: retail value | PASS | 578250 |
| Summary: gross profit = retail - cost | PASS | 211030 |
| Summary: low-stock count | PASS | 4 |
| Summary: out-of-stock count | PASS | 3 |
| Summary: allRecordsValid true for sample data | PASS |  |
| Category totals add up to summary | PASS |  |
| find by id and by SKU (case-insensitive) | PASS |  |
| find returns undefined when missing | PASS |  |
| Search by name | PASS |  |
| Search by SKU | PASS |  |
| Search + category + stock combine | PASS |  |
| Out of stock filter (all categories) | PASS |  |
| Sort does not mutate source array | PASS |  |
| Sort by value desc puts A4 Paper first | PASS | A4 Paper Ream 80gsm |
| Sort by price asc puts cheapest first | PASS |  |
| Valid product passes | PASS |  |
| Empty name rejected | PASS |  |
| Duplicate SKU rejected (case-insensitive) | PASS |  |
| Duplicate ID rejected | PASS |  |
| Negative price rejected | PASS |  |
| NaN price rejected | PASS |  |
| Selling below cost rejected | PASS |  |
| Fractional quantity rejected | PASS |  |
| Unknown category rejected | PASS |  |
| every([]) is true (documented behaviour) | PASS |  |
| allRecordsValid detects a bad record | PASS |  |
| needsRestock (some) true and false cases | PASS |  |
| Spread update leaves original object unchanged | PASS |  |
| Shallow copy caveat: nested objects are shared | PASS |  |
| Empty list gives zero summary (no NaN) | PASS |  |
| Currency format uses PKR | PASS | Rs 1,500 |
| CSV has header + 24 rows, quotes escaped | PASS |  |
| nextProductId continues sequence | PASS |  |
| Inactive product excluded from low/out totals | PASS |  |

## 2. Browser functional tests

| Test | Result |
| --- | --- |
| Subpath hosting: all resources load (HTTP, no 4xx/5xx) | PASS |
| Subpath hosting: no external requests | PASS |
| Subpath hosting: no console errors | PASS |
| Opens directly from file:// with 24 rows | PASS |
| KPI: active products = 23 | PASS |
| KPI: total units = 605 | PASS |
| KPI: cost value = Rs 367,220 | PASS |
| KPI: retail value = Rs 578,250 | PASS |
| KPI: gross profit = Rs 211,030 | PASS |
| KPI: low = 4, out = 3 | PASS |
| Badge says Sample data | PASS |
| Category list shows 5 categories | PASS |
| Restock alerts list 7 items | PASS |
| Data quality says all records valid | PASS |
| Search by name 'mouse' -> 1 row | PASS |
| Search by SKU 'acc-00' -> 5 rows | PASS |
| Category + status filters combine (Electronics + low = Bluetooth Speaker) | PASS |
| Electronics + out -> Power Bank | PASS |
| No match shows empty state | PASS |
| Clear filters restores 24 rows | PASS |
| Sort by inventory value descending -> A4 Paper first | PASS |
| Sort by stock descending -> Gel Pen Pack first | PASS |
| Sort direction button label updates | PASS |
| Inactive filter -> 1 row (Wall Clock) | PASS |
| Add dialog opens with next ID PRD-025 | PASS |
| Empty form shows errors and summary | PASS |
| Focus moves to first invalid field | PASS |
| Duplicate SKU rejected | PASS |
| Selling below cost rejected | PASS |
| Fractional stock rejected | PASS |
| Negative reorder level rejected | PASS |
| Invalid fields flagged aria-invalid | PASS |
| Valid product added (25 rows) | PASS |
| KPI active products updates to 24 | PASS |
| KPI low-stock rises to 5 (qty 4 <= reorder 6) | PASS |
| KPI cost value rises by 12,000 | PASS |
| Badge changes to Your data | PASS |
| Restock list includes new product | PASS |
| Edit dialog is prefilled | PASS |
| Edit stock to 0 -> out-of-stock count 4 | PASS |
| Edit cannot reuse another product's SKU | PASS |
| Edit keeping own SKU is allowed | PASS |
| Delete asks for confirmation | PASS |
| Cancel keeps product | PASS |
| Confirm deletes product (24 rows) | PASS |
| Data persists after refresh (24 rows incl. Gaming Keyboard) | PASS |
| Edited stock persists (Wireless Mouse out of stock) | PASS |
| Badge still Your data after refresh | PASS |
| CSV export downloads filtered rows (Electronics: header + 7) | PASS |
| Reset asks for confirmation | PASS |
| Cancelling reset keeps user data | PASS |
| Confirmed reset restores 24 sample products | PASS |
| Reset stored a backup of the previous data first | PASS |
| No console errors during full workflow | PASS |
| Keyboard: Enter on Add opens dialog | PASS |
| Keyboard: Escape closes dialog | PASS |
| Focus returns to Add button after closing | PASS |
| Skip link is first tab stop | PASS |
| Visible focus outline on inputs | PASS |
| Storage blocked: app still renders 24 rows | PASS |
| Storage blocked: notice is shown | PASS |
| Storage blocked: add still works in memory | PASS |
| Malformed saved data: falls back to sample data with notice | PASS |
| Malformed saved data: raw value not silently overwritten | PASS |
| Invalid record shape in storage: rejected with notice | PASS |
| Reduced motion: smooth scrolling off | PASS |
| Reduced motion: transition duration token is 0s | PASS |
| Touch (375x812, tap events): add dialog, menu, backdrop close and delete confirm work | PASS |

## 3. Responsive tests (actual viewports)

Each size was loaded in a fresh browser context. Touch-enabled mobile emulation was used below 1024px. "Keyboard-open simulation" means the viewport height was reduced to 300px to mimic an on-screen keyboard; a real phone keyboard was not tested.

| Check | Result |
| --- | --- |
| Small mobile 320x568: no horizontal overflow | PASS |
| Small mobile: no element clipped outside viewport | PASS |
| Small mobile: touch targets >= 40px tall | PASS |
| Small mobile: sidebar hidden until menu opened | PASS |
| Small mobile: menu opens and Escape closes it | PASS |
| Small mobile: table layout = stacked cards | PASS |
| Small mobile: add dialog fits viewport | PASS |
| Small mobile: Save button reachable inside dialog | PASS |
| Small mobile: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Small mobile: no console errors | PASS |
| Typical mobile 375x812: no horizontal overflow | PASS |
| Typical mobile: no element clipped outside viewport | PASS |
| Typical mobile: touch targets >= 40px tall | PASS |
| Typical mobile: sidebar hidden until menu opened | PASS |
| Typical mobile: menu opens and Escape closes it | PASS |
| Typical mobile: table layout = stacked cards | PASS |
| Typical mobile: add dialog fits viewport | PASS |
| Typical mobile: Save button reachable inside dialog | PASS |
| Typical mobile: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Typical mobile: no console errors | PASS |
| Large mobile 430x932: no horizontal overflow | PASS |
| Large mobile: no element clipped outside viewport | PASS |
| Large mobile: touch targets >= 40px tall | PASS |
| Large mobile: sidebar hidden until menu opened | PASS |
| Large mobile: menu opens and Escape closes it | PASS |
| Large mobile: table layout = stacked cards | PASS |
| Large mobile: add dialog fits viewport | PASS |
| Large mobile: Save button reachable inside dialog | PASS |
| Large mobile: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Large mobile: no console errors | PASS |
| Tablet 768x1024: no horizontal overflow | PASS |
| Tablet: no element clipped outside viewport | PASS |
| Tablet: touch targets >= 40px tall | PASS |
| Tablet: sidebar hidden until menu opened | PASS |
| Tablet: menu opens and Escape closes it | PASS |
| Tablet: table layout = table | PASS |
| Tablet: add dialog fits viewport | PASS |
| Tablet: Save button reachable inside dialog | PASS |
| Tablet: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Tablet: no console errors | PASS |
| Laptop 1366x768: no horizontal overflow | PASS |
| Laptop: no element clipped outside viewport | PASS |
| Laptop: touch targets >= 40px tall | PASS |
| Laptop: sidebar visible, menu button hidden | PASS |
| Laptop: table layout = table | PASS |
| Laptop: add dialog fits viewport | PASS |
| Laptop: Save button reachable inside dialog | PASS |
| Laptop: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Laptop: no console errors | PASS |
| Desktop 1920x1080: no horizontal overflow | PASS |
| Desktop: no element clipped outside viewport | PASS |
| Desktop: touch targets >= 40px tall | PASS |
| Desktop: sidebar visible, menu button hidden | PASS |
| Desktop: table layout = table | PASS |
| Desktop: add dialog fits viewport | PASS |
| Desktop: Save button reachable inside dialog | PASS |
| Desktop: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Desktop: no console errors | PASS |
| Landscape phone 812x375: no horizontal overflow | PASS |
| Landscape phone: no element clipped outside viewport | PASS |
| Landscape phone: touch targets >= 40px tall | PASS |
| Landscape phone: sidebar hidden until menu opened | PASS |
| Landscape phone: menu opens and Escape closes it | PASS |
| Landscape phone: table layout = table | PASS |
| Landscape phone: add dialog fits viewport | PASS |
| Landscape phone: Save button reachable inside dialog | PASS |
| Landscape phone: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Landscape phone: no console errors | PASS |
| Landscape tablet 1024x768: no horizontal overflow | PASS |
| Landscape tablet: no element clipped outside viewport | PASS |
| Landscape tablet: touch targets >= 40px tall | PASS |
| Landscape tablet: sidebar visible, menu button hidden | PASS |
| Landscape tablet: table layout = table | PASS |
| Landscape tablet: add dialog fits viewport | PASS |
| Landscape tablet: Save button reachable inside dialog | PASS |
| Landscape tablet: dialog stays usable with short viewport (keyboard-open simulation, height 300) | PASS |
| Landscape tablet: no console errors | PASS |

Sizes covered: 320x568, 375x812, 430x932, 768x1024, 1366x768, 1920x1080 (all six required) plus landscape 812x375 and 1024x768.

## 4. Performance (measured, not Lighthouse)

Measured in headless Chromium on the sandbox machine over localhost with no network throttling. These are **not** Lighthouse scores and will differ on real devices and networks.

| Metric | Value |
| --- | --- |
| Requests on first load | 9 (index.html, 4 CSS, 4 JS) |
| Total transferred size (uncompressed) | 59.2 KB |
| DOMContentLoaded | 74 ms |
| Load event | 89 ms |
| First Contentful Paint | 96 ms |
| External requests | none |
| Scripts | all `defer` (non-blocking) |

## 5. Accessibility checks that were run

No Lighthouse or axe audit was run. These were scripted checks and calculations:

| Check | Result |
| --- | --- |
| Duplicate ids | 0 |
| Inputs/selects without a label | 0 |
| Buttons/links without an accessible name | 0 |
| `lang` attribute | en |
| Number of h1 elements | 1 |
| Heading order (h1, h2, h3 sequence) | 122333222 |
| Landmarks | header:2 nav:1 main:1 aside:1 footer:2 |
| Skip link first in tab order | PASS (see section 2) |
| Visible focus outline | PASS (3px solid, see section 2) |
| Reduced motion | PASS (smooth scroll off, transition token 0s) |

Calculated contrast ratios (WCAG AA needs 4.5:1 for normal text):

| Colour pair | Ratio |
| --- | --- |
| text on bg | 16.32 |
| muted on surface | 8.0 |
| muted on bg | 8.77 |
| accent on surface | 8.89 |
| on-accent on accent | 8.57 |
| warning on surface | 10.23 |
| danger on surface | 6.18 |
| danger on bg | 6.77 |
| white on danger button | 3.76 |
| muted on raised (table head) | 7.02 |

(White text on the red delete button was 3.76:1 in the first build and was darkened to `#b91c1c`, giving 6.47:1.)

## 6. Defects found by testing and fixed

| Defect | Found by | Fix |
| --- | --- | --- |
| Page scrolled sideways at 768px, 812px and 1024px because the wide table forced its grid column wider than the viewport | E2E overflow check | `grid-template-columns: minmax(0, 1fr)` and `min-width: 0` on content children |
| Same overflow at 1024px from the restock list in a `2fr 1fr` grid | E2E overflow check | `minmax(0, ...)` columns and wrapping alert rows |
| White text on delete button below AA contrast (3.76:1) | Contrast calculation | Darker red `#b91c1c` (6.47:1) |
| Sticky header covered section headings after anchor navigation | Screenshot review | `scroll-padding-top: 5.5rem` |
| Dialogs sat against the left edge (CSS reset removed automatic centring) | Screenshot review | `margin: auto` on dialogs |
| Form fields misaligned when one showed an error | Screenshot review | `align-items: start` on the form grid |
| Mobile KPI cards one per row made the page very long | Screenshot review | Two cards per row on phones |

Three test-script mistakes (wrong expected cheapest product, a timing wait for the closing menu, and line-ending handling in the CSV check) were also corrected; they were errors in the tests, not in the app.

## 7. Not run / still manual

| Item | Status |
| --- | --- |
| Lighthouse (performance, accessibility, best practices) | **Not run.** Run it in Chrome DevTools and record real scores before claiming any. |
| Firefox, Safari, Edge | **Not tested.** |
| Real phone or tablet (touch gestures, real on-screen keyboard) | **Not tested.** Tap events were emulated only. |
| Screen reader (NVDA, VoiceOver) | **Not tested.** |
| GitHub Pages deployment | **Not deployed.** Subpath hosting was tested locally only. |
| VS Code / Live Server run | **Not run** in this environment (a plain static server and `file://` were used). |

## 8. Manual testing guide (about 10 minutes)

1. Open `index.html` (or Live Server). Expect 7 KPI cards (23 active products, 605 units, Rs 367,220 cost value, Rs 578,250 retail value, Rs 211,030 profit potential, 4 low, 3 out), 24 table rows and the badge "Sample data".
2. Type `mouse` in search (1 row), then `acc-00` (5 rows). Clear filters.
3. Choose Electronics + Low stock: only Bluetooth Speaker remains.
4. Sort by Inventory value, then press the direction button.
5. Add product: press Save with an empty form to see errors; try a SKU that exists, a selling price below cost and quantity 2.5; then add a valid product and watch the KPIs change.
6. Edit a product and set its stock to 0; out-of-stock count rises.
7. Delete a product: cancel once, confirm once.
8. Refresh the page: your changes remain and the badge reads "Your data".
9. Export CSV (opens as a file named `stocksense-products.csv`).
10. Reset to sample data: confirm; the 24 sample products return.
11. Shrink the window below 768px to see stacked product cards; below 1024px to see the menu button.

## 9. Repeating the automated tests (optional)

Requires Node 18+, Python 3 and Playwright with Chromium (`pip install playwright` then `playwright install chromium`). The tests contain absolute paths from the development machine and must be edited to your folder before running; the app itself needs none of this.

```
node tests/unit.js
python tests/e2e.py
python tests/audit.py
```
