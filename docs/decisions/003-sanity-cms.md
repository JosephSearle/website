# ADR 003 — Sanity as headless CMS

**Status:** Accepted

## Context

Blog posts and projects need to be editable without touching code. Options considered: MDX files in the repo, Contentful, Notion as a CMS, and Sanity.

## Decision

Use Sanity as the headless CMS. Content is stored in Sanity's Content Lake and queried via GROQ using `@sanity/client`. The Sanity Studio is deployed separately to `<project>.sanity.studio`.

## Rationale

| Factor              | MDX in repo            | Contentful        | Sanity                                             |
| ------------------- | ---------------------- | ----------------- | -------------------------------------------------- |
| Editing experience  | Git commit required    | Good GUI          | Excellent, fully customisable                      |
| Schema flexibility  | Limited to frontmatter | Fixed field types | Fully custom document schemas                      |
| GROQ query language | N/A                    | GraphQL           | Expressive, typed, very fast                       |
| TypeScript support  | Manual                 | SDK types         | Native `defineType`/`defineField`, type generation |
| Pricing             | Free                   | Free tier limited | Free tier generous (one project, two users)        |
| Framework coupling  | None                   | None              | `@sanity/client` is framework-agnostic             |

**Why not `next-sanity`:** This project uses Vite, not Next.js. `next-sanity` adds Next.js-specific wrappers that would be dead weight. `@sanity/client` is the correct package for a non-Next.js setup.

**GROQ over GraphQL:** GROQ allows projections that reshape the response to exactly match the frontend types. For example, the `allPostsQuery` maps `_id` → `id`, `publishedAt` → `date`, and `slug.current` → `slug` in a single query — no client-side transformation layer needed.

## Static fallback pattern

Because `VITE_SANITY_PROJECT_ID` may be absent (local dev, CI), the three hooks all initialise with the static data from `src/data/` and only replace it if a project ID is configured. This means:

1. The site deploys and works without a Sanity project
2. Sanity can be connected or disconnected by toggling one env var
3. The static data acts as a preview / placeholder that matches the schema exactly

## Consequences

- Blog post body (portable text) is only rendered when fetched from Sanity; the excerpt + "coming soon" note is shown otherwise
- The Sanity Studio is a separate deployment (`studio/` directory) — it is not bundled with the main Vite app
- Content updates require no re-deploy (Sanity serves via CDN with `useCdn: true`)
