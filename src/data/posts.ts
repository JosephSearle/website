import type { Post } from '@/types'

export const posts: Post[] = [
  {
    id: '1',
    date: '22 Apr 2026',
    category: 'Agents',
    title: 'Stop calling them agents. Call them control loops.',
    excerpt:
      'A polemic, with footnotes. The word "agent" is doing too much work, and most of the bugs I see are in the bits everyone forgot to design.',
    slug: 'stop-calling-them-agents',
  },
  {
    id: '2',
    date: '14 Mar 2026',
    category: 'Retrieval',
    title: 'Hybrid retrieval is mostly a tuning problem.',
    excerpt:
      'Six months of A/B tests across three corpora. BM25 still earns its keep; the magic is in the reranker and the chunk boundaries, not the embedding model.',
    slug: 'hybrid-retrieval-tuning',
  },
  {
    id: '3',
    date: '02 Feb 2026',
    category: 'Tooling',
    title: "A field guide to MCP, for people who've been ignoring it.",
    excerpt:
      'What MCP actually is, why it matters more than the hype suggests, and the three production gotchas nobody warns you about until you ship.',
    slug: 'mcp-field-guide',
  },
  {
    id: '4',
    date: '10 Jan 2026',
    category: 'Operations',
    title: "The cheapest LLM observability stack that won't betray you.",
    excerpt:
      'A pragmatic walkthrough of OTel + ClickHouse + a thin in-house UI. About £40/month at our scale; pays for itself the first time prod blows up.',
    slug: 'llm-observability-stack',
  },
  {
    id: '5',
    date: '04 Dec 2025',
    category: 'Career',
    title: "On being a generalist in a specialist's market.",
    excerpt:
      'Why I keep refusing to pick a lane, and the small set of habits that have made breadth feel like an asset rather than a tax.',
    slug: 'generalist-specialist-market',
  },
]
