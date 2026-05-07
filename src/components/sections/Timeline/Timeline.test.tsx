import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Timeline from './Timeline'
import { timeline } from '@/data/timeline'

describe('Timeline', () => {
  it('renders the section heading', () => {
    render(<Timeline />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders all timeline entries', () => {
    render(<Timeline />)
    for (const entry of timeline) {
      expect(screen.getByText(entry.role)).toBeInTheDocument()
      expect(screen.getAllByText(entry.company, { exact: false }).length).toBeGreaterThan(0)
    }
  })

  it('renders date ranges', () => {
    render(<Timeline />)
    expect(screen.getByText('2024 — Present')).toBeInTheDocument()
  })

  it('renders skill tags for each entry', () => {
    render(<Timeline />)
    expect(screen.getAllByText('MCP').length).toBeGreaterThan(0)
  })
})
