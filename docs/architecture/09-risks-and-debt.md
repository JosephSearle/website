# 09 — Risks and Technical Debt

**Audience:** Engineers, architects  
**Question answered:** What are the known risks and shortcuts that need future attention?

---

## Risk register

| Risk                                                              | Likelihood | Impact | Mitigation strategy                                                                                                                                                                                    |
| ----------------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contact form spam — no rate limiting or CAPTCHA                   | Medium     | Low    | Add hCaptcha or Cloudflare Turnstile to the form; validate the token server-side in `api/contact.ts`                                                                                                   |
| Resend API failure — no retry, message permanently lost           | Low        | Medium | The serverless function returns HTTP 500; the user sees an error message but the message is lost. Mitigate by logging the payload to Vercel logs before calling Resend, or by queuing with Vercel Cron |
| Sanity free-tier limit — 1 project, 2 users                       | Low        | Low    | Acceptable for a personal portfolio; monitor in Sanity dashboard if collaborators are added                                                                                                            |
| No E2E / visual regression tests — UI regressions undetected      | Medium     | Medium | Add Playwright for critical paths (home page render, contact form submission, blog post route)                                                                                                         |
| No CI pipeline — tests not enforced on PRs                        | Medium     | Medium | Add a GitHub Actions workflow that runs `npm run lint && npm run test:run` before merge                                                                                                                |
| Bundle size — no route-level code splitting                       | Low        | Low    | Current bundle (~198 KB gzipped) is acceptable. If sections grow significantly, add `React.lazy()` + dynamic `import()` per route                                                                      |
| Cold start on Contact Function — first request after idle is slow | Low        | Low    | ~200 ms cold start is acceptable for a contact form. No mitigation needed at current scale                                                                                                             |
| Observability gap — no error tracking for the serverless function | Medium     | Medium | Add Sentry (Vercel integration, zero-code-change for the function) to capture unhandled exceptions                                                                                                     |
| No Content Security Policy headers                                | Low        | Medium | Configure CSP headers in `vercel.json` `headers` array to restrict script and fetch sources                                                                                                            |
| Sanity `'placeholder'` projectId guard — must not be removed      | Low        | High   | The `                                                                                                                                                                                                  |     | 'placeholder'`fallback in`src/lib/sanity/client.ts`prevents`createClient`throwing when unconfigured. If removed, all environments without`VITE_SANITY_PROJECT_ID` break at module load |

---

## Technical debt

**Known shortcuts taken:**

- No route-level code splitting — the entire SPA is a single chunk. Splitting is straightforward with `React.lazy` + Vite's dynamic import, but has not been done because the bundle is currently small.
- No structured logging in the Contact Function — errors are `console.error` only, not forwarded to a log aggregator.
- Pre-commit hooks (`husky` + `lint-staged`) enforce lint and format on changed files but do not run the test suite. A fast subset of tests (e.g., unit tests only) could be added.

**Tests missing for:**

- E2E flows (no Playwright) — the happy path of the contact form is not tested end-to-end against the real Vercel deployment
- Email rendering output — `ContactEmail.tsx` is not covered by the Vitest suite; its HTML output is only verified by manual Resend sends
- Visual regression — no screenshot comparison for animation states or responsive layouts

**Performance not yet addressed:**

- Per-post OpenGraph metadata — blog posts share the site's generic OG image because there is no server-side rendering or build-time static generation step per post
- Lighthouse CI — performance scores are not captured automatically; no regression alerting on bundle size
- Image optimisation — if images are added to blog posts or project entries in Sanity, they should go through Sanity's image pipeline (`@sanity/image-url`) with appropriate sizing and format selection
