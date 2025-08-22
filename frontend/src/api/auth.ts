import { axiosPublic } from './axiosConfig'
import type { SignupFormValues } from '../types/auth'

export const signupUser = async (data: SignupFormValues) => {
  try {
    const res = await axiosPublic.post('/auth/signup', data)
    return res.data
  } catch (err) {
    console.error('API error:', err)
    throw err
  }
}

export const loginUser = async (username: string, password: string) => {
  try {
    const res = await axiosPublic.post(
      '/auth/login',
      { username, password },
      { withCredentials: true }
    )
    return res.data
  } catch (err) {
    console.error('API error:', err)
    throw err
  }
}

export const logoutUser = async () => {
  try {
    const res = await axiosPublic.post('/auth/logout')
    return res.data
  } catch (err) {
    console.error('API error:', err)
    throw err
  }
}
