import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Chip from './Chip'

describe('Chip', () => {
  it('renders the label text', () => {
    render(<Chip>LangGraph</Chip>)
    expect(screen.getByText('LangGraph')).toBeInTheDocument()
  })

  it('applies primary variant class when primary prop is set', () => {
    render(<Chip primary>Primary chip</Chip>)
    expect(screen.getByText('Primary chip')).toHaveClass('chip-primary')
  })

  it('does not apply primary class by default', () => {
    render(<Chip>Regular chip</Chip>)
    expect(screen.getByText('Regular chip')).not.toHaveClass('chip-primary')
  })
})
