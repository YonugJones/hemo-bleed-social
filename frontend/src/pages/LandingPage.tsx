import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <div className='flex items-center text-[var(--green)] gap-5 mb-5'>
        <img src='https://placehold.co/60' alt='Hemo Bleed Social Logo' />
        <div className='flex flex-col justify-center items-center'>
          <h1 className='jaro-logo text-6xl'>Hemo Bleed Social</h1>
          <h2>Live. Log. Learn.</h2>
        </div>
      </div>
      <div className='flex gap-5'>
        <Link to='/signup'>
          <button className='bg-[var(--green)] hover:bg-[var(--light-green)] text-white font-semibold py-2 px-4 rounded shadow cursor-pointer'>
            Create your account
          </button>
        </Link>
        <Link to='/login'>
          <button className='bg-[var(--green)] hover:bg-[var(--light-green)] text-white font-semibold py-2 px-4 rounded shadow cursor-pointer'>
            Log in
          </button>
        </Link>
      </div>
    </main>
  )
}

export default LandingPage
