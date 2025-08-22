import { useEffect } from 'react'
import { axiosPrivate } from '../api/axiosConfig'
import { useAuth } from './useAuth'
import useRefreshToken from './useRefreshToken'
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const useAxiosPrivate = () => {
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {} as typeof config.headers
        }
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config as CustomAxiosRequestConfig

        if (
          error?.response?.status === 403 &&
          prevRequest &&
          !prevRequest._retry
        ) {
          prevRequest._retry = true
          try {
            const newToken = await refresh()
            if (!prevRequest.headers) {
              prevRequest.headers = {}
            }
            prevRequest.headers['Authorization'] = `Bearer ${newToken}`
            return axiosPrivate(prevRequest)
          } catch (err) {
            console.error('Token refresh failed', err)
          }
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
