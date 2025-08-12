export interface SignupFormState {
  username: string
  validUsername: boolean
  email: string
  validEmail: boolean
  password: string
  validPassword: boolean
  confirmPassword: string
  validConfirmPassword: boolean
}

export type SignupFormAction =
  | { type: 'SET_FIELD'; field: keyof SignupFormState; value: string | boolean }
  | { type: 'SET_ERROR'; message: string }
  | { type: 'SET_SUCCESS'; value: boolean }
  | { type: 'RESET' }
