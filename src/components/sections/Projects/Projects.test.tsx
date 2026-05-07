import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from './Projects'
import { projects } from '@/data/projects'

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders all project titles', () => {
    render(<Projects />)
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
  })

  it('renders project descriptions', () => {
    render(<Projects />)
    expect(screen.getByText(/mcp tools/i)).toBeInTheDocument()
  })

  it('renders project cards as links', () => {
    render(<Projects />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(projects.length)
  })
})
