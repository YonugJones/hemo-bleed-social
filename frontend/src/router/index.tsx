import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import AuthHome from '../components/AuthHome'
import Login from '../components/Login'
import Signup from '../components/Signup'
import LearnMore from '../pages/LearnMore'
import NotFound from '../components/NotFound'
import UserLayout from '../layouts/UserLayout'
import Protected from './Protected'
import Profile from '../pages/Profile'
import Feed from '../pages/Feed'
import EventForm from '../components/forms/EventForm'
import CalendarPage from '../pages/CalendarPage'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <AuthHome /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/learn-more', element: <LearnMore /> },
    ],
  },
  {
    element: <Protected />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: '/feed', element: <Feed /> },
          { path: '/calendar', element: <CalendarPage /> },
          { path: '/messages', element: <div>MESSAGES</div> },
          { path: '/notifications', element: <div>NOTIFICATIONS</div> },
          { path: '/profile', element: <Profile /> },
          {
            path: '/event',
            element: <EventForm onSubmit={(data) => console.log(data)} />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
