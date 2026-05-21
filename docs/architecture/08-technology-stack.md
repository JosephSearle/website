# 08 — Technology Stack

**Audience:** All  
**Question answered:** What technologies are in use, at what versions, and where are the rationale documented?

---

## Stack table

| Layer                    | Technology                            | Version            | Rationale                                                                                              |
| ------------------------ | ------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| **Runtime**              | Node.js                               | ≥ 22 (recommended) | Serverless function runtime (Vercel); also the local dev toolchain                                     |
| **UI framework**         | React                                 | 19.x               | Concurrent features, stable Actions API; see [ADR-0002](adr/0002-spa-over-ssr.md)                      |
| **Language**             | TypeScript                            | ~6.0               | Full type coverage across `src/`, `api/`, `emails/`, `studio/`                                         |
| **Build tool**           | Vite                                  | 8.x                | Native ESM, fast HMR, zero-config for React; see [ADR-0002](adr/0002-spa-over-ssr.md)                  |
| **Styling**              | Tailwind CSS                          | v4.x               | CSS-first `@theme` tokens, native Vite plugin; see [ADR-0003](adr/0003-use-tailwind-css-v4.md)         |
| **Animation**            | Framer Motion                         | 12.x               | Declarative animation API for React; see [ADR-0008](adr/0008-framer-motion-for-animation.md)           |
| **Routing**              | React Router                          | v7.x (SPA mode)    | Client-side routing for SPA; chosen alongside the Vite SPA decision                                    |
| **CMS client**           | @sanity/client                        | v7.x               | Framework-agnostic Sanity client with GROQ support; see [ADR-0004](adr/0004-sanity-as-headless-cms.md) |
| **Form state**           | React Hook Form                       | v7.x               | Performant uncontrolled form management                                                                |
| **Schema / validation**  | Zod                                   | v4.x               | Shared client + server validation; see [ADR-0009](adr/0009-shared-zod-schema-for-validation.md)        |
| **Email rendering**      | React Email + @react-email/components | latest             | React component model for transactional email templates                                                |
| **Email delivery**       | Resend                                | v4.x               | Native React Email integration; see [ADR-0005](adr/0005-resend-for-email-delivery.md)                  |
| **Deployment**           | Vercel                                | —                  | CDN + serverless runtime; see [ADR-0006](adr/0006-vercel-for-deployment.md)                            |
| **Testing: runner**      | Vitest                                | v3.x               | Vite-native test runner; see [ADR-0007](adr/0007-vitest-rtl-msw-testing-strategy.md)                   |
| **Testing: UI**          | React Testing Library                 | v16.x              | Semantic, behaviour-focused component tests                                                            |
| **Testing: user events** | @testing-library/user-event           | v14.x              | Realistic user interaction simulation                                                                  |
| **Testing: API mocks**   | MSW                                   | v2.x               | Network-layer interception for the contact API                                                         |
| **Linting**              | ESLint                                | v10.x              | TypeScript-aware linting with React Hooks plugin                                                       |
| **Formatting**           | Prettier                              | v3.x               | Opinionated formatter; enforced via `lint-staged` + Husky                                              |
| **Git hooks**            | Husky + lint-staged                   | v9 / v15           | Pre-commit: ESLint + Prettier on changed files                                                         |
| **CMS**                  | Sanity                                | —                  | Hosted headless CMS; see [ADR-0004](adr/0004-sanity-as-headless-cms.md)                                |
| **CMS Studio**           | Sanity Studio                         | v3                 | Deployed separately to `<project>.sanity.studio`                                                       |

---

## TypeScript environment split

Three `tsconfig.*.json` files isolate type environments that have different globals:

| Config file          | Covers            | Key difference                                                     |
| -------------------- | ----------------- | ------------------------------------------------------------------ |
| `tsconfig.app.json`  | `src/`            | Browser globals, JSX, `@/*` path alias, `import.meta.env`          |
| `tsconfig.node.json` | `vite.config.ts`  | Node.js globals, no JSX                                            |
| `tsconfig.api.json`  | `api/`, `emails/` | Node.js globals, JSX enabled for React Email, `@vercel/node` types |

All three are referenced by root `tsconfig.json` so `tsc -b` validates all environments in one command.

---

## Notable version constraints

- **Tailwind CSS v4** requires the `@tailwindcss/vite` plugin and the `@import 'tailwindcss'` directive rather than `tailwind.config.js`. Plugins targeting v3 syntax are incompatible.
- **React 19** uses the new JSX transform (`react/jsx-runtime`). The `@vitejs/plugin-react` v6 handles this automatically.
- **Zod v4** has breaking changes from v3 — error message format and some API surface changed. All Zod usage in this project targets v4.
- **Framer Motion 12** requires cubic-bezier easings as `[n, n, n, n]` tuples (not string constants). All easing values are typed in `src/lib/motion.ts` to enforce this.
