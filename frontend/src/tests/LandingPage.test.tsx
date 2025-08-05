import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/LandingPage'

describe('LandingPage', () => {
  it('renders page snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders Hemo Bleed Social heading and slogan', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: /hemo bleed social/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /live. log. learn/i })
    ).toBeInTheDocument()
  })

  it('renders "Create your account" and "Log in" buttons', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('button', { name: /create your account/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('navigate to signup when "Create your account" is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<div>Signup Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    const signupButton = screen.getByRole('button', {
      name: /create your account/i,
    })
    await user.click(signupButton)
    expect(screen.getByText(/signup page/i)).toBeInTheDocument()
  })

  it('navigate to login when "Log in" is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    )

    const loginButton = screen.getByRole('button', { name: /log in/i })
    await user.click(loginButton)
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
