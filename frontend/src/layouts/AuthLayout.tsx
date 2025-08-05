import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <Outlet />
    </main>
  )
}

export default AuthLayout
