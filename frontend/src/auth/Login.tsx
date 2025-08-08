import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <section>
      <form
        // onSubmit={handleSubmit}
        className='flex flex-col items-center gap-y-4 w-full max-w-md mx-auto'
      >
        <div className='flex flex-col sm:flex-row gap-y-1 sm:gap-y-0'>
          <input
            className='w-[150px] sm:w-[15vw] px-4 py-1 border border-gray-200 inset-shadow-2xs rounded-full text-center text-xs mx-1'
            type='text'
            id='username'
            autoComplete='on'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
            required
          />

          <input
            className='w-[150px] sm:w-[15vw] px-4 py-1 border border-gray-200 inset-shadow-2xs rounded-full text-center text-xs mx-1'
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            required
          />
        </div>

        <button
          className='w-[25vw] px-4 py-2 rounded-full bg-[var(--green)] hover:bg-[var(--light-green)] text-white font-semibold shadow cursor-pointer'
          disabled={!username || !password ? false : true}
        >
          Login
        </button>
      </form>
      <p className='text-center pt-2'>
        <Link to='/signup'>Don&apos;t have an account?</Link>
      </p>
    </section>
  )
}

export default Login
