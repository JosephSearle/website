# 07 — Quality Goals and Non-Functional Requirements

**Audience:** All stakeholders  
**Question answered:** What are the measurable quality targets, and what constraints shape the design?

---

## Quality goals

<!-- Replace TBD values with real measurements once baseline metrics are captured -->

| Goal                                  | Measurable target                             | Priority | Notes                                                                                     |
| ------------------------------------- | --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| Initial load performance              | Largest Contentful Paint < 2.5 s on 4G mobile | High     | Static bundle on Vercel CDN; currently ~630 KB gzipped (~198 KB) per ADR-0002             |
| Accessibility                         | WCAG 2.1 Level AA                             | High     | Keyboard navigation, reduced-motion support, semantic HTML throughout                     |
| Availability                          | TBD — inherits Vercel SLA                     | Medium   | Vercel free tier SLA is not contractually guaranteed; acceptable for a personal portfolio |
| Contact form delivery rate            | > 99% of valid submissions delivered          | Medium   | Dependent on Resend's deliverability; no retry mechanism currently in place               |
| Cold start latency (Contact Function) | < 500 ms p95                                  | Low      | ~200 ms typical; acceptable for a contact form; no SLA required                           |
| Test coverage                         | > 80% line coverage on `src/`                 | Medium   | Run `npm run test:coverage` to check current level                                        |
| Build time                            | < 60 s (type check + bundle)                  | Low      | `tsc -b && vite build`; currently well within this target                                 |

---

## Constraints

### Technical constraints

- **No SSR:** The site is a static SPA. SEO relies on client-side rendering — Googlebot reliably crawls JavaScript-rendered content for portfolios. Per-post OpenGraph metadata is not available without a build-time or server-side rendering step (accepted trade-off — see [ADR-0002](adr/0002-spa-over-ssr.md)).
- **Single serverless function:** The Vercel free tier supports serverless functions. Complex server-side logic must be kept within the contact function or handled client-side.
- **No database:** All persistent content lives in Sanity's managed service. There is no self-hosted database to operate.
- **Bundle size (no code splitting):** The entire app ships as one JS bundle. Acceptable at current scale; would need route-level code splitting if the app grew significantly.
- **Node.js 20 runtime:** The Vercel serverless function targets Node.js 20 (`@vercel/node`). Third-party packages used in `api/` must be compatible.

### Organisational constraints

- **Solo maintainer:** All decisions are made by one person. Architecture should minimise ongoing operational burden.
- **Free-tier services:** Sanity (1 project, 2 users), Vercel (free tier), Resend (3,000 emails/month). Any architecture decision that requires a paid tier must be explicitly justified.

### Operational constraints

- **No persistent server to monitor:** The SPA is static; the function is managed by Vercel. There are no servers to patch, update, or monitor.
- **Content updates require no redeploy:** Sanity serves content changes at query time (cached at Sanity CDN). A new blog post does not require a new Vercel deploy.

---

## Cold start strategy

See the serverless reference for the full cold start pattern. For this portfolio:

```
Runtime: Node.js 20
Typical cold start latency: ~200 ms
Acceptable cold start latency: < 500 ms (contact form is not latency-sensitive)
Provisioned concurrency: No (not warranted for a personal portfolio)
Warm-up ping: No
```

---

## Security baseline

| Concern                     | Current approach                                               | Gap                                                                                        |
| --------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Input validation            | Zod schema validates all contact form input server-side        | No rate limiting on the contact endpoint                                                   |
| Secret management           | `RESEND_API_KEY` stored as Vercel env var, never in the bundle | No secret rotation process                                                                 |
| HTTPS                       | Enforced by Vercel for all traffic                             | —                                                                                          |
| Content Security Policy     | <!-- TODO: add CSP headers via vercel.json headers config -->  | No CSP headers currently configured                                                        |
| Spam / bot protection       | None — relies on implicit friction of page load                | No CAPTCHA                                                                                 |
| Third-party script exposure | No third-party analytics scripts loaded                        | Sanity CDN and Resend are called server-side or from the client with no shared credentials |
