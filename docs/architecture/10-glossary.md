# 10 — Glossary

**Audience:** New contributors  
**Question answered:** What do the domain-specific and project-specific terms mean?

Terms are listed alphabetically. Add new terms here whenever a non-obvious concept is introduced into the codebase or documentation.

---

| Term                              | Definition                                                                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AvatarCard**                    | The profile card in the Hero section that performs a `rotateY` flip animation on hover/focus, revealing a second face. Implemented with Framer Motion in `src/components/sections/Hero/`.                    |
| **BlogPostPage**                  | The route component rendered at `/blog/:slug`. Fetches a single post from Sanity by slug and renders its body using the PortableText renderer.                                                               |
| **BlogRow**                       | A list-item component in the Writing section. Displays post title, date, and excerpt. Links to `/blog/:slug`.                                                                                                |
| **Chip**                          | A UI primitive (`src/components/ui/Chip/`) — a small rounded label used for technology tags on project and skills cards.                                                                                     |
| **Contact Function**              | The Vercel serverless function at `api/contact.ts`. The only server-side compute in the system. Validates the contact form payload and sends an email via Resend.                                            |
| **Content Lake**                  | Sanity's term for the hosted document store where CMS content (posts, projects) is persisted and queried.                                                                                                    |
| **GROQ**                          | Graph-Relational Object Queries — Sanity's query language. Similar in spirit to GraphQL projections: the query selects and reshapes fields from Sanity documents. Used in `src/lib/sanity/queries.ts`.       |
| **Portable Text**                 | Sanity's structured rich-text format — a JSON array of typed block nodes. Blog post bodies are stored as Portable Text and rendered by `src/lib/sanity/portableText.tsx` using `@portabletext/react`.        |
| **ProjectCard**                   | A card component in the Projects section displaying a single project entry (title, description, tags, links).                                                                                                |
| **PulseDot**                      | A UI primitive — an animated green dot used to indicate presence or availability (e.g., "open to work" status).                                                                                              |
| **React Email**                   | A library that lets you write transactional email templates as React components. The `ContactEmail.tsx` template is rendered to an HTML string at send time in the Contact Function.                         |
| **Resend**                        | A transactional email delivery service. Used by the Contact Function to deliver contact form messages to Joseph's inbox.                                                                                     |
| **Sanity Studio**                 | The CMS authoring UI — a React application defined in `studio/` and deployed separately to `<project>.sanity.studio`. Not bundled with the main Vite app.                                                    |
| **SPA**                           | Single-Page Application — a web application that loads once and handles navigation client-side via JavaScript without full page reloads. This portfolio is a Vite-built React SPA.                           |
| **Static data**                   | The TypeScript arrays in `src/data/` (`posts.ts`, `projects.ts`, `timeline.ts`) that serve as initial state and fallback content when the Sanity CMS is not configured.                                      |
| **Static-first with CMS overlay** | The data fetching pattern used in all three Sanity hooks: initialise with static data, attempt a Sanity fetch if `VITE_SANITY_PROJECT_ID` is set, silently keep static data on failure.                      |
| **TimelineItem**                  | A component in the Timeline section representing a single career or education entry.                                                                                                                         |
| **`useCDN: true`**                | The `@sanity/client` option that routes GROQ queries through Sanity's global CDN rather than the origin API. Improves read latency; cache is invalidated on Sanity publish events.                           |
| **useNavScroll**                  | A custom hook (`src/hooks/useNavScroll.ts`) that tracks `scrollY` to toggle the Nav border state and determine which section is currently in view (for active-link highlighting).                            |
| **Vite**                          | A frontend build tool and dev server. Used here with `@vitejs/plugin-react` for JSX transform and `@tailwindcss/vite` for Tailwind CSS processing.                                                           |
| **`vercel.json` rewrite**         | The single routing rule that makes SPA routing work on Vercel: all non-`/api/` paths are rewritten to `index.html`, allowing React Router to handle them client-side.                                        |
| **whileInView**                   | A Framer Motion prop that triggers an animation when an element enters the viewport (using `IntersectionObserver`). Stubbed in the test environment because jsdom does not implement `IntersectionObserver`. |
| **Zod**                           | A TypeScript-first schema validation library. Used for the contact form schema (`src/schemas/contact.ts`) shared between the client-side form and the serverless API function.                               |
