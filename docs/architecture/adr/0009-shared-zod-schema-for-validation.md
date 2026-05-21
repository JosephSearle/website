# ADR 0009: Shared Zod Schema for Client and Server Validation

**Date:** 2026-05-20  
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

The contact form validation rules must be consistent between the browser (real-time field feedback) and the serverless function (server-side rejection). Historically this is solved by duplicating validation logic in two places, which creates a risk of divergence: the client may accept input that the server rejects, or vice versa.

The codebase imports `src/schemas/contact.ts` (a Zod schema) in both `src/components/sections/Contact/ContactForm.tsx` and `api/contact.ts`. Zod 4 was detected as a direct dependency.

## Decision

Define a single Zod schema in `src/schemas/contact.ts` and import it in both the client-side form (as the React Hook Form resolver) and the serverless function (for `safeParse` on the request body). The schema is the single source of truth for all validation rules.

## Rationale

**Duplicated validation (rejected):** Maintaining two independent validation implementations — one in the form component and one in the API function — guarantees eventual divergence. A change to a field constraint (e.g. extending the maximum message length) requires updating two files, and there is no compile-time check that they remain consistent.

**Server-only validation (rejected):** Validating only on the server would require a round-trip request before the user sees any error feedback, degrading the form UX significantly.

**Shared Zod schema (chosen):** Zod schemas are pure TypeScript — they import cleanly from either the browser bundle (via Vite) or the Node.js serverless function (via `tsconfig.api.json`). React Hook Form's `@hookform/resolvers/zod` adapter connects the schema directly to the form state engine. The same schema is used as the type guard in the API function with `z.safeParse()`. A single change to `src/schemas/contact.ts` propagates to both environments at compile time.

**Zod 4 over Zod 3:** Zod 4 includes performance improvements and a refined error format. The error messages produced by Zod 4 are used directly in the form's field-level error display, so the schema also acts as the UI copy for validation messages.

## Consequences

### Positive

- Validation rules cannot diverge between client and server — they share one definition
- Adding or changing a validation constraint requires editing one file
- TypeScript infers the `ContactFormData` type from the schema via `z.infer<typeof contactSchema>` — no manual type declaration needed
- React Hook Form's Zod resolver and the API's `safeParse` call use the same validation path

### Negative

- The schema file lives under `src/` but is imported by `api/contact.ts` — both `tsconfig.app.json` and `tsconfig.api.json` must resolve the `@/*` path alias for this to work
- Zod 4 has breaking changes from Zod 3; any future dependency that bundles Zod 3 may cause version conflicts
- The schema is currently small (three fields); if it grows significantly, splitting it into sub-schemas will require updating both import sites

### Neutral / Risks

- The shared schema pattern creates a coupling point between the SPA bundle and the serverless function — any breaking change to the schema affects both simultaneously, which is a feature (consistency) but requires care during refactors

## Related Decisions

- Supersedes: (none)
- Related: [ADR-0004](0004-sanity-as-headless-cms.md) (Sanity's `defineType`/`defineField` serves a similar single-source-of-truth role for CMS content types)
- Related: [ADR-0006](0006-vercel-for-deployment.md) (the serverless function that imports this schema is deployed on Vercel)
