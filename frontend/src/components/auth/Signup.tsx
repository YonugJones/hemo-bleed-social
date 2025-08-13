import { useReducer, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { formClass, inputClass, buttonClass } from '../../styles/classNames'
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '../../utils/validation'

type SignupFormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

type SignupProps = {
  onSubmit?: (data: SignupFormValues) => void | Promise<void>
}

type State = SignupFormValues & {
  validUsername: boolean
  validEmail: boolean
  validPassword: boolean
  validConfirmPassword: boolean
  errMsg: string
  success: boolean
}

type Action =
  | { type: 'SET_FIELD'; field: keyof SignupFormValues; value: string }
  | {
      type: 'SET_VALIDATION'
      field: keyof Omit<State, keyof SignupFormValues>
      value: boolean
    }
  | { type: 'SET_ERROR'; message: string }
  | { type: 'SET_SUCCESS'; value: boolean }
  | { type: 'RESET' }

const initialState: State = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  validUsername: false,
  validEmail: false,
  validPassword: false,
  validConfirmPassword: false,
  errMsg: '',
  success: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_VALIDATION':
      return { ...state, [action.field]: action.value }
    case 'SET_ERROR':
      return { ...state, errMsg: action.message }
    case 'SET_SUCCESS':
      return { ...state, success: action.value }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const Signup = ({ onSubmit }: SignupProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (field: keyof SignupFormValues, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value })

    // validation
    switch (field) {
      case 'username':
        dispatch({
          type: 'SET_VALIDATION',
          field: 'validUsername',
          value: USERNAME_REGEX.test(value),
        })
        break
      case 'email':
        dispatch({
          type: 'SET_VALIDATION',
          field: 'validEmail',
          value: EMAIL_REGEX.test(value),
        })
        break
      case 'password':
        dispatch({
          type: 'SET_VALIDATION',
          field: 'validPassword',
          value: PASSWORD_REGEX.test(value),
        })
        dispatch({
          type: 'SET_VALIDATION',
          field: 'validConfirmPassword',
          value: value === state.confirmPassword,
        })
        break
      case 'confirmPassword':
        dispatch({
          type: 'SET_VALIDATION',
          field: 'validConfirmPassword',
          value: value === state.password,
        })
        break
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (
      state.validUsername &&
      state.validEmail &&
      state.validPassword &&
      state.validConfirmPassword
    ) {
      await onSubmit?.({
        username: state.username,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      })
      dispatch({ type: 'SET_SUCCESS', value: true })
      dispatch({ type: 'RESET' })
    } else {
      dispatch({
        type: 'SET_ERROR',
        message: 'Please fix the highlighted fields.',
      })
    }
  }

  if (state.success) {
    return (
      <section className={formClass}>
        <h1>Account Created!</h1>
        <Link to='/login' className={buttonClass}>
          Login
        </Link>
      </section>
    )
  }

  return (
    <section>
      <p
        className={state.errMsg ? 'text-red-600 text-center mb-2' : 'offscreen'}
      >
        {state.errMsg}
      </p>
      <form className={formClass} onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col sm:flex-col md:flex-row flex-wrap justify-center items-center gap-2 w-full'>
          <input
            className={inputClass}
            type='text'
            placeholder='Username'
            value={state.username}
            onChange={(e) => handleChange('username', e.target.value)}
            required
          />
          <input
            className={inputClass}
            type='email'
            placeholder='Email'
            value={state.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <input
            className={inputClass}
            type='password'
            placeholder='Password'
            value={state.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />
          <input
            className={inputClass}
            type='password'
            placeholder='Confirm Password'
            value={state.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            required
          />
        </div>
        <button
          className={buttonClass}
          disabled={
            !state.validUsername ||
            !state.validEmail ||
            !state.validPassword ||
            !state.validConfirmPassword
          }
        >
          Signup
        </button>
      </form>
      <p className='text-center pt-2'>
        <Link to='/login' className='text-[var(--green)]'>
          Already have an account?
        </Link>
      </p>
    </section>
  )
}

export default Signup
