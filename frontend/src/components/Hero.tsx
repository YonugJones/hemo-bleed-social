interface HeroProps {
  subtitle: string
}

const Hero = ({ subtitle }: HeroProps) => {
  return (
    <div className='w-full mb-5 text-[var(--green)]'>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
        <img src='https://placehold.co/60' alt='Hemo Bleed Social Logo' />
        <h1 className='jaro-logo text-5xl sm:text-6xl text-center flex-wrap'>
          Hemo Bleed Social
        </h1>
      </div>
      <h2 className='mt-4 text-center'>{subtitle}</h2>
    </div>
  )
}

export default Hero
