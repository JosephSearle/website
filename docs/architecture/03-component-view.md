# 03 — Component View

**Audience:** Engineers  
**Question answered:** What are the major structural units inside the React SPA?

---

## Component diagram

```mermaid
C4Component
  title Component View — React SPA

  Container_Boundary(spa, "React SPA") {
    Component(router, "Router", "React Router v7", "Declares the two client-side routes: / and /blog/:slug")
    Component(pages, "Pages", "React / TypeScript", "HomePage composes all sections; BlogPostPage fetches and renders a single post")
    Component(layout, "Layout", "React / TypeScript", "Nav (scroll-aware, active-section highlight) and Footer")
    Component(sections, "Section Components", "React / TypeScript", "Hero, Skills, Timeline, Projects, Writing, Contact — one directory per section")
    Component(ui, "UI Primitives", "React / TypeScript", "Button, Chip, PulseDot — atomic, reusable, no business logic")
    Component(sanityHooks, "Sanity Hooks", "React / TypeScript", "useSanityPosts, useSanityProjects, useSanityPost — fetch live CMS data with static fallback")
    Component(sanityLib, "Sanity Client", "TypeScript / @sanity/client", "createClient wrapper; typed GROQ queries; PortableText renderer")
    Component(staticData, "Static Data", "TypeScript", "src/data/ — posts, projects, timeline arrays; used as initial state and CMS fallback")
    Component(contactForm, "Contact Form", "React Hook Form v7 / Zod", "Form state, validation, and POST to /api/contact")
    Component(motionLib, "Motion Constants", "TypeScript / Framer Motion", "src/lib/motion.ts — shared easing tuples and Variants objects")
  }

  SystemDb_Ext(sanity, "Sanity Content Lake", "")
  Container_Ext(contactFn, "Contact Function", "Node.js / Vercel Serverless", "")

  Rel(router, pages, "Renders")
  Rel(pages, layout, "Composes")
  Rel(pages, sections, "Composes")
  Rel(sections, ui, "Uses")
  Rel(sections, sanityHooks, "Reads content from")
  Rel(sections, contactForm, "Contact section hosts")
  Rel(sections, motionLib, "Imports easing constants from")
  Rel(sanityHooks, staticData, "Falls back to when CMS unset")
  Rel(sanityHooks, sanityLib, "Queries via")
  Rel(sanityLib, sanity, "Fetches", "GROQ / HTTPS")
  Rel(contactForm, contactFn, "Posts to", "REST / JSON")
```

---

## Dependency direction rules

Dependencies flow in one direction only: outward from pages toward primitives. No component imports from a parent or sibling section.

```
Pages
  └── Layout components (Nav, Footer)
  └── Section components
        └── UI primitives (Button, Chip, PulseDot)
        └── Sanity hooks
              └── Sanity client lib
              └── Static data (fallback)
        └── Contact form
        └── Motion constants
```

**Rules enforced by convention (no lint rule currently):**

- Section components do not import from other section components
- UI primitives have no business logic and no data-fetching
- Sanity hooks are the only components that call `@sanity/client` — sections never import the client directly

---

## Key structural decisions

**Co-located tests.** Every component file is paired with a `.test.tsx` file in the same directory. There is no central `__tests__/` directory. This makes coverage gaps immediately visible in the file tree.

**Single router file.** `App.tsx` defines both routes (`/` and `/blog/:slug`) using `createBrowserRouter`. Adding a new route means editing one file. Route-level code splitting is not implemented (the bundle is sufficiently small for a personal portfolio).

**PortableText renderer.** `src/lib/sanity/portableText.tsx` maps Sanity Portable Text blocks to React elements with design-token class names. It is the only component that couples Sanity's rich-text format to the app's visual language.

**TypeScript project references.** Three `tsconfig.*.json` files cover three environments (`src/`, `vite.config.ts`, `api/` + `emails/`). This is a structural decision affecting the build — see [ADR-0007](adr/0007-vitest-rtl-msw-testing-strategy.md) for testing implications and `docs/architecture.md` for the full tsconfig table.
