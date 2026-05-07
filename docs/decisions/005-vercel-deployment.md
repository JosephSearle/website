# ADR 005 — Vercel for deployment

**Status:** Accepted

## Context

The app is a Vite-built static SPA with one serverless function. Deployment options considered: Netlify, Cloudflare Pages, GitHub Pages, and Vercel.

## Decision

Deploy to Vercel. The static bundle is served from Vercel's CDN; `/api/contact` runs as a Vercel serverless function (Node.js runtime).

## Rationale

| Factor                  | GitHub Pages | Netlify  | Cloudflare Pages                 | Vercel               |
| ----------------------- | ------------ | -------- | -------------------------------- | -------------------- |
| Serverless functions    | No           | Yes      | Yes (Workers, different runtime) | Yes (Node.js)        |
| Vite support            | Manual       | Native   | Native                           | Native               |
| TypeScript in functions | N/A          | Yes      | Limited (Workers API)            | Yes (`@vercel/node`) |
| Preview deployments     | No           | Yes      | Yes                              | Yes                  |
| Free tier               | Static only  | Generous | Generous                         | Generous             |
| Deploy from Git         | Yes          | Yes      | Yes                              | Yes                  |

**Why not Cloudflare Pages:** Cloudflare Workers use a different runtime (`workerd`) from Node.js. The `api/contact.ts` function uses `@vercel/node` types and Node.js APIs. Porting to the Workers runtime would require rewriting the function and replacing `@vercel/node` with Cloudflare's types — unnecessary complexity for a portfolio.

**Why not Netlify:** Either platform would work. Vercel was chosen because it is where the author's existing projects are deployed, and the integration with the Vite build output is zero-config.

## Configuration

`vercel.json` contains a single rewrite rule:

```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

The negative lookahead `(?!api/)` ensures that requests to `/api/*` are handled by the serverless functions rather than being rewritten to `index.html`. All other paths (including `/blog/some-slug`) are handled by the React Router client-side router.

## Consequences

- The Vercel free tier has a limit of 12 serverless function invocations per second and 100 GB-hours per month — well within range for a personal portfolio
- Preview deployments are created automatically for every branch push
- Environment variables must be set separately in the Vercel dashboard (they are not read from `.env.local` in production builds)
