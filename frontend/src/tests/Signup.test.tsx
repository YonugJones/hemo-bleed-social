import { vi, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Signup from '../auth/Signup'

describe('Signup', () => {
  it('renders all form inputs and submit button', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /create your account/i })
    ).toBeInTheDocument()
  })

  it('updates form values on user input', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

    await user.type(screen.getByLabelText(/username/i), 'testuser')
    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser')

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com')

    await user.type(screen.getByLabelText(/^password$/i), 'Password123!')
    expect(screen.getByLabelText(/^password$/i)).toHaveValue('Password123!')

    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!')
    expect(screen.getByLabelText(/confirm password/i)).toHaveValue(
      'Password123!'
    )
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

    await user.type(screen.getByLabelText(/^password$/i), 'Password123!')
    await user.type(screen.getByLabelText(/confirm password/i), 'wrongPass')
    await user.click(
      screen.getByRole('button', { name: /create your account/i })
    )

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('calls onSubmit with the correct data when form is valid and submitted', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Signup onSubmit={handleSubmit} />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /create your account/i })

    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'Password123!')
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!')
    await user.click(button)

    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    })
  })

  it('should not call the handleSubmit function when it is not called', async () => {
    const handleSubmit = vi.fn()
    render(
      <MemoryRouter>
        <Signup onSubmit={handleSubmit} />
      </MemoryRouter>
    )

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('navigates to login page when login link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    )

    const loginLink = screen.getByRole('button', {
      name: /already have an account? Login here/i,
    })
    await user.click(loginLink)
    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })
})
