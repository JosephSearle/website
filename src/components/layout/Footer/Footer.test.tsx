import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the name', () => {
    render(<Footer />)
    expect(screen.getByText(/joseph searle/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders LinkedIn link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  })

  it('renders a Download CV link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /download cv/i })).toBeInTheDocument()
  })

  it('renders the copyright year', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026/)).toBeInTheDocument()
  })
})
