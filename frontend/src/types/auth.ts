export interface AuthState {
  id?: string
  username?: string
  email?: string
  accessToken?: string
  refreshToken?: string
  profilePic?: string
}

export type SignupFormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type ValidationKeys =
  | 'validUsername'
  | 'validEmail'
  | 'validPassword'
  | 'validConfirmPassword'
