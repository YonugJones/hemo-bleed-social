import { signupUser } from '../api/auth'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { formClass, inputClass, buttonClass } from '../styles/classNames'
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../utils/validation'
import type { SignupFormValues, ValidationKeys } from '../types/auth'
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<
    keyof SignupFormValues | null
  >(null)

  const setValidation = (field: ValidationKeys, value: boolean) => {
    switch (field) {
      case 'validUsername':
        setValidUsername(value)
        break
      case 'validEmail':
        setValidEmail(value)
        break
      case 'validPassword':
        setValidPassword(value)
        break
      case 'validConfirmPassword':
        setValidConfirmPassword(value)
        break
    }
  }

  const handleChange = (field: keyof SignupFormValues, value: string) => {
    switch (field) {
      case 'username':
        setUsername(value)
        setValidation('validUsername', USERNAME_REGEX.test(value))
        break
      case 'email':
        setEmail(value)
        setValidation('validEmail', EMAIL_REGEX.test(value))
        break
      case 'password':
        setPassword(value)
        setValidation('validPassword', PASSWORD_REGEX.test(value))
        setValidation('validConfirmPassword', value === confirmPassword)
        break
      case 'confirmPassword':
        setConfirmPassword(value)
        setValidation('validConfirmPassword', value === password)
        break
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrMsg('') // clear old errors

    if (validUsername && validEmail && validPassword && validConfirmPassword) {
      try {
        await signupUser({
          username,
          email,
          password,
          confirmPassword,
        })
        setSuccess(true)
      } catch (error: unknown) {
        let message = 'Signup failed. Try again.'

        if (axios.isAxiosError(error)) {
          // ✅ Use backend message if available
          message = error.response?.data?.error || message
        }

        setErrMsg(message)
      }
    } else {
      setErrMsg('Please fix the highlighted fields')
    }
  }

  if (success) {
    return (
      <section className={formClass}>
        <h1 className='text-xl font-semibold text-center mb-4'>
          Account Created!
        </h1>
        <Link to='/login' className={buttonClass}>
          Login
        </Link>
      </section>
    )
  }

  return (
    <section>
      {/* ✅ Show backend error message directly */}
      <p className={errMsg ? 'text-red-600 text-center mb-2' : 'offscreen'}>
        {errMsg}
      </p>
      <form className={formClass} onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col sm:flex-col md:flex-row flex-wrap justify-center items-center gap-2 w-full'>
          <input
            className={`${inputClass} ${
              !validUsername && errMsg ? 'border-red-500' : ''
            }`}
            type='text'
            autoComplete='off'
            placeholder='Username'
            value={username}
            onChange={(e) => handleChange('username', e.target.value)}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            required
          />
          <input
            className={`${inputClass} ${
              !validEmail && errMsg ? 'border-red-500' : ''
            }`}
            type='email'
            autoComplete='off'
            placeholder='Email'
            value={email}
            onChange={(e) => handleChange('email', e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
          />
          <input
            className={`${inputClass} ${
              !validPassword && errMsg ? 'border-red-500' : ''
            }`}
            type='password'
            autoComplete='off'
            placeholder='Password'
            value={password}
            onChange={(e) => handleChange('password', e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            required
          />
          <input
            className={`${inputClass} ${
              password && confirmPassword && !validConfirmPassword && errMsg
                ? 'border-red-500'
                : ''
            }`}
            type='password'
            autoComplete='off'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
            required
          />
        </div>
        <button
          className={buttonClass}
          disabled={
            !validUsername ||
            !validEmail ||
            !validPassword ||
            !validConfirmPassword
          }
        >
          Signup
        </button>
      </form>
      <p className='text-center pt-2'>
        <Link to='/login'>Already have an account?</Link>
      </p>
      {focusedField === 'username' && !validUsername && (
        <p className='text-red-600 text-center mt-2'>
          Must be at least 3 characters.
        </p>
      )}
      {focusedField === 'email' && !validEmail && (
        <p className='text-red-600 text-center mt-2'>
          Must be a valid email address.
        </p>
      )}
      {focusedField === 'password' && !validPassword && (
        <p className='text-red-600 text-center mt-2'>
          Minimum 10 characters. At least 1 lowercase, uppercase, numeric, and
          special character.
        </p>
      )}
      {focusedField === 'confirmPassword' && !validConfirmPassword && (
        <p className='text-red-600 text-center mt-2'>Passwords must match.</p>
      )}
    </section>
  )
}

export default Signup
