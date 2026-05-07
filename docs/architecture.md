# Architecture

## Overview

This is a React single-page application (SPA) served as a static bundle on Vercel, with a single Vercel serverless function (`/api/contact`) that handles contact form email delivery. Content for the Writing and Projects sections is fetched from Sanity at runtime; static fallback data ships with the bundle so the site is always functional without a live CMS connection.

```
Browser
  └── React SPA (Vite bundle, served from Vercel CDN)
        ├── React Router v7  (client-side routing)
        ├── Framer Motion    (scroll + enter animations, card flip)
        ├── Sanity hooks     (fetch posts/projects from Sanity CDN)
        └── Contact form     (posts to /api/contact)

Vercel Edge
  └── /api/contact.ts  (Vercel serverless function)
        ├── Zod validation
        ├── React Email render
        └── Resend API call

Sanity Content Lake
  └── GROQ queries via @sanity/client (useCDN: true)

Sanity Studio
  └── Hosted at <project>.sanity.studio (separate deploy)
```

## Key patterns

### Static-first data with live CMS overlay

All content exists in `src/data/` as TypeScript arrays. When `VITE_SANITY_PROJECT_ID` is set, the three Sanity hooks (`useSanityPosts`, `useSanityProjects`, `useSanityPost`) fetch live content and replace the static data after mount. The hooks silently fall back to static data on any fetch error.

This means:

- The page is never blank — static data renders on the first paint
- The CMS can be disabled entirely in dev without breaking anything
- Adding a Sanity project requires only setting an env var

### Shared Zod schema between client and server

`src/schemas/contact.ts` is imported by both `src/components/sections/Contact/ContactForm.tsx` and `api/contact.ts`. The schema is the single source of truth for validation rules; client-side error messages and server-side rejection both derive from the same Zod definitions.

### Typed Framer Motion easings

Framer Motion 12 requires cubic-bezier easing as a `[number, number, number, number]` tuple. All shared easing constants live in `src/lib/motion.ts`:

```ts
export const SPRING: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const fadeUp: Variants = { … }
```

This avoids scattered inline arrays and the TypeScript error that results from widening `number[]`.

### IntersectionObserver stub in tests

Framer Motion's `whileInView` reads `IntersectionObserver` at runtime. jsdom does not implement it. `src/test/setup.ts` stubs it globally with a vi.fn() mock so all component tests can render without errors.

### Sanity `'placeholder'` projectId

`@sanity/client`'s `createClient` throws synchronously when `projectId` is falsy. Using `|| 'placeholder'` as the fallback allows the client object to be created in all environments; the early-return guard inside each hook (`if (!import.meta.env.VITE_SANITY_PROJECT_ID) return`) ensures no real fetch is ever attempted when unconfigured.

### TypeScript project references

Three `tsconfig.*.json` files cover three distinct environments:

| File                 | Covers            | Notes                                 |
| -------------------- | ----------------- | ------------------------------------- |
| `tsconfig.app.json`  | `src/`            | React + Vite browser env, `@/*` alias |
| `tsconfig.node.json` | `vite.config.ts`  | Node env, no JSX                      |
| `tsconfig.api.json`  | `api/`, `emails/` | Node env, JSX for React Email         |

All three are referenced by `tsconfig.json` so `tsc -b` checks all of them in the build.

## Component hierarchy

```
App
└── RouterProvider
    ├── / → HomePage
    │   ├── Nav
    │   ├── Hero
    │   │   └── AvatarCard        (Framer Motion flip card)
    │   ├── Skills
    │   ├── Timeline
    │   │   └── TimelineItem[]
    │   ├── Projects
    │   │   └── ProjectCard[]
    │   ├── Writing
    │   │   └── BlogRow[]
    │   ├── Contact
    │   │   └── ContactForm       (RHF + Zod + /api/contact fetch)
    │   └── Footer
    └── /blog/:slug → BlogPostPage
        ├── Nav
        ├── PortableTextBody      (renders Sanity portable text)
        └── Footer
```

## Testing strategy

Tests live next to the code they test. The test layer is:

- **Unit** — UI primitives (`Button`, `Chip`, `PulseDot`) and hooks (`useNavScroll`, `useSanityPosts`, `useSanityProjects`)
- **Integration** — section components rendered with RTL; verify content, accessibility attributes, and Framer Motion presence
- **Contract** — `ContactForm` uses MSW to intercept `POST /api/contact`; tests cover success, server error, validation error, and form reset

No snapshot tests. All assertions use semantic queries (`getByRole`, `getByLabelText`, `getByText`).

## Styling conventions

Design tokens are defined once in `src/styles/globals.css` as Tailwind v4 `@theme` variables. This makes them available as both Tailwind utilities (`text-terracotta`, `bg-espresso`) and as CSS custom properties (`var(--color-terracotta)`) for use in Framer Motion's `style` prop or dynamic inline styles.

Tailwind utility classes are written inline on JSX elements. No separate CSS modules or `styled-components`. The only hand-written CSS rules are base resets and the `prefers-reduced-motion` media query in `globals.css`.

## Accessibility notes

- All interactive elements (`Button`, nav links, `ProjectCard`, `BlogRow`) use `focus-visible:ring-2 focus-visible:ring-terracotta` — the ring appears only for keyboard navigation, not mouse clicks
- The `AvatarCard` flip is triggered by both `onMouseEnter` and `onFocus`, and suppressed when `useReducedMotion()` returns true
- Form feedback uses `<output>` (success) and `role="alert"` (errors) for screen reader announcements
- `@media (prefers-reduced-motion: reduce)` in `globals.css` sets all animation durations to `0.01ms` as a CSS-level safety net
