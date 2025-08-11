import UserNav from '../components/nav/UserNav'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <UserNav />
      </header>
      <main className='flex grow justify-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
