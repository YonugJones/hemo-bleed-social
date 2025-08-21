import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formClass, inputClass, buttonClass } from '../styles/classNames'
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../api/auth'

const Login = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [focusedField, setFocusedField] = useState<
    'username' | 'password' | null
  >(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrMsg('')

    if (!username || !password) {
      setErrMsg('Please enter both username and password')
      return
    }

    try {
      const data = await loginUser(username, password)

      setAuth({
        id: data.data.id,
        username: data.data.username,
        email: data.data.email,
        profilePic: data.data.profilePic,
        accessToken: data.accessToken,
      })

      // Redirect to feed after login
      navigate('/feed')
    } catch (error: any) {
      setErrMsg(error.response?.data?.message || 'Login failed. Try again.')
    }
  }

  return (
    <section>
      <p className={errMsg ? 'text-red-600 text-center mb-2' : 'offscreen'}>
        {errMsg}
      </p>
      <form className={formClass} onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 w-full'>
          <input
            className={`${inputClass} ${
              focusedField === 'username' && !username && errMsg
                ? 'border-red-500'
                : ''
            }`}
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            autoComplete='username'
            required
          />
          <input
            className={`${inputClass} ${
              focusedField === 'password' && !password && errMsg
                ? 'border-red-500'
                : ''
            }`}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
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
      {focusedField === 'username' && !username && (
        <p className='text-red-600 text-center mt-2'>Username is required.</p>
      )}
      {focusedField === 'password' && !password && (
        <p className='text-red-600 text-center mt-2'>Password is required.</p>
      )}
    </section>
  )
}

export default Login
