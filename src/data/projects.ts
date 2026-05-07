import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'mcp-loom',
    title: 'mcp-loom',
    description:
      'A small Go runtime for composing MCP tools with deterministic replay, schema-validated I/O, and a debug TUI. About 4k stars; powers a couple of internal platforms I know of.',
    tags: ['Go', 'MCP', 'OSS'],
    url: '#',
    iconVariant: 'terracotta',
  },
  {
    id: 'graphshelf',
    title: 'graphshelf',
    description:
      'A LangGraph state machine visualiser that reads your runs from OTel and lets you scrub through agent traces frame by frame. Built it after losing an afternoon to a bad reducer.',
    tags: ['TypeScript', 'LangGraph', 'OTel'],
    url: '#',
    iconVariant: 'sage',
  },
  {
    id: 'retrieval-notes',
    title: 'retrieval-notes',
    description:
      'A long-running essay series and reference repo on production RAG — chunking strategies, eval design, hybrid retrieval, the lot. Comes with a benchmark suite you can run against your own corpus.',
    tags: ['Python', 'Milvus', 'RAG'],
    url: '#',
    iconVariant: 'terracotta',
  },
]
