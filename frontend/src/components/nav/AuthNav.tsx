import { useState } from 'react'
import { Link } from 'react-router-dom'

const AuthNav = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen)
    console.log('menuOpen:', menuOpen)
  }

  return (
    <nav className='relative w-full px-6 py-4'>
      <ul className='hidden sm:flex justify-end gap-4 text-xs text-gray-400'>
        <li>
          <Link to='/login' className='link-underline'>
            Log in
          </Link>
        </li>
        <li>
          <Link to='/signup' className='link-underline'>
            Sign up
          </Link>
        </li>
        <li>
          <Link to='learn-more' className='link-underline'>
            Learn more
          </Link>
        </li>
      </ul>
      <button
        className='sm:hidden absolute top-4 right-4 focus:outline-none'
        onClick={toggleMenuOpen}
        aria-label='Toggle menu'
      >
        <svg
          className='w-6 h-6 text-gray-400'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          viewBox='0 0 24 24'
        >
          <path d='M3 6h18M3 12h18M3 18h18' />
        </svg>
      </button>
      {menuOpen && (
        <ul
          className='
            sm:hidden fixed inset-0 z-50 bg-white/30 backdrop-blur-md 
            flex flex-col justify-center items-center text-s text-gray-600 gap-6
          '
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false)
          }}
        >
          <li>
            <Link to='/login' className='' onClick={() => setMenuOpen(false)}>
              Log in
            </Link>
          </li>
          <li>
            <Link to='signup' className='' onClick={() => setMenuOpen(false)}>
              Sign up
            </Link>
          </li>
          <li>
            <Link
              to='learn-more'
              className=''
              onClick={() => setMenuOpen(false)}
            >
              Learn more
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default AuthNav
