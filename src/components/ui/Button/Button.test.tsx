import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as an anchor when href is provided', () => {
    render(<Button href="/contact">Contact</Button>)
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('applies primary variant styles class', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
  })

  it('applies ghost variant styles class', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-ghost')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('forwards additional className', () => {
    render(<Button className="custom-class">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
