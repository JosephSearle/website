# ADR 006 — Testing strategy: Vitest + RTL + MSW

**Status:** Accepted

## Context

The project needs a test suite that covers UI components, custom hooks, form behaviour, and API integration. Options considered: Jest + React Testing Library, Vitest + React Testing Library, Playwright (E2E only).

## Decision

Use Vitest 3 with React Testing Library 16, `@testing-library/user-event`, and MSW 2 for API mocking. Tests are co-located with their source files. No snapshot tests. No Playwright in the initial build.

## Rationale

**Vitest over Jest:**  
Vitest is Vite-native. It reads `vite.config.ts` for transform settings, path aliases (`@/*`), and plugin configuration — there is no separate Babel or Jest transform config to maintain. `vi.fn()`, `vi.mock()`, and `vi.stubEnv()` are API-compatible with Jest's equivalents, so the learning curve is near-zero. Vitest's watch mode is significantly faster for iterative development than Jest on a Vite project.

**React Testing Library over Enzyme:**  
RTL's philosophy — query by role, label, text, not by component internals — produces tests that verify user-visible behaviour rather than implementation details. This means tests survive refactors of component internals without requiring updates, as long as the rendered output stays the same.

**MSW over mocking `fetch` directly:**  
MSW intercepts at the network layer, not at the `fetch` function level. This means:

- The actual `fetch` call in `ContactForm.tsx` runs unchanged in tests
- Response shape mismatches are caught automatically (unlike `vi.fn(() => Promise.resolve({ ok: true }))`)
- The same handlers can be reused for a future Playwright or Storybook integration

**Co-location over a central `__tests__/` directory:**  
Each test file lives next to the file it tests (`Button.tsx` + `Button.test.tsx`). This makes it immediately obvious which components have test coverage, avoids long import paths, and keeps related files visible together in the editor.

## Test categories

| Category      | Tools                   | Example                                                        |
| ------------- | ----------------------- | -------------------------------------------------------------- |
| UI primitives | RTL + Vitest            | `Button.test.tsx` — renders, variants, disabled state          |
| Layout        | RTL + Vitest            | `Nav.test.tsx` — renders links, scroll border toggle           |
| Sections      | RTL + Vitest            | `Projects.test.tsx` — renders project titles from static data  |
| Hooks         | `renderHook` + Vitest   | `useSanityPosts.test.ts` — fallback, live data, error recovery |
| Forms         | RTL + `userEvent` + MSW | `Contact.test.tsx` — validation, success, error, reset         |
| Pages         | RTL + MemoryRouter      | `BlogPostPage.test.tsx` — slug lookup, 404 state               |

## What is not tested

- **Framer Motion animations:** Animation values are not asserted. Tests verify that animated elements are present in the DOM and have the correct content; timing and easing are visual concerns.
- **Sanity Studio schemas:** The studio is a separate deployment; its schemas are not run through Vitest.
- **Email rendering:** `ContactEmail.tsx` is a React Email component; its output is HTML and is not tested in the Vitest suite. End-to-end verification requires a real Resend send.
- **E2E / visual regression:** Not included in the initial build. Playwright would be the natural next addition.

## Consequences

- The `IntersectionObserver` must be stubbed globally in `src/test/setup.ts` because Framer Motion's `whileInView` reads it and jsdom does not implement it
- `vi.mock('@/lib/sanity/client')` must be called before importing modules that transitively import the client, since Sanity's `createClient` throws when `projectId` is falsy — the mock prevents this at module load time
- `vi.stubEnv('VITE_SANITY_PROJECT_ID', 'test-id')` is used to simulate a configured Sanity environment within individual hook tests
