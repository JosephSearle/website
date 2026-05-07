import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Skills from './Skills'

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders primary skill chips', () => {
    render(<Skills />)
    expect(screen.getByText('LangGraph')).toBeInTheDocument()
    expect(screen.getByText('Agentic AI Development')).toBeInTheDocument()
  })

  it('renders secondary skill chips', () => {
    render(<Skills />)
    expect(screen.getByText('Go')).toBeInTheDocument()
    expect(screen.getByText('Kubernetes')).toBeInTheDocument()
  })

  it('renders the legend explaining chip colours', () => {
    render(<Skills />)
    expect(screen.getByText(/primary specialism/i)).toBeInTheDocument()
  })
})
