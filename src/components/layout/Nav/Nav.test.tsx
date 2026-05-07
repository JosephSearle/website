import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Nav from './Nav'

function renderNav() {
  return render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>,
  )
}

describe('Nav', () => {
  it('renders the site name', () => {
    renderNav()
    expect(screen.getByText(/joseph searle/i)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /writing/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders a navigation landmark', () => {
    renderNav()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
