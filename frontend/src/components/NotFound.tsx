import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen text-center'>
      <h1 className='text-4xl font-bold'>404 - Page not found</h1>
      <p className='mt-4'>The page you requested does not exist</p>
      <Link to='/' className='mt-6 text-[var(--green)] underline'>
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
