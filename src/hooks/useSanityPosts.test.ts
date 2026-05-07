import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { useSanityPosts } from './useSanityPosts'
import { posts as staticPosts } from '@/data/posts'

vi.mock('@/lib/sanity/client', () => ({
  sanityClient: { fetch: vi.fn() },
}))

import { sanityClient } from '@/lib/sanity/client'

const mockFetch = sanityClient.fetch as ReturnType<typeof vi.fn>

afterEach(() => {
  vi.clearAllMocks()
  vi.unstubAllEnvs()
})

describe('useSanityPosts', () => {
  it('returns static posts immediately when no project ID is set', () => {
    const { result } = renderHook(() => useSanityPosts())
    expect(result.current).toEqual(staticPosts)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('returns Sanity posts after fetch resolves', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', 'test-project-id')
    const sanityPosts = [
      {
        id: 'san-1',
        date: '2026-04-22T00:00:00.000Z',
        category: 'Agents',
        title: 'From Sanity',
        excerpt: 'A post from Sanity',
        slug: 'from-sanity',
      },
    ]
    mockFetch.mockResolvedValue(sanityPosts)

    const { result } = renderHook(() => useSanityPosts())
    await waitFor(() => expect(result.current[0].title).toBe('From Sanity'))
    expect(result.current[0].date).toMatch(/\d{2} \w{3} \d{4}/)
  })

  it('keeps static posts when Sanity fetch fails', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', 'test-project-id')
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useSanityPosts())
    await waitFor(() => expect(mockFetch).toHaveBeenCalled())
    expect(result.current).toEqual(staticPosts)
  })
})
