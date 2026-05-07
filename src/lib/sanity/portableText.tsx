import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PostWithBody } from '@/types'

type SanityBlock = { _type: string; [key: string]: unknown }

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[18px] leading-[1.7] text-[rgba(26,15,10,0.8)] mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        className="font-display text-[28px] font-medium text-heading tracking-[-0.02em] mt-12 mb-4"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-display text-[22px] font-medium text-heading tracking-[-0.015em] mt-8 mb-3"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-terracotta pl-6 my-8 italic text-[rgba(26,15,10,0.7)] text-[17px]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-[0.9em] bg-surface px-1.5 py-0.5 rounded text-terracotta">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-terracotta underline underline-offset-2 hover:text-terracotta-deep transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-[rgba(26,15,10,0.8)] text-[18px] leading-[1.7]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-[rgba(26,15,10,0.8)] text-[18px] leading-[1.7]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

export function PortableTextBody({ post }: { readonly post: PostWithBody }) {
  if (!post.body) return null
  return <PortableText value={post.body as SanityBlock[]} components={components} />
}
