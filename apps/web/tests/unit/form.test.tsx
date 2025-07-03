import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
// import Form from '../../src/components/ui/form/form'
import HomePage from '@/form/page'

describe('Form Component', () => {
  //   it('renders the form with initial values', () => {
  //     render(<HomePage onSubmit={vi.fn()} />)

  //     expect(screen.getByLabelText(/name/i)).toHaveValue('')
  //     expect(screen.getByLabelText(/email/i)).toHaveValue('')
  //   })

  it('validates the form fields', async () => {
    render(<HomePage />)

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    expect(submitButton).toBeInTheDocument()
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }))
    await screen.findByText(/Name is required/i)
    await screen.findByText(/Email is required/i)
    await waitFor(() => {
      screen.debug()
    })
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument()
  })

  // it('validates the form fields', async () => {
  //   render(<HomePage />)

  //   const submitButton = screen.getByRole('button', { name: /Submit/i })
  //   expect(submitButton).toBeInTheDocument()
  //   fireEvent.submit(screen.getByRole('button', { name: /Submit/i }))

  //   // Await the rendering of the validation error messages
  //   await screen.findByText(/Name is required/i)
  //   await screen.findByText(/Email is required/i)

  //   // Debug the screen after the validation error messages are rendered
  //   // screen.debug();

  //   expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
  //   expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
  // })

  //   it('submits the form with valid data', async () => {
  //     const handleSubmit = vi.fn()
  //     render(<HomePage onSubmit={handleSubmit} />)

  //     fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
  //     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } })

  //     fireEvent.submit(screen.getByRole('button', { name: /submit/i }))

  //     expect(handleSubmit).toHaveBeenCalledWith({
  //       name: 'John Doe',
  //       email: 'john.doe@example.com',
  //     })
  //   })
})
