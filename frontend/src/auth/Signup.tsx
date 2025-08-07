import { useState, useEffect, type FormEvent } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  specialChars,
} from '../utils/validation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { type SignupProps } from '../types/auth'

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
    <div>
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
          <form onSubmit={handleSubmit}>
            <div>
              <h1>Create a new account!</h1>
              <p>It&apos;s quick and easy.</p>
            </div>

            {/* USERNAME LABEL */}
            <label htmlFor='username'>
              <span className={validUsername ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} aria-hidden='true' />
              </span>
              <span className={validUsername || !username ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
              </span>
            </label>

            {/* USERNAME INPUT */}
            <input
              type='text'
              id='username'
              autoComplete='on'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder='Username'
              required
            />
            <p
              className={
                username && !validUsername ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} aria-hidden='true' />
              Must have 3 to 24 characters <br />
              Username cannot contain spaces <br />
            </p>

            {/* EMAIL LABEL */}
            <label htmlFor='email'>
              <span className={validEmail ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} aria-hidden='true' />
              </span>
              <span className={validEmail || !email ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
              </span>
            </label>

            {/* EMAIL INPUT */}
            <input
              type='email'
              id='email'
              autoComplete='on'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Email'
              required
            />
            <p className={email && !validEmail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be a valid email address <br />
            </p>

            {/* PASSWORD LABEL */}
            <label htmlFor='password'>
              <span className={validPassword ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} aria-hidden='true' />
              </span>
              <span className={validPassword || !password ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
              </span>
            </label>

            {/* PASSWORD INPUT */}
            <input
              type='password'
              id='password'
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Password'
              required
            />
            <p
              className={
                password || !validPassword ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be at least 10 characters <br />
              Password must contain upper and lower case letters, a number, and
              a special character <br />
              Allowed special characters: {specialChars}
            </p>

            {/* CONFIRM PASSWORD LABEL */}
            <label htmlFor='confirmPassword'>
              <span
                className={
                  validConfirmPassword && confirmPassword ? 'valid' : 'hide'
                }
              >
                <FontAwesomeIcon icon={faCheck} aria-hidden='true' />
              </span>
              <span
                className={
                  validConfirmPassword || !confirmPassword ? 'hide' : 'invalid'
                }
              >
                <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
              </span>
            </label>

            {/* CONFIRM PASSWORD INPUT */}
            <input
              type='password'
              id='confirmPassword'
              autoComplete='off'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder='Confirm Password'
              required
            />
            <p
              className={
                confirmPassword.length > 0 && !validConfirmPassword
                  ? 'instructions'
                  : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} aria-hidden='true' />
              Passwords must match <br />
            </p>

            {/* SUBMIT BUTTON */}
            <button
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
          <p>
            <span>
              <Link to='/login'>Already have an account?</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  )
}

export default Signup
