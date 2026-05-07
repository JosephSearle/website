import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  )
}

describe('Hero', () => {
  it('renders the headline', () => {
    renderHero()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the CTA buttons', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /let's talk/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /see my work/i })).toBeInTheDocument()
  })

  it('renders the availability tag', () => {
    renderHero()
    expect(screen.getByText(/open to new roles/i)).toBeInTheDocument()
  })
})

describe('AvatarCard', () => {
  it('shows front face content by default (initials)', () => {
    renderHero()
    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('has back face content in the DOM (accessible when flipped)', () => {
    renderHero()
    expect(screen.getByText(/a bit about me/i)).toBeInTheDocument()
    expect(screen.getByText(/clapham common/i)).toBeInTheDocument()
  })

  it('flips to back face on hover', async () => {
    const user = userEvent.setup()
    renderHero()
    const card = screen.getByTestId('avatar-flip-card')
    await user.hover(card)
    // Back face element has data-face="back" — confirm it's in DOM
    expect(screen.getByTestId('avatar-back')).toBeInTheDocument()
  })
})
