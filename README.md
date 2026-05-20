# Website

Personal portfolio for Joseph Searle — AI engineer based in London. Built as a fully-typed React SPA with a headless CMS, server-side contact form, and a TDD test suite.

## Table of Contents

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Connecting Sanity CMS](#connecting-sanity-cms)
- [Deployment](#deployment)
- [Testing](#testing)
- [Further reading](#further-reading)
- [Contributing](#contributing)
- [License](#license)

## Stack

| Concern    | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | React 19 + TypeScript 6, Vite 8             |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation  | Framer Motion 12                            |
| Routing    | React Router v7                             |
| CMS        | Sanity (headless, GROQ queries)             |
| Forms      | React Hook Form v7 + Zod v4                 |
| Email      | Resend + React Email                        |
| Deployment | Vercel (SPA + serverless API)               |
| Testing    | Vitest 3 + React Testing Library 16 + MSW 2 |

## Prerequisites

- Node.js ≥ 20 (22 recommended — use `nvm use 22`)
- npm ≥ 10

## Quick start

```bash
git clone https://github.com/josephsearle/website.git
cd website
nvm use
npm install
cp .env.example .env.local   # fill in values — see Environment Variables below
npm run dev
```

The dev server starts at `http://localhost:5173`.

The contact form and Sanity fetches degrade gracefully when their respective env vars are absent, so the app runs locally with static data and no API keys.

## Usage

<!-- TODO: Add a screenshot or GIF of the live site here, e.g.:
![Portfolio screenshot](docs/images/screenshot.png)
-->

The portfolio is deployed at **[josephsearle.dev](https://josephsearle.dev)** <!-- TODO: confirm live URL -->.

It is a single-page application with six sections navigable from the top nav: Hero, Skills, Timeline, Projects, Writing, and Contact. The `/blog/:slug` route renders individual posts fetched from Sanity CMS. The contact form at the bottom of the page sends messages via the `/api/contact` serverless function.

For local development, follow the [Quick start](#quick-start) steps above.

## Environment variables

| Variable                  | Required         | Description                                            |
| ------------------------- | ---------------- | ------------------------------------------------------ |
| `RESEND_API_KEY`          | Yes (production) | API key from resend.com                                |
| `RESEND_FROM_EMAIL`       | Yes (production) | Verified sender address in Resend                      |
| `VITE_SANITY_PROJECT_ID`  | No               | Sanity project ID — falls back to static data if unset |
| `VITE_SANITY_DATASET`     | No               | Defaults to `production`                               |
| `VITE_SANITY_API_VERSION` | No               | Defaults to `2025-05-07`                               |

## Scripts

```bash
npm run dev           # Vite dev server with HMR
npm run build         # TypeScript check (all tsconfigs) + Vite production bundle
npm run preview       # Serve the production build locally
npm run test          # Vitest in watch mode
npm run test:run      # Single test run (CI)
npm run test:coverage # Coverage report
npm run lint          # ESLint
npm run format        # Prettier
```

## Project structure

```text
website/
├── api/
│   └── contact.ts              # Vercel serverless — validates with Zod, sends via Resend
├── emails/
│   └── ContactEmail.tsx        # React Email template (rendered server-side in api/contact.ts)
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav/            # Scroll-aware nav with active-section highlighting
│   │   │   └── Footer/
│   │   ├── sections/           # One subdirectory per page section
│   │   │   ├── Hero/           # AvatarCard — Framer Motion rotateY flip
│   │   │   ├── Skills/
│   │   │   ├── Timeline/
│   │   │   ├── Projects/
│   │   │   ├── Writing/
│   │   │   └── Contact/        # ContactForm — RHF + Zod, posts to /api/contact
│   │   └── ui/                 # Atomic primitives: Button, Chip, PulseDot
│   ├── data/                   # Static fallback content (active when Sanity is unset)
│   │   ├── posts.ts
│   │   ├── projects.ts
│   │   └── timeline.ts
│   ├── hooks/
│   │   ├── useNavScroll.ts     # scrollY → nav border state + active section ID
│   │   ├── useSanityPost.ts    # Single post with portable-text body
│   │   ├── useSanityPosts.ts   # Posts list with static-data fallback
│   │   └── useSanityProjects.ts
│   ├── lib/
│   │   ├── motion.ts           # Typed Framer Motion easing constants
│   │   └── sanity/
│   │       ├── client.ts       # createClient, reads VITE_SANITY_* env vars
│   │       ├── queries.ts      # Typed GROQ queries
│   │       └── portableText.tsx # PortableText renderer with design-token styles
│   ├── pages/
│   │   ├── HomePage.tsx        # All sections composed
│   │   └── BlogPostPage.tsx    # /blog/:slug — Sanity fetch + PortableText
│   ├── schemas/
│   │   └── contact.ts          # Zod schema shared by ContactForm + api/contact.ts
│   ├── styles/
│   │   └── globals.css         # @theme design tokens + base resets
│   ├── test/
│   │   ├── setup.ts            # jest-dom, MSW server, IntersectionObserver stub
│   │   └── msw-handlers.ts     # Default + error handlers for /api/contact
│   ├── types/
│   │   └── index.ts            # TimelineEntry, Project, Post, PostWithBody, ContactFormData
│   ├── App.tsx                 # createBrowserRouter — / and /blog/:slug routes
│   └── main.tsx
├── studio/                     # Sanity Studio — deploy separately to sanity.io
│   ├── sanity.config.ts
│   └── schemaTypes/
│       ├── post.ts
│       └── project.ts
├── docs/
│   ├── architecture.md         # Patterns, conventions, key design choices
│   └── decisions/              # Architecture Decision Records (ADRs)
├── .env.example
├── vercel.json                 # SPA fallback rewrite, /api/* excluded
├── vite.config.ts
├── tsconfig.json               # Project references: app + node + api
└── vitest.config.ts
```

## Connecting Sanity CMS

The app ships with static data and runs fully without a Sanity project. To activate live content:

1. `cd studio && npm create sanity@latest` — creates a hosted Studio and outputs a `projectId`
2. The `studio/schemaTypes/` directory already has `post` and `project` schemas ready to use
3. Add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` to your environment
4. Deploy the Studio to `<your-project>.sanity.studio`

The Sanity hooks switch from static to live data automatically once `VITE_SANITY_PROJECT_ID` is present.

## Deployment

`vercel.json` configures SPA routing while keeping `/api/*` routes handled by Vercel serverless functions:

```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

```bash
# Vercel auto-deploys on push to main
git push origin main

# Manual deploy
npx vercel --prod
```

Set the environment variables in the Vercel project dashboard before going live.

## Testing

Tests are co-located with their components (`Button.test.tsx` lives next to `Button.tsx`). The suite covers UI primitives, layout, all page sections, Sanity hooks (fallback, live data, error recovery), the contact form (validation, success, error, reset), and BlogPostPage.

```bash
npm run test:run   # run all tests once
npm run coverage   # generate coverage report in ./coverage
```

MSW intercepts `/api/contact` in tests — no real HTTP requests or email sends occur.

## Further reading

- [Architecture overview](docs/architecture.md)
- [Architecture Decision Records](docs/decisions/)

## Contributing

Contributions are welcome. To get started:

1. Fork the repository and create a branch from `main`
2. Install dependencies: `npm install`
3. Copy the environment file and fill in values: `cp .env.example .env.local`
4. Run the test suite to confirm everything passes: `npm run test:run`
5. Make your changes, keeping tests green: `npm run test:run && npm run lint`
6. Open a pull request with a clear description of the change

Please open an issue before starting work on a significant change so we can discuss the approach first.

## License

<!-- TODO: Add a LICENSE file to the repository root and update this section.
     Example for MIT: [MIT](LICENSE) © 2025 Joseph Searle -->

© 2025 Joseph Searle. All rights reserved.
