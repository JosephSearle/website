import { useState, useEffect } from 'react'
import type { PostWithBody } from '@/types'
import { posts as staticPosts } from '@/data/posts'
import { sanityClient } from '@/lib/sanity/client'
import { postBySlugQuery } from '@/lib/sanity/queries'

type RawPost = Omit<PostWithBody, 'date'> & { date: string }

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function useSanityPost(slug: string): { post: PostWithBody | undefined; loading: boolean } {
  const staticPost = staticPosts.find((p) => p.slug === slug)
  const [post, setPost] = useState<PostWithBody | undefined>(staticPost)
  const [loading, setLoading] = useState(() => !!import.meta.env.VITE_SANITY_PROJECT_ID)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    sanityClient
      .fetch<RawPost | null>(postBySlugQuery, { slug })
      .then((raw) => setPost(raw ? { ...raw, date: formatDate(raw.date) } : undefined))
      .catch(() => setPost(staticPost))
      .finally(() => setLoading(false))
  }, [slug, staticPost])

  return { post, loading }
}
