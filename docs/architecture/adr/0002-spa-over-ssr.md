# ADR 0002: Use Vite SPA over Next.js / SSR

**Date:** 2026-05-20
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

A personal portfolio has a small, well-defined set of pages (one home page, one blog post route) and no requirement for per-request server rendering. The choice was between a full-stack SSR framework (Next.js, Remix) and a pure client-side SPA (Vite + React Router).

## Decision

Use Vite 8 with React Router v7 in SPA mode. Deploy as a static bundle on Vercel with a single serverless function for the contact form.

## Rationale

| Factor              | SSR (Next.js)                                     | SPA (Vite)                                     |
| ------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Cold-start latency  | Route handlers add edge latency                   | Zero — pre-built static HTML                   |
| Build complexity    | Framework-specific conventions, server components | Plain React + standard tooling                 |
| Bundle size control | Per-route code splitting built in                 | Manual — one bundle (acceptable at this scale) |
| CMS integration     | `next-sanity` toolkit (Next-specific)             | `@sanity/client` — framework-agnostic          |
| Testing             | Need to mock server/client boundary               | Standard RTL + Vitest, no framework magic      |
| Deployment          | Vercel-native but opinionated                     | Any static CDN + one serverless function       |

For a portfolio with five sections and a blog, the complexity of SSR brings no meaningful SEO or performance benefit over a well-built SPA with fast static delivery. The `index.html` ships with all meta/OG tags pre-rendered; Googlebot crawls JS-rendered content reliably.

## Consequences

### Positive

- Zero build-framework lock-in — the app is plain React; switching bundlers is a config change
- Local development is standard Vite; no Next.js-specific patterns to learn
- Static hosting on any CDN is possible; Vercel is not required

### Negative

- The bundle is ~630 KB gzipped (~198 KB) — acceptable for a portfolio but would need code-splitting if the project scaled significantly
- Blog post content is fetched client-side on navigation (no ISR/SSR pre-rendering per post)
- Per-post OpenGraph metadata is not server-rendered; posts share the site's generic OG image
- `vercel.json` requires a rewrite rule to handle client-side routing: `/((?!api/).*) → /index.html`

### Neutral / Risks

- If SEO requirements change (e.g. per-post OG images matter for blog discoverability), migration to Next.js or adding a static generation step would be required

## Related Decisions

- Supersedes: (none) — original decision documented in `docs/decisions/001-spa-over-ssr.md`
- Related: [ADR-0006](0006-vercel-for-deployment.md) (deployment target choice was influenced by this SPA decision)
