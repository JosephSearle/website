# Architecture Documentation

This directory contains the architecture documentation for Joseph Searle's personal portfolio website — a static React SPA deployed on Vercel with a single serverless function and Sanity as the headless CMS.

Start here if you are new to the codebase. Read sections in order for the fullest picture, or jump directly to the section relevant to your role using the audience guide below.

---

## Navigation

| File                                                         | Description                                                         | Primary audience      |
| ------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------- |
| [01-system-context.md](01-system-context.md)                 | What the system does and how it fits in the world                   | Business, architects  |
| [02-container-architecture.md](02-container-architecture.md) | Deployable units, data stores, and communication protocols          | Architects, engineers |
| [03-component-view.md](03-component-view.md)                 | Internal structure of the React SPA                                 | Engineers             |
| [04-data-architecture.md](04-data-architecture.md)           | Data stores, ownership, and flow                                    | Engineers             |
| [05-deployment.md](05-deployment.md)                         | Environments, CI/CD, infrastructure topology                        | Engineers, DevOps     |
| [06-cross-cutting-concerns.md](06-cross-cutting-concerns.md) | Error handling, caching, accessibility, observability               | Engineers             |
| [07-quality-and-nfrs.md](07-quality-and-nfrs.md)             | Performance goals, security baseline, constraints                   | All                   |
| [08-technology-stack.md](08-technology-stack.md)             | Full stack table with versions and rationale pointers               | All                   |
| [09-risks-and-debt.md](09-risks-and-debt.md)                 | Known risks and technical debt                                      | Engineers, architects |
| [10-glossary.md](10-glossary.md)                             | Domain terms used throughout these docs                             | New contributors      |
| [adr/](adr/)                                                 | Architecture Decision Records — the _why_ behind every major choice | All                   |

---

## System overview

A personal portfolio and blog for Joseph Searle, an AI engineer based in London. The site presents professional experience, projects, and writing, and provides a contact form that delivers messages by email.

The architecture is deliberately minimal: a Vite-built React SPA served from Vercel's CDN handles all UI; a single Vercel serverless function handles contact form email delivery; and Sanity acts as the headless CMS for blog posts and project content, with static fallback data bundled into the app so the site is always functional without a live CMS connection.

---

## When to update these docs

| Trigger                                   | Sections to update                      |
| ----------------------------------------- | --------------------------------------- |
| New page, section, or route added         | 03, 10                                  |
| New external service integrated           | 01, 02, 08, and an ADR                  |
| Deployment target or environment changes  | 05, and an ADR                          |
| New data store introduced                 | 02, 04, and an ADR                      |
| Non-functional requirement or SLA changes | 07                                      |
| Significant library or framework upgrade  | 08, and an ADR if the rationale changes |
| Known risk materialises or is resolved    | 09                                      |

---

## Audience quick-start

| Role                 | Start with                        |
| -------------------- | --------------------------------- |
| New contributor      | README (this file) → 01 → 08 → 10 |
| Feature engineer     | 02 → 03 → 04 → 06                 |
| Deployment / infra   | 05 → 07 → 09                      |
| Reviewing a decision | [adr/](adr/)                      |
