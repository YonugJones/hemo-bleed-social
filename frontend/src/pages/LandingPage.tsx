import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col sm:flex-col md:flex-row justify-center items-center gap-4'>
      <Link to='/signup'>
        <button className='w-[150px] sm:w-[175px] m:w-[200px] px-4 py-1 rounded-full text-center bg-[var(--green)] hover:bg-[var(--light-green)] text-white text-xs font-semibold shadow cursor-pointer'>
          Create your account
        </button>
      </Link>
      <Link to='/login'>
        <button className='w-[150px] sm:w-[175px] m:w-[200px] px-4 py-1 rounded-full text-center bg-[var(--green)] hover:bg-[var(--light-green)] text-white text-xs font-semibold shadow cursor-pointer'>
          Log in
        </button>
      </Link>
    </div>
  )
}

export default LandingPage
