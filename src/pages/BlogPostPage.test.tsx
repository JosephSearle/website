import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, describe, it, expect, afterEach } from 'vitest'
import BlogPostPage from './BlogPostPage'

vi.mock('@/lib/sanity/client', () => ({
  sanityClient: { fetch: vi.fn() },
}))

afterEach(() => {
  vi.clearAllMocks()
  vi.unstubAllEnvs()
})

function renderAtSlug(slug: string) {
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BlogPostPage', () => {
  it('renders post title from static data', () => {
    renderAtSlug('stop-calling-them-agents')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stop calling them agents.')
  })

  it('renders post category', () => {
    renderAtSlug('stop-calling-them-agents')
    expect(screen.getByText('Agents')).toBeInTheDocument()
  })

  it('shows not-found state for unknown slug', () => {
    renderAtSlug('slug-that-does-not-exist')
    expect(screen.getByText('Post not found.')).toBeInTheDocument()
  })

  it('shows back link to home', () => {
    renderAtSlug('stop-calling-them-agents')
    expect(screen.getByText('← Writing')).toBeInTheDocument()
  })

  it('renders excerpt when no Sanity body is available', () => {
    renderAtSlug('stop-calling-them-agents')
    expect(screen.getByText(/Full post content coming/)).toBeInTheDocument()
  })
})
