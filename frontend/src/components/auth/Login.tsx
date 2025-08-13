import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formClass, inputClass, buttonClass } from '../../styles/classNames'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section>
      <form className={formClass}>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 w-full'>
          <input
            className={inputClass}
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='username'
            required
          />
          <input
            className={inputClass}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
        </div>
        <button className={buttonClass} disabled={!username || !password}>
          Login
        </button>
      </form>
      <p className='text-center pt-2'>
        <Link to='/signup' className='text-[var(--green)]'>
          Don&apos;t have an account?
        </Link>
      </p>
    </section>
  )
}

export default Login
