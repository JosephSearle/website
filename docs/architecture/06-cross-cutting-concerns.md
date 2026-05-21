# 06 — Cross-Cutting Concerns

**Audience:** Engineers  
**Question answered:** How are authentication, error handling, caching, accessibility, and observability handled across the system?

---

## Authentication and authorisation

**Not implemented.** The portfolio is a fully public site. There are no user accounts, no protected routes, and no auth middleware. The only "credentials" in the system are the Vercel environment variables (`RESEND_API_KEY`, `VITE_SANITY_PROJECT_ID`) — these are server-side secrets, not user authentication.

The Contact Function has no rate limiting or authentication. It relies on the fact that submitting the contact form requires a page load, which provides some implicit friction. If spam becomes a problem, adding a CAPTCHA token (e.g. hCaptcha or Cloudflare Turnstile) is the recommended next step — see [09-risks-and-debt.md](09-risks-and-debt.md).

---

## Input validation and error handling

### Client-side form validation

`ContactForm.tsx` uses React Hook Form with the Zod schema from `src/schemas/contact.ts` as the resolver. Validation runs on blur and on submit. Errors are displayed inline next to each field using `role="alert"` for screen reader announcements. A success state is shown in an `<output>` element.

### Server-side API validation

`api/contact.ts` independently validates the POST body using the same `src/schemas/contact.ts` Zod schema. If validation fails, it returns HTTP 400 with structured error detail. If the Resend API call fails, it returns HTTP 500. The function does not log errors to any persistent store — errors surface only in Vercel's function log stream.

### Shared Zod schema

The single schema file `src/schemas/contact.ts` is imported by both the client form and the serverless function. This eliminates the possibility of divergence between client-side validation rules and server-side rejection criteria. See [ADR-0009](adr/0009-shared-zod-schema-for-validation.md) for the rationale.

### CMS fetch error handling

All three Sanity hooks (`useSanityPosts`, `useSanityProjects`, `useSanityPost`) catch fetch errors silently and remain on the static fallback data. There is no error boundary or visible error state for CMS failures — the site simply shows static content as if the CMS were unconfigured.

---

## Caching

| Layer      | Mechanism                             | TTL                         | Notes                                                                                                   |
| ---------- | ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------- |
| Sanity CDN | `useCdn: true` in `@sanity/client`    | Managed by Sanity (minutes) | Fetches go to Sanity's global CDN rather than origin API. Cache invalidation happens on Sanity publish. |
| Vercel CDN | Static bundle cached at edge          | Until next deploy           | All JS/CSS assets are content-hashed; cache headers are set by Vercel automatically                     |
| Browser    | Standard HTTP cache for static assets | Until asset hash changes    | No `localStorage` or `sessionStorage` is used anywhere in the app                                       |

---

## Accessibility

Accessibility is treated as a first-class concern throughout the component layer:

- **Focus management:** All interactive elements (`Button`, nav links, `ProjectCard`, `BlogRow`) use `focus-visible:ring-2 focus-visible:ring-terracotta`. The focus ring is visible only for keyboard navigation (`:focus-visible`), not for mouse clicks.
- **Reduced motion:** Framer Motion's `useReducedMotion()` hook is checked in `AvatarCard` to suppress the flip animation when the user has `prefers-reduced-motion: reduce` set. The `globals.css` file also sets all animation durations to `0.01ms` at the CSS level as a safety net.
- **Screen reader announcements:** Contact form submission feedback uses `<output>` for success messages and `role="alert"` for error messages, triggering immediate screen reader announcements.
- **Semantic HTML:** Sections use `<section>`, navigation uses `<nav>`, the blog post body uses `<article>`. Interactive elements use `<button>` (not `<div onClick>`).

---

## Logging and observability

**Logging:** The Contact Function emits logs to Vercel's built-in log stream (accessible in the Vercel dashboard). There is no structured logging library — `console.error` is used for error cases. Logs are not forwarded to any external service.

**Observability:** Not implemented. There is no OpenTelemetry instrumentation, no error tracking service (Sentry, Bugsnag), no analytics beyond what Vercel provides in its built-in traffic dashboard.

**Recommended next step:** For basic error visibility, consider integrating Sentry's Vercel integration, which captures unhandled exceptions from the serverless function with zero code changes. See [09-risks-and-debt.md](09-risks-and-debt.md).

---

## Testing strategy (cross-cutting)

Tests are co-located with the source files they test. The suite covers UI primitives, layout components, all page sections, Sanity hooks (fallback path, live-data path, error-recovery path), the contact form (validation states, success, error, reset), and `BlogPostPage`.

MSW intercepts `/api/contact` at the network layer during tests — no real HTTP requests or email sends occur. The `IntersectionObserver` is stubbed globally in `src/test/setup.ts` to allow Framer Motion's `whileInView` to function in jsdom.

For the full testing rationale, see [ADR-0007](adr/0007-vitest-rtl-msw-testing-strategy.md).
