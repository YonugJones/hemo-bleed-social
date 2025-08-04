import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App component', () => {
  render(<App />)
  it('should render the app title in h1', () => {
    const heading = screen.getByTestId('title')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/App$/)
  })
})
