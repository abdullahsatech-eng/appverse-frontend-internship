# Appverse Frontend Development Internship

**Frontend Development Internship Portfolio**

A collection of practical frontend projects, assignments, and implementations completed during the Appverse Technologies Frontend Development Internship.

![HTML5](https://img.shields.io/badge/HTML5-Frontend-orange)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen)
![Status](https://img.shields.io/badge/Portfolio-3%20Projects-success)

---

## 👨‍💻 Intern Information

| Field | Details |
|---|---|
| **Name** | Abdullah Khan |
| **Registration Number** | OCT26-FE06-08 |
| **Organization** | Appverse Technologies |
| **Internship** | Frontend Development Internship |
| **Track** | Frontend Development |
| **Phase** | Phase 1 — Web Foundations and JavaScript Mastery |

---

## 🎯 About This Repository

This repository documents my practical learning and frontend development work during the Appverse Technologies internship.

Each assignment is maintained in its own directory, with source code, project-specific documentation, and a live demonstration where applicable.

The projects demonstrate progressive development skills, from maintainable CSS architecture and responsive landing pages to JavaScript-based inventory analytics.

---

## 🚀 Task Overview

| Task | Project | Main Focus | Status |
|---|---|---|---|
| **01** | Atlas UI | CSS Architecture and Design Tokens | ✅ Completed |
| **02** | ReadySignal | Cybersecurity SaaS Landing Page | ✅ Completed |
| **03** | StockSense | ES6 Product Data Analyzer | ✅ Completed |

---

# 🧩 Task 01 — CSS Architecture and Design Tokens

## Atlas UI — CSS Architecture System

A vanilla HTML and CSS project demonstrating maintainable stylesheet organization, reusable components, design tokens, and scalable frontend styling.

### 🔗 Project Links

- **Live Demo:** [View Atlas UI](https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-01-css-architecture/)
- **Source Code:** [Task 01 Project Folder](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-01-css-architecture)
- **Documentation:** [Task 01 README](https://github.com/abdullahsatech-eng/appverse-frontend-internship/blob/main/task-submissions/task-01-css-architecture/README.md)

### Key Concepts

- BEM (Block, Element, Modifier) methodology
- CSS custom properties and design tokens
- Utility-first CSS principles
- Reusable UI components
- Low-specificity selectors
- Responsive web design
- Semantic HTML
- Separation of stylesheet responsibilities

### CSS Architecture

```text
tokens.css
    ↓
base.css
    ↓
utilities.css
    ↓
components.css
```

### Technologies

HTML5 · CSS3 · CSS Custom Properties · BEM · Responsive Web Design · GitHub Pages

---

# 🛡️ Task 02 — Cybersecurity SaaS Landing Page

## ReadySignal — Clearer Security. Smarter Decisions.

A responsive landing page for a fictional cybersecurity-readiness SaaS product. The project demonstrates a modern SaaS interface using HTML5 and CSS3, with no JavaScript.

### 🔗 Project Links

- **Live Demo:** [View ReadySignal](https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-02-cybersecurity-saas-landing-page/)
- **Source Code:** [Task 02 Project Folder](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-02-cybersecurity-saas-landing-page)
- **Documentation:** [Task 02 README](https://github.com/abdullahsatech-eng/appverse-frontend-internship/blob/main/task-submissions/task-02-cybersecurity-saas-landing-page/README.md)

### Key Features

- Responsive SaaS landing page
- CSS custom properties and reusable design tokens
- Fluid typography using `clamp()`
- Responsive layouts using CSS Grid and Flexbox
- CSS-only mobile navigation
- Dashboard-style product preview
- FAQ using native HTML elements
- Reduced-motion support and load-in animations
- Dedicated print stylesheet
- Accessibility-focused design

### Lighthouse Audit Results

The following scores were recorded during Chrome Lighthouse audits of the deployed website.

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 96 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Scores can vary between runs and testing environments.

**Project scope:** ReadySignal is a static concept demonstration. It does not perform real cybersecurity scanning, monitoring, or certification. Dashboard figures and pricing are illustrative.

### Technologies

HTML5 · CSS3 · CSS Grid · Flexbox · Container Queries · CSS Custom Properties · GitHub Pages

---

# 📦 Task 03 — ES6 Product Data Analyzer

## StockSense — Smart Inventory Analytics

> **Know Your Stock. Understand Your Business.**

StockSense is a responsive, frontend-only inventory analytics dashboard built with vanilla JavaScript ES6+. It helps users explore sample inventory data, identify low-stock products, calculate inventory values, and manage product records directly in the browser.

The project demonstrates practical use of JavaScript objects, destructuring, spread syntax, array methods, data validation, and summary calculations.

### 🔗 Project Links

- **Live Demo:** [Open StockSense Inventory Analytics](https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-03-es6-product-data-analyzer/)
- **Source Code:** [Task 03 Project Folder](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-03-es6-product-data-analyzer)
- **Documentation:** [Task 03 README](https://github.com/abdullahsatech-eng/appverse-frontend-internship/blob/main/task-submissions/task-03-es6-product-data-analyzer/README.md)
- **Project Report:** [View StockSense PDF Report](https://github.com/abdullahsatech-eng/appverse-frontend-internship/blob/main/task-submissions/task-03-es6-product-data-analyzer/docs/StockSense_Project_Report.pdf)
- **Testing Documentation:** [View TESTING.md](https://github.com/abdullahsatech-eng/appverse-frontend-internship/blob/main/task-submissions/task-03-es6-product-data-analyzer/TESTING.md)

### Key Features

- 24 fictional sample product records with prices in Pakistani rupees (PKR)
- KPI cards for active products, stock quantities, inventory cost, potential retail value, estimated gross profit potential, low stock, and out-of-stock products
- Category value analysis and restock alerts
- Product search by name or SKU
- Category and stock-status filters
- Sorting by product name, price, stock quantity, and inventory value
- Add, edit, and delete product records with validation
- Duplicate ID and SKU prevention
- Browser persistence using `localStorage`
- Reset to sample data with a backup of current saved data
- CSV export of the currently filtered product list
- Responsive layouts for mobile, tablet, and desktop screen sizes
- Keyboard focus visibility and reduced-motion support

### ES6+ Requirements Demonstrated

| Requirement | Implementation |
|---|---|
| 20 or more product objects | 24 sample products in `js/data.js` |
| Destructuring | Used to read product properties in functions and rendering |
| Spread syntax | Used for copying arrays and updating product objects |
| `map()` | Transforms product and category data for display and CSV export |
| `filter()` | Searches and filters products and calculates stock counts |
| `reduce()` | Calculates inventory totals and category aggregates |
| `find()` | Locates products by ID or SKU |
| `some()` | Checks restock requirements and duplicate values |
| `every()` | Checks whether all product records are valid |
| Summary object | `computeSummary()` returns calculated inventory metrics |
| Browser output | Dashboard KPIs, product table, category analysis, and alerts |

### Technologies

HTML5 · CSS3 · Vanilla JavaScript (ES6+) · CSS Grid · Flexbox · `localStorage` · `Intl.NumberFormat` · Native HTML Dialog · GitHub Pages

### Testing

The project documentation records **39 unit tests and 145 browser tests** passing in headless Chromium. See `TESTING.md` for the recorded results and testing limitations.

Lighthouse, Firefox, Safari, real phones, and screen readers have not been tested as documented in the project.

### Project Scope and Limitations

StockSense is a frontend-only demonstration using fictional data. It does not have a backend, database, authentication, supplier integration, or multi-user synchronization. Data is stored locally in the browser, and calculated profit figures are estimates rather than realized business results.

---

## 📁 Repository Structure

```text
appverse-frontend-internship/
│
├── README.md
│
└── task-submissions/
    │
    ├── task-01-css-architecture/
    │   ├── README.md
    │   ├── index.html
    │   └── css/
    │       ├── tokens.css
    │       ├── base.css
    │       ├── utilities.css
    │       └── components.css
    │
    ├── task-02-cybersecurity-saas-landing-page/
    │   ├── README.md
    │   ├── index.html
    │   ├── LICENSE
    │   ├── css/
    │   ├── assets/
    │   └── docs/
    │
    └── task-03-es6-product-data-analyzer/
        ├── README.md
        ├── index.html
        ├── TESTING.md
        ├── css/
        ├── js/
        ├── assets/
        ├── screenshots/
        ├── docs/
        │   └── StockSense_Project_Report.pdf
        └── tests/
```

*This is a high-level overview of the repository. Refer to each task folder for its complete file structure.*

---

## 🛠️ Skills Demonstrated

- Semantic HTML and modern CSS
- CSS architecture and stylesheet organization
- Design tokens and reusable components
- BEM naming conventions
- Responsive and mobile-first layouts
- CSS Grid and Flexbox
- Accessibility-aware interface development
- CSS animations and reduced-motion support
- JavaScript ES6+ syntax and array methods
- Data transformation, validation, and calculations
- DOM rendering and event handling
- Browser storage using `localStorage`
- CSV generation and export
- Browser-based quality auditing with Lighthouse
- Git and GitHub repository management
- GitHub Pages deployment
- Technical documentation and testing records

---

## ▶️ Running the Projects Locally

### Option 1 — Open in a browser

1. Clone or download this repository.
2. Open the relevant task folder.
3. Open its `index.html` file in a modern browser.

### Option 2 — Use Python's local server

Open a terminal in the repository directory and run:

```bash
python -m http.server 8000
```

On Windows, you can also use:

```bash
py -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Navigate to the required task folder from the repository listing.

No package installation or build step is required for these projects.

---

## 📚 Documentation

Each project has its own README and supporting documentation.

- [Task 01 — CSS Architecture and Design Tokens](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-01-css-architecture)
- [Task 02 — ReadySignal Cybersecurity SaaS Landing Page](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-02-cybersecurity-saas-landing-page)
- [Task 03 — StockSense ES6 Product Data Analyzer](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-03-es6-product-data-analyzer)

---

## 🌐 Repository

**GitHub Repository:** [appverse-frontend-internship](https://github.com/abdullahsatech-eng/appverse-frontend-internship)

---

## 👤 Author

**Abdullah Khan**  
Frontend Development Intern — Appverse Technologies  
Registration Number: `OCT26-FE06-08`

This repository is maintained as part of the Appverse Technologies Frontend Development Internship and documents practical frontend development learning, projects, and implementations.
