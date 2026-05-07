import type { TimelineEntry } from '@/types'

export const timeline: TimelineEntry[] = [
  {
    id: 'northwind',
    dateRange: '2024 — Present',
    role: 'Senior AI Engineer',
    company: 'Northwind Labs',
    location: 'London',
    description:
      'Lead the agentic platform team building MCP-first internal tooling. Designed a LangGraph-based orchestration layer that replaced a brittle prompt-chaining service, cutting median latency by 38% and incident volume in half.',
    tags: ['MCP', 'LangGraph', 'Go', 'Milvus'],
  },
  {
    id: 'quill-mason',
    dateRange: '2022 — 2024',
    role: 'Staff Engineer, Platform',
    company: 'Quill & Mason',
    location: 'London',
    description:
      "Built the retrieval and evaluation infrastructure for the company's first LLM product. Owned the Kubernetes-based serving stack, the Milvus vector store, and the eval harness that gated every release.",
    tags: ['RAG', 'Kubernetes', 'NestJS', 'Harness'],
  },
  {
    id: 'redhat',
    dateRange: '2019 — 2022',
    role: 'Senior Software Engineer',
    company: 'RedHat',
    location: 'Remote',
    description:
      'Worked on event-driven services across the OpenShift AI platform. Contributed to upstream operators and learned, in great detail, how to make distributed systems behave when the network does not.',
    tags: ['RedHat', 'Go', 'Event-Driven', 'K8s'],
  },
  {
    id: 'monograph',
    dateRange: '2017 — 2019',
    role: 'Software Engineer',
    company: 'Monograph',
    location: 'Edinburgh',
    description:
      'Full-stack work on a publishing platform: TypeScript, Postgres, the usual. The job that taught me to write tests before I write features, and to be suspicious of any system that has only ever worked.',
    tags: ['TypeScript', 'Postgres', 'CI/CD'],
  },
]
