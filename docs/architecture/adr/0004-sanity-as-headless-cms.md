# ADR 0004: Use Sanity as Headless CMS

**Date:** 2026-05-20
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

Blog posts and projects need to be editable without touching code. Options considered: MDX files committed to the repository, Contentful, Notion as a CMS, and Sanity.

## Decision

Use Sanity as the headless CMS. Content is stored in Sanity's Content Lake and queried via GROQ using `@sanity/client`. The Sanity Studio is deployed separately to `<project>.sanity.studio`.

## Rationale

| Factor             | MDX in repo            | Contentful        | Sanity                                             |
| ------------------ | ---------------------- | ----------------- | -------------------------------------------------- |
| Editing experience | Git commit required    | Good GUI          | Excellent, fully customisable                      |
| Schema flexibility | Limited to frontmatter | Fixed field types | Fully custom document schemas                      |
| Query language     | N/A                    | GraphQL           | GROQ — expressive, typed, very fast                |
| TypeScript support | Manual                 | SDK types         | Native `defineType`/`defineField`, type generation |
| Pricing            | Free                   | Free tier limited | Free tier generous (1 project, 2 users)            |
| Framework coupling | None                   | None              | `@sanity/client` is framework-agnostic             |

**Why not `next-sanity`:** This project uses Vite, not Next.js. `next-sanity` adds Next.js-specific wrappers that would be dead weight. `@sanity/client` is the correct package for a non-Next.js setup.

**GROQ over GraphQL:** GROQ projections reshape the response to exactly match the frontend types. The `allPostsQuery` maps `_id → id`, `publishedAt → date`, and `slug.current → slug` in a single query — no client-side transformation layer needed.

The static fallback pattern (see [02-container-architecture.md](../02-container-architecture.md#static-first-cms-overlay)) means the CMS is additive — the site is fully functional without a Sanity connection.

## Consequences

### Positive

- Content can be updated without a redeploy (Sanity CDN caches and invalidates on publish)
- The Studio UI is excellent for a non-developer collaborator
- TypeScript types for content can be generated from the Sanity schema
- Connecting or disconnecting the CMS requires only one environment variable

### Negative

- Blog post body (Portable Text) is only rendered when fetched from Sanity; static data shows an excerpt only
- The Sanity Studio is a separate deployment (`studio/` directory) — it must be deployed independently
- The Sanity free tier limits the project to 2 users

### Neutral / Risks

- Sanity is a managed external service — content data is not self-hosted
- `@sanity/client` throws synchronously when `projectId` is falsy; the `|| 'placeholder'` guard in `src/lib/sanity/client.ts` prevents this in unconfigured environments

## Related Decisions

- Supersedes: (none) — original decision documented in `docs/decisions/003-sanity-cms.md`
- Related: [ADR-0009](0009-shared-zod-schema-for-validation.md) (validation approach is complementary to the CMS's typed schema)
