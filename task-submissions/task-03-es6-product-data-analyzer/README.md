# StockSense: Smart Inventory Analytics
**Live Demo:** https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-03-es6-product-data-analyzer/

> **Know Your Stock. Understand Your Business.**

| | |
| --- | --- |
| Official assignment title | **ES6 Product Data Analyzer** |
| Application | StockSense: Smart Inventory Analytics |
| Student | Abdullah Khan |
| Registration number | OCT26-FE06-08 |
| Organisation | Appverse Technologies, Frontend Developer Internship (6 weeks) |
| Assignment announced | October 8, 2026 |
| Prepared | October 17, 2026 |
| Official deadline | October 20, 2026, 1:05 PM |

## 1. Overview and problem statement
Small retailers often track stock in notebooks or scattered spreadsheets, so they cannot quickly see what is running low, how much money is tied up in stock, or whether records contain mistakes. StockSense is a responsive, dependency-free inventory dashboard that answers those questions from a product list, entirely in the browser.

It is a **frontend-only demo** built with vanilla JavaScript ES6+. There is no backend, database, login, supplier connection or real business data. The starting data is 24 sample products (prices in PKR). Your edits are kept in the browser's `localStorage`.

## 2. Features
- 7 KPI cards: active products, total units, inventory cost value, potential retail value, estimated gross profit potential, low-stock and out-of-stock counts
- Category value analysis (CSS bars), restock alerts and a data-quality check
- Product table with search (name or SKU), category filter, stock-status filter and sorting (name, price, stock, inventory value)
- Add, edit and delete products with validation messages; delete and reset need confirmation
- Duplicate ID/SKU prevention
- Persistence in `localStorage`, reset to sample data (a backup of your current data is stored first), CSV export of the filtered list
- Mobile-first responsive layout: drawer navigation and stacked product cards on phones, full table on tablets and desktops
- Keyboard-accessible, visible focus, reduced-motion support, system fonts, no external requests

## 3. Technologies
HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES6+), `localStorage`, `Intl.NumberFormat` (`en-PK`, `PKR`), native `<dialog>`. No frameworks, packages or build step.

## 4. Project structure
```
stocksense-inventory-analytics/
├── index.html
├── css/
│   ├── tokens.css        design tokens (colours, type, spacing, radii)
│   ├── base.css          reset, typography, focus, helpers
│   ├── layout.css        app shell, sidebar, grids
│   └── components.css    buttons, cards, forms, table, dialogs, toast
├── js/
│   ├── data.js           24 sample products + categories
│   ├── analytics.js      pure functions: summary, filter, sort, validate, CSV
│   ├── storage.js        localStorage with graceful fallbacks
│   └── app.js            DOM rendering and event handling
├── assets/favicon.svg
├── screenshots/          20 screenshots (see section 11)
├── docs/StockSense_Project_Report.pdf
├── tests/                test scripts and recorded results (optional to run)
├── README.md
└── TESTING.md
```
Scripts load in this order (all `defer`): `data.js`, `analytics.js`, `storage.js`, `app.js`. All paths are relative, so the project works from any folder or repository subpath.

## 5. Running locally in VS Code
**Option A (nothing to install):** open the folder in VS Code, then double-click `index.html` in your file explorer to open it in the browser.

**Option B (Live Server, optional):** install the VS Code extension *Live Server* (Ritwick Dey), right-click `index.html` and choose **Open with Live Server**.

**Option C (terminal):** inside the project folder run `python -m http.server 8000` (or `py -m http.server 8000` on Windows) and open <http://localhost:8000>.

Optional extras: none are required. A modern browser (Chrome, Edge, Firefox or Safari) is the only requirement.

## 6. How data is stored
Saved under the key `stocksense.inventory.v1` as JSON: `{ version, mode, savedAt, products }`. `mode` is `"demo"` until you change something, then `"custom"`. Before a reset, the current saved data is copied to `stocksense.backup.v1`. If storage is blocked or the saved data is damaged, the app shows a notice and falls back to the sample data; a damaged saved value is not overwritten until you make a change.

## 7. Business rules
| Rule | Definition |
| --- | --- |
| Inventory cost value | `costPrice * stockQuantity` |
| Potential retail value | `sellingPrice * stockQuantity` |
| Estimated gross profit potential | retail value minus cost value (an estimate, not realised profit) |
| Out of stock | `stockQuantity === 0` |
| Low stock | `0 < stockQuantity <= reorderLevel` |
| Active vs inactive | Only **active** products count in KPIs, category analysis and restock alerts. Inactive products stay in the table with an "Inactive" badge. |
| Valid record | non-empty name; unique ID and SKU (SKU compared case-insensitively); category from the list; supplier present; finite non-negative prices; whole-number stock and reorder level of 0 or more; status active/inactive |
| Selling price | **Must be greater than or equal to cost price.** This is a deliberate choice to catch typing mistakes; selling below cost is rejected with a message. |

## 8. Where the required ES6+ features are used
| Requirement | Where (file / function) | Real task |
| --- | --- | --- |
| 20+ product objects | `js/data.js` `DEMO_PRODUCTS` | 24 products |
| Destructuring | `analytics.js` `costValue`, `toRow`, `validateProduct`, `findProduct`; `app.js` table rendering | read fields in parameters and rows |
| Spread | `computeSummary` (`...totals`), `categoryBreakdown`, `sortProducts` (`[...products]`), `app.js` edit `{ ...p, ...candidate }` and add `[...products, candidate]` | immutable updates and safe sorting copies |
| `map()` | `toRows`, `categoryBreakdown`, `toCSV`, `app.js` render | display rows and category rows |
| `filter()` | `filterProducts`, `computeSummary`, restock list | search, category, stock status, low/out counts |
| `reduce()` | `computeSummary`, `categoryBreakdown`, `nextProductId` | totals, category aggregates, next ID |
| `find()` | `findProduct` | edit/delete lookup by ID or SKU |
| `some()` | `needsRestock`, duplicate checks in `validateProduct` | any product needs restock; SKU already used |
| `every()` | `allRecordsValid` | all records valid. Note `every([])` is `true`, so emptiness is checked separately where it matters. |
| Summary object | `computeSummary()` returns `{ totalProducts, totalUnits, inventoryCostValue, potentialRetailValue, estimatedGrossProfit, lowStockCount, outOfStockCount, allRecordsValid, ... }` | feeds the KPI cards |
| Display in browser | `app.js` | KPI cards, table, category bars, alerts, data-quality box |

Spread makes a **shallow** copy: top-level properties are copied, but nested objects or arrays would still be shared with the original. Product records here are flat, so a spread update is safe. `flat()` is not required by the assignment and is not used.

## 9. Testing
See **TESTING.md** for the full record: 39 unit tests and 145 browser tests, all passing in headless Chromium, with the list of things **not** tested (Lighthouse, other browsers, real devices, screen readers).

Quick manual check: open the app, search `mouse`, add a product with an empty form (errors appear), add a valid product (KPIs change), refresh (data stays), then use "Reset to sample data".

## 10. Deploying to GitHub Pages
1. Create a repository on GitHub (for example `stocksense-inventory-analytics`) or use your existing internship repository.
2. Put the project files in it. If it is the whole repository, `index.html` must be at the root; if it lives in a subfolder (for example `task-submissions/task-04-stocksense/`), keep the folder as is.
3. From the project folder:
   ```
   git init                       (skip if the repository already exists)
   git add .
   git commit -m "Add StockSense inventory analytics"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repository>.git
   git push -u origin main
   ```
   Replace the placeholders with your own username and repository. No tokens or passwords belong in any file.
4. On GitHub open **Settings, Pages**. Under *Build and deployment* choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then **Save**.
5. Wait about a minute (check the **Actions** tab), then open `https://<your-username>.github.io/<repository>/` (add the subfolder path if you used one).
6. **Verify:** the dashboard shows 23 active products and the "Sample data" badge; the browser console (F12) has no red errors; the Network tab shows CSS and JS files with status 200; add a product and refresh to confirm saving works.

**Live Demo:** https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-03-es6-product-data-analyzer/

## 11. Screenshots
Genuine captures are in `screenshots/`. Files 06 to 20 are real browser screenshots of the running app (desktop, tablet and mobile). Files 01 to 05 are images rendered from real command output and real source lines (a directory listing and code excerpts), not editor screenshots.

## 12. Known limitations
- Demo data and a single browser: `localStorage` is per browser and per device, with no sync, accounts or multi-user support.
- Gross profit and values are estimates from the entered prices and quantities, not sales results.
- Inactive products are excluded from totals by design.
- CSV export covers the currently filtered list.
- Lighthouse, Firefox, Safari, real phones and screen readers have not been tested (see TESTING.md).

## 13. Licence
Created by Abdullah Khan for the Appverse Technologies internship. Sample data is fictional.
