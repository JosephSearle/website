# ADR 0008: Use Framer Motion for UI Animation

**Date:** 2026-05-20  
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

The portfolio uses animation to communicate interactivity and personality: a profile card that flips on hover, sections that fade in as they enter the viewport, and micro-interactions on buttons and links. The animation library must integrate well with React 19, support `prefers-reduced-motion`, and be typeable in TypeScript without workarounds.

Options considered: plain CSS transitions/animations, GSAP, React Spring, and Framer Motion.

Framer Motion 12 was detected as a direct dependency in `package.json`. Easing constants are centralised in `src/lib/motion.ts` and used across section components.

## Decision

Use Framer Motion 12 as the primary animation library for the React SPA. Shared easing constants and `Variants` objects are defined in `src/lib/motion.ts` to avoid scattered inline values.

## Rationale

**Plain CSS transitions:** Would work for simple hover effects and fade-ins but cannot express the `rotateY` card flip (which requires coordinating two faces and perspective) or the scroll-triggered `whileInView` pattern without JavaScript.

**GSAP:** Extremely powerful, but its React integration is imperative (`useEffect` + `gsap.to()`), which conflicts with React's declarative model. The free tier of GSAP does not include ScrollTrigger's most useful features.

**React Spring:** Physics-based animations with a React-native API. Good alternative, but Framer Motion's `whileInView`, `whileHover`, and `AnimatePresence` cover the specific patterns needed here more directly, and Framer Motion's `useReducedMotion()` hook provides first-class reduced-motion support.

**Framer Motion:** Declarative props-based API that integrates naturally with JSX. `whileInView` handles scroll-triggered animations without manual `IntersectionObserver` wiring. `useReducedMotion()` makes it straightforward to suppress animations for users with the preference set. The `Variants` system lets animation states be defined once and shared across a component tree.

**Framer Motion 12 type constraint:** Cubic-bezier easing must be typed as a `[number, number, number, number]` tuple, not a `number[]`. All easing values are defined in `src/lib/motion.ts` with explicit tuple types to enforce this at compile time.

## Consequences

### Positive

- Declarative animation props keep animation logic co-located with the component markup
- `useReducedMotion()` provides first-class support for the `prefers-reduced-motion` accessibility preference
- `whileInView` handles scroll-triggered entry animations without manual `IntersectionObserver` management
- `AnimatePresence` enables exit animations for route transitions and conditional renders

### Negative

- `whileInView` depends on `IntersectionObserver`, which jsdom does not implement — the test setup must stub it globally (`src/test/setup.ts`)
- Framer Motion adds ~40 KB to the gzipped bundle (the largest single dependency by weight)
- Cubic-bezier easing tuples must be typed explicitly in TypeScript — a raw `number[]` causes a compile error in Motion 12

### Neutral / Risks

- Motion values and animation state are internal to Framer Motion and cannot be easily asserted in unit tests — animation correctness is a visual concern only

## Related Decisions

- Supersedes: (none)
- Related: [ADR-0003](0003-use-tailwind-css-v4.md) (Tailwind's `@theme` CSS custom properties are used in Framer Motion's `style` prop for design-token-aware inline styles)
- Related: [ADR-0007](0007-vitest-rtl-msw-testing-strategy.md) (`IntersectionObserver` stub requirement is a direct consequence of this decision)
