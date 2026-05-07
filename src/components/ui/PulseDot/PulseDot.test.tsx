import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PulseDot from './PulseDot'

describe('PulseDot', () => {
  it('renders without crashing', () => {
    const { container } = render(<PulseDot />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has the pulse-dot accessible role container', () => {
    render(<PulseDot aria-label="Available for work" />)
    expect(screen.getByLabelText('Available for work')).toBeInTheDocument()
  })
})
