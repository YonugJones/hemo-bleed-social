import { useState, useEffect, type FormEvent } from 'react'
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../utils/validation'
import { Link } from 'react-router-dom'
import { type SignupFormData } from '../types/auth'

type SignupProps = {
  onSubmit?: (signupData: SignupFormData) => void | Promise<void>
}

const Signup = ({ onSubmit }: SignupProps) => {
  const [username, setUsername] = useState<string>('')
  const [validUsername, setValidUsername] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(false)

  const [password, setPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<boolean>(false)

  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [validConfirmPassword, setValidConfirmPassword] =
    useState<boolean>(false)

  const [errMsg, setErrMsg] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const result = USERNAME_REGEX.test(username)
    setValidUsername(result)
  }, [username])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password)
    setValidPassword(result)
    const confirm = password === confirmPassword
    setValidConfirmPassword(confirm)
  }, [password, confirmPassword])

  useEffect(() => {
    setErrMsg('')
  }, [username, email, password, confirmPassword])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (
        validUsername &&
        validEmail &&
        validPassword &&
        validConfirmPassword
      ) {
        await onSubmit({ username, email, password, confirmPassword })
        setSuccess(true)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else setErrMsg('Please fill out the form correctly')
    } catch (err) {
      console.error(err)
      setErrMsg('Signup failed. Please try again')
    }
  }

  return (
    <>
      {/* SUCCESS MSG */}
      {success ? (
        <section>
          <h1>Account Created!</h1>
          <Link to='/login'>Login</Link>
        </section>
      ) : (
        // FORM CONTAINER
        <section>
          <p className={errMsg ? 'errMsg' : 'offscreen'}>{errMsg}</p>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center gap-y-4 w-full max-w-md mx-auto'
          >
            <div className='flex flex-col sm:flex-col md:flex-row gap-y-1 md:gap-y-0'>
              {/* USERNAME */}
              <input
                className='input:focus sm:w-[15vw] px-4 py-1 border inset-shadow-2xs border-gray-200 focus:inset-shadow-[var(--green)] rounded-full text-center text-xs mx-1'
                type='text'
                id='username'
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='Username'
                required
              />

              {/* EMAIL */}
              <input
                className='sm:w-[15vw] px-4 py-1 border inset-shadow-2xs border-gray-200 rounded-full text-center text-xs mx-1'
                type='email'
                id='email'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Email'
                required
              />

              {/* PASSWORD */}
              <input
                className='sm:w-[15vw] px-4 py-1 border inset-shadow-2xs border-gray-200 rounded-full text-center text-xs mx-1'
                type='password'
                id='password'
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Password'
                required
              />

              {/* CONFIRM PASSWORD */}
              <input
                className='sm:w-[15vw] px-4 py-1 border inset-shadow-2xs border-gray-200 rounded-full text-center text-xs mx-1'
                type='password'
                id='confirmPassword'
                autoComplete='off'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder='Confirm Password'
                required
              />
            </div>

            <button
              className='w-[25vw] px-4 py-2 rounded-full bg-[var(--green)] hover:bg-[var(--light-green)] text-white font-semibold shadow cursor-pointer'
              disabled={
                !validUsername ||
                !validEmail ||
                !validPassword ||
                !validConfirmPassword
                  ? false
                  : true
              }
            >
              Signup
            </button>
          </form>
          <p className='text-center pt-2'>
            <Link to='/login'>Already have an account?</Link>
          </p>
        </section>
      )}
    </>
  )
}

export default Signup
