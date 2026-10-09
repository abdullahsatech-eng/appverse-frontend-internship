# ReadySignal — Cybersecurity SaaS Landing Page

> **Clearer Security. Smarter Decisions.**

ReadySignal is a concept project: a complete, responsive landing page for a fictional cybersecurity-readiness SaaS product, built using **HTML5 and CSS3 only, with zero JavaScript**.

**Live Website:** [View ReadySignal](https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-02-cybersecurity-saas-landing-page/)

**Source Code:** [View Task 2 on GitHub](https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-02-cybersecurity-saas-landing-page)

ReadySignal does not scan, monitor, certify, or protect anything. There is no backend, sign-up, checkout, or real customer data. Dashboard figures, prices, and feature descriptions are illustrative.

## 1. Internship Context

| Item | Details |
|---|---|
| Organisation | Appverse Technologies |
| Internship | Frontend Developer Internship |
| Phase | Phase 1: Web Foundations and JavaScript Mastery |
| Assignment | Task 2: Cybersecurity SaaS Landing Page |
| Student | Abdullah Khan |
| Registration Number | OCT26-FE06-08 |
| Submission Date | 9 October 2026 |

## 2. Project Features

- Responsive header, navigation, and hero section
- Pure CSS mobile navigation using the checkbox technique
- CSS-built cybersecurity readiness dashboard preview
- Six proposed capability cards
- Three-step workflow and business use cases
- Illustrative pricing section
- FAQ using native HTML `<details>` and `<summary>`
- CSS design tokens and fluid typography with `clamp()`
- Responsive layouts using CSS Grid and Flexbox
- Container queries and CSS load-in animations
- Reduced-motion support and smooth scrolling
- Dedicated print stylesheet
- Accessibility-focused navigation and visible keyboard focus

## 3. Technology Stack

- HTML5
- CSS3
- CSS custom properties (design tokens)
- CSS Grid and Flexbox
- `clamp()` for fluid typography
- Container queries
- CSS animations and media queries
- Semantic HTML and accessibility features

No JavaScript, frameworks, packages, or build tools are required.

## 4. Project Structure

```text
task-02-cybersecurity-saas-landing-page/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── css/
│   ├── tokens.css
│   ├── reset.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   ├── animations.css
│   └── print.css
├── assets/
│   └── icons/
│       └── favicon.svg
└── docs/
    ├── report.pdf
    ├── REPORT.md
    ├── DEMO-SCRIPT.md
    ├── TESTING-CHECKLIST.md
    └── screenshots/
```

## 5. CSS Architecture and Design Tokens

The project separates CSS into files according to responsibility:

- `tokens.css`: Colours, typography, spacing, layout, and motion variables.
- `reset.css`: Basic browser-style reset.
- `base.css`: Typography, document defaults, focus styles, and helpers.
- `layout.css`: Containers, sections, grids, header, and footer.
- `components.css`: Reusable interface components.
- `responsive.css`: Responsive breakpoints and layout changes.
- `animations.css`: Load-in animations and smooth scrolling.
- `print.css`: Print-specific styles.

The architecture uses BEM naming conventions and reusable design tokens to maintain consistency and simplify future changes.

## 6. Responsive Design

The website follows a mobile-first approach and uses responsive breakpoints, fluid typography, CSS Grid, Flexbox, and container queries.

The layout is designed to adapt to different screen sizes, from small mobile devices to desktop displays. The CSS-only mobile menu can be opened and closed using its associated control.

**Known limitation:** Without JavaScript, the mobile menu remains open after an in-page navigation link is selected and must be closed using the menu control.

## 7. Accessibility

Accessibility measures include:

- A skip-to-content link
- Semantic HTML landmarks
- Logical heading hierarchy
- Visible keyboard focus indicators
- A labelled checkbox-based navigation control
- Reduced-motion support
- Text labels accompanying colour-coded statuses
- Decorative SVGs hidden from assistive technologies
- High-contrast text and interactive elements

Lighthouse Accessibility results are included below. Manual screen-reader testing has not been completed.

## 8. Lighthouse Audit Results

The deployed website was audited using Chrome DevTools Lighthouse in Navigation mode, with all four categories selected.

### Mobile Results

| Category | Score |
|---|---:|
| Performance | 96/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

### Desktop Results

| Category | Score |
|---|---:|
| Performance | 100/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

The Mobile audit was performed in an Incognito window to avoid interference from Chrome extensions. The Desktop audit achieved 100 in all four categories.

These scores represent the recorded audit runs; Lighthouse results can vary between runs and environments.

## 9. Testing Status

Completed checks include:

- Live website opened through GitHub Pages
- Mobile Lighthouse audit
- Desktop Lighthouse audit
- Accessibility and Best Practices targets achieved above 95
- Performance and SEO scores recorded

Not yet confirmed:

- Firefox and Safari compatibility testing
- Manual screen-reader testing
- Independent verification of every accessibility claim

See `docs/TESTING-CHECKLIST.md` for additional testing details.

## 10. Running Locally

No installation or build step is required.

**Option 1:** Open `index.html` directly in your browser.

**Option 2:** Run a local server from the project directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## 11. Deployment

The project is hosted using GitHub Pages.

**Live URL:**  
https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-02-cybersecurity-saas-landing-page/

**Repository:**  
https://github.com/abdullahsatech-eng/appverse-frontend-internship

## 12. Learning Outcomes

This project demonstrates practical use of:

- Scalable CSS architecture
- Design tokens and BEM naming
- Responsive and fluid layouts
- CSS-only interface behaviour
- Accessibility-aware development
- Reduced-motion and print support
- Lighthouse-based quality assessment
- GitHub repository management and deployment

## 13. Known Limitations

- The product is a static concept, not a functional cybersecurity service.
- There is no backend, authentication, real scanning, or monitoring.
- Dashboard figures and pricing are illustrative.
- The CSS-only mobile menu does not automatically close after selecting an in-page link.
- Firefox, Safari, and screen-reader testing remain outstanding.

## 14. Credits and Licence

Designed and built by Abdullah Khan for the Appverse Technologies Frontend Developer Internship.

Released under the MIT Licence. See the `LICENSE` file for details.

---

**Task 2 — ReadySignal Cybersecurity SaaS Landing Page**  
Appverse Technologies | Frontend Developer Internship | OCT26-FE06-08
