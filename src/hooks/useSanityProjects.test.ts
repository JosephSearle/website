import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { useSanityProjects } from './useSanityProjects'
import { projects as staticProjects } from '@/data/projects'

vi.mock('@/lib/sanity/client', () => ({
  sanityClient: { fetch: vi.fn() },
}))

import { sanityClient } from '@/lib/sanity/client'

const mockFetch = sanityClient.fetch as ReturnType<typeof vi.fn>

afterEach(() => {
  vi.clearAllMocks()
  vi.unstubAllEnvs()
})

describe('useSanityProjects', () => {
  it('returns static projects immediately when no project ID is set', () => {
    const { result } = renderHook(() => useSanityProjects())
    expect(result.current).toEqual(staticProjects)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('returns Sanity projects after fetch resolves', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', 'test-project-id')
    const sanityProjects = [
      {
        id: 'san-proj-1',
        title: 'My Sanity Project',
        description: 'A project from Sanity',
        tags: ['Go', 'MCP'],
        url: 'https://example.com',
        iconVariant: 'terracotta' as const,
      },
    ]
    mockFetch.mockResolvedValue(sanityProjects)

    const { result } = renderHook(() => useSanityProjects())
    await waitFor(() => expect(result.current[0].title).toBe('My Sanity Project'))
  })

  it('keeps static projects when Sanity fetch fails', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', 'test-project-id')
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useSanityProjects())
    await waitFor(() => expect(mockFetch).toHaveBeenCalled())
    expect(result.current).toEqual(staticProjects)
  })
})
