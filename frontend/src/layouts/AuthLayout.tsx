import AuthNav from '../components/nav/AuthNav'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Link, Outlet, useLocation } from 'react-router-dom'

const getSubtitle = (pathname: string) => {
  if (pathname === '/signup') return 'Create your account.'
  if (pathname === '/login') return 'Welcome back.'
  if (pathname === '/learn-more') return ''
  return 'Live. Log. Learn.'
}

const AuthLayout = () => {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='w-full px-6 py-4'>
        <AuthNav />
      </header>
      <main className='flex flex-col items-center justify-start flex-grow'>
        <div className='mt-[10vh] sm:mt-[25vh] flex items-center justify-center w-full'>
          <Link to='/'>
            <Hero subtitle={getSubtitle(pathname)} />
          </Link>
        </div>

        <div className='w-full max-w-md px-6'>
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default AuthLayout
