# ADR 0003: Use Tailwind CSS v4 with CSS-First Configuration

**Date:** 2026-05-20
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

The design uses a specific palette (parchment, terracotta, sage, espresso) and custom font stack. These tokens need to be available both as utility classes in JSX and as CSS custom properties for Framer Motion's `style` prop. Options considered: plain CSS custom properties with utility classes, CSS Modules, `styled-components`, Tailwind CSS v3, Tailwind CSS v4.

## Decision

Use Tailwind CSS v4 with the `@tailwindcss/vite` native plugin and define all design tokens in a `@theme {}` block in `globals.css`.

## Rationale

**Why Tailwind over CSS Modules / styled-components:** Utility classes keep styles co-located with the markup they affect. There is no context-switching between a `.module.css` file and the component. For a portfolio with bespoke one-off styles on most elements, the verbose-but-collocated approach of Tailwind is a better fit than abstracted component styles.

**Why v4 over v3:** Tailwind v4 replaces `tailwind.config.js` with a CSS-native `@theme {}` directive:

- A single `globals.css` file defines the entire design system — no separate config file, no JS-in-config
- Design tokens become CSS custom properties automatically (`--color-terracotta: #c4652a` is generated alongside the `text-terracotta` utility), making them available for inline styles in Framer Motion without an extra step
- The native Vite plugin (`@tailwindcss/vite`) integrates directly with Vite's transform pipeline — no PostCSS config required
- Full TypeScript compatibility (no `tailwind.config.ts` gymnastics)

## Consequences

### Positive

- Single file defines the entire design system (`src/styles/globals.css`)
- Design tokens are automatically available as both utilities and CSS custom properties
- No PostCSS configuration required
- Faster build integration via the native Vite plugin

### Negative

- Tailwind v4 is relatively new; some third-party plugins still target v3 syntax
- The `@theme {}` directive is CSS-first, so v3 configuration patterns (`plugins`, `extend`, `screens` in JS) require translation
- `tailwind.config.js` is absent — contributors familiar with v3 need to know tokens live in `globals.css`

### Neutral / Risks

- Tailwind v4 breaking changes from v3 are significant; a future upgrade path back to v3 would not be straightforward

## Related Decisions

- Supersedes: (none) — original decision documented in `docs/decisions/002-tailwind-v4.md`
- Related: [ADR-0008](0008-framer-motion-for-animation.md) (the CSS custom property availability from `@theme` influenced the animation approach)
