export interface SignupFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type SignupProps = {
  onSubmit: (signupData: SignupFormData) => void | Promise<void>
}
