import { useState, useEffect } from 'react'
import type { Post } from '@/types'
import { posts as staticPosts } from '@/data/posts'
import { sanityClient } from '@/lib/sanity/client'
import { allPostsQuery } from '@/lib/sanity/queries'

type RawPost = Omit<Post, 'date'> & { date: string }

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function useSanityPosts(): Post[] {
  const [posts, setPosts] = useState<Post[]>(staticPosts)

  useEffect(() => {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return
    sanityClient
      .fetch<RawPost[]>(allPostsQuery)
      .then((raw) => setPosts(raw.map((p) => ({ ...p, date: formatDate(p.date) }))))
      .catch(() => {})
  }, [])

  return posts
}
