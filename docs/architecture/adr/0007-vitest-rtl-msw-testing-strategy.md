# ADR 0007: Testing Strategy — Vitest + React Testing Library + MSW

**Date:** 2026-05-20  
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

The project needs a test suite covering UI components, custom hooks, form behaviour, and API integration — all within a Vite build environment. Options considered: Jest + React Testing Library, Vitest + React Testing Library, and Playwright (E2E only).

## Decision

Use Vitest 3 with React Testing Library 16, `@testing-library/user-event`, and MSW 2 for API mocking. Tests are co-located with their source files. No snapshot tests. No end-to-end framework in the initial build.

## Rationale

**Vitest over Jest:** Vitest is Vite-native. It reads `vite.config.ts` for transform settings, path aliases (`@/*`), and plugin configuration — there is no separate Babel or Jest transform config to maintain. `vi.fn()`, `vi.mock()`, and `vi.stubEnv()` are API-compatible with Jest equivalents, so the learning curve is near-zero. Vitest's watch mode is significantly faster for iterative development on a Vite project.

**React Testing Library over Enzyme:** RTL's philosophy — query by role, label, and text rather than by component internals — produces tests that verify user-visible behaviour. Tests survive refactors of component internals without requiring updates, as long as the rendered output stays the same.

**MSW over mocking `fetch` directly:** MSW intercepts at the network layer, not at the `fetch` function level. The actual `fetch` call in `ContactForm.tsx` runs unchanged in tests. Response shape mismatches are caught automatically (unlike a `vi.fn(() => Promise.resolve({ ok: true }))` mock). The same handlers can be reused for a future Playwright or Storybook integration.

**Co-location over a central `__tests__/` directory:** Each test file lives next to the file it tests (`Button.tsx` + `Button.test.tsx`). Coverage gaps are immediately visible in the file tree, and import paths are short.

**What is not tested:**

- Framer Motion animation values — tests verify animated elements are present in the DOM; timing and easing are visual concerns
- Sanity Studio schemas — the Studio is a separate deployment
- Email rendering output — `ContactEmail.tsx` is not in the Vitest suite; its HTML is verified by manual send
- E2E / visual regression — Playwright would be the natural next addition

## Consequences

### Positive

- No separate Babel or transform configuration — Vitest reads `vite.config.ts` directly
- Test authoring is Jest-compatible — no new APIs to learn
- MSW handlers can be reused for Storybook or Playwright when added
- Co-located tests make coverage gaps immediately visible

### Negative

- The `IntersectionObserver` must be stubbed globally in `src/test/setup.ts` because Framer Motion's `whileInView` reads it and jsdom does not implement it
- `vi.mock('@/lib/sanity/client')` must be called before importing modules that transitively import the client, since Sanity's `createClient` throws when `projectId` is falsy
- `vi.stubEnv('VITE_SANITY_PROJECT_ID', 'test-id')` is needed to simulate a configured Sanity environment in hook tests
- No E2E coverage of the full contact form → Resend flow

### Neutral / Risks

- The test suite does not enforce lint or type checking — those are separate steps in `npm run lint` and `tsc -b`
- No CI pipeline currently runs the test suite automatically on PRs (see [09-risks-and-debt.md](../09-risks-and-debt.md))

## Related Decisions

- Supersedes: (none) — original decision documented in `docs/decisions/006-testing-strategy.md`
- Related: [ADR-0002](0002-spa-over-ssr.md) (the Vite build environment drove the choice of Vitest)
