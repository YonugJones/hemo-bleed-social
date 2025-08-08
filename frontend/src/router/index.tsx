import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import LandingPage from '../pages/LandingPage'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import LearnMore from '../pages/LearnMore'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/learn-more', element: <LearnMore /> },
    ],
  },
])
