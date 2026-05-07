# ADR 002 — Tailwind CSS v4 (CSS-first configuration)

**Status:** Accepted

## Context

The design uses a specific palette (parchment, terracotta, sage, espresso) and custom font stack. These tokens need to be available both as utility classes in JSX and as CSS custom properties for Framer Motion's `style` prop. Options considered: plain CSS custom properties + utility classes, CSS Modules, `styled-components`, Tailwind CSS v3, Tailwind CSS v4.

## Decision

Use Tailwind CSS v4 with the `@tailwindcss/vite` native plugin and define all design tokens in a `@theme {}` block in `globals.css`.

## Rationale

**Why Tailwind over CSS Modules / styled-components:**  
Utility classes keep styles co-located with the markup they affect. There is no context-switching between a `.module.css` file and the component. For a portfolio with bespoke one-off styles on most elements, the verbose-but-collocated approach of Tailwind is a better fit than abstracted component styles.

**Why v4 over v3:**  
Tailwind v4 replaces `tailwind.config.js` with a CSS-native `@theme {}` directive. This means:

- A single `globals.css` file defines the entire design system — no separate config file, no JS-in-config
- The design tokens become CSS custom properties _automatically_ (`--color-terracotta: #c4652a` is generated alongside the `text-terracotta` utility)
- The native Vite plugin (`@tailwindcss/vite`) integrates directly with Vite's transform pipeline — no PostCSS config required
- Full compatibility with TypeScript (no `tailwind.config.ts` type gymnastics)

**Token example:**

```css
/* globals.css */
@import 'tailwindcss';

@theme {
  --color-terracotta: #c4652a;
  --font-display: 'Fraunces', Georgia, serif;
}
```

This generates `text-terracotta`, `bg-terracotta`, `border-terracotta` utilities _and_ keeps `var(--color-terracotta)` available for inline styles in Framer Motion.

## Consequences

- Tailwind v4 is relatively new; some third-party plugins still target v3 syntax
- The `@theme {}` directive is CSS-first, so existing v3 configuration patterns (plugins, `extend`, `screens`) require translation
- `tailwind.config.js` is absent — contributors familiar with v3 will need to know that tokens live in `globals.css`
