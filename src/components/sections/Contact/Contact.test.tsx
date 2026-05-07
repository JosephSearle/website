import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { server } from '@/test/setup'
import { errorHandlers } from '@/test/msw-handlers'
import ContactForm from './ContactForm'

async function fillAndSubmit(overrides: Record<string, string> = {}) {
  const user = userEvent.setup()
  const values = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Hello',
    message: 'This is a test message that is long enough.',
    ...overrides,
  }
  await user.type(screen.getByLabelText(/your name/i), values.name)
  await user.type(screen.getByLabelText(/email/i), values.email)
  await user.type(screen.getByLabelText(/what's this about/i), values.subject)
  await user.type(screen.getByLabelText(/message/i), values.message)
  await user.click(screen.getByRole('button', { name: /send message/i }))
}

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/what's this about/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation error when name is too short', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/your name/i), 'A')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('shows success message after successful submit', async () => {
    render(<ContactForm />)
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByText(/message landed/i)).toBeInTheDocument()
    })
  })

  it('shows error message when API call fails', async () => {
    server.use(...errorHandlers)
    render(<ContactForm />)
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('resets the form after successful submit', async () => {
    render(<ContactForm />)
    await fillAndSubmit()
    await waitFor(() => {
      expect(screen.getByLabelText(/your name/i)).toHaveValue('')
    })
  })
})
