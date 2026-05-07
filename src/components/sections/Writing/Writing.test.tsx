import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Writing from './Writing'
import { posts } from '@/data/posts'

describe('Writing', () => {
  it('renders the section heading', () => {
    render(<Writing />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders all blog post titles', () => {
    render(<Writing />)
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it('renders post dates', () => {
    render(<Writing />)
    expect(screen.getByText('22 Apr 2026')).toBeInTheDocument()
  })

  it('renders post categories', () => {
    render(<Writing />)
    expect(screen.getByText('Agents')).toBeInTheDocument()
  })

  it('renders posts as links', () => {
    render(<Writing />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(posts.length)
  })
})
