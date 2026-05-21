# ADR 0005: Use Resend for Contact Form Email Delivery

**Date:** 2026-05-20  
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

The contact form needs to deliver messages to Joseph's inbox. The serverless function must render a well-formatted email and dispatch it reliably. Options considered: `nodemailer` with SMTP, SendGrid, Postmark, and Resend.

## Decision

Use Resend with a React Email template rendered server-side inside the Vercel serverless function (`api/contact.ts`).

## Rationale

| Factor              | nodemailer / SMTP        | SendGrid                | Postmark                | Resend                         |
| ------------------- | ------------------------ | ----------------------- | ----------------------- | ------------------------------ |
| Free tier           | Depends on SMTP provider | 100/day                 | 100/month               | 3,000/month                    |
| React Email support | No                       | No                      | No                      | Native (`react` prop)          |
| API simplicity      | Complex SMTP config      | REST, verbose SDK       | REST, good SDK          | Minimal SDK, one function call |
| TypeScript support  | `@types/nodemailer`      | Partial                 | Good                    | First-class                    |
| Setup               | SMTP credentials, ports  | API key + sender verify | API key + sender verify | API key + sender verify        |

The primary differentiator is Resend's native React Email integration. The email template (`emails/ContactEmail.tsx`) is a React component rendered to HTML via `@react-email/render` before being passed to `resend.emails.send()`. This means the email template uses the same component model and TypeScript types as the rest of the app, and can be previewed locally as a React component without sending anything.

**The `replyTo` pattern:** The `replyTo` header is set to the sender's email address, so hitting "Reply" in the inbox responds directly to the person who submitted the form — no need to copy an address out of the email body.

## Consequences

### Positive

- Email templates are React components — the same developer experience as the rest of the app
- 3,000 free emails per month is well within range for a personal portfolio contact form
- TypeScript types throughout — no `any` casts or separate type packages needed

### Negative

- A verified sender domain (`RESEND_FROM_EMAIL`) is required in production; Resend's `onboarding@resend.dev` can be used during development but only delivers to the account owner's email
- There is no retry mechanism — if the Resend API call fails, the message is lost and the user sees an HTTP 500 error
- `@react-email/render` is a dependency that must be kept in sync with `@react-email/components`

### Neutral / Risks

- The Resend free tier has no SLA guarantee; deliverability depends on Resend's infrastructure

## Related Decisions

- Supersedes: (none) — original decision documented in `docs/decisions/004-resend-email.md`
- Related: [ADR-0006](0006-vercel-for-deployment.md) (the serverless function that calls Resend is hosted on Vercel)
