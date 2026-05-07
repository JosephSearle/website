# ADR 004 — Resend for contact form email delivery

**Status:** Accepted

## Context

The contact form needs to deliver messages to `josephwilliamsearle@gmail.com`. Options considered: `nodemailer` with SMTP, SendGrid, Postmark, and Resend.

## Decision

Use Resend with a React Email template rendered server-side inside the Vercel API function.

## Rationale

| Factor              | nodemailer/SMTP         | SendGrid                | Postmark                | Resend                         |
| ------------------- | ----------------------- | ----------------------- | ----------------------- | ------------------------------ |
| Free tier           | Depends on provider     | 100/day                 | 100/month               | 3,000/month                    |
| React Email support | No                      | No                      | No                      | Native (`react` prop)          |
| API simplicity      | Complex SMTP config     | REST, verbose SDK       | REST, good SDK          | Minimal SDK, one function call |
| TypeScript support  | `@types/nodemailer`     | Partial                 | Good                    | First-class                    |
| Deliverability      | Provider-dependent      | High                    | Very high               | High                           |
| Setup               | SMTP credentials, ports | API key + sender verify | API key + sender verify | API key + sender verify        |

Resend was chosen primarily for its native React Email integration. The email template (`emails/ContactEmail.tsx`) is a proper React component rendered to HTML via `@react-email/render` before being passed to `resend.emails.send()`. This means the email template:

- Gets the same component model and TypeScript types as the rest of the app
- Can be previewed locally as a React component
- Is easily modified without writing raw HTML strings

## How it works

```
ContactForm (client) → POST /api/contact
  → Zod validates body
  → renderContactEmail() renders React template to HTML string
  → resend.emails.send({ html, replyTo: sender's email })
  → 200 { success: true }
```

The `replyTo` header is set to the sender's email address, so hitting "Reply" in the inbox responds directly to the person who filled in the form.

## Consequences

- A verified sender domain (`RESEND_FROM_EMAIL`) is required in production; Resend's `onboarding@resend.dev` can be used during testing but only delivers to the account owner's email
- The API function adds ~200ms of cold-start latency on first invocation; subsequent calls are warm
- `@react-email/render` is a transitive dependency of `@react-email/components` — it is pinned explicitly in `package.json` to prevent version drift
