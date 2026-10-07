# CSS Architecture and Design Tokens

## Atlas UI — CSS Architecture System

A production-minded vanilla HTML/CSS implementation demonstrating scalable CSS architecture, BEM methodology, design tokens, utility-first principles, and organized stylesheet structure.

---

## 👨‍💻 Assignment Information

| Field | Details |
|---|---|
| **Student** | Abdullah Khan |
| **Registration** | OCT26-FE06-08 |
| **Date** | 07 October 2026 |
| **Internship** | Appverse Technologies |
| **Track** | Frontend Development |
| **Phase** | Phase 1 — Web Foundations and JavaScript Mastery |
| **Task** | CSS Architecture |
| **Focus** | CSS Architecture and Design Tokens |

---

## 🌐 Live Demo

🚀 **Live Project**

https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-01-css-architecture/

The live demonstration presents the complete Atlas UI CSS Architecture System.

---

## 💻 Source Code

**Task 01 Source Code**

https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-01-css-architecture

**Main Repository**

https://github.com/abdullahsatech-eng/appverse-frontend-internship

---

## 🎯 Project Objective

The objective of this assignment is to understand and demonstrate scalable CSS architecture techniques that can be applied to real-world frontend projects.

The implementation focuses on:

- BEM methodology
- Utility-first CSS principles
- Design tokens
- CSS custom properties
- Scalable stylesheet organization
- Reusable components
- Maintainable selectors
- Responsive design
- Semantic HTML

---

## 📁 Project Structure

    task-01-css-architecture/
    │
    ├── index.html
    ├── README.md
    │
    └── css/
        ├── tokens.css
        ├── base.css
        ├── utilities.css
        └── components.css

---

## 🏗️ CSS Architecture

The stylesheet system separates responsibilities into dedicated layers:

    tokens.css
         ↓
      base.css
         ↓
    utilities.css
         ↓
    components.css

This structure helps keep the project organized, predictable, reusable, and easier to maintain.

---

## 🎨 Design Tokens

Design tokens are centralized using CSS custom properties.

The project demonstrates tokens for:

- Color
- Spacing
- Typography
- Border radius
- Shadows
- Layout values

Examples include:

    --color-primary
    --space-4
    --text-lg
    --shadow-md

Centralizing these values creates a consistent visual system and makes future design changes easier to manage.

---

## 🧩 BEM Methodology

The project demonstrates the three core BEM concepts:

### Block

An independent and reusable component.

    .product-card

### Element

A component part that belongs to a block.

    .product-card__title

### Modifier

A variation of an existing component.

    .product-card--featured

### Example

    .product-card
    .product-card__media
    .product-card__title
    .product-card--featured

BEM provides predictable naming and helps reduce naming conflicts between components.

---

## ⚡ Utility-First Principles

The project demonstrates reusable single-purpose utility classes for common layout requirements.

Examples include:

    .flex
    .items-center
    .items-start
    .justify-between
    .justify-center
    .gap-md
    .text-center
    .w-full

Utilities can be combined to create layouts without creating unnecessary component-specific CSS.

---

## 🧱 Stylesheet Responsibilities

| File | Responsibility |
|---|---|
| `tokens.css` | Centralized design tokens |
| `base.css` | Reset, foundations, layout and responsive rules |
| `utilities.css` | Reusable single-purpose utility classes |
| `components.css` | Reusable UI components and visual patterns |

---

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes using flexible layouts and responsive CSS rules.

Responsive behavior is organized within the stylesheet architecture to keep the implementation maintainable.

---

## ♿ Semantic HTML

The project uses semantic HTML elements where appropriate to improve:

- Structure
- Accessibility
- Maintainability
- Readability

---

## 🛠️ Technologies

- HTML5
- CSS3
- CSS Custom Properties
- BEM
- Utility-First CSS Principles
- Responsive Web Design
- GitHub
- GitHub Pages

No external frontend framework or dependency is required to run the project.

---

## ▶️ Running Locally

Clone the repository:

https://github.com/abdullahsatech-eng/appverse-frontend-internship.git

Navigate to the project directory:

    appverse-frontend-internship/task-submissions/task-01-css-architecture/

Open `index.html` in a browser.

For development, the project can also be opened using VS Code Live Server.

---

## 📸 Assignment Evidence

The accompanying assignment report documents the implementation through screenshots covering:

1. BEM Components
2. Design Tokens
3. Utility-First CSS
4. Final Project Architecture
5. Responsive implementation

The screenshots demonstrate both the concepts and their practical implementation.

---

## 📚 Learning Outcomes

Through this assignment, I practiced:

- Designing scalable CSS architecture
- Applying BEM naming conventions
- Creating reusable design tokens
- Using CSS custom properties
- Building utility-first CSS classes
- Separating stylesheet responsibilities
- Reducing selector complexity
- Creating reusable components
- Building responsive interfaces
- Organizing frontend project structures
- Publishing a project using GitHub Pages

---

## 🔗 Important Links

| Resource | Link |
|---|---|
| 🌐 **Live Demo** | https://abdullahsatech-eng.github.io/appverse-frontend-internship/task-submissions/task-01-css-architecture/ |
| 💻 **Source Code** | https://github.com/abdullahsatech-eng/appverse-frontend-internship/tree/main/task-submissions/task-01-css-architecture |
| 📦 **Main Repository** | https://github.com/abdullahsatech-eng/appverse-frontend-internship |
| 📖 **Task README** | https://github.com/abdullahsatech-eng/appverse-frontend-internship/blob/main/task-submissions/task-01-css-architecture/README.md |

---

## 👤 Author

**Abdullah Khan**

Frontend Development Intern  
**Appverse Technologies**

**Registration:** `OCT26-FE06-08`

**Date:** `07 October 2026`

---

> This project was completed as part of the Appverse Technologies Frontend Development Internship and demonstrates practical application of CSS architecture, design systems, BEM methodology, and utility-first styling principles.
