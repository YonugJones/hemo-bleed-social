import { useAuth } from './useAuth'
import { axiosPublic } from '../api/axiosConfig'
import type { AuthState } from '../types/auth'

interface RefreshResponse {
  accessToken: string
}

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async (): Promise<string> => {
    try {
      const res = await axiosPublic.post<RefreshResponse>(
        '/auth/refresh',
        {},
        { withCredentials: true }
      )

      const newAccessToken = res.data.accessToken

      setAuth((prev: AuthState) => ({
        ...prev,
        accessToken: newAccessToken,
      }))

      return newAccessToken
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      throw error
    }
  }
  return refresh
}

export default useRefreshToken
