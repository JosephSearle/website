# ADR 0006: Use Vercel for Deployment

**Date:** 2026-05-20  
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

The app is a Vite-built static SPA with one serverless function (`api/contact.ts`). It needs a deployment platform that can serve a static bundle from a CDN and execute a Node.js serverless function on the same domain without a custom reverse proxy. Options considered: GitHub Pages, Netlify, Cloudflare Pages, and Vercel.

## Decision

Deploy to Vercel. The static bundle is served from Vercel's global CDN edge network; `/api/contact` runs as a Vercel serverless function on the Node.js 20 runtime.

## Rationale

| Factor                  | GitHub Pages | Netlify  | Cloudflare Pages                  | Vercel               |
| ----------------------- | ------------ | -------- | --------------------------------- | -------------------- |
| Serverless functions    | No           | Yes      | Yes (Workers — different runtime) | Yes (Node.js)        |
| Vite support            | Manual       | Native   | Native                            | Native               |
| TypeScript in functions | N/A          | Yes      | Limited (Workers API)             | Yes (`@vercel/node`) |
| Preview deployments     | No           | Yes      | Yes                               | Yes                  |
| Free tier               | Static only  | Generous | Generous                          | Generous             |

**Why not Cloudflare Pages:** Cloudflare Workers use a non-Node.js runtime (`workerd`). The `api/contact.ts` function uses `@vercel/node` types and standard Node.js APIs. Porting to the Workers runtime would require rewriting the function and replacing `@vercel/node` — unnecessary complexity for a personal portfolio contact form.

**Why not Netlify:** Either platform would work. Vercel was chosen because it is where the author's existing projects are deployed, giving zero learning-curve setup.

**Routing configuration:** `vercel.json` contains a single rewrite rule with a negative lookahead to distinguish static asset paths from serverless function paths:

```json
{ "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }] }
```

## Consequences

### Positive

- Zero-config Vite detection — Vercel reads the `vite build` output with no `vercel.json` build configuration
- Automatic preview deployments for every branch push
- The same platform handles both static CDN delivery and serverless function execution — no custom domain routing needed

### Negative

- The Vercel free tier has no contractual SLA — acceptable for a personal portfolio, not for a business-critical product
- Environment variables must be configured separately in the Vercel dashboard (they are not read from `.env.local` in production builds)
- The `vercel.json` rewrite rule must be maintained if new serverless routes are added in future

### Neutral / Risks

- Vendor dependency on Vercel's platform — migrating to another platform would require rewriting the serverless function (replacing `@vercel/node` types) and updating the routing configuration

## Related Decisions

- Supersedes: (none) — original decision documented in `docs/decisions/005-vercel-deployment.md`
- Related: [ADR-0002](0002-spa-over-ssr.md) (the SPA approach made Vercel's static CDN the natural fit)
- Related: [ADR-0005](0005-resend-for-email-delivery.md) (Resend is called from the Vercel serverless function)
